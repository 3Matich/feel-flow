import React from "react";

import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    IconButton,
    Button,
} from "@material-tailwind/react";
import { FeelFlowSpinner } from "@/components";

import { ClipboardCopy, X } from "lucide-react";

import { GenerateInvitation } from "@/hooks";


export function InviteMember({ uuid, open, handleOpen }) {
    const [copied, setCopied] = React.useState(false);
    const [closing, setClosing] = React.useState(false);
    const [link, setLink] = React.useState(false);
    const [inviteLink, setInviteLink] = React.useState("");
    const hasFetchedRef = React.useRef(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => {
            setClosing(true);
            setTimeout(() => {
                handleOpen(); // cerrás desde el padre
                hasFetchedRef.current = false;
                setClosing(false);
                setCopied(false);
            }, 300);
        }, 2000);
    };

    const fetchInviteLink = async () => {
        const link = await GenerateInvitation(uuid);
        setInviteLink(link); // Establece el inviteLink cuando se obtiene
        setLink(!link);
    };

    if (open) { // Esto hace que solo se ejecute el POST al back cuando se abre el Dialog
        if (!hasFetchedRef.current) {
            hasFetchedRef.current = true;
            fetchInviteLink();
        }
    }

    

    return (
        <Dialog open={open} handler={handleOpen} size="sm" className={`card transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}>
            <DialogHeader className="flex justify-between items-center">
                <Typography variant="h5">Invitar a un nuevo miembro</Typography>
                <IconButton variant="text" color="pink" onClick={handleOpen}>
                    <X size={20} />
                </IconButton>
            </DialogHeader>
            <DialogBody>
                <div className="mt-4 flex items-center gap-2 border rounded-lg p-2">
                    <Typography className="text-sm truncate w-full">
                        {inviteLink}
                        {/* {link 
                            ? {inviteLink}
                            : <FeelFlowSpinner />
                        } */}
                    </Typography>
                    <IconButton onClick={copyToClipboard} color={copied ? "green" : "indigo"} className={`transition-transform duration-200 ${copied ? 'scale-110' : ''}`}>
                        <ClipboardCopy size={20} />
                    </IconButton>
                </div>
                {copied && (
                    <Typography className="mt-2 text-sm animate-bounce">¡Link copiado!</Typography>
                )}
            </DialogBody>
            <DialogFooter>
                <Button variant="filled" className="button-cancel mr-2" onClick={handleOpen}>Cerrar</Button>
                <Button variant="filled" className="button-custom" onClick={copyToClipboard}>Copiar Link</Button>
            </DialogFooter>
        </Dialog>
    )
}

export default InviteMember;