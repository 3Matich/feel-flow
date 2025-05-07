import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Progress } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from 'react';

const timeOut = 30; // Define la cantidad de segundos antes de cerrar la sesion

export const SessionExpiredDialog = ({ open, handleOpen, onLogout }) => {
    const navigate = useNavigate();
    const [secondsLeft, setSecondsLeft] = useState(timeOut);
    const timerRef = useRef(null);

    const startTimer = () => {
        if (timerRef.current) return; // evita duplicar timers

        timerRef.current = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                    onLogout()
                    navigate('/auth/sign-in');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleGoToLogin = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
        onLogout();
        navigate('/auth/sign-in');
    };

    startTimer()
    const progressValue = ((timeOut - secondsLeft) / timeOut) * 100;


    return (
        <Dialog
            open={open}
            handler={() => {
                handleOpen();
                clearInterval(timerRef.current);
                timerRef.current = null;
                setSecondsLeft(timeOut);
            }}
            size="sm"
            className="card relative"
        >
            <DialogHeader className="text-center card-header">Sesión caducada</DialogHeader>
            <DialogBody className="text-center card-body">
                Tu sesión ha expirado. Por favor, vuelve a iniciar sesión para continuar usando la aplicación.
            </DialogBody>
            <DialogFooter className="flex justify-center">
                <Button variant="filled" className="button-custom" onClick={handleGoToLogin}>
                    Volver a iniciar sesión
                </Button>
            </DialogFooter>
            <div className="absolute bottom-0 left-0 w-full">
                <Progress value={progressValue} color="red" size="sm" />
            </div>
        </Dialog>
    );
}

export default SessionExpiredDialog;