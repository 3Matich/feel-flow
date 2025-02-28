import { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { validateLogin } from "@/api/auth/login";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export function SignInNew({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    captcha: "",
    general: "", // Para errores generales como login fallido
  });
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate(); // Usamos useNavigate para redirigir después del login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
      captcha: "", // Limpiar el error del CAPTCHA al cambiar un campo
      general: "", // Limpiar el error general al cambiar un campo
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "", captcha: "", general: "" };

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

    if (!captchaVerified) {
      newErrors.captcha = "Por favor, verifica que no eres un robot.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      login(formData.email, formData.password);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true); // Cuando el usuario resuelve el CAPTCHA, habilitamos la validación
      setErrors((prevErrors) => ({
        ...prevErrors,
        captcha: "", // Limpiar el error del CAPTCHA
      }));
    } else {
      setCaptchaVerified(false);
    }
  };
  
  // Función login que se llama al hacer clic en los botones
  const login = async (user, pw) => {
    if (!user || !pw) {
      setErrors({
        ...errors,
        general: "Por favor, completa todos los campos.",
      });
      return;
    }

    try {
      // Llama a tu API para verificar el login
      const result = await validateLogin(user, pw);
      if (result === 200) {
        onLogin();
        navigate("/home"); // Simula redirección al Home
      } else {
        setErrors({
          ...errors,
          general: "Usuario o contraseña incorrectos.",
        });
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error.message);
      setErrors({
        ...errors,
        general: "Hubo un problema al intentar iniciar sesión.",
      });
    } finally {
      setLoading(false);
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

          <Typography variant="h5" color="blue-gray" className="font-normal text-center text-large mb-0">
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
                error={errors.email}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Contraseña */}
            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? "text" : "password"} // Cambiar el tipo según el estado showPassword
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <button
                type="button"
                className="absolute right-2 top-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)} // Cambiar el estado al hacer clic
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
          </div>

          {/* Google reCAPTCHA widget */}
          
          <div className="mt-4 flex justify-center items-center">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
            />
          </div>
            
          {/* Mostrar error del CAPTCHA si no está verificado */}
          {errors.captcha && <p className="text-red-500 text-sm text-center">{errors.captcha}</p>}

          {/* Mostrar error general sobre el botón de login */}
          {errors.general && <p className="text-red-500 text-sm text-center mt-4">{errors.general}</p>}

          <Button type="submit" className="mt-5 flex justify-center items-center" fullWidth disabled={loading}>
            {loading ? (
              <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-6">
            ¿No tienes una cuenta?
            <a href="/auth/sign-up-new" className="text-gray-900 ml-1">Crear cuenta</a>
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
