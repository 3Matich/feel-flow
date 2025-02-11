export const modulesTableData = [
    {
        img: "/img/logo-12steps.jpg",
        name: "12 Pasos de la felicidad",
        members: [ //Miembros que completaron el modulo o pendientes?
            { img: "/img/team-1.jpeg", name: "Romina Hadid" },
            { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
            { img: "/img/team-3.jpeg", name: "Jessica Doe" },
            { img: "/img/team-4.jpeg", name: "Alexander Smith" },
        ],
        status: true,
        completion: 60, //total encuestas respondidas / total de miembros | 0 en caso de inactivo
    },
    {
        img: "/img/logo-niko.png",
        name: "Niko Niko",
        members: [
            { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
            { img: "/img/team-4.jpeg", name: "Alexander Smith" },
        ],
        status: false, 
        completion: 0, // dias que pasaron / dias del spring | 0 en caso de inactivo
    },
    {
        img: "/img/logo-kudos.jpg",
        name: "Kudos",
        members: [
            { img: "/img/team-3.jpeg", name: "Jessica Doe" },
            { img: "/img/team-1.jpeg", name: "Romina Hadid" },
        ],
        status: false,
        completion: 0, // idem a niko niko?
    },
];

export default modulesTableData;
