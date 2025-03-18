import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { CheckCircleIcon, ClockIcon, FlagIcon } from "@heroicons/react/24/solid";

export function FeedbackHub() {
  // Estado para el feedback anónimo
  const [feedback, setFeedback] = useState("");
  const [openFeedback, setOpenFeedback] = useState(false);

  // Estado para la encuesta de satisfacción
  const [survey, setSurvey] = useState("");

  // Estado para el sistema de votación
  const [votes, setVotes] = useState({ idea1: 0, idea2: 0 });

  // Manejo de envío de feedback
  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      alert("¡Gracias por tu feedback anónimo!");
      setFeedback("");
      setOpenFeedback(false);
    }
  };

  // Manejo de envío de encuesta
  const handleSurveySubmit = () => {
    if (survey.trim()) {
      alert("¡Encuesta enviada!");
      setSurvey("");
    }
  };

  // Manejo de votaciones
  const handleVote = (idea) => {
    setVotes((prev) => ({ ...prev, [idea]: prev[idea] + 1 }));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Feedback Hub</h1>

      {/* Botón para abrir el modal de Feedback Anónimo */}
      <div className="mb-6">
        <Button variant="contained" color="primary" onClick={() => setOpenFeedback(true)}>
          Enviar Feedback Anónimo
        </Button>
      </div>

      {/* Modal para enviar Feedback Anónimo */}
      <Dialog open={openFeedback} onClose={() => setOpenFeedback(false)}>
        <DialogTitle>Feedback Anónimo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Escribe tu feedback"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFeedback(false)}>Cancelar</Button>
          <Button onClick={handleFeedbackSubmit} variant="contained" color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sección de Encuesta de Satisfacción */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Encuesta de Satisfacción</h2>
        <TextField
          label="¿Qué te gustaría mejorar en el equipo?"
          fullWidth
          variant="outlined"
          value={survey}
          onChange={(e) => setSurvey(e.target.value)}
        />
        <div className="mt-4">
          <Button variant="contained" color="primary" onClick={handleSurveySubmit} fullWidth>
            Enviar Encuesta
          </Button>
        </div>
      </div>

      {/* Sección de Sistema de Votación */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sistema de Votación</h2>
        <div className="flex gap-4 items-center justify-between mb-2">
          <span className="flex-1">💡 Mejorar las reuniones de equipo</span>
          <Button variant="outlined" onClick={() => handleVote("idea1")}>
            Votar ({votes.idea1})
          </Button>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <span className="flex-1">🚀 Implementar pausas activas</span>
          <Button variant="outlined" onClick={() => handleVote("idea2")}>
            Votar ({votes.idea2})
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackHub;
