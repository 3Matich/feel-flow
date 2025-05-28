import {
  HomeIcon,
  DocumentTextIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  UserPlusIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserCircleIcon,
  // Para las páginas de autogestión y bienestar se utilizan iconos diferentes:
  ClipboardDocumentIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

import { 
  Home, 
  Profile,
  Modules,
  Team,
  WellnessHub,
  OwnTracking,
  Teams,
  Resumenes,
  NotFoundPage,
  Member,
} from "@/pages/dashboard";

import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "General",
        path: "/general",
        element: <Home />,
      },
      /*
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Calendario",
        path: "/calendario",
        element: <Resumenes />,
      },
      */
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile2",
      //   path: "/profile2",
      //   element: <ProfileNew />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "modulos",
        path: "/modulos",
        element: <Modules />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Miembros",
        path: "/miembros",
        element: <Team />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Equipos",
        path: "/equipos",
        element: <Teams />,
      },
    ],
    subpages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "equipos/*",
        element: <Team />,
      },
      // SE DESCARTA LA OPCION DE VISUALIZAR PERFILES, CADA USER SOLO PUEDE VER SU PERFIL
      /*
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "miembros/*",
        element: <Member />,
      },
      */
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
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
    subpages: [],
  },
  {
    title: "Paginas Personales",
    layout: "dashboard",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Perfil",
        path: "/perfil",
        element: <Profile />,
      },
      /*
      {
        // Para Autogestión, se usa un icono que representa el control personal
        icon: <ClipboardDocumentIcon {...icon} />,
        name: "Autogestion",
        path: "/autogestion",
        element: <OwnTracking />,
      },
      {
        // Para Bienestar, se usa un icono de corazón que representa cuidado y bienestar
        icon: <HeartIcon {...icon} />,
        name: "Bienestar",
        path: "/WellnessHub",
        element: <WellnessHub />,
      }*/
    ],
    subpages: [],

  },
];

export default routes;
