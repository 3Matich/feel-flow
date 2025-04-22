import React, { useState, useEffect } from "react";
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
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";

import { getUserData } from "@/services/session";
// import { getUser } from "@/services/Users/GetUser";
import { ProfileInfoCard } from "@/widgets/cards";
import { EditProfileDialog } from "@/widgets/dialogs";
import { useDragAndDrop } from "@/hooks";
import { platformSettingsData } from "@/data";

import { getUser } from "@/api/users/getUser";

export function ProfileNew() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("0000.png");
  const { handleDragOver, handleDrop, handleImageChange, handleRemoveImage, logoPreview } = useDragAndDrop();
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [settings, setSettings] = useState(platformSettingsData);

  // Aplicar tema oscuro en el html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Obtener datos del usuario desde la API
  useEffect(() => {
    const { authUserID } = getUserData();

    async function fetchProfile() {
      try {
        const data = await getUser(authUserID);
        // const {enterpriseName, enterpriseID, name, surname, username, userID, country, phoneNumber, description} = await getUser(authUserID);
        if (data && typeof data === "object") {
          setProfile((prev) => ({
            ...prev,
            ...data,
            // Usamos los nuevos campos o asignamos un default si faltan
            // country: data.country,
            // phoneNumber: phoneNumber,
            // description: data.description,
            // job: Array.isArray(data.job) ? data.job : ["Posición", "Empresa"],
          }));
        } else {
          console.error("Error al cargar el perfil: Datos no válidos", data);
        }
      } catch (error) {
        console.error("Error al cargar el perfil:", error.message);
      }
    }

    fetchProfile();
  }, []);

  // Función para actualizar el perfil usando los nuevos campos
  /*
  const handleUpdateProfile = async (updatedData) => {
    try {
      const { name, surname, username, country, phoneNumber, description } = updatedData;
      const result = await updateUser(name, surname, username, country, phoneNumber, description);
      if (result) {
        setProfile((prev) => ({ ...prev, ...updatedData }));
        setIsEditing(false);
      } else {
        console.error("Error al actualizar el perfil: Fallo en la API");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error.message);
    }
  };
  */
  const handleOpenAvatarDialog = () => setOpen(!open);

  const handleSwitchChange = (changeKey) => {
    if (changeKey === "darkMode") {
      setDarkMode(!darkMode);
    } else {
      setSettings((prev) =>
        prev.map((category) => ({
          ...category,
          options: category.options.map((option) =>
            option.change === changeKey ? { ...option, checked: !option.checked } : option
          ),
        }))
      );
    }
  };

  if (!profile) return <div>Cargando perfil...</div>;
  
  return (
    <>
      <Card className="mx-3 mt-8 mb-6 card lg:mx-4 border">
        <CardBody className="p-4">
          {/* Sección superior: Avatar y datos básicos */}
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={logoPreview || `/img/avatar/${selectedAvatar}`}
                alt="avatar"
                size="xl"
                variant="rounded"
                className="rounded-full shadow-lg shadow-blue-gray-500/40"
                onClick={handleOpenAvatarDialog}
              />
              <Dialog
                open={open}
                handler={handleOpenAvatarDialog}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0.9, y: -100 },
                }}
                className="card"
              >
                <DialogHeader className="text-light-text dark:text-dark-text">Seleccione un avatar de usuario</DialogHeader>
                <hr className="my-8 border-blue-gray-500 dark:border-white" />
                <DialogBody>
                  <div className="flex flex-wrap justify-center">
                    {["0000.png", "0001.png", "0002.png", "0003.png", "0004.png", "0005.png", "0006.png", "0007.png"].map((avatar, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedAvatar(avatar);
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
                <DialogHeader className="text-light-text dark:text-dark-text">O bien, suba una foto</DialogHeader>
                <DialogBody>
                  <div className="flex flex-warp justify-center">
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="relative flex items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-md w-72 h-40 mx-auto"
                    >
                      {logoPreview ? (
                        <div className="relative w-32 h-32 mx-auto">
                          <img src={logoPreview} alt="Logo preview" className="object-cover w-full h-full rounded-md" />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage();
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
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </DialogBody>
                <DialogFooter>
                  <Button variant="text" color="green" onClick={handleOpenAvatarDialog} className="mr-1">
                    <span>Save</span>
                  </Button>
                  <Button variant="text" color="red" onClick={handleOpenAvatarDialog} className="mr-1">
                    <span>Cancel</span>
                  </Button>
                </DialogFooter>
              </Dialog>
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {profile.name} {profile.surname}
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-600">
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
                // desc={profile.description}
                // onSave={handleUpdateProfile}
                onCancel={() => setIsEditing(false)}
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
                {settings.map((category) => (
                  <div key={category.title} className="mb-4">
                    <h2 className="text-l font-semibold">{category.title}</h2>
                    <div className="mt-4 space-y-3">
                      {category.options.map((option) => (
                        <div key={option.label} className="flex items-center justify-between">
                          <span>{option.label}</span>
                          <Switch
                            checked={option.change === "darkMode" ? darkMode : option.checked}
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

export default ProfileNew;
