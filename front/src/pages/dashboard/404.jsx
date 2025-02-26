import React from 'react';
import { Button } from '@material-tailwind/react';

export function NotFoundPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div >
                <img 
                    className="h-96 w-full object-cover object-center" 
                    src="/img/Tristeza404.png" 
                    alt=""
                />
            </div>
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="mt-4 text-xl text-gray-700">AWWW ... DON'T CRY. It's just a 404 Error!</p>
                <p className="mt-2 text-md text-gray-500">What you're looking for may have been misplaced in Long Term Memory.</p>
                <Button
                    color="lightBlue"
                    className="mt-6"
                    onClick={() => window.location.href = '/'}
                >
                    Volver a la página principal
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;
