import React from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
} from "@material-tailwind/react";

export function DialogSuccess({ open, handleOpen }) {

    return (
        <Dialog open={open} handler={handleOpen} size="sm" className="card">
            <DialogHeader className="text-center flex flex-col items-center">
                🎉 ¡Registro exitoso!
            </DialogHeader>
            <DialogBody className="text-center">
                Bienvenido a <strong>Feel Flow</strong>.
                Tu cuenta se creó correctamente.
                ¡Esperamos que disfrutes la experiencia!
            </DialogBody>
            <DialogFooter className="flex justify-center">
                <Button variant="gradient" color="green" onClick={handleOpen}>
                    <span>¡Genial!</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default DialogSuccess;