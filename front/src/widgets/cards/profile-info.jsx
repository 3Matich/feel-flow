import React, { useState } from 'react';
import {
    PencilIcon,
} from "@heroicons/react/24/solid";
import { 
    Tooltip,
    ProfileInfoCard,
    Input,
} from '@material-tailwind/react';
import { profileData } from '@/data';

const EditableProfileInfo = ({ name, surname, username, mobile, location, description }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombre: name + ' ' + surname,
        telefono: mobile,
        email: username,
        ubicacion: location,
    });

    const handleEditClick = () => {
        setIsEditing(!isEditing); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <ProfileInfoCard
            title="Profile Information"
            description={description}
            details={{
                nombre: formData.nombre,
                telefono: formData.telefono,
                email: formData.email,
                ubicacion: formData.ubicacion,
            }}
            action={
                <Tooltip content="Edit Profile">
                    <PencilIcon
                        className="h-4 w-4 cursor-pointer text-blue-gray-500"
                        onClick={handleEditClick} // Cambiar el estado de edición
                    />
                </Tooltip>
            }
        >
            {isEditing ? (
                <div className="mt-4 space-y-4">
                    <div>
                        <Input 
                            name='nombre'
                            value={formData.nombre}
                            type='text'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="ubicacion"
                            value={formData.ubicacion}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-4 space-y-4">
                    <p>Nombre: {formData.nombre}</p>
                    <p>Telefono: {formData.telefono}</p>
                    <p>Email: {formData.email}</p>
                    <p>Ubicación: {formData.ubicacion}</p>
                </div>
            )}
        </ProfileInfoCard>
    );
};

// const InfoProfile = () => (
//     <div>
//         {profileData.map(
//             ({ name, surname, username, description, mobile, location }) => (
//                 <EditableProfileInfo
//                     key={username}
//                     name={name}
//                     surname={surname}
//                     username={username}
//                     description={description}
//                     mobile={mobile}
//                     location={location}
//                 />
//             )
//         )}
//     </div>
// );

export default EditableProfileInfo;
