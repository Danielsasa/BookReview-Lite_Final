import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup } = useContext(UserContext);
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    setError(null);
    try {
      signup(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto' }}>
      <h2>Registro</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <input
          placeholder="Nombre de usuario"
          {...register('username', { required: 'El nombre es obligatorio' })}
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          {...register('email', {
            required: 'El correo es obligatorio',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Correo no válido',
            },
          })}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

        <input
          type="number"
          placeholder="Edad"
          {...register('age', {
            required: 'La edad es obligatoria',
            min: { value: 1, message: 'Edad mínima 1' },
            max: { value: 120, message: 'Edad máxima 120' },
          })}
        />
        {errors.age && <p style={{ color: 'red' }}>{errors.age.message}</p>}

        <input
          type="password"
          placeholder="Contraseña"
          {...register('password', {
            required: 'La contraseña es obligatoria',
            minLength: { value: 6, message: 'Mínimo 6 caracteres' },
          })}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
}

export default Signup;
