import React from "react";
import TextInput from "./TextInput";
import Button from "./Button";

const Form = ({
    handleSubmit,
    inputs = [],
    error = [],
    success,
    buttons = [],
    links = []
}) => {

    const formSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission here
        if (handleSubmit) {
            handleSubmit(event);  // Call the passed down handleSubmit function
        } else {
            console.error("handleSubmit function is not provided");
        }
    };
    return (
        <form onSubmit={formSubmit}>
            <div className="mb-6">
                {inputs.map((input, index) => (
                    <TextInput
                        key={index}
                        label={input.label}
                        labelClass={input.labelClass}
                        placeholder={input.placeholder}
                        type={input.type}
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                        size={input.size || "md"}
                        color={input.color || "blue"}
                        error={input.error}
                        disabled={input.disabled || false}
                        {...input}
                    />
                ))}
            </div>
            {error && <p className="text-error text-sm mb-4 text-center">{error}</p>}
            {success && <p className="text-success text-sm mb-4 text-center">{success}</p>}
            {buttons.map((button, index) => (
                <Button
                    key={index}
                    label={button.label}
                    onClick={button.onClick}
                    type={button.type}
                    color={button.color || "blue"}
                    size={button.size || "md"}
                    variant={button.variant || "solid"}
                    disabled={button.disabled || false}
                    icon={button.icon}
                    className={button.className}
                />
            ))}
            {links.length > 0 && (
                <div className="text-center mt-4">
                    {links.map((link, index) => (
                        <p key={index} className="text-textPrimary text-sm">
                            {link.text}{" "}
                            <a
                                href={link.href}
                                className={link.className || "text-indigo-600 font-semibold hover:underline"}
                            >
                                {link.linkText}
                            </a>
                        </p>
                    ))}
                </div>
            )}
        </form>

    );
};

export default Form;
