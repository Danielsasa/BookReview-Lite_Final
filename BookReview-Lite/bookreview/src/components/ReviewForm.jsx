import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';

function ReviewForm({ bookId, addReview }) {
  const { user } = useContext(UserContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = (data) => {
    if (!user) {
      setSubmitError('Debes iniciar sesión para dejar una reseña.');
      return;
    }
    const newReview = {
      username: user.username,
      rating: Number(data.rating),
      comment: data.comment,
      date: new Date().toISOString(),
    };
    addReview(bookId, newReview);
    reset();
    setSubmitError(null);
  };

  if (!user) {
    return <p>Inicia sesión para dejar una reseña.</p>;
  }

  return (
    <div>
      <div style={{marginBottom:'1rem', color:'#2a7ae4', fontWeight:'bold'}}>
        Usuario actual: {user?.username}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '1rem' }}>
        <h3>Deja tu reseña</h3>
        <label>
          Calificación:
          <select {...register('rating', { required: 'Selecciona una calificación' })} style={{ marginLeft: '0.5rem' }}>
            <option value="">Selecciona...</option>
            {[1,2,3,4,5].map(n => (
              <option key={n} value={n}>{n} estrella{n>1?'s':''}</option>
            ))}
          </select>
        </label>
        {errors.rating && <p style={{ color: 'red' }}>{errors.rating.message}</p>}

        <label style={{ display: 'block', marginTop: '0.5rem' }}>
          Comentario:
          <textarea
            {...register('comment', { required: 'El comentario es obligatorio' })}
            rows={4}
            style={{ width: '100%', marginTop: 4 }}
          />
        </label>
        {errors.comment && <p style={{ color: 'red' }}>{errors.comment.message}</p>}

        {submitError && <p style={{ color: 'red' }}>{submitError}</p>}

        <button type="submit" style={{ marginTop: '0.5rem' }}>Enviar reseña</button>
      </form>
    </div>
  );
}

export default ReviewForm;
