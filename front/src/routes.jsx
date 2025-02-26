// src/routes.js
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  UserPlusIcon,
  DocumentTextIcon, // Nuevo ícono para "Resúmenes"
} from "@heroicons/react/24/solid";

import { 
  Home, 
  Profile, 
  Tables, 
  Notifications, 
  Modules,
  Team, 
  ProfileNew,
  Teams,
  Resumenes, // Importar la nueva página
} from "@/pages/dashboard";

import { SignIn, SignUp, SignInNew, SignUpNew } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "resumenes",
        path: "/resumenes",
        element: <Resumenes />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile2",
        path: "/profile2",
        element: <ProfileNew />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "modules",
        path: "/modules",
        element: <Modules />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "team",
        path: "/team",
        element: <Team />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "teams",
        path: "/teams",
        element: <Teams />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in new",
        path: "/sign-in-new",
        element: <SignInNew />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up new",
        path: "/sign-up-new",
        element: <SignUpNew />,
      },
    ],
  },
];

export default routes;
