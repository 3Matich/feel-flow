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
} from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData, profileData } from "@/data";
import EditableProfileInfo from "@/widgets/cards/profile-info";

export function ProfileNew() {
    const [selectedTab, setSelectedTab] = React.useState('app');
    const [open, setOpen] = React.useState(false);
    const [selectedAvatar, setSelectedAvatar] = React.useState("0000.png");
    const handleOpen = () => setOpen(!open)


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

            <Card className="mx-3 mt-8 mb-6 lg:mx-4 border border-blue-gray-100">
                <CardBody className="p-4">
                    <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                        <div className="flex items-center gap-6">
                            <Avatar
                                src={`/img/avatar/${selectedAvatar}`}
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
                                <DialogFooter>
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
                        <div className="w-96">
                            <Tabs>
                                <TabsHeader>
                                    {data.map(({ label, value, icon }) => (
                                        <Tab key={value} value={value}>
                                            <div className="flex items-center gap-2">
                                                {React.createElement(icon, { className: "w-5 h-5" })}
                                                {label}
                                            </div>
                                        </Tab>
                                    ))}
                                </TabsHeader>
                                {/* 
                                <TabsBody>
                                    {data.map(({ value, element }) => (
                                        <TabPanel key={value} value={value}>
                                            {element}
                                        </TabPanel>
                                    ))}
                                </TabsBody>
                                 */}
                            </Tabs>
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
                                <ProfileInfoCard
                                    title="Profile Information"
                                    description={description}
                                    details={{
                                        nombre: name + " " + surname,
                                        telefono: mobile,
                                        email: username,
                                        ubicacion: location,
                                    }}
                                    action={
                                        <Tooltip content="Edit Profile">
                                            <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                                        </Tooltip>
                                    }
                                />
                            )
                        )}
                        
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Platform Settings
                            </Typography>
                            <div className="flex flex-col gap-12">
                                {platformSettingsData.map(({ title, options }) => (
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
                                                    labelProps={{
                                                        className: "text-sm font-normal text-blue-gray-500",
                                                    }}
                                                />
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
