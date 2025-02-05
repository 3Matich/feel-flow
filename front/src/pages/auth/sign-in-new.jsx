import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // Importar los íconos

export function SignInNew() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    acceptTerms: "",
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "acceptTerms" ? checked : value,
    });
    // Limpiar el mensaje de error cuando el usuario comienza a escribir
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "", acceptTerms: "" };

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

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Aquí puedes manejar el envío del formulario, por ejemplo, enviar los datos a un API
      console.log("Formulario enviado:", formData);
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
              <img
                src="/img/logo.png"
                alt="Logo"
                className="w-20 h-20"
              />
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
          <div className="mb-1 flex flex-col gap-3"> {/* Aumentar el espacio entre campos */}
            <Typography variant="h6" color="blue-gray" className="font-medium text-small">
              Usuario
            </Typography>
            <Input
              size="lg"
              placeholder="usuario@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.email}
              </Typography>
            )}

            <Typography variant="h6" color="blue-gray" className="font-medium">
              Contraseña
            </Typography>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 pr-10"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.password}
              </Typography>
            )}
          </div>

          <Typography variant="small" className="font-medium text-gray-900 mt-4">
            <a href="#">
              ¿Olvidaste tu contraseña?
            </a>
          </Typography>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                Acepto los &nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Términos y Condiciones
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
          />
          {errors.acceptTerms && (
            <Typography variant="small" color="red" className="mt-1">
              {errors.acceptTerms}
            </Typography>
          )}
          <Button type="submit" className="mt-8" fullWidth>
            Iniciar Sesión
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-6">
            ¿No tienes una cuenta?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Crear cuenta</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignInNew;