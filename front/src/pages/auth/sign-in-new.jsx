import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { validateLogin } from "@/api/auth/login";

export function SignInNew() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Solo un error global
  const [loading, setLoading] = useState(false); // Estado para el spinner
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setError(""); // Resetear error al cambiar los valores
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Por favor, ingresa tu email.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no tiene un formato válido.";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Por favor, ingresa tu contraseña.";
      valid = false;
    }

    setError(newErrors.email || newErrors.password); // Mostrar primer error encontrado
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true); // Mostrar el spinner
      setTimeout(() => {
        login(formData.email, formData.password);
      }, 2500); // 2.5 segundos de espera antes de hacer login
    }
  };

  const login = async (user, pw) => {
    if (!user || !pw) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const result = await validateLogin(user, pw);
      if (result === 200) {
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        navigate("/home"); // Simular redirección al Home
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error.message);
      setError("Hubo un problema al intentar iniciar sesión.");
    } finally {
      setLoading(false); // Ocultar spinner
    }
  };

  return (
    <section
      className="flex justify-center items-center min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d1b2a, #1b263b, #6b2d2d, #8b4513)",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="mb-5 flex flex-col">
          <div className="flex flex-col items-center justify-center mb-5">
            <div className="flex items-center gap-3">
              <img src="/img/logo.png" alt="Logo" className="w-20 h-20" />
              <Typography variant="h1" className="font-bold text-gray-900 text-5xl text-center">
                Feel Flow
              </Typography>
            </div>
          </div>

          <Typography variant="h5" color="blue-gray" className="font-normal text-left text-large mb-0">
            Ingresa tu email y contraseña.
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 mb-2">
          <div className="mb-1 flex flex-col gap-3">

            <div>
              <Input
                label="Usuario"
                name="email"
                onChange={handleChange}
                value={formData.email}
                error={error}
              />
            </div>
            {/* Contraseña */}
            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={error}
              />
              <button
                type="button"
                className="absolute right-2 top-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Typography variant="small" className="font-medium text-gray-900 mt-4">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </Typography>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <Button type="submit" className="mt-8 flex justify-center items-center" fullWidth disabled={loading}>
            {loading ? (
              <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-6">
            ¿No tienes una cuenta?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Crear cuenta</Link>
          </Typography>
        </form>
      </div>

      <div className="absolute bottom-0 h-16">
        <Button onClick={() => login("admin1@gmail.com", "RiverPlatecapo@123")}>Login with admin</Button>
        <Button onClick={() => login("tlteam1@gmail.com", "RiverPlatecapo@123")}>Login with TL</Button>
      </div>
    </section>
  );
}

export default SignInNew;
