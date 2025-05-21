import { useState } from "react";

import KudosChart from "@/components/KudosChart";
import { FeelFlowSpinner } from "@/components";

import { GetModulesAndUsers } from "@/api";
import { GetKudosSummary } from "@/api/modules/GetKudosSummary";

export const KudosSummary = ({ isActive, Teams }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fetchData, setFetchData] = useState(false);

    const [kudosModulesData, setKudosModulesData] = useState([]);
    const [selectedKudosModule, setSelectedKudosModule] = useState();
    const [kudosMemberOptions, setKudosMemberOptions] = useState([]);
    const [selectedKudosMember, setSelectedKudosMember] = useState("");
    const [kudosSummary, setKudosSummary] = useState([]);

    let firstModule = 0;
    const fetchKudosModules = async () => {
        setLoading(true);
        try {
            const data = await GetModulesAndUsers("KUDOS");
            setKudosModulesData(data);
            if (data.length > 0) {
                firstModule = data[0].moduleDto.id
                setSelectedKudosModule(firstModule); // asigno el primer modulo como asignado
                fetchKudos(firstModule, selectedKudosMember); // lo hago aca porque tarda en actualizar el estado

                // Mapeo los usuarios para el autocompletador
                const kudosMembers = data[0]?.usersDto?.map((user) => ({
                    label: `${user.name} ${user.surname}`,
                    value: user.uuid,
                })) || [];

                setKudosMemberOptions(kudosMembers);


            }
            setError(null);
        } catch (err) {
            console.error("Error módulos Kudos:", err);
            setError("No se pudieron cargar los módulos de Kudos.");
        } finally {
            setLoading(false);
        }
    };

    const fetchKudos = async (moduleId, memberId) => {
        setLoading(true);
        try {
            const summary = await GetKudosSummary(moduleId, memberId);
            setKudosSummary(summary);
            setError(null);
        } catch (err) {
            console.error("Error resumen Kudos:", err);
            setError("No se pudieron cargar los datos de Kudos.");
        } finally {
            setLoading(false);
        }
    };

    if (isActive == "kudos" && !fetchData) {
        setFetchData(true);
        fetchKudosModules();
    }

    const changeMember = (e) => {
        setSelectedKudosMember(e);
        fetchKudos(selectedKudosModule, selectedKudosMember)
    }

    const changeModule = (e) => {
        setSelectedKudosModule(e);
        fetchKudos(selectedKudosModule, selectedKudosMember)
    }

    return (
        <div className="mt-4">
            {loading && <FeelFlowSpinner />}
            {error && <p className="text-center">{error}</p>}
            {!loading && !error && (
                <KudosChart
                    // teamData={Teams}
                    modulesData={kudosModulesData}
                    kudosMemberOptions={kudosMemberOptions}
                    selectedKudosMember={selectedKudosMember}
                    setSelectedKudosMember={changeMember}
                    selectedKudosModule={selectedKudosModule}
                    setSelectedKudosModule={changeModule}
                    selectedData={kudosSummary}
                />
            )}
        </div>
    )
}