import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Input,
    Typography,
    Select,
    Option,
    Textarea,
    IconButton,
} from "@material-tailwind/react";

const COUNTRIES = ["Argentina (+54)", "France (+33)", "Germany (+49)", "Spain (+34)", "USA (+1)"];
const CODES = ["+54", "+33", "+49", "+34", "+1"];
const NATIONALITIES = ["Argentina", "Uruguay", "Chile", "Paraguay", "Brasil", "Peru", "Bolivia", "Ecuador", "Colombia", "Venezuela", "Mexico", "España"];

export function ProfileEditCard({ title, description, details, action, isEditing, setIsEditing }) {
    const [countryIndex, setCountryIndex] = React.useState(0);
    const [newDescription, setNewDescription] = React.useState(description);
    const [formData, setFormData] = React.useState(details);


    const handleChange = (e, clave) => {
        setFormData({ ...formData, [clave]: e.target.value });
    };

    return (
        <Card color="transparent" shadow={false}>
            <CardHeader
                color="transparent"
                shadow={false}
                floated={false}
                className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4 rounded-none"
            >
                <Typography variant="h6" color="blue-gray">
                    {title}
                </Typography>
            </CardHeader>
            <CardBody className="p-0">
                <Textarea
                    rows={3}
                    resize={true}
                    size="auto"
                    variant="standard"
                    label="Sobre ti"
                    // placeholder={newDescription}
                    value={newDescription}
                    contentEditable={true}
                    onChange={(val) => setNewDescription(val)}
                />
                <hr className="my-8 border-blue-gray-50" />
                {details && (
                    <ul className="flex flex-col gap-4 p-0">
                        {Object.keys(details).map((el, key) => (
                            <li key={key} className="flex items-center gap-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold capitalize"
                                >
                                    {el}:
                                </Typography>

                                {/* 🔽 Aquí va el switch para manejar cada input según la clave */}
                                {(() => {
                                    switch (el) {
                                        case "telefono":
                                            return (
                                                <div className="relative flex w-80">
                                                    <Menu placement="bottom-start">
                                                        <MenuHandler>
                                                            <Button
                                                                ripple={false}
                                                                variant="text"
                                                                color="blue-gray"
                                                                className="h-10 w-14 shrink-0 rounded-r-none border border-r-0 border-blue-gray-200 bg-transparent px-3"
                                                            >
                                                                {CODES[countryIndex]}
                                                            </Button>
                                                        </MenuHandler>
                                                        <MenuList className="max-h-[20rem] max-w-[18rem]">
                                                            {COUNTRIES.map((country, index) => (
                                                                <MenuItem
                                                                    key={country}
                                                                    value={country}
                                                                    onClick={() => setCountryIndex(index)}
                                                                >
                                                                    {country}
                                                                </MenuItem>
                                                            ))}
                                                        </MenuList>
                                                    </Menu>
                                                    <Input
                                                        type="tel"
                                                        pattern="[0-9]*"
                                                        inputMode="numeric"
                                                        maxLength={12}
                                                        value={formData[el] || ""}
                                                        onChange={(e) => handleChange(e, el)}
                                                        className="appearance-none rounded-l-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                        containerProps={{ className: "min-w-0" }}
                                                    />
                                                </div>
                                            );

                                        case "nombre":
                                            return (
                                                <div className="w-80">
                                                    <Input
                                                        type="text"
                                                        placeholder="Ingresa tu nombre"
                                                        value={formData[el] || ""}
                                                        onChange={(e) => handleChange(e, el)}
                                                        className="w-xl text-blue-gray-500"
                                                    />
                                                </div>
                                            );

                                        case "email":
                                            return (
                                                <div className="w-80">
                                                    <Input
                                                        type="email"
                                                        placeholder="Correo electrónico"
                                                        value={formData[el] || ""}
                                                        onChange={(e) => handleChange(e, el)}
                                                        className="w-full text-blue-gray-500"
                                                        disabled
                                                    />
                                                </div>
                                            );

                                        case "ubicacion":
                                            return (
                                                <div className="w-80">
                                                    <Select
                                                        value={formData[el] || ""}
                                                        onChange={(val) =>
                                                            setFormData({ ...formData, [el]: val })
                                                        }
                                                    >
                                                        {NATIONALITIES.map(
                                                            (nation) => (
                                                                <Option key={nation} value={nation}>
                                                                    {nation}
                                                                </Option>
                                                            )
                                                        )}
                                                    </Select>
                                                </div>
                                            );

                                        default:
                                            return (
                                                <Input
                                                    type="text"
                                                    value={formData[el] || ""}
                                                    onChange={(e) => handleChange(e, el)}
                                                    className="w-full text-blue-gray-500"
                                                />
                                            );
                                    }
                                })()}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="mt-4 flex gap-4">
                    <Button color="green" size="sm" onClick={() => setIsEditing(!isEditing)}>
                        Guardar
                    </Button>
                    <Button color="red" size="sm" onClick={() => setIsEditing(!isEditing)}>
                        Cancelar
                    </Button>
                </div>

            </CardBody>

        </Card>
    );
}

ProfileEditCard.defaultProps = {
    action: null,
    description: null,
    details: {},
};

ProfileEditCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.node,
    details: PropTypes.object,
};

ProfileEditCard.displayName = "/src/widgets/cards/profile-info-card.jsx";
export default ProfileEditCard;