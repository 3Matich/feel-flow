import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

// ===================
// TaskList Component
// ===================
function TaskList({ tasks, setTasks }) {
  const handleToggle = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6 bg-white shadow-md rounded-lg">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📋 Lista de Tareas
          </Typography>
          <List>
            {tasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListItem button dense onClick={() => handleToggle(index)}>
                  <Checkbox checked={task.completed} color="primary" />
                  <ListItemText
                    primary={task.title}
                    secondary={`Asignado por: ${task.assignedBy}`}
                    style={{ textDecoration: task.completed ? "line-through" : "none" }}
                  />
                  <IconButton onClick={() => handleDelete(index)} edge="end">
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              </motion.div>
            ))}
          </List>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// =====================
// WeeklyGoals Component
// =====================
function WeeklyGoals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6 bg-white shadow-md rounded-lg">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            🎯 Objetivos Semanales
          </Typography>
          <TextField
            label="Nuevo Objetivo"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            onClick={addGoal}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Agregar
          </Button>
          <div className="mt-4">
            {goals.map((goal, index) => (
              <Typography key={index} variant="body1">
                ✅ {goal}
              </Typography>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// =====================
// TimeTracker Component
// =====================
function TimeTracker({ taskName }) {
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(false);

  const handleStart = () => setActive(true);
  const handlePause = () => setActive(false);
  const handleReset = () => {
    setActive(false);
    setTime(0);
  };

  useEffect(() => {
    let timer;
    if (active) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [active]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6 bg-white shadow-md rounded-lg p-4">
        <CardContent>
          <Typography variant="h6">🕒 Tiempo dedicado a: {taskName}</Typography>
          <Typography variant="body1">{`${Math.floor(time / 60)} min ${time % 60} s`}</Typography>
        </CardContent>
        <CardActions className="justify-around">
          <Button onClick={handleStart} color="primary" variant="contained">
            Iniciar
          </Button>
          <Button onClick={handlePause} color="secondary" variant="contained">
            Pausar
          </Button>
          <Button onClick={handleReset} color="error" variant="contained">
            Reiniciar
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}

// =====================
// MoodTracker Component
// ===================

// =====================
// Página Principal (Dashboard)
// =====================
export function OwnTracking() {
  const [tasks, setTasks] = useState([
    { title: "Crear presentación", assignedBy: "Líder", completed: false },
    { title: "Enviar informe mensual", assignedBy: "Líder", completed: false },
  ]);

  return (
    <div className="p-8 bg-gray-100 text-gray-900 min-h-screen flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-8"
      >
        Own Tracking
      </motion.h1>

      {/* Sección de Tareas y Objetivos en dos columnas */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <TaskList tasks={tasks} setTasks={setTasks} />
        <WeeklyGoals />
      </div>

      {/* Seguimiento de Tiempo */}
      <div className="w-full max-w-6xl mb-8">
        <TimeTracker taskName="Crear presentación" />
      </div>

    </div>
  );
}

// =====================
// Exportación Principal
// =====================
export default OwnTracking;
