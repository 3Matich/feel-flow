import React from "react";

const IconButton = ({ icon: Icon, onClick, color = "blue", hover, size = "md", tooltip = "", id, className = "flex items-center justify-center rounded-full transition-all duration-200" }) => {
    const sizeClasses = {
        sm: "p-2 text-sm",
        md: "p-3 text-base",
        lg: "p-4 text-lg",
    };

    const hoverColor = {
        blue: "hover:bg-bgBluePrimary",
        black: "hover:bg-bgBlueSecondary",
        red: "hover:bg-red-100",
        green: "hover:bg-green-100",
        gray: "hover:bg-gray-100",
    }

    const colorClasses = {
        blue: "text-textPrimary",
        black: "text-black",
        red: "text-red-500",
        green: "text-green-500",
        gray: "text-gray-500",
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${className} ${hoverColor[hover]} ${sizeClasses[size]} ${colorClasses[color]}`}
            aria-label={tooltip}
            title={tooltip}
            id={id}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
};

export default IconButton;
