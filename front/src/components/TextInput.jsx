import React from "react";

import IconButton from "./IconButton"

const TextInput = ({
    label,
    labelClass,
    placeholder = "Enter text",
    type = "text",
    name,
    value,
    onChange,
    size = "md",
    color = "blue",
    error = "",
    disabled = false,
    icon: Icon, // Añadido para el ícono
    onIconClick, // Función para el clic en el ícono
    ...props
}) => {
    const classLabel = {
        login: "block text-textSecondary font-medium mb-1"
    };

    const sizeClasses = {
        sm: "text-sm py-1 px-2",
        md: "text-base py-2 px-3",
        lg: "text-lg py-3 px-4",
    };

    const colorClasses = {
        blue: "focus:ring-blue-500 focus:border-blue-500",
        red: "focus:ring-red-500 focus:border-red-500",
        green: "focus:ring-green-500 focus:border-green-500",
        gray: "focus:ring-gray-500 focus:border-gray-500",
    };

    const baseClasses =
        "block w-full rounded-md border shadow-sm transition-all duration-200";

    const errorClasses = error
        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300";

    return (
        <>
            {label && (
                <label className={`${classLabel[labelClass]}}`}>
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${baseClasses} ${sizeClasses[size]} ${colorClasses[color]} ${errorClasses} ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                        }`}
                    {...props}
                />
                {Icon && onIconClick && ( // Renderiza el ícono si se proporciona
                    <IconButton icon={Icon} onClick={onIconClick} size="sm" className="absolute inset-y-0 right-0 flex items-center pr-3"/>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </>
    );
};

export default TextInput;
