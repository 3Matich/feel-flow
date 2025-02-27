import React from "react";

const Button = ({
    label,
    onClick,
    type = "button",
    color = "blue",
    size = "md",
    variant = "solid",
    disabled = false,
    icon: Icon,
    rounded = "rounded-md",
    className = "",
    children,
    ...props
}) => {
    const baseClasses = "font-medium focus:outline-none transition duration-300";
    const sizeClasses = {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-5 py-3",
    };
    const colorClasses = {
        black: "text-black hover:bg-bgBlueSecondary",
        blue: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400",
        cyan: "text-white bg-blue-600 hover:bg-blue-700",
        transparent: "text-gray-700 bg-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:bg-bgBluePrimary",
        red: "text-white bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-400",
        green: "text-white bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-400",
        gray: "text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400",
        light_pink: "text-white bg-[#DF888F] hover:bg-[#D5737C] focus:ring-2 focus:ring-[#D5737C]",
        light_blue: "text-white bg-[#88D9DF] hover:bg-[#6DB6C4] focus:ring-2 focus:ring-[#6DB6C4]",
        light_purple: "text-white bg-[#8444D7] hover:bg-[#7237B9] focus:ring-2 focus:ring-[#7237B9]",
    };
    const variantClasses = {
        solid: "",
        outline: "bg-transparent border hover:bg-gray-100",
        ghost: "bg-transparent hover:bg-gray-100",
    };

    const disabledClasses = disabled
        ? "opacity-50 cursor-not-allowed"
        : "";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${rounded} ${sizeClasses[size]} ${variant === "solid" ? colorClasses[color] : variantClasses[variant]
                } ${disabledClasses} ${className}`}
            {...props}
        >
            {Icon && <Icon className="inline-block w-5 h-5 mr-2" />}
            {label}
            {children && <div>{children}</div>}
        </button>
    );
};

export default Button;
