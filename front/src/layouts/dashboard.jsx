import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

import { Outlet } from "react-router-dom";
import { SessionExpiredDialog } from "@/widgets/dialogs";
import { NotFoundPage } from "@/pages/dashboard";
import { getUserData } from "@/api";

export function Dashboard({ onLogout }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [sessionExpired, setSessionExpired] = useState(false); // Maneja cuando expira la sesion
  const { authority } = getUserData();
  const handleSessionDialog = () => setSessionExpired(!sessionExpired);

  console.log(authority)
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo.png" : "/img/logo.png"
        }
        onLogout={onLogout}
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        {/* 
        <IconButton
          size="lg"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10 bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> 
        */}
        <main>
          <Routes>
            {routes.map(
              ({ layout, subpages }) =>
                layout === "dashboard" &&
                subpages
                  .filter(({ pageAuthority }) => pageAuthority.includes(authority.toString()))
                  .map(({ path, element }) => (
                    <Route path={path} element={element} />
                  ))
            )}
            {routes.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages
                  .filter(({ pageAuthority }) => pageAuthority.includes(authority.toString()))
                  .map(({ path, element }) => (
                    <Route exact path={path} element={element} />
                  ))
            )}

            {/* <Route path = "/dashboard/equipos/*" element = {< NotFoundPage />} /> */}
          </Routes>
          <Outlet context={{ setSessionExpired }} />

        </main>
        <SessionExpiredDialog open={sessionExpired} handleOpen={handleSessionDialog} onLogout={onLogout} />
        {/* <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
