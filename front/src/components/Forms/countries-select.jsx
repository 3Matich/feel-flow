import React from "react";
import { useCountries } from "use-react-countries";
import { Select, Option } from "@material-tailwind/react";

export function CountriesSelect({ userCountry, name, onChange } ) {
    const { countries } = useCountries();

    return (
        <Select
            size="lg"
            label="Select Country"
            name={name}
            value={userCountry}
            onChange={(value) => onChange({ target: { name, value } })}
            selected={(element) =>
                element &&
                React.cloneElement(element, {
                    disabled: true,
                    className:
                        "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                })
            }
        >
            {countries.map(({ name, flags }) => (
                <Option key={name} value={name} className="flex items-center gap-2">
                    <img
                        src={flags.svg}
                        alt={name}
                        className="h-5 w-5 rounded-full object-cover"
                    />
                    {name}
                </Option>
            ))}
        </Select>
    );
}

export default CountriesSelect;