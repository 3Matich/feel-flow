// src/widgets/dialogs/EditTeamImageDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { useDragAndDrop } from "@/hooks";
import { uploadTeamImage } from "@/api/images/uploadTeamImage";

export function EditTeamImageDialog({ uuid, open, onClose }) {
  const { handleDragOver, handleDrop: hookDrop, handleImageChange, handleRemoveImage, logoPreview } =
    useDragAndDrop();
  const [selectedFile, setSelectedFile] = useState(null);

  // Al seleccionar desde el <input>
  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    handleImageChange(e);
  };

  // Al soltar en el área
  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setSelectedFile(file);
    hookDrop(e);
  };

  const handleSave = async () => {
    if (!selectedFile) {
      alert("No se ha seleccionado una imagen");
      return;
    }
    try {
      await uploadTeamImage(uuid, selectedFile);
      alert("Imagen subida con éxito");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al subir la imagen del equipo");
    }
  };

  return (
    <Dialog
      open={open}
      handler={onClose}
      animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 } }}
      className="card"
    >
      <DialogHeader className="relative flex justify-center">Editar imagen del equipo</DialogHeader>

      <DialogBody>
        {/* Avatar preview clickeable */}
        <div className="flex justify-center mb-4">
          <Avatar
            src={logoPreview || `/img/avatar/0000.png`}
            alt="Previsualización"
            size="xl"
            variant="rounded"
            className="rounded-full shadow-lg cursor-pointer"
            onClick={() => document.getElementById("team-img-input").click()}
          />
          <input
            id="team-img-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileInputChange}
          />
        </div>

        {/* Área de drag & drop */}
        <div
          onDragOver={handleDragOver}
          onDrop={onDrop}
          className="relative flex items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-md w-72 h-40 mx-auto"
        >
          {logoPreview ? (
            <div className="relative w-32 h-32 mx-auto">
              <img
                src={logoPreview}
                alt="Preview"
                className="object-cover w-full h-full rounded-md"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                  setSelectedFile(null);
                }}
                className="absolute -top-2 -right-0 text-gray-700 hover:text-black bg-gray p-1 text-lg font-bold opacity-70 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ) : (
            <label
              htmlFor="team-img-input"
              className="cursor-pointer text-gray-500 hover:text-blue-500"
            >
              Arrastra y suelta una imagen aquí, o haz clic para seleccionar
            </label>
          )}
        </div>
      </DialogBody>

      <DialogFooter className="justify-center space-x-4">
        <Button variant="text" onClick={onClose} className="rounded-lg px-6 py-2">
          Cancelar
        </Button>
        <Button variant="gradient" onClick={handleSave} className="rounded-lg px-6 py-2">
          Guardar
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default EditTeamImageDialog;
