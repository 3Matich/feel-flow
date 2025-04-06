import React from "react";
import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Switch,
    Tooltip,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard, ProfileEditCard } from "@/widgets/cards";
import { EditProfileDialog } from "@/widgets/dialogs";
import { platformSettingsData, conversationsData, projectsData, profileData } from "@/data";
import EditableProfileInfo from "@/widgets/cards/profile-info";
import { useDragAndDrop } from "@/hooks";

export function ProfileNew() {
    const [selectedTab, setSelectedTab] = React.useState('app');
    const [open, setOpen] = React.useState(false);
    const [selectedAvatar, setSelectedAvatar] = React.useState("0000.png");
    const { handleDragOver, handleDrop, handleImageChange, handleRemoveImage, logoPreview } = useDragAndDrop();
    const [isEditing, setIsEditing] = React.useState(false);
    const [settings, setSettings] = React.useState(platformSettingsData);

    const handleOpen = () => setOpen(!open)
    const handleSwitchChange = (changeKey) => {
        setSettings((prev) =>
            prev.map((category) => ({
                ...category,
                options: category.options.map((option) =>
                    option.change === changeKey
                        ? { ...option, checked: !option.checked }
                        : option
                ),
            }))
        );
    };

    const data = [
        {
            label: "App",
            value: "app",
            icon: HomeIcon,
            element: "Hola",
        },
        {
            label: "Message",
            value: "message",
            icon: ChatBubbleLeftEllipsisIcon,
            element: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
            label: "Settings",
            value: "settings",
            icon: Cog6ToothIcon,
            element: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
        },
    ];

    const avatars = [
        '0000.png',
        '0001.png',
        '0002.png',
        '0003.png',
        '0004.png',
        '0005.png',
        '0006.png',
        '0007.png',
    ];


    return (
        <>
            <Card className="mx-3 mt-8 mb-6 card lg:mx-4 border">
                <CardBody className="p-4">
                    <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                        <div className="flex items-center gap-6">
                            <Avatar
                                src={logoPreview || `/img/avatar/${selectedAvatar}`}
                                alt="avatar"
                                size="xl"
                                variant="rounded"
                                className="rounded-full shadow-lg"
                                onClick={() => setOpen(true)}
                            />

                            <Dialog
                                open={open}
                                handler={handleOpen}
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0.9, y: -100 },
                                }}
                                className="card"
                            >
                                <DialogHeader className="text-light-text dark:text-dark-text">Seleccione un avatar de usuario</DialogHeader>
                                <hr className="my-8 border-blue-gray-500 dark:border-white" />
                                <DialogBody>
                                    <div className="flex flex-wrap justify-center">
                                        {avatars.map((avatar, index) => (
                                            <div
                                                key={index}
                                                onClick={() => (setSelectedAvatar(avatar), handleOpen())}
                                                className="m-2 cursor-pointer"
                                            >
                                                <Avatar
                                                    src={`/img/avatar/${avatar}`}
                                                    alt={`Avatar ${index + 1}`}
                                                    className="w-20 h-20"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </DialogBody>
                                <hr className="my-8 border-blue-gray-500 dark:border-white" />
                                <DialogHeader className="text-light-text dark:text-dark-text">O bien, suba una foto</DialogHeader>
                                <DialogBody>
                                    <div className="flex flex-warp justify-center">
                                        <div
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            className="relative flex items-center justify-center border-2 border-dashed p-4 rounded-md w-72 h-40 mx-auto"
                                        >
                                            {logoPreview ? (
                                                <div className="relative w-32 h-32 mx-auto">
                                                    <img src={logoPreview} alt="Logo preview" className="object-cover w-full h-full rounded-md" />
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRemoveImage();
                                                        }}
                                                        className="absolute -top-2 -right-0 text-gray-700 hover:text-black bg-gray p-1 text-lg font-bold transition-opacity opacity-70 hover:opacity-100 z-10"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <label
                                                    htmlFor="logo-input"
                                                    className="cursor-pointer text-center text-gray-500 hover:text-blue-500 transition"
                                                >
                                                    Arrastra y suelta un logo aquí, o haz clic para seleccionar
                                                </label>
                                            )}
                                            <input
                                                id="logo-input"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>
                                </DialogBody>
                                <DialogFooter className="gap-4">
                                    <Button
                                        variant="text"
                                        onClick={handleOpen}
                                        className="text-alert-light dark:text-alert-light"
                                    >
                                        <span>Cancelar</span>
                                    </Button>
                                    <Button
                                        onClick={handleOpen}
                                        className="text-success-light dark:text-success-light bg-light-button-success dark:bg-dark-button-success"
                                    >
                                        <span>Guardar Cambios</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                            {profileData.map(
                                ({ name, surname, job }) => (
                                    <div>
                                        <Typography variant="h5" className="mb-1 text-light-text dark:text-dark-text">
                                            {name} {surname}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            className="font-normal text-light-text-secondary dark:text-dark-text-secondary"
                                        >
                                            {job[0]} / {job[1]}
                                        </Typography>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">
                        {/*
                        {profileData.map(
                            ({ name, surname, username, description, mobile, location }) => (
                                <EditableProfileInfo
                                    key={username}
                                    name={name}
                                    surname={surname}
                                    username={username}
                                    description={description}
                                    mobile={mobile}
                                    location={location}
                                />
                            )
                        )}
                        */}
                        {profileData.map(
                            ({ name, surname, username, description, mobile, location, job }) => (
                                <>
                                    {isEditing && (
                                        <EditProfileDialog
                                            data={{
                                                name: name,
                                                surname: surname,
                                                telephone: mobile,
                                                email: username,
                                                location: location,
                                                job: job
                                            }}
                                            desc={description}
                                        />
                                    )}
                                    <ProfileInfoCard
                                        title="Información de perfil"
                                        description={description}
                                        isEditing={isEditing}
                                        setIsEditing={setIsEditing}
                                        details={{
                                            nombre: name + " " + surname,
                                            telefono: mobile,
                                            email: username,
                                            ubicacion: location,
                                        }}
                                        action={
                                            <Tooltip content="Edit Profile">
                                                <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" onClick={() => setIsEditing(!isEditing)} />
                                            </Tooltip>
                                        }
                                    />
                                </>
                            )
                        )}

                        <div>
                            <Typography variant="h6" className="mb-3 text-light-text dark:text-dark-text">
                                Configuraciones
                            </Typography>
                            <div className="flex flex-col gap-12">
                                {/* {platformSettingsData.map(({ title, options }) => (
                                    <div key={title}>
                                        <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                                            {title}
                                        </Typography>
                                        <div className="flex flex-col gap-6">
                                            {options.map(({ checked, label }) => (
                                                <Switch
                                                    key={label}
                                                    id={label}
                                                    label={label}
                                                    defaultChecked={checked}
                                                    onChange={change}
                                                    labelProps={{
                                                        className: "text-sm font-normal text-blue-gray-500",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))} */}
                                {settings.map((category) => (
                                    <div key={category.title} className="mb-6">
                                        {/* <h2 className="text-xl font-semibold">{category.title}</h2> */}
                                        <div className="mt-4 space-y-3">
                                            {category.options.map((option) => (
                                                <div key={option.label} className="flex items-center justify-between">
                                                    <span>{option.label}</span>
                                                    <Switch
                                                        checked={option.checked}
                                                        onChange={() => handleSwitchChange(option.change)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default ProfileNew;
