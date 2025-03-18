import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"; // Estilos para drag & drop
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { CheckCircleIcon, ClockIcon, FlagIcon } from "@heroicons/react/24/solid";

// Configuramos el localizador usando moment
const localizer = momentLocalizer(moment);
// Aplicamos el HOC de drag & drop a Calendar
const DnDCalendar = withDragAndDrop(Calendar);

const initialEvents = [
  {
    id: 1,
    title: "Daily Stand-up",
    start: new Date(2024, 2, 18, 9, 0),
    end: new Date(2024, 2, 18, 9, 30),
    color: "#4CAF50",
  },
  {
    id: 2,
    title: "Sprint Planning",
    start: new Date(2024, 2, 20, 10, 0),
    end: new Date(2024, 2, 20, 12, 0),
    color: "#2196F3",
  },
];

export function Resumenes() {
  const [events, setEvents] = useState(initialEvents);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: new Date(), end: new Date() });

  // Se dispara cuando se selecciona un slot en el calendario
  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ title: "", start, end });
    setOpen(true);
  };

  // Agrega el evento y lo muestra en el calendario
  const handleAddEvent = () => {
    if (newEvent.title) {
      setEvents([...events, { ...newEvent, id: events.length + 1, color: "#FF5722" }]);
      setOpen(false);
    }
  };

  // Manejamos el drag & drop para actualizar la posición de los eventos
  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((ev) =>
      ev.id === event.id ? { ...ev, start, end } : ev
    );
    setEvents(updatedEvents);
  };

  // Permite redimensionar (cambiar duración) de un evento
  const handleEventResize = ({ event, start, end }) => {
    const updatedEvents = events.map((ev) =>
      ev.id === event.id ? { ...ev, start, end } : ev
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Calendario Ágil para Team Leads
      </h1>
      
      {/* Calendario con drag & drop */}
      <DnDCalendar
        localizer={localizer}
        events={events}
        defaultView="week"
        selectable
        onSelectSlot={handleSelectSlot}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        resizable
        style={{ height: 600 }}
        eventPropGetter={(event) => ({
          style: { backgroundColor: event.color, border: "none", color: "#fff" },
        })}
      />

      {/* Modal para agregar nuevos eventos */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Evento</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título del Evento"
            type="text"
            fullWidth
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddEvent} variant="contained" color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sección de Herramientas de Agilidad */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Herramientas de Agilidad</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
            <span>Definición de Hecho (DoD)</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-6 h-6 text-blue-500" />
            <span>Timeboxing para eventos clave</span>
          </div>
          <div className="flex items-center gap-2">
            <FlagIcon className="w-6 h-6 text-red-500" />
            <span>Gestión de impedimentos</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resumenes;
