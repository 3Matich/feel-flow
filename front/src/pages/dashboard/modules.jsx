import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {
    Square3Stack3DIcon,
    UserCircleIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { 
    TwelveSteps,
    NikoNiko,
    Kudos,
    Dashboard,
} from "@/widgets/modules";
import { element } from "prop-types";

export function Modules() {
    const data = [
        {
            label: "Dashboard",
            value: "dashboard",
            icon: Square3Stack3DIcon,
            element: <Dashboard />,
        },
        {
            label: "12 Pasos de la Felicidad",
            value: "twelveSteps",
            icon: Square3Stack3DIcon,
            element: <TwelveSteps />,
        },
        {
            label: "Niko Niko",
            value: "nikoNiko",
            icon: UserCircleIcon,
            element: <NikoNiko />,
        },
        {
            label: "Kudos",
            value: "kudos",
            icon: Cog6ToothIcon,
            element: <Kudos />,
        },
    ];
    return (
        <Tabs
            value="dashboard"
            className=""
            indicatorProps={{
                className: "bg-pink-500 shadow-none rounded-full",
            }}
        >
            <TabsHeader className="bg-pink-100 rounded-full" indicatorProps={{className:"bg-pink-400 rounded-full"}}>
                {data.map(({ label, value, icon }) => (
                    <Tab key={value} value={value}>
                        <div className="flex items-center gap-2 text-black">
                            {React.createElement(icon, { className: "w-5 h-5" })}
                            {label}
                        </div>
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody className="mt-5">
                {data.map(({ value, element }) => (
                    <TabPanel key={value} value={value}>
                        {element}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}