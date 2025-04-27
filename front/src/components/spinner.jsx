import { Spinner, Typography } from "@material-tailwind/react";

export function FeelFlowSpinner() {
    return (
        <div className="flex items-center justify-center gap-4">
            <Spinner color="pink" className="h-12 w-12" />
            <Typography color="pink" className="dark:text-pink-500">Cargando datos...</Typography>
        </div>
    );
}