import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Spinner,
  Alert,
} from "@material-tailwind/react";
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { teamsData } from "@/data";
import { createTeam } from "@/services/equipos/createTeam";

export function Teams() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("xs");
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: "",
    leaderFirstName: "",
    leaderLastName: "",
    leaderUsername: "",
    leaderPassword: "",
    leaderConfirmPassword: "",
    logo: "",
  });
  const [teams, setTeams] = useState(teamsData);
  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeam((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTeam((prev) => ({ ...prev, logo: file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      setNewTeam((prev) => ({ ...prev, logo: file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setNewTeam((prev) => ({ ...prev, logo: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!newTeam.name) newErrors.name = "El nombre del equipo es requerido";
    if (!newTeam.leaderFirstName) newErrors.leaderFirstName = "El nombre del líder es requerido";
    if (!newTeam.leaderLastName) newErrors.leaderLastName = "El apellido del líder es requerido";
    if (!newTeam.leaderUsername) {
      newErrors.leaderUsername = "El email del líder es requerido";
    } else if (!/\S+@\S+\.\S+/.test(newTeam.leaderUsername)) {
      newErrors.leaderUsername = "Ingrese un email válido";
    }
    if (!newTeam.leaderPassword) newErrors.leaderPassword = "La contraseña es requerida";
    if (!newTeam.leaderConfirmPassword) newErrors.leaderConfirmPassword = "La confirmación de la contraseña es requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateTeam = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    setErrorMessage("");
    const teamData = {
      name: newTeam.name,
      description: newTeam.description,
      leaderFirstName: newTeam.leaderFirstName,
      leaderLastName: newTeam.leaderLastName,
      leaderUsername: newTeam.leaderUsername,
      leaderPassword: newTeam.leaderPassword,
    };

    try {
      const result = await createTeam(teamData);
      console.log("✅ Equipo creado:", result);

      setTeams([
        ...teams,
        {
          name: teamData.name,
          description: teamData.description,
          logo: logoPreview,
          leader: `${teamData.leaderFirstName} ${teamData.leaderLastName}`,
        },
      ]);

      setNewTeam({
        name: "",
        description: "",
        leaderFirstName: "",
        leaderLastName: "",
        leaderUsername: "",
        leaderPassword: "",
        leaderConfirmPassword: "",
        logo: "",
      });

      setLogoPreview(null);
      setOpen(false);
      setSuccessMessage("¡Equipo creado con éxito!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("❌ Error creando equipo:", error);
      setErrorMessage(error.message || "Error al crear equipo");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredTeams = teams.filter(({ name, leader }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    leader.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {successMessage && (
        <Alert
          color="green"
          icon={<CheckCircleIcon className="h-6 w-6 text-white" />}
          className="mb-4"
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert
          color="red"
          icon={<CheckCircleIcon className="h-6 w-6 text-white" />}
          className="mb-4"
          onClose={() => setErrorMessage("")}
        >
          {errorMessage}
        </Alert>
      )}

            <Card color="transparent" className="mb-6 p-4 mt-10">
                <CardHeader color="transparent" shadow={false} className="p-2 mb-4 flex justify-between items-center">
                    <Typography variant="h4" color="blue">Listado de Equipos</Typography>
                    <Button onClick={handleOpen} color="indigo" className="flex items-center gap-2">
                        <PlusIcon className="h-5 w-5" />
                        Crear Equipo
                    </Button>
                </CardHeader>
                <CardBody className="mb-1">
                    <div className="relative w-full mb-3">
                        <label
                            className={`absolute left-4 transition-all duration-300 bg-white px-1 pointer-events-none ${isFocused || searchQuery
                                ? "text-xs top-0 transform -translate-y-1/2 text-blue-600"
                                : "text-l top-1/2 transform -translate-y-1/2 text-gray-400"
                                }`}
                        >
                            Buscar equipo o Team Leader
                        </label>

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus:border-blue-500 focus:outline-none text-base"
                        />

                        <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>

                    <table className="w-full min-w-full table-auto border-collapse mt-5 rounded-md overflow-hidden">
                        <thead>
                            <tr className="bg-blue-gray-50">
                                {["Equipo", "Team Leader"].map((el) => (
                                    <th
                                        key={el}
                                        className="border-b border-blue-gray-100 py-3 px-5 text-left text-blue-gray-600 uppercase text-sm font-bold"
                                    >
                                        {el}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeams.map(({ logo, name, leader }, key) => (
                                <tr key={name} className="hover:bg-blue-gray-50 transition-all">
                                    <td className="py-3 px-5 border-b border-blue-gray-100 flex items-center gap-4">
                                        <Avatar src={logo} alt={name} size="sm" variant="rounded" />
                                        <Typography className="font-semibold text-blue-gray-700">
                                            {name}
                                        </Typography>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-100">
                                        <Typography className="text-sm font-semibold text-blue-gray-700">
                                            {leader}
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>

            <Dialog
                open={open}
                handler={handleOpen}
                className={size === "xs" ? "max-w-xs" : ""}
            >
                <DialogHeader className="flex items-center justify-between">
                    <div className="flex justify-between items-center w-full">
                        <Typography variant="h4" color="blue">
                            Crear un nuevo Equipo
                        </Typography>
                        <button
                            onClick={() => {
                                handleOpen(); // Cerrar
                                setNewTeam({
                                    name: "",
                                    description: "",
                                    leaderFirstName: "",
                                    leaderLastName: "",
                                    leaderUsername: "",
                                    leaderPassword: "",
                                    leaderConfirmPassword: "",
                                    logo: "",
                                });
                            }}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            ✕
                        </button>
                    </div>

                </DialogHeader>
                <DialogBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Campo Nombre del Equipo */}
                        <div className="relative">
                            <Input
                                label="Nombre del Equipo"
                                name="name"
                                value={newTeam.name}
                                onChange={handleChange}
                                error={errors.name}
                                className="w-full"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        {/* Campo Nombre del Líder */}
                        <div className="relative">
                            <Input
                                label="Nombre del Líder"
                                name="leaderFirstName"
                                value={newTeam.leaderFirstName}
                                onChange={handleChange}
                                error={errors.leaderFirstName}
                                className="w-full"
                            />
                            {errors.leaderFirstName && <p className="text-red-500 text-sm">{errors.leaderFirstName}</p>}
                        </div>

                        {/* Campo Apellido del Líder */}
                        <div className="relative">
                            <Input
                                label="Apellido del Líder"
                                name="leaderLastName"
                                value={newTeam.leaderLastName}
                                onChange={handleChange}
                                error={errors.leaderLastName}
                                className="w-full"
                            />
                            {errors.leaderLastName && <p className="text-red-500 text-sm">{errors.leaderLastName}</p>}
                        </div>

                        {/* Campo Email del Líder */}
                        <div className="relative">
                            <Input
                                label="Email del Líder"
                                name="leaderUsername"
                                value={newTeam.leaderUsername}
                                onChange={handleChange}
                                error={errors.leaderUsername}
                                className="w-full"
                            />
                            {errors.leaderUsername && <p className="text-red-500 text-sm">{errors.leaderUsername}</p>}
                        </div>

                        {/* Campo Contraseña */}
                        <div className="relative">
                            <Input
                                label="Contraseña"
                                type={showPassword ? "text" : "password"}
                                name="leaderPassword"
                                value={newTeam.leaderPassword}
                                onChange={handleChange}
                                error={!!errors.leaderPassword}
                                className="w-full"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                            {errors.leaderPassword && <p className="text-red-500 text-sm">{errors.leaderPassword}</p>}
                        </div>

                        {/* Campo Confirmar Contraseña */}
                        <div className="relative">
                            <Input
                                label="Confirmar Contraseña"
                                type={showConfirmPassword ? "text" : "password"}
                                name="leaderConfirmPassword"
                                value={newTeam.leaderConfirmPassword}
                                onChange={handleChange}
                                error={!!errors.leaderConfirmPassword}
                                className="w-full"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                            {errors.leaderConfirmPassword && <p className="text-red-500 text-sm">{errors.leaderConfirmPassword}</p>}
                        </div>

                        {/* Campo Descripción */}
                        <div className="relative col-span-2">
                            <Textarea
                                label="Descripción"
                                name="description"
                                value={newTeam.description}
                                onChange={handleChange}
                                error={errors.description}
                                className="w-full"
                                onFocus={() => setIsFocused(true)} // Cuando el campo recibe foco
                                onBlur={() => setIsFocused(false)} // Cuando el campo pierde foco
                            />
                            {!isFocused && (
                                <div className="absolute top-2 right-3 text-xs text-gray-400">
                                    (Opcional)
                                </div>
                            )}
                        </div>



                        {/* Campo Logo */}
                        <div className="mb-1 col-span-2 flex flex-col items-center">
                            <Typography variant="large" color="black" className="mb-2">
                                Logo del Equipo
                            </Typography>
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                className="relative flex items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-md w-72 h-40 mx-auto"
                            >
                                {logoPreview ? (
                                    <div className="relative w-32 h-32 mx-auto">
                                        <img src={logoPreview} alt="Logo preview" className="object-cover w-full h-full rounded-md" />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveLogo();
                                            }}
                                            className="absolute -top-2 -right-0 text-gray-700 hover:text-black bg-gray p-1 text-lg font-bold transition-opacity opacity-70 hover:opacity-100 z-10"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <label
                                        htmlFor="logo-input"
                                        className="cursor-pointer text-center text-gray-500 hover:text-blue-500 transition"
                                    >
                                        Arrastra y suelta un logo aquí, o haz clic para seleccionar
                                    </label>
                                )}
                                <input
                                    id="logo-input"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleLogoChange}
                                />
                            </div>
                        </div>
                    </div>
                </DialogBody>


                <DialogFooter className="flex justify-center gap-2">
                    <Button
                        color="red"
                        onClick={() => {
                            handleOpen(); // Cerrar 
                            setNewTeam({ // Limpiar los valores del formulario
                                name: "",
                                description: "",
                                leaderFirstName: "",
                                leaderLastName: "",
                                leaderUsername: "",
                                leaderPassword: "",
                                leaderConfirmPassword: "",
                                logo: "",
                            });
                        }}
                        className="mr-4"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleCreateTeam}
                        disabled={isSaving}
                        color="indigo"
                    >
                        {isSaving ? (
                            <Spinner className="h-5 w-5 text-white" />
                        ) : (
                            "Crear Equipo"
                        )}
                    </Button>
                </DialogFooter>
            </Dialog>

        </>
    );
}
