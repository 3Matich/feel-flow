// src/pages/SignUp.jsx
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import { JoinToTeam, SignUpAdmin } from "@/api";
import { DialogSuccess, DialogErrorInvite } from "@/components/Forms";
import { CountriesSelect, InputPhoneFloatingLabel } from "@/components/Forms";

const countryPhonePrefixes = {
  "Argentina": "+54",
  "United States": "+1",
  "Brazil": "+55",
  "Chile": "+56",
  "Colombia": "+57",
  "Mexico": "+52",
  "Spain": "+34",
  // Agregá más según tus necesidades
};

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorInvalid, setShowErrorInvalid] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inviteToken = queryParams.get("inviteToken");
  const hasInviteToken = Boolean(inviteToken);

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
  const [errors, setErrors] = useState({});
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Validar fortaleza y match de contraseña
  useEffect(() => {
    const { password, passwordConfirm } = formData;
    setPasswordMatch(password === passwordConfirm);
    setPasswordValid(
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password)
    );
  }, [formData.password, formData.passwordConfirm]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "acceptTerms" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

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
    if (!hasInviteToken && !formData.company) {
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
    setGeneralError("");
    if (!validateForm()) {
      setGeneralError("Error. Por favor, corregí los errores del formulario.");
      setOpenSnackbar(true);
      return;
    }
    
    const country = formData.country; // ejemplo: "Argentina"
    const phone = formData.phoneNumber;
    const prefix = countryPhonePrefixes[country] || "";
    const fullPhoneNumber = `${prefix}${phone}`; // ejemplo: +541112345678

    if (hasInviteToken) {
      // Unirse por invitación
      try {
        const memberData = {
          name: formData.firstName,
          surname: formData.lastName,
          username: formData.email,
          password: formData.password,
          country: formData.country,
          description: formData.description,
          phoneNumber: fullPhoneNumber,
        };
        const code = await JoinToTeam(inviteToken, memberData);
        if (code === 200) {
          setShowSuccessDialog(true);
        } else if (code === 404) {
          setShowErrorInvalid(true);
        } else {
          throw new Error("Invitación inválida");
        }
      } catch (err) {
        setGeneralError("No se pudo procesar la invitación.");
        setOpenSnackbar(true);
      }
    } else {
      // Registro de admin
      try {
        
        const adminData = {
          name: formData.firstName,
          surname: formData.lastName,
          username: formData.email,
          password: formData.password,
          enterpriseDTO: { name: formData.company },
          country: formData.country,
          description: formData.description,
          phoneNumber: fullPhoneNumber,
        };
        const code = await SignUpAdmin(adminData);
        if (code === 201) {
          setShowSuccessDialog(true);
        } else {
          throw new Error("Error en registro");
        }
      } catch (err) {
        const apiMessage =
          err?.response?.data?.message || err?.message || "";
        setGeneralError(
          `Error al crear el usuario.${apiMessage ? ` Detalle: ${apiMessage}.` : ""}\nPor favor, intentá nuevamente más tarde.`
        );
        setOpenSnackbar(true);
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
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Encabezado */}
        <div className="mb-6 text-center">
          <img src="/img/logo.png" alt="Logo" className="mx-auto w-20 h-20" />
          <Typography
            variant="h1"
            className="font-bold text-gray-900 text-5xl mt-2"
          >
            Feel Flow
          </Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-normal mt-4"
          >
            Regístrate para crear una cuenta.
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre / Apellido */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label="Nombre"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
                error={!!errors.firstName}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="flex-1">
              <Input
                label="Apellido"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                error={!!errors.lastName}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <Input
              label="Usuario"
              name="email"
              onChange={handleChange}
              value={formData.email}
              error={!!errors.email}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Contraseña */}
          <div className="relative">
            <Input
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={formData.password}
              error={!!errors.password}
            />
            <button
              type="button"
              className="absolute right-2 top-3 text-gray-600 hover:text-gray-900"
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
            {!passwordValid && formData.password && (
              <p className="text-red-500 text-sm mt-1">
                La contraseña debe tener como minimo 8 caracteres, menos de 100, 
                al menos una letra mayúscula, al menos una letra minúscula, al menos un dígito y un carácter como ! @ # & ( ).
              </p>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div className="relative">
            <Input
              label="Confirmar contraseña"
              type={showConfirmPassword ? "text" : "password"}
              name="passwordConfirm"
              onChange={handleChange}
              value={formData.passwordConfirm}
              error={!!errors.passwordConfirm}
            />
            <button
              type="button"
              className="absolute right-2 top-3 text-gray-600 hover:text-gray-900"
              onClick={() => setShowConfirmPassword((p) => !p)}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm mt-1">
                {errors.passwordConfirm}
              </p>
            )}
          </div>

          {/* Sobre ti */}
          <div>
            <Textarea
              // rows={3}
              // resize={true}
              // variant="standard"
              label="Sobre ti"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded-xl px-3 py-2 text-light-text-secondary dark:text-dark-text-secondary"
              error={!!errors.description}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Nacionalidad */}
          <div>
            <CountriesSelect
              userCountry={formData.country}
              label="Nacionalidad"
              name="country"
              onChange={handleChange}
              className="text-light-text-secondary dark:text-dark-text-secondary"
              error={!!errors.country}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="flex gap-2 items-center">
            <div className="min-w-[50px] px-2 py-1 border rounded text-center bg-gray-50">
              {countryPhonePrefixes[formData.country] || "+__"}
            </div>
            <InputPhoneFloatingLabel
              content={formData.phoneNumber}
              label="Número de Contacto"
              name="phoneNumber"
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, phoneNumber: value }))
              }
            />
          </div>

          {/* Empresa (si no es invitación) */}
          {!hasInviteToken && (
            <div>
              <Input
                label="Empresa"
                name="company"
                onChange={handleChange}
                value={formData.company}
                error={!!errors.company}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company}</p>
              )}
            </div>
          )}

          {/* Aceptar términos */}
          <div className="flex items-center">
            <Checkbox
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              containerProps={{ className: "-ml-2.5" }}
            />
            <Typography variant="small" color="gray" className="ml-2">
              Acepto los{" "}
              <Link
                to="#"
                className="font-normal text-black hover:text-gray-900 underline"
              >
                Términos y Condiciones
              </Link>
            </Typography>
          </div>
          {errors.acceptTerms && (
            <p className="text-red-500 text-sm mt-1">
              {errors.acceptTerms}
            </p>
          )}

          {/* Botón de registro */}
          <Button type="submit" className="w-full">
            Registrarse
          </Button>

          {/* Link a iniciar sesión */}
          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium"
          >
            ¿Ya tienes una cuenta?{" "}
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">
              Iniciar Sesión
            </Link>
          </Typography>
        </form>

        {/* Diálogos */}
        <DialogSuccess
          open={showSuccessDialog}
          handleOpen={handleSuccessClose}
        />
        <DialogErrorInvite
          open={showErrorInvalid}
          handleOpen={handleSuccessClose}
        />

        {/* Snackbar de error general */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="error"
            variant="filled"
            sx={{ width: "100%", whiteSpace: "pre-line" }}  // 👈 necesario para \n
          >
            {generalError}
          </Alert>
        </Snackbar>
      </div>
    </section>
  );
}

export default SignUp;
