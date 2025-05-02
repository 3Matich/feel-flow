import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

export function DialogErrorInvite({ open, handleOpen }) {
    return (
        <Dialog open={open} handler={handleOpen} size="lg" className="card">
            <DialogHeader className="text-center text-red-600">
                Código de invitación inválido o ya utilizado
            </DialogHeader>
            <DialogBody>
                El código de invitación que intentaste usar no es válido o ya fue utilizado.
                Por favor verifica el enlace o contacta a tu Team Leader para obtener uno nuevo.
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="gradient"
                    color="red"
                    onClick={handleOpen}
                >
                    <span>Cerrar</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default DialogErrorInvite;