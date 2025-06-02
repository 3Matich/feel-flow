import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { UpdateTeam } from "@/api";

export function EditTeamDialog({ uuid, teamName, teamDescription, open, onClose }) {
  const [name, setName] = useState(teamName);
  const [desc, setDesc] = useState(teamDescription);

  useEffect(() => {
    if (open) {
      setName(teamName || "");
      setDesc(teamDescription || "");
    }
  }, [open, teamName, teamDescription]);

  const handleSave = async () => {
    try {
      await UpdateTeam(uuid, { nameTeam: name, descriptionTeam: desc });
      onClose();
    } catch (e) {
      console.error("Error guardando datos:", e);
    }
  };

  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader className="relative flex justify-center items-center">
        Editar datos del equipo
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <XMarkIcon
            className="h-5 w-5 text-gray-700 dark:text-gray-400 hover:dark:text-white transition-colors duration-200"
          />
        </button>
      </DialogHeader>
      <DialogBody className="space-y-4">
        <Input
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
        <Textarea
          label="Descripción"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
          className="w-full"
        />
      </DialogBody>
      <DialogFooter className="justify-center space-x-4">
        <Button className="button-cancel rounded-lg px-6 py-2 shadow-md" onClick={onClose}>
          Cancelar
        </Button>
        <Button className="button-save rounded-lg px-6 py-2 shadow-md" onClick={handleSave}>
          Guardar
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default EditTeamDialog;
