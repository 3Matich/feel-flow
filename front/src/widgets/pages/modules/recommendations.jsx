import React from "react";

import { CreateRecommendations, GetRecommendations } from "@/api";

export const Recommendations = () => {
    const [recommendations, setRecommendations] = React.useState([]);
    const [filteredRecommendations, setFilteredRecommendations] = React.useState([]);
    const [filterText, setFilterText] = React.useState("");

    const handleGenerateRecommendations = async () => {
        const response = await CreateRecommendations();
        if (response === 200) {
            const data = await GetRecommendations();
            console.log(data);
            setRecommendations(data);
            setFilteredRecommendations(data); // reinicia el filtro
        } else {
            setRecommendations([]);
        }
    };

    React.useEffect(() => {
        const filtered = recommendations.filter((rec) => {
            const text = filterText.toLowerCase();
            return (
                rec.title.toLowerCase().includes(text) ||
                rec.body.toLowerCase().includes(text) ||
                rec.suggestions.some((sug) => sug.toLowerCase().includes(text))
            );
        });
        setFilteredRecommendations(filtered);
    }, [filterText, recommendations]);


    React.useEffect(() => {
        const fetchData = async () => {
            const data = await GetRecommendations();
            setRecommendations(data);
            setFilteredRecommendations(data);
        };

        fetchData();
    }, []);



    return (
        <div className="p-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Recomendaciones para el Equipo</h1>
                <p>Genera las recomendaciones para tu equipo y habla con ellos.</p>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={handleGenerateRecommendations}
                    className="button-custom px-4 py-2 rounded hover:bg-blue-700"
                >
                    Obtener recomendaciones
                </button>

                <input
                    type="text"
                    placeholder="Filtrar por palabra clave..."
                    className="border px-3 py-2 rounded w-full dark:bg-blue-gray-700"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </div>

            {filteredRecommendations.length === 0 ? (
                <p className="text-center">¡¡Felicidades!!, tu equipo es demasiado feliz, no tenemos recomendaciones para hacer. 🎉🎉</p>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredRecommendations.map((rec, index) => (
                        <div
                            key={index}
                            className="border p-4 rounded shadow-md card flex flex-col justify-between"
                        >
                            <div className="text-sm mb-1">
                                🕒 {new Date(rec.createdAt).toLocaleString()}
                            </div>
                            <h2 className="text-lg font-semibold">{rec.title}</h2>
                            <p className="mt-1 text-gray-700">{rec.body}</p>
                            <ul className="mt-3 list-disc list-inside text-sm">
                                {rec.suggestions.map((sug, i) => (
                                    <li key={i}>💡 {sug}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}