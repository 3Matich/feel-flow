import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { CountriesSelect, InputPhoneFloatingLabel } from "@/components/Forms";
import { updateLoggedUser } from "@/api";

import { XMarkIcon } from "@heroicons/react/24/solid";

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


export function EditProfileDialog({ data, onSave, onCancel, open }) {
  const [errors, setErrors] = useState();
  const [formData, setFormData] = useState({
    name: data.name,
    surname: data.surname,
    username: data.username,
    country: data.country,
    phoneNumber: data.phoneNumber,
    description: data.description,
  });

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
    if (errors?.[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Validar que los campos obligatorios (excepto email y country) tengan valor
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const updatedData = { ...formData };
    const country = formData.country; // ejemplo: "Argentina"
    const phone = formData.phoneNumber;
    const prefix = countryPhonePrefixes[country] || "";
    const fullPhoneNumber = `${prefix}${phone}`; // ejemplo: +541112345678

    const updatedData = {
      ...formData,
      phoneNumber: fullPhoneNumber,
    };

    const result = await updateLoggedUser(updatedData);
    if (result && !result.errors) {
      onCancel();
    } else if (result?.errors) {
      const formattedErrors = result.errors.reduce((acc, curr) => {
        const key = Object.keys(curr)[0];
        acc[key] = curr[key];
        return acc;
      }, {});
      setErrors(formattedErrors);
    } else {
      setErrors({ general: "Error desconocido del servidor." });
    }
  };

  return (
    <Dialog open={open} handler={onCancel} className="card">
      <DialogHeader className="flex items-center justify-between">
        <div>
          <Typography variant="h5" className="mb-1">
            {formData.name} {formData.surname}
          </Typography>
        </div>
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Cerrar diálogo"
        >
          <XMarkIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
      </DialogHeader>
      <DialogBody>
        <div className="flex flex-col gap-4">
          {/* Descripción */}
          <Textarea
            rows={3}
            resize
            size="md"
            variant="standard"
            label="Sobre ti"
            name="description"
            placeholder={formData.description}
            value={formData.description}
            onChange={handleChange}
            className="text-light-text-secondary dark:text-dark-text-secondary"
            // error={errors?.description}
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
                // error={errors?.surname}
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
                // error={errors?.name}
              />
            </div>
          </div>
          <hr />
          {/* Teléfono */}
          <div className="grid grid-cols-5 gap-3 items-center">
            <Typography variant="h6" className="w-32">
              Telefono
            </Typography>
            <div className="flex gap-2 items-center col-span-4">
              <div className="min-w-[50px] px-2 py-1 border rounded text-center bg-gray-50">
                {countryPhonePrefixes[formData.country] || "+__"}
              </div>
              <InputPhoneFloatingLabel
                content={formData.phoneNumber}
                name="phoneNumber"
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, phoneNumber: value }))
                }
                // error={"Ingrese el prefijo con el + incluido"}
              />
            </div>
            {!countryPhonePrefixes[formData.country] && <p className="text-sm col-span-5 text-yellow-900 text center">Ingrese el prefijo con el + incluido, o seleccione otro Pais</p>}
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
                // error={errors?.username}
                disabled
              />
            </div>
          </div>
          <hr />
          {/* Nacionalidad */}
          <div className="grid grid-cols-5 gap-3 items-center">
            <Typography
              variant="h6"
              className="w-32 text-light-text dark:text-dark-text"
            >
              Pais de Residencia
            </Typography>
            <div className="col-span-4">
              <CountriesSelect
                userCountry={formData.country}
                name="country"
                onChange={handleChange}
                closeOnSelect
                className="text-light-text-secondary dark:text-dark-text-secondary"
                // error={errors?.country}
              />
            </div>
          </div>
          <hr />
        </div>
      </DialogBody>
      <DialogFooter className="justify-center space-x-4">
        <Button
          variant="text"
          className="button-cancel rounded-lg px-6 py-2 shadow-md"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          variant="text"
          className="button-save rounded-lg px-6 py-2 shadow-md"
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default EditProfileDialog;
