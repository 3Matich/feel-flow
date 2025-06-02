import React from 'react';

const ProfileInfo = () => {
  return (
    <div style={styles.infoCard}>
      <h3 style={styles.title}>Información del Perfil</h3>
      <p><strong>Nombre Completo:</strong> Juan Pérez</p>
      <p><strong>Email:</strong> juan.perez@example.com</p>
      <p><strong>Empresa:</strong> Empresa ABC</p>
      <p><strong>Equipo:</strong> Desarrollo</p>
      <p><strong>Rol:</strong> Ingeniero</p>
    </div>
  );
};

const styles = {
  infoCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '10px',
    fontSize: '18px',
    color: '#333',
  },
};

export default ProfileInfo;
