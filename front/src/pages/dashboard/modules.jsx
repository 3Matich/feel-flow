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
import { TwelveSteps } from "@/widgets/modules/twelve-steps";

export function Modules() {
    const data = [
        {
            label: "12 Pasos de la Felicidad",
            value: "dashboard",
            icon: Square3Stack3DIcon,
            element: <TwelveSteps />,
        },
        {
            label: "Niko Niko",
            value: "profile",
            icon: UserCircleIcon,
            element: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
            label: "Kudos",
            value: "settings",
            icon: Cog6ToothIcon,
            element: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
        },
    ];
    return (
        <Tabs value="dashboard">
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
            <TabsBody>
                {data.map(({ value, element }) => (
                    <TabPanel key={value} value={value}>
                        {element}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}