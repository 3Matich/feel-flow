import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { CountriesSelect, InputPhoneFloatingLabel } from "@/components/Forms";

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // Importar los íconos

import { 
  JoinToTeam,
  SignUpAdmin, 
} from "@/api";
import { DialogSuccess, DialogErrorInvite } from "@/components/Forms";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para confirmar la contraseña
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const navigate = useNavigate();
  const [showErrorInvalid, setShowErrorInvalid] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    company: "",
    country: "",
    description: "",
    phoneNumber: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    company: "",
    country: "",
    description: "",
    phoneNumber: "",
    acceptTerms: "",
  });

  const [passwordValid, setPasswordValid] = useState(false); // Para validar si la contraseña es fuerte
  const [passwordMatch, setPasswordMatch] = useState(true); // Para validar que las contraseñas coinciden
  const [hasInviteToken, setHasInviteToken] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Usamos URLSearchParams para obtener el token desde la URL
  const inviteToken = queryParams.get('inviteToken'); // Suponiendo que el token esté bajo el parámetro 'token'

  // Validación en tiempo real de la contraseña
  useEffect(() => {
    const password = formData.password;
    const passwordConfirm = formData.passwordConfirm;

    // Verifica si las contraseñas coinciden
    setPasswordMatch(password === passwordConfirm);

    // Validación de fortaleza de la contraseña
    const isStrongPassword = password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
    setPasswordValid(isStrongPassword);

    if (inviteToken) {
      setHasInviteToken(true);
    } else {
      setHasInviteToken(false);
    }
  }, [formData.password, formData.passwordConfirm]);

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
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      company: "",
      acceptTerms: "",
    };

    if (!formData.firstName) {
      newErrors.firstName = "Por favor, ingresa tu nombre.";
      valid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = "Por favor, ingresa tu apellido.";
      valid = false;
    }

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

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = "Por favor, confirma tu contraseña.";
      valid = false;
    } else if (!passwordMatch) {
      newErrors.passwordConfirm = "Las contraseñas no coinciden.";
      valid = false;
    }

    if (!formData.company && !hasInviteToken) {
      newErrors.company = "Por favor, ingresa el nombre de tu empresa.";
      valid = false;
    }

    // if (!formData.description) {
    //   newErrors.description = "Por favor, ingresa una descripción.";
    //   valid = false;
    // }

    // if (!formData.country) {
    //   newErrors.country = "Por favor, ingresa tu nacionalidad.";
    //   valid = false;
    // }

    // if (!formData.phoneNumber) {
    //   newErrors.phoneNumber = "Por favor, ingresa tu número de teléfono.";
    //   valid = false;
    // }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    setShowErrorInvalid(false);
    navigate("/auth/sign-in");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrorInvalid(false);
    if (validateForm()) {
      if (hasInviteToken) {
        const memberData = {
          name: formData.firstName,
          surname: formData.lastName,
          username: formData.email,
          password: formData.password,
          country: formData.country,
          description: formData.description,
          phoneNumber: formData.phoneNumber,
        };
        try {
          const joinTeamResponse = await JoinToTeam(inviteToken, memberData);
          if (joinTeamResponse === 200) {
            setShowSuccessDialog(true);
          }
          if (joinTeamResponse === 404) {
            setShowErrorInvalid(true);
          }
        } catch (error) {
          console.error("Error al unirse al equipo", error);
        }
      } else {
        const adminData = {
          name: formData.firstName,
          surname: formData.lastName,
          username: formData.email,
          password: formData.password,
          enterpriseDTO: {
            name: formData.company
          },
          country: formData.country,
          description: formData.description,
          phoneNumber: formData.phoneNumber,
        };
        try {
          const addAdmin = await SignUpAdmin(adminData);
          if (addAdmin === 201) {
            setShowSuccessDialog(true);
          }
        } catch (error) {
          console.error("Error al crear el usuario", error);
        }
      }
    }
  };

  return (
    <section
      className="flex justify-center items-center min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d1b2a, #1b263b, #6b2d2d, #8b4513)",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4">
        <div className="mb-5 flex flex-col">
          <div className="flex flex-col items-center justify-left mb-4">
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

          <Typography variant="h5" color="blue-gray" className="font-normal text-center text-large mb-2">
            Regístrate para crear una cuenta.
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-2 mb-2">
          <div className="flex flex-col gap-5">
            {/* Nombre y Apellido */}
            <div className="flex gap-4">
              <div className="flex-grow">
                <Input
                  label="Nombre"
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                  error={errors.firstName}
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>

              <div className="flex-grow">
                <Input
                  label="Apellido"
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                  error={errors.lastName}
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            {/* Usuario */}
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
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <button
                type="button"
                className="absolute right-2 top-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              {!passwordValid && formData.password && (
                <p className="text-red-500 text-sm">La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.</p>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div className="relative">
              <Input
                label="Confirmar contraseña"
                type={showConfirmPassword ? "text" : "password"}
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                error={errors.passwordConfirm}
              />
              <button
                type="button"
                className="absolute right-2 top-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
              {errors.passwordConfirm && <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>}
              {!passwordMatch && formData.passwordConfirm && (
                <p className="text-red-500 text-sm">Las contraseñas no coinciden.</p>
              )}
            </div>

            <div className="relative">
              <Textarea
                rows={1}
                resize={true}
                size="md"
                variant="standard"
                label="Sobre ti"
                value={formData.description}
                onChange={handleChange}
                name="description"
                className="border rounded-xl text-light-text-secondary dark:text-dark-text-secondary"
                error={errors.description}
              />
            </div>

            <div className="relative">
              <CountriesSelect
                userCountry={formData.country}
                label="Nacionalidad"
                name="country"
                onChange={handleChange}
                className="text-light-text-secondary dark:text-dark-text-secondary"
                error={errors.country}
              />
            </div>

            <div className="relative">
              <InputPhoneFloatingLabel
                content={formData.phoneNumber}
                name="phoneNumber"
                onChange={(value) => setFormData((prev) => ({ ...prev, phoneNumber: value }))}
              />
            </div>

            {/* Empresa */}
            {!hasInviteToken &&
              (<div>
                <Input
                  label="Empresa"
                  name="company"
                  onChange={handleChange}
                  value={formData.company}
                  error={errors.company}
                />
                {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
              </div>)
            }

            {/* Aceptar términos */}
            <div className="flex items-center">
              <Checkbox
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                containerProps={{ className: "-ml-2.5" }}
              />
              <Typography variant="small" color="gray" className="ml-2">
                Acepto los&nbsp;
                <a href="#" className="font-normal text-black hover:text-gray-900 underline">
                  Términos y Condiciones
                </a>
              </Typography>
            </div>
            {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}

            {/* Botón de registro */}
            <Button type="submit" className="mt-3 w-full">
              Registrarse
            </Button>

            {/* Link para iniciar sesión */}
            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-3">
              ¿Ya tienes una cuenta?
              <Link to="/auth/sign-in" className="text-gray-900 ml-1">Iniciar Sesión</Link>
            </Typography>
          </div>
        </form>
        <DialogSuccess open={showSuccessDialog} handleOpen={handleSuccessClose} />
        <DialogErrorInvite open={showErrorInvalid} handleOpen={handleSuccessClose} />
      </div>
    </section>
  );
}

export default SignUp;
