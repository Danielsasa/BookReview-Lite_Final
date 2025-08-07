// src/pages/Profile.jsx
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Profile() {
  const { user } = useContext(UserContext);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Perfil de Usuario</h1>
      {user ? (
        <>
          <p>Bienvenido, <strong>{user.name}</strong>!</p>
          <p>Aquí podrás ver y gestionar tus reseñas próximamente.</p>
        </>
      ) : (
        <p>No hay usuario logueado.</p>
      )}
    </div>
  );
}

export default Profile;
