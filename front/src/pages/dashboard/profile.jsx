// src/widgets/profile/ProfileNew.jsx
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Switch,
  Tooltip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  PencilIcon,
} from "@heroicons/react/24/solid";

import { getUserData } from "@/services/session";
import { ProfileInfoCard } from "@/widgets/cards";
import { EditProfileDialog } from "@/widgets/dialogs";
import { useDragAndDrop } from "@/hooks";
import { platformSettingsData } from "@/data";
import { getUser } from "@/api/users/getUser";
import { getUserImage } from "@/services/getUserImage"; // GET service
import { uploadUserImage } from "@/services/uploadUserImage"; // POST service
import { FeelFlowSpinner } from "@/components";
import { useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function Profile() {
  const [profile, setProfile] = useState(null);
  const [userImageSrc, setUserImageSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("0000.png");
  const [settings, setSettings] = useState(platformSettingsData);
  const { handleDragOver, handleDrop, handleImageChange, handleRemoveImage, logoPreview } = useDragAndDrop();

  // Estados para obtener la página y ejecutar los llamados al backend necesarios
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter((el) => el !== "");
  const page = segments[segments.length - 1];
  const [hasFetchedRef, setHasFetchedRef] = useState(false);

  // Obtener datos del usuario desde la API
  const fetchProfile = async () => {
    const { authUserID } = getUserData();
    try {
      const data = await getUser(authUserID);
      if (data && typeof data === "object") {
        setProfile(prev => ({
          ...prev, ...data
        }));
      } else {
        console.error("Error al cargar el perfil: Datos no válidos", data);
      }
    } catch (error) {
      console.error("Error al cargar el perfil:", error.message);
    }
  };

  async function fetchAvatar() {
    try {
      const { fileType, fileData } = await getUserImage();
      const uri = `data:${fileType};base64,${fileData}`;
      setUserImageSrc(uri);
    } catch (err) {
      console.error("Error al obtener avatar:", err);
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
    setHasFetchedRef(false);
  };

  if (page === "perfil" && !hasFetchedRef) {
    setHasFetchedRef(true);
    fetchProfile();
    fetchAvatar();
  }

  const handleOpenAvatarDialog = () => setOpen(!open);

  const handleSwitchChange = (changeKey) => {
    setSettings((prev) =>
      prev.map((category) => ({
        ...category,
        options: category.options.map((option) =>
          option.change === changeKey
            ? { ...option, checked: !option.checked }
            : option
        ),
      }))
    );
  };

  if (!profile) return <FeelFlowSpinner />;

  return (
    <>
      <Card className="mx-3 mt-8 mb-6 lg:mx-4 border card">
        <CardBody className="p-4">
          {/* Sección superior: Avatar y datos básicos */}
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                /* Prioridad: userImageSrc → logoPreview → ícono */
                src={userImageSrc || logoPreview || `/img/avatar/${selectedAvatar}`}
                alt="avatar"
                size="xl"
                variant="rounded"
                className="rounded-full shadow-lg shadow-blue-gray-500/40"
                onClick={handleOpenAvatarDialog}
              />
              <Dialog
                open={open}
                handler={handleOpenAvatarDialog}
                animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 } }}
                className="card"
              >
                <DialogHeader className="card-header relative">
                  <span>Seleccione un avatar de usuario</span>
                  <button
                    onClick={handleOpenAvatarDialog}
                    className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Cerrar diálogo"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-700" />
                  </button>
                </DialogHeader>
                <hr className="my-8 border-blue-gray-500 dark:border-white" />
                <DialogBody>
                  <div className="flex flex-wrap justify-center">
                    {[
                      "0000.png",
                      "0001.png",
                      "0002.png",
                      "0003.png",
                      "0004.png",
                      "0005.png",
                      "0006.png",
                      "0007.png",
                    ].map((avatar, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedAvatar(avatar);
                          setUserImageSrc(null);
                          handleOpenAvatarDialog();
                        }}
                        className="m-2 cursor-pointer"
                      >
                        <Avatar
                          src={`/img/avatar/${avatar}`}
                          alt={`Avatar ${index + 1}`}
                          className="w-20 h-20"
                        />
                      </div>
                    ))}
                  </div>
                </DialogBody>
                <hr className="my-8 border-blue-gray-500 dark:border-white" />
                <DialogHeader className="card-header">
                  O bien, suba una foto
                </DialogHeader>
                <DialogBody>
                  <div className="flex flex-wrap justify-center">
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="relative flex items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-md w-72 h-40 mx-auto"
                    >
                      {logoPreview ? (
                        <div className="relative w-32 h-32 mx-auto">
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="object-cover w-full h-full rounded-md"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage();
                              setSelectedFile(null);
                            }}
                            className="absolute -top-2 -right-0 text-gray-700 hover:text-black bg-gray p-1 text-lg font-bold transition-opacity opacity-70 hover:opacity-100 z-10"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="logo-input"
                          className="cursor-pointer text-center text-gray-500 hover:text-blue-500 transition"
                        >
                          Arrastra y suelta un logo aquí, o haz clic para seleccionar
                        </label>
                      )}
                      <input
                        id="logo-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          handleImageChange(e);
                          setSelectedFile(e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                </DialogBody>
                <DialogFooter className="justify-center space-x-4">
                  <Button
                    variant="text"
                    onClick={handleOpenAvatarDialog}
                    className="button-cancel rounded-lg px-6 py-2 shadow-md"
                  >
                    <span>Cancelar</span>
                  </Button>
                  <Button
                    variant="text"
                    onClick={async () => {
                      if (!selectedFile) {
                        alert("No se ha seleccionado una imagen");
                        return;
                      }
                      try {
                        await uploadUserImage(selectedFile);
                        // Reconstruir preview si lo deseas
                        setUserImageSrc(logoPreview);
                        alert("Imagen subida con éxito");
                        handleOpenAvatarDialog();
                      } catch (err) {
                        console.error(err);
                        alert("Error al subir la imagen");
                      }
                    }}
                    className="button-save rounded-lg px-6 py-2 shadow-md"
                  >
                    <span>Guardar</span>
                  </Button>
                </DialogFooter>
              </Dialog>

              <div>
                <Typography variant="h5" className="mb-1">
                  {profile.name} {profile.surname}
                </Typography>
                <Typography variant="small">
                  {profile.enterpriseInfoHomeDTO?.name || "Sin empresa"} | {profile.country}
                </Typography>
              </div>
            </div>
          </div>

          {/* Sección principal: Información de perfil y edición */}
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">
            {isEditing && (
              <EditProfileDialog
                data={profile}
                // onSave={handleUpdateProfile}
                onCancel={handleCancelEdit}
                open={isEditing}
              />
            )}
            <ProfileInfoCard
              title="Información de Perfil"
              description={profile.description}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              details={{
                nombre: `${profile.name} ${profile.surname}`,
                email: profile.username,
                pais: profile.country,
                telefono: profile.phoneNumber,
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon
                    className="h-4 w-4 cursor-pointer text-blue-gray-500"
                    onClick={() => setIsEditing(true)}
                  />
                </Tooltip>
              }
            />

            {/* Sección de Platform Settings */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-5">
                Configuraciones de la Plataforma
              </Typography>
              <div className="flex flex-col gap-8">
                {settings.map(category => (
                  <div key={category.title} className="mb-4">
                    <h2 className="text-l font-semibold">{category.title}</h2>
                    <div className="mt-4 space-y-3">
                      {category.options.map(option => (
                        <div key={option.label} className="flex items-center justify-between">
                          <span>{option.label}</span>
                          <Switch
                            onChange={() => handleSwitchChange(option.change)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;