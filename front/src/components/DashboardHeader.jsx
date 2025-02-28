import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

function DashboardHeader() {

  // Función para realizar un scroll suave y corto hacia abajo
  const handleScroll = () => {
    window.scrollBy({ top: 450, behavior: "smooth" }); // Ajusta "top" para un scroll más o menos corto
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg,rgb(2, 2, 2) 0%,rgb(127, 127, 232) 100%)",
        padding: "4rem 2rem",
        borderRadius: "1rem",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Efecto de burbujas animadas en el fondo */}
      <Box
        component={motion.div}
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />

      <Box
        component={motion.div}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
          Reportes
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Visualiza el progreso de los equipos y miembros en el tiempo
        </Typography>
        
        <Button
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<ArrowRightIcon className="h-5 w-5 text-white" />}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleScroll} // Llama a la función de scroll
          sx={{
            backgroundColor: "#ff4081",
            ":hover": { backgroundColor: "#ff79b0" },
            boxShadow: "0 8px 15px rgba(255, 64, 129, 0.3)",
          }}
        >
          Ir al Reporte
        </Button>
      </Box>
    </Box>
  );
}

export default DashboardHeader;
