export const platformSettingsData = [
  {
    title: "Cuenta",
    options: [
      {
        checked: true,
        change: "notifySurvey",
        label: "Notificar por correo cuando finalizan las encuestas",
      },
      {
        checked: false,
        change: "notifyModule",
        label: "Notificar por correo cuando se crea un modulo",
      },
      {
        checked: false,
        change: "darkMode",
        label: "Modo oscuro",
      },
    ],
  },
  {
    title: "Aplicacion",
    options: [
      {
        checked: false,
        change: "newReleases",
        label: "Nuevos lanzamientos y proyectos",
      },
      {
        checked: true,
        change: "monthlyUpdates",
        label: "Actualizaciones mensuales de productos",
      },
      {
        checked: false,
        change: "newsletter",
        label: "Suscríbete al boletín de FeelFlow",
      },
    ],
  },
];

export default platformSettingsData;
