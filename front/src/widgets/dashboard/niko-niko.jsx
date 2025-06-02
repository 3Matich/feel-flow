import { useState, useEffect } from "react";
import { NikoNiko } from "../modules"
import { NikoNikoTable, FeelFlowSpinner, TeamSelector } from "@/components";
import { GetNikoNikoSummary } from "@/api";

export const SummaryNikoNiko = ({ isActive, Teams }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nikoDataByMember, setNikoDataByMember] = useState({});
    const [fetchData, setFetchData] = useState(false);


    const [selectedTeam, setSelectedTeam] = useState(null); 
    const [selectedMonth, setSelectedMonth] = useState(null);

    // Obtener mes actual para limitar meses disponibles
    const currentMonth = new Date().getMonth() + 1;

    // Meses hasta el mes actual
    const allMonths = [
        "Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre",
    ];

    // Limitar meses disponibles al mes actual
    const months = allMonths.slice(0, currentMonth);

    const fetchNiko = async () => {
        if (!selectedTeam || !selectedMonth) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            if (
                typeof selectedMonth !== "number" ||
                selectedMonth < 1 ||
                selectedMonth > currentMonth
            ) {
                throw new Error("Mes seleccionado inválido");
            }
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
    };

    useEffect(() => {
        if (isActive === "nikoNiko" && selectedTeam && selectedMonth) {
            fetchNiko();
        }
    }, [isActive, selectedTeam, selectedMonth]);

    const ChangeTeam = (e) => {
        setSelectedTeam(e);
        setError(null);
        setSelectedMonth(null);
    };

    const ChangeMonth = (e) => {
        let monthNumber = null;
        if (typeof e === "number") {
            monthNumber = e;
        } else if (typeof e === "string") {
            const parsed = parseInt(e);
            if (!isNaN(parsed)) {
                monthNumber = parsed;
            }
        }
        if (monthNumber && monthNumber >= 1 && monthNumber <= currentMonth) {
            setSelectedMonth(monthNumber);
            setError(null);
        } else {
            setError("Mes seleccionado inválido");
        }
    };

    return (
        <div className="rounded-lg shadow-lg card">
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

            {loading && !selectedTeam && <p className="text-center">Seleccione un equipo</p>}
            {loading && selectedTeam && <FeelFlowSpinner />}
            {error && <p className="text-center text-red-600">{error}</p>}
            {!loading && !error && selectedTeam && selectedMonth && (
                <NikoNikoTable nikoDataByMember={nikoDataByMember} selectedMonth={selectedMonth} />
            )}
        </div>
    );
};

export default SummaryNikoNiko;
