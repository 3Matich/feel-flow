import { useState, useEffect, useRef } from "react";
import HappinessChart from "@/components/HappinessChart"
import { FeelFlowSpinner } from "@/components";

import { GetModulesAndUsers } from "@/api";
import { GetTwelveStepsSummary } from "@/services/GetTwelveStepsSummary";

export const TwelveStepsSummary = ({ isActive }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fetchData, setFetchData] = useState(false);

    const [modulesData, setModulesData] = useState([]);
    const [selectedModule, setSelectedModule] = useState("");
    const [memberOptions, setMemberOptions] = useState([]);
    const [selectedMember, setSelectedMember] = useState("");
    const [twelveStepsSummary, setTwelveStepsSummary] = useState(null);

    const hasFetched = useRef(false); // para evitar múltiples llamadas

    let firstModule = 0;
    const fetchTwelveModules = async () => {
        setLoading(true);
        try {
            const data = await GetModulesAndUsers("TWELVE_STEPS");
            setModulesData(data);

            if (data.length > 0) {
                firstModule = data[0].moduleDto.id
                setSelectedModule(firstModule); // asigno el primer modulo como asignado
                fetchTwelveSummary(firstModule, selectedMember); // lo hago aca porque tarda en actualizar el estado

                // Mapeo los usuarios para el autocompletador
                const Members = data[0]?.usersDto?.map((user) => ({
                    label: `${user.name} ${user.surname}`,
                    value: user.uuid,
                })) || [];

                setMemberOptions(Members);
            }
            setError(null);
        } catch (err) {
            console.error("Error módulos 12 pasos:", err);
            setError("No se pudieron cargar los módulos de 12 pasos.");
        } finally {
            setLoading(false);
        }
    };

    const fetchTwelveSummary = async (idModule, idMember) => {
        setLoading(true);
        try {
            const summary = await GetTwelveStepsSummary(idModule, idMember);
            setTwelveStepsSummary(summary);
            setError(null);
        } catch (err) {
            console.error("Error resumen 12 pasos:", err);
            setError("No se pudieron cargar los datos de 12 pasos.");
        } finally {
            setLoading(false);
        }
    };

    const selectMembers = () => {
        const mod = modulesData.find(m => m.moduleDto.id === selectedModule);
        console.log(modulesData)

        if (!mod) return [];

        return mod.usersDto.map(u => ({
            label: `${u.name} ${u.surname}`,
            value: u.uuid
        }));
    }

    // Ejecutar solo una vez cuando isActive === "felicidad"
    useEffect(() => {
        if (isActive === "felicidad" && !hasFetched.current) {
            hasFetched.current = true;
            fetchTwelveModules();
        }
    }, [isActive]);

    // Ejecutar resumen cuando cambie el módulo o el miembro
    useEffect(() => {
        if (selectedModule) {
            fetchTwelveSummary(selectedModule, selectedMember);
        }
    }, [selectedModule, selectedMember]);

    const selectedData = twelveStepsSummary || [];

    const ChangeMember = (e) => {
        setSelectedMember(e);
    }

    const ChangeModule = (e) => {
        setSelectedModule(e);
    }

    return (
        <div className="mt-4">
            {/* {loading && selectedTeam == null && <p className="text-center">Seleccione un equipo</p>} */}
            {loading && fetchData && <FeelFlowSpinner />}
            {error && <p className="text-center">{error}</p>}
            {!loading &&
                <HappinessChart
                    // teamData={twelveStepsSummary}
                    modulesData={modulesData}
                    memberOptions={memberOptions}
                    selectedMember={selectedMember}
                    setSelectedMember={ChangeMember}
                    selectedModule={selectedModule}
                    setSelectedModule={ChangeModule}
                    selectedData={selectedData}
                />
            }
        </div>
    )
}