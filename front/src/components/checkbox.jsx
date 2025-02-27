import React from "react";

const Checkbox = ({
    id,
    name,
    label,
    checked = false,
    onChange,
    className = "",
}) => {
    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default Checkbox;
