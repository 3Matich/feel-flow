import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Avatar,
    Select,
    Option,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Textarea,
} from "@material-tailwind/react";
import { platformSettingsData, conversationsData, projectsData, profileData } from "@/data";
import { CountriesSelect, InputPhoneFloatingLabel } from "@/components/Forms";

const COUNTRIES = ["Argentina (+54)", "France (+33)", "Germany (+49)", "Spain (+34)", "USA (+1)"];
const CODES = ["+54", "+33", "+49", "+34", "+1"];
const NATIONALITIES = ["Argentina", "Uruguay", "Chile", "Paraguay", "Brasil", "Peru", "Bolivia", "Ecuador", "Colombia", "Venezuela", "Mexico", "España"];

export function EditProfileDialog(data, desc) {
    const [country, setCountry] = React.useState(0);
    const [editProfile, setEditProfile] = React.useState(true);

    const [formData, setFormData] = React.useState(data.data);
    const [description, setDescription] = React.useState(data.desc);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log("Perfil actualizado:", formData);
        handler();
    };

    const handler = () => setEditProfile((cur) => !cur);

    console.log(data.data);
    return (
        <>
            <Dialog open={editProfile} handler={handler} className="text-light-text-secondary dark:text-dark-text-secondary bg-light-card dark:bg-dark-card">
                <DialogHeader>
                    <div>
                        <Typography variant="h5" className="mb-1 text-light-text dark:text-dark-text">
                            {formData.name} {formData.surname}
                        </Typography>
                        <Typography variant="small" className="font-normal text-light-text-secondary dark:text-dark-text-secondary">
                            {formData.job[0]} / {formData.job[1]}
                        </Typography>
                    </div>
                </DialogHeader>
                <DialogBody>
                    <div className="flex flex-col gap-4">
                        {/* Descripcion */}
                        <Textarea
                            rows={3}
                            resize={true}
                            size="auto"
                            variant="standard"
                            label="Sobre ti"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="text-light-text-secondary dark:text-dark-text-secondary"
                        />
                        <hr className="my-8 border-blue-gray-500 dark:border-white"/>

                        {/* Nombre y Apellido */}
                        <div className="grid grid-cols-5 gap-3 items-center">
                            <Typography variant="h6" className="w-2 text-light-text dark:text-dark-text">
                                Nombre
                            </Typography>
                            <div className="col-span-2">

                                <Input
                                    label="Apellido"
                                    name="surname"
                                    type="text"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    className="text-light-text-secondary dark:text-dark-text-secondary"
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    label="Nombre"
                                    name="name"
                                    type="text"
                                    className="w-20 text-light-text-secondary dark:text-dark-text-secondary"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <hr />

                        {/* Telefono */}
                        <div className="grid grid-cols-5 gap-3 items-center">
                            <Typography variant="h6" className="w-32 text-light-text dark:text-dark-text">
                                Contacto
                            </Typography>
                            <div className="col-span-4">
                                <InputPhoneFloatingLabel
                                    content={formData.telephone}
                                    name="telephone"
                                    onChange={handleChange}
                                    className="text-light-text-secondary dark:text-dark-text-secondary"
                                />
                            </div>
                        </div>
                        <hr />

                        {/* Correo Electrónico */}
                        <div className="grid grid-cols-5 gap-3 items-center">
                            <Typography variant="h6" className="w-32 text-light-text dark:text-dark-text">
                                Email
                            </Typography>
                            <div className="col-span-4">
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    className="w-full text-light-text-secondary dark:text-dark-text-secondary"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                        </div>
                        <hr />

                        {/* Nacionalidad */}
                        <div className="grid grid-cols-5 gap-3 items-center">
                            <Typography variant="h6" className="w-32 text-light-text dark:text-dark-text">
                                Pais de Residencia
                            </Typography>
                            <div className="col-span-4">
                                <CountriesSelect
                                    userCountry={formData.location}
                                    name="location"
                                    onChange={handleChange}
                                    className="text-light-text-secondary dark:text-dark-text-secondary"
                                />
                            </div>
                        </div>
                        <hr className="my-8 border-blue-gray-500 dark:border-white" />


                    </div>
                </DialogBody>
                <DialogFooter className="gap-4">
                    <Button variant="text" className="text-alert-light dark:text-alert-light" onClick={handler}>
                        Cancelar
                    </Button>
                    <Button className="text-success-light dark:text-success-light bg-light-button-success dark:bg-dark-button-success" onClick={handleSubmit}>
                        Guardar Cambios
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* <Dialog
                size="m"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-xl">
                    <CardBody className="flex flex-col gap-4">
                        <div>
                            <Typography variant="h5" color="blue-gray" className="mb-1">
                                {formData.name} {formData.surname}
                            </Typography>
                            <Typography variant="small" className="font-normal text-blue-gray-600">
                                {formData.job[0]} / {formData.job[1]}
                            </Typography>
                        </div>
                        <hr />

                        <div className="grid grid-cols-3 gap-3 items-center">
                            <Typography className="w-32" variant="h6">
                                Nombre
                            </Typography>
                            <Input label="Apellido" size="lg" value={formData.surname} className="w-full" />
                            <Input label="Nombre" size="lg" value={formData.name} className="w-full" />
                        </div>

                        <hr />

                        <div className="grid grid-cols-2 gap-3 items-center">
                            <Typography className="w-32" variant="h6">
                                Teléfono
                            </Typography>
                            <div className="relative flex w-full">
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
                                            <MenuItem key={country} value={country} onClick={() => setCountryIndex(index)}>
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
                                    value={formData.telephone || ""}
                                    className="appearance-none rounded-l-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    containerProps={{ className: "min-w-0 w-full" }}
                                />
                            </div>
                        </div>

                        <hr />

                        <div className="grid grid-cols-2 gap-3 items-center">
                            <Typography className="w-32" variant="h6">
                                Email
                            </Typography>
                            <Input label="Correo" size="lg" value={formData.email} className="w-full" />
                        </div>

                        <hr />

                        <div className="grid grid-cols-2 gap-3 items-center">
                            <Typography className="w-32" variant="h6">
                                Ubicación
                            </Typography>
                            <Select className="w-full">
                                {NATIONALITIES.map((nation) => (
                                    <Option key={nation} value={nation}>
                                        {nation}
                                    </Option>
                                ))}
                            </Select>
                        </div>

                        <hr />

                        <Typography variant="h6">Contraseña</Typography>
                        <Input label="Password" size="lg" />

                        <div className="-ml-2.5 -mt-3">
                            <Checkbox label="Recordarme" />
                        </div>
                    </CardBody>

                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleOpen} fullWidth>
                            Guardar Cambios
                        </Button>
                        <Typography variant="small" className="mt-4 flex justify-center">
                            ¿No tienes una cuenta?
                            <Typography
                                as="a"
                                href="#signup"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                                onClick={handleOpen}
                            >
                                Regístrate
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog> */}
        </>
    );
}

export default EditProfileDialog;
