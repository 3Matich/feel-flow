import { useState } from "react";
import { NikoNiko } from "../modules"
import { NikoNikoTable, FeelFlowSpinner, TeamSelector } from "@/components";
import { GetNikoNikoSummary } from "@/api";

export const SummaryNikoNiko = ({ isActive, Teams }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nikoDataByMember, setNikoDataByMember] = useState({});
    const [fetchData, setFetchData] = useState(false);

    // Selector
    const [selectedTeam, setSelectedTeam] = useState();       // objeto { label, value } o null
    const [selectedMonth, setSelectedMonth] = useState(null);     // número 1–12 o null
    const months = [
        "Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre",
    ];

    const fetchNiko = async () => {
        setLoading(true);
        try {
            const data = await GetNikoNikoSummary(
                selectedTeam.value,
                selectedMonth
            );
            const grouped = data.reduce((acc, item) => {
                const name = `${item.name} ${item.surname}`.trim();
                if (!acc[name]) acc[name] = [];
                acc[name].push(item);
                return acc;
            }, {});
            setNikoDataByMember(grouped);
            setError(null);
        } catch (err) {
            console.error("Error NikoNiko:", err);
            setError("No se pudieron cargar los datos de Niko Niko.");
        } finally {
            setLoading(false);
        }
    }

    if (isActive == "nikoNiko" && !fetchData && selectedTeam != null) {
        setFetchData(true);
        fetchNiko();
    } 

    const ChangeTeam = (e) => {
        console.log(e)
        setSelectedTeam(e);
        setLoading(true);
        fetchNiko();
    } 

    const ChangeMonth = (e) => {
        setSelectedMonth(e);
        setLoading(true);
        fetchNiko();
    }

    return (
        <div className="mt-4">
            {/* Selector global de equipo + mes */}
            <div className="mb-8 flex justify-center">
                <TeamSelector
                    teams={Teams}
                    selectedTeam={selectedTeam}
                    setSelectedTeam={ChangeTeam}
                    months={months}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={ChangeMonth}
                />
            </div>

            {loading && selectedTeam == null && <p className="text-center">Seleccione un equipo</p>}
            {loading && selectedTeam != null && <FeelFlowSpinner />}
            {error && <p className="text-center">{error}</p>}
            {!loading && <NikoNikoTable nikoDataByMember={nikoDataByMember} />}
        </div>
    )
}

export default NikoNiko;