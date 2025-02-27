import React from "react";
import Button from "./Button";

const Popup = ({
    isOpen,
    title,
    message,
    icon,
    // icon = <FaExclamationCircle className="text-yellow-400 text-5xl mr-4" />,
    buttons,
    children
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white max-w-sm w-full rounded-lg shadow-lg transform transition-all duration-300 scale-95 hover:scale-100 p-6">
                <div className="flex items-center mb-4">
                    {icon}
                    <h3 className="text-xl font-roboto-bold text-textBlack">{title}</h3>
                </div>
                <p className="text-gray-700 mb-6">{message}</p>
                {children && <div className="mb-4">{children}</div>}
                <div className="flex justify-center space-x-4">
                    {buttons.map((button, index) => (
                        <Button
                            key={index}
                            label={button.label}
                            onClick={button.onClick}
                            color={button.color || "blue"}
                            size={button.size || "md"}
                            variant={button.variant || "solid"}
                            disabled={button.disabled || false}
                            icon={button.icon}
                            className={button.className}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Popup;
