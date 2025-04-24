import { useState, useEffect } from "react";
import TextInput from "../components/TextInput"; // Importamos el TextInput reutilizable
import { updateUser } from "../services/UpdateUser"; // Asegúrate de que esta función está correctamente configurada
import { getProfileData } from "../services/Auth/Profile";

const EditProfile = ({ userId, token }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
  });

  useEffect(() => {
      const fetchProfileData = async () => {
          try {
              const data = await getProfileData();  // Realizar la solicitud con el token
              console.log("Datos del perfil recibidos:", data);  // Verifica los datos del perfil
              setFormData(data);
          } catch (error) {
              console.error("Error al obtener los datos del perfil:", error);
              setError("No se pudieron cargar los datos del perfil.");
          }
      };
  
      fetchProfileData();
  }, []);

  // console.log("Token que tiene en editProfile:", token);
  // console.log("Id que tiene en editProfile:", userId);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    const success = await updateUser(
      formData.name,
      formData.surname,
      formData.username
    );

    if (success) {
      setSuccess(true);
      setFormData({ name: "", surname: "", username: "" }); // Limpia el formulario
    } else {
      setError("Error al actualizar el perfil.");
    }

    setIsSaving(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Perfil</h2>

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
          Perfil actualizado exitosamente.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <TextInput
          label="Nombre"
          labelClass="login"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ingrese su nombre"
          size="md"
          color="blue"
          required
        />
        <TextInput
          label="Apellido"
          labelClass="login"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          placeholder="Ingrese su apellido"
          size="md"
          color="blue"
          required
        />
        <TextInput
          label="Correo"
          labelClass="login"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Ingrese su correo"
          type="email"
          size="md"
          color="blue"
          required
        />

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded ${
            isSaving ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={isSaving}
        >
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
