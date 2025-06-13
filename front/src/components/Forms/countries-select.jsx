import React, { useMemo } from "react";
import { useCountries } from "use-react-countries";
import { Select, Option } from "@material-tailwind/react";

/**
 * A country select dropdown that lists countries in alphabetical order.
 * @param {{ userCountry: string, name: string, onChange: function }} props
 */
export function CountriesSelect({ userCountry, name, onChange }) {
  const { countries } = useCountries();

  // Sort countries alphabetically by name (without mutating the original array)
  const sortedCountries = useMemo(
    () => [...countries].sort((a, b) => a.name.localeCompare(b.name)),
    [countries]
  );

  return (
    <Select
      size="lg"
      label="Nacionalidad"
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
      {sortedCountries.map(({ name: countryName, flags }) => (
        <Option
          key={countryName}
          value={countryName}
          className="flex items-center gap-2"
        >
          <img
            src={flags.svg}
            alt={name}
            className="h-5 w-5 rounded-full object-cover"
          />
          {countryName}
        </Option>
      ))}
    </Select>
  );
}

export default CountriesSelect;
