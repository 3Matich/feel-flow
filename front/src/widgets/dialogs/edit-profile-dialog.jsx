import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Avatar,
  Select,
  Option,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Textarea,
} from "@material-tailwind/react";
import { platformSettingsData, conversationsData, projectsData, profileData } from "@/data";
import { CountriesSelect, InputPhoneFloatingLabel } from "@/components/Forms";
import { updateLoggedUser } from "@/api/users";

const COUNTRIES = ["Argentina (+54)", "France (+33)", "Germany (+49)", "Spain (+34)", "USA (+1)"];
const CODES = ["+54", "+33", "+49", "+34", "+1"];
const NATIONALITIES = ["Argentina", "Uruguay", "Chile", "Paraguay", "Brasil", "Peru", "Bolivia", "Ecuador", "Colombia", "Venezuela", "Mexico", "España"];



export function EditProfileDialog({ data, onSave, onCancel, open }) {

  const [country, setCountry] = React.useState(0);
  const [editProfile, setEditProfile] = React.useState(true);
  const [errors, setErrors] = useState();

  // const [formData, setFormData] = React.useState(data.data);
  // const [description, setDescription] = React.useState(data.desc);

  const [formData, setFormData] = useState({
    name: data.name,
    surname: data.surname,
    username: data.username,
    country: data.country,
    phoneNumber: data.phoneNumber,
    description: data.description,
  });

  /*
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        surname: data.surname || "",
        username: data.username || "",
        // El país se fija siempre en "Argentina"
        country: data.country,
        phoneNumber: data.phoneNumber || "+14155552671",
        description: data.description || "",
      });
    }
  }, [data]);
  */

  const handleChange = (e) => {
    // Si el evento es de InputPhoneFloatingLabel, toma el valor directamente
    const { name, value } = e.target || {};
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      // Caso especial para InputPhoneFloatingLabel
      setFormData((prev) => ({ ...prev, phoneNumber: e }));
    }

    // Elimina el error al cambiar el campo
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Validar que los campos obligatorios (excepto email y country) tengan valor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, surname, phoneNumber, description } = formData;
    /*
    if (
      !name.trim() ||
      !surname.trim() ||
      !phoneNumber.toString().trim() ||
      !description.trim()
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }
    */
    const updatedData = { ...formData };
    // console.log("Perfil actualizado:", updatedData);
    const result = await updateLoggedUser(updatedData)
    // onSave(updatedData);
    if (result) {
      onCancel();
    } else {
      const formattedErrors = result.errors.reduce((acc, curr) => {
        const key = Object.keys(curr)[0];
        acc[key] = curr[key];
      }, {});
      setErrors(formattedErrors);
    }
    // console.log(errors[1])
  };

  return (
    <Dialog open={open} handler={onCancel}>
      <DialogHeader>
        <div>
          <Typography variant="h5" color="blue-gray" className="mb-1">
            {formData.name} {formData.surname}
          </Typography>
        </div>
      </DialogHeader>
      <DialogBody>
        <div className="flex flex-col gap-4">
          {/* Descripción */}
          <Textarea
            rows={3}
            resize={true}
            size="md"
            variant="standard"
            label="Sobre ti"
            placeholder={formData.description}
            value={formData.description}
            onChange={handleChange}
            name="description"
            // error={errors.description}
          />
          <hr />
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-5 gap-3 items-center">
            <Typography variant="h6" className="w-2">
              Nombre
            </Typography>
            <div className="col-span-2">
              <Input
                label="Apellido"
                name="surname"
                type="text"
                placeholder={formData.surname}
                value={formData.surname}
                onChange={handleChange}
                // error={errors.surname}
              />
            </div>
            <div className="col-span-2">
              <Input
                label="Nombre"
                name="name"
                type="text"
                placeholder={formData.name}
                value={formData.name}
                onChange={handleChange}
                // error={errors.name}
              />
            </div>
          </div>
          <hr />
          {/* Teléfono */}
          <div className="grid grid-cols-5 gap-3 items-center">
            <Typography variant="h6" className="w-32">
              Telefono
            </Typography>
            <div className="col-span-4">
              <InputPhoneFloatingLabel
                content={formData.phoneNumber}
                name="phoneNumber"
                onChange={(value) => setFormData((prev) => ({ ...prev, phoneNumber: value }))}
                // error={errors.phoneNumber}
              />


            </div>
          </div>
          <hr />
          {/* Correo Electrónico (deshabilitado) */}
          <div className="grid grid-cols-5 gap-3 items-center">
            <Typography variant="h6" className="w-32">
              Correo electrónico
            </Typography>
            <div className="col-span-4">
              <Input
                label="Correo electrónico"
                name="username"
                type="email"
                placeholder={formData.username}
                value={formData.username}
                // error={errors.username}
                disabled
              />
            </div>
          </div>
          <hr />
          {/* Nacionalidad */}
          <div className="grid grid-cols-5 gap-3 items-center">
            <Typography variant="h6" className="w-32 text-light-text dark:text-dark-text">
              Pais de Residencia
            </Typography>
            <div className="col-span-4">
              <CountriesSelect
                userCountry={formData.country}
                name="country"
                onChange={handleChange}
                className="text-light-text-secondary dark:text-dark-text-secondary"
                // error={errors.country}
              />
            </div>
          </div>
          <hr />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="gradient" color="green" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default EditProfileDialog;
