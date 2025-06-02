import { useState, useEffect, useRef } from "react";

import KudosChart from "@/components/KudosChart";
import { FeelFlowSpinner } from "@/components";

import { 
    GetModulesAndUsers,
    GetKudosSummary,
} from "@/api";

export const KudosSummary = ({ isActive, Teams }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fetchData, setFetchData] = useState(false);

    const [kudosModulesData, setKudosModulesData] = useState([]);
    const [selectedKudosModule, setSelectedKudosModule] = useState();
    const [kudosMemberOptions, setKudosMemberOptions] = useState([]);
    const [selectedKudosMember, setSelectedKudosMember] = useState("");
    const [kudosSummary, setKudosSummary] = useState([]);

    const hasFetched = useRef(false);

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

    // Ejecuta solo una vez cuando el componente está activo
    useEffect(() => {
        if (isActive === "kudos" && !hasFetched.current) {
            hasFetched.current = true;
            setFetchData(true);
            fetchKudosModules();
        }
    }, [isActive]);

    // Ejecuta fetchKudos cada vez que cambian los filtros
    useEffect(() => {
        if (selectedKudosModule) {
            fetchKudos(selectedKudosModule, selectedKudosMember);
        }
    }, [selectedKudosModule, selectedKudosMember]);

    const changeMember = (e) => {
        setSelectedKudosMember(e);
    }

    const changeModule = (e) => {
        setSelectedKudosModule(e);
    }

    return (
        <div>
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