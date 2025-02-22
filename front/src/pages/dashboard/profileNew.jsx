import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Switch,
    Tooltip,
    Button,
    Modal,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
} from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
    CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard, ProfileEditCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData, profileData } from "@/data";
import EditableProfileInfo from "@/widgets/cards/profile-info";
import { useDragAndDrop } from "@/hooks";

export function ProfileNew() {
    const [selectedTab, setSelectedTab] = React.useState('app');
    const [open, setOpen] = React.useState(false);
    const [selectedAvatar, setSelectedAvatar] = React.useState("0000.png");
    const { handleDragOver, handleDrop, handleImageChange, handleRemoveImage, logoPreview } = useDragAndDrop();
    const [isEditing, setIsEditing] = React.useState(false);


    const handleOpen = () => setOpen(!open)

    const [darkMode, setDarkMode] = React.useState(
        localStorage.getItem("theme") === "dark"
    );
    const [settings, setSettings] = React.useState(platformSettingsData);

    // Aplicar tema oscuro en el `html`
    React.useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const handleSwitchChange = (changeKey) => {
        if (changeKey === "darkMode") {
            setDarkMode(!darkMode);
        } else {
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
        }
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

            <Card className="mx-3 mt-8 mb-6 bg-light-bg dark:bg-feel-1 lg:mx-4 border border-blue-gray-100">
                <CardBody className="p-4">
                    <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                        <div className="flex items-center gap-6">
                            <Avatar
                                src={logoPreview || `/img/avatar/${selectedAvatar}`}
                                alt="avatar"
                                size="xl"
                                variant="rounded"
                                className="rounded-full shadow-lg shadow-blue-gray-500/40"
                                onClick={() => setOpen(true)}
                            />

                            <Dialog
                                open={open}
                                handler={handleOpen}
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0.9, y: -100 },
                                }}
                            >
                                <DialogHeader>Seleccione un avatar de usuario</DialogHeader>
                                <hr />
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
                                <hr />
                                <DialogHeader>O bien, suba una foto</DialogHeader>
                                <DialogBody>
                                    <div className="flex flex-warp justify-center">
                                        <div
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            className="relative flex items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-md w-72 h-40 mx-auto"
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
                                <DialogFooter>
                                    <Button
                                        variant="text"
                                        color="green"
                                        onClick={handleOpen}
                                        className="mr-1"
                                    >
                                        <span>Save</span>
                                    </Button>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={handleOpen}
                                        className="mr-1"
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                            {profileData.map(
                                ({ name, surname, job }) => (
                                    <div>
                                        <Typography variant="h5" color="blue-gray" className="mb-1">
                                            {name} {surname}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            className="font-normal text-blue-gray-600"
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
                            ({ name, surname, username, description, mobile, location }) => (
                                <>
                                    {isEditing ? (

                                        <ProfileEditCard
                                            title="Profile Information"
                                            description={description}
                                            isEditing={isEditing}
                                            setIsEditing={setIsEditing}
                                            details={{
                                                nombre: name + " " + surname,
                                                telefono: mobile,
                                                email: username,
                                                ubicacion: location,
                                            }}
                                            
                                            // action={
                                            //     <Tooltip content="Save Profile">
                                            //         <IconButton className="color-transparent" onClick={() => setIsEditing(!isEditing)}>
                                            //             <i className="fa fa-floppy-o" />
                                            //             {/* <CheckBadgeIcon className="h-4 w-4 cursor-pointer text-blue-gray-500"  /> */}

                                            //         </IconButton>
                                            //     </Tooltip>
                                            // }
                                        />
                                    ) : (
                                        <ProfileInfoCard
                                            title="Profile Information"
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

                                    )}
                                </>
                            )
                        )}

                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Platform Settings
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
                                        <h2 className="text-xl font-semibold">{category.title}</h2>
                                        <div className="mt-4 space-y-3">
                                            {category.options.map((option) => (
                                                <div key={option.label} className="flex items-center justify-between">
                                                    <span>{option.label}</span>
                                                    <Switch
                                                        checked={option.change === "darkMode" ? darkMode : option.checked}
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
