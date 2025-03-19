import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  PlayIcon,
  EyeIcon,
  ChartPieIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid";

export function WellnessHub() {
  // Estado para la sección activa
  const [activeSection, setActiveSection] = useState("meditation");

  // Estados para Feedback Hub
  const [feedback, setFeedback] = useState("");
  const [survey, setSurvey] = useState("");
  const [votes, setVotes] = useState({ idea1: 0, idea2: 0 });

  // Funciones para Feedback Hub
  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      alert("¡Gracias por tu feedback anónimo!");
      setFeedback("");
    }
  };

  const handleSurveySubmit = () => {
    if (survey.trim()) {
      alert("¡Encuesta enviada!");
      setSurvey("");
    }
  };

  const handleVote = (idea) => {
    setVotes((prev) => ({ ...prev, [idea]: prev[idea] + 1 }));
  };

  // Componente para cada tarjeta del menú
  const Section = ({ title, description, icon: Icon, onClick }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-4 p-6 rounded-2xl shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer hover:scale-105"
      onClick={onClick}
    >
      <Icon className="w-12 h-12" />
      <h3 className="text-xl font-bold text-center">{title}</h3>
      <p className="text-center text-sm">{description}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center gap-10">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center"
      >
        Bienestar y Analiticas
      </motion.h1>

      {/* Menú de secciones */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl">
        <Section
          title="Relajación Guiada"
          description="Inicia una sesión para calmar tu mente."
          icon={PlayIcon}
          onClick={() => setActiveSection("meditation")}
        />
        <Section
          title="Recomendaciones"
          description="Consejos para tu bienestar."
          icon={EyeIcon}
          onClick={() => setActiveSection("recommendations")}
        />
        <Section
          title="Feedback Hub"
          description="Envía feedback y participa en encuestas."
          icon={ChatBubbleLeftIcon}
          onClick={() => setActiveSection("feedback")}
        />
        <Section
          title="Insights & Analytics"
          description="Métricas y reportes detallados."
          icon={ChartPieIcon}
          onClick={() => setActiveSection("analytics")}
        />
      </div>

      {/* Contenido dinámico según la sección seleccionada */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl p-6 bg-gray-800 rounded-2xl shadow-lg"
      >
        {activeSection === "meditation" && (
          <div className="text-center">
            <Typography variant="h4" className="font-bold mb-4">
              Meditación Guiada
            </Typography>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                title="Meditación Guiada"
                src="https://www.youtube.com/embed/2OEL4P1Rz04"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        )}

        {activeSection === "recommendations" && (
          <div className="text-center">
            <Typography variant="h4" className="font-bold mb-4">
              Recomendaciones Personalizadas
            </Typography>
            <List className="space-y-2">
              <ListItem>
                <ListItemText primary="Mantén una buena postura." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Realiza pausas activas cada 90 minutos." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Practica la respiración profunda en momentos de estrés." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Dedica unos minutos diarios a la meditación." />
              </ListItem>
            </List>
          </div>
        )}

        {activeSection === "feedback" && (
          <div className="text-center space-y-8">
            <Typography variant="h4" className="font-bold mb-4">
              Feedback Hub
            </Typography>
            {/* Feedback Anónimo */}
            <div className="space-y-2">
              <Typography variant="h6">Feedback Anónimo</Typography>
              <TextField
                label="Escribe tu feedback"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                InputProps={{ style: { backgroundColor: "#fff" } }}
              />
              <Button variant="contained" color="primary" onClick={handleFeedbackSubmit} fullWidth>
                Enviar Feedback
              </Button>
            </div>

            {/* Encuesta de Satisfacción */}
            <div className="space-y-2">
              <Typography variant="h6">Encuesta de Satisfacción</Typography>
              <TextField
                label="¿Qué te gustaría mejorar en el equipo?"
                variant="outlined"
                fullWidth
                value={survey}
                onChange={(e) => setSurvey(e.target.value)}
                InputProps={{ style: { backgroundColor: "#fff" } }}
              />
              <Button variant="contained" color="secondary" onClick={handleSurveySubmit} fullWidth>
                Enviar Encuesta
              </Button>
            </div>

            {/* Sistema de Votación */}
            <div className="space-y-2">
              <Typography variant="h6">Sistema de Votación</Typography>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Typography>💡 Mejorar las reuniones de equipo</Typography>
                  <Button variant="outlined" onClick={() => handleVote("idea1")}>
                    Votar ({votes.idea1})
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Typography>🚀 Implementar pausas activas</Typography>
                  <Button variant="outlined" onClick={() => handleVote("idea2")}>
                    Votar ({votes.idea2})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "analytics" && (
          <div className="text-center">
            <Typography variant="h4" className="font-bold mb-4">
              Insights & Analytics
            </Typography>
            <Typography variant="body1">
              Visualiza datos detallados sobre tu bienestar y productividad.
            </Typography>
            <div className="mt-4 bg-gradient-to-r from-purple-600 to-blue-500 p-6 rounded-lg">
              <Typography variant="h5" className="font-bold">
                Progreso del mes: 78%
              </Typography>
              <Typography variant="body2">
                Comparado con el mes anterior, hay una mejora del 12% en productividad.
              </Typography>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default WellnessHub;
