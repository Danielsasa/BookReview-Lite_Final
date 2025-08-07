import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import '../styles/ReviewForm.css';
import '../styles/ReviewForm.css';

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
      <div className="review-user">Usuario actual: {user?.username}</div>
      <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Deja tu reseña</h3>
        <label className="review-label">Calificación:
          <select className="review-input" {...register('rating', { required: 'Selecciona una calificación' })}>
            <option value="">Selecciona</option>
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="5">5 ⭐</option>
          </select>
        </label>
        {errors.rating && <div className="review-error">{errors.rating.message}</div>}
        <label className="review-label">Comentario:
          <textarea className="review-input" {...register('comment', { required: 'El comentario es obligatorio' })} rows={3}/>
        </label>
        {errors.comment && <div className="review-error">{errors.comment.message}</div>}
        {submitError && <div className="review-error">{submitError}</div>}
        <button type="submit" className="review-btn">Enviar reseña</button>
      </form>
    </div>
  );
}

export default ReviewForm;
