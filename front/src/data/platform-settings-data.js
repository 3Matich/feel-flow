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
  }
];

export default platformSettingsData;
