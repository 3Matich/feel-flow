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
import { UpdateTeam } from "@/api";

export function EditTeamDialog({ uuid, teamName, teamDescription, open, onClose }) {
  const [name, setName] = useState(teamName);
  const [desc, setDesc] = useState(teamDescription);

  useEffect(() => {
    if (open) {
      setName(teamName||"");
      setDesc(teamDescription||"");
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
      <DialogHeader className="relative flex justify-center">Editar datos del equipo</DialogHeader>
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
        <Button variant="text" onClick={onClose}>Cancelar</Button>
        <Button variant="gradient" onClick={handleSave}>Guardar</Button>
      </DialogFooter>
    </Dialog>
  );
}

export default EditTeamDialog;
