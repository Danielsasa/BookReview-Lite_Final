import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../context/UserContext';
import booksData from '../data/books.json';
import '../styles/Profile.css';
import { ThemeContext } from '../App';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [editMsg, setEditMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ username: user?.username || "", email: user?.email || "", avatar: user?.avatar || "" });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [notif, setNotif] = useState("");

  // Usar localStorage si existe, si no, el JSON original
  const [books, setBooks] = useState(() => JSON.parse(localStorage.getItem('books')) || booksData);

  // Buscar reseñas hechas por el usuario
  const userReviews = books
    .flatMap(book =>
      (book.reviews || [])
        .filter(r => r.username === user?.username)
        .map(r => ({
          ...r,
          bookTitle: book.title,
          bookId: book.id,
          bookCover: book.cover
        }))
    );

  // Persistencia de modo oscuro
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode ? '1' : '0');
  }, [darkMode]);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) setDarkMode(saved === '1');
  }, []);

  // Eliminar reseña realmente
  const handleDeleteReview = (review, idx) => {
    const updatedBooks = books.map(book => {
      if (book.id === review.bookId) {
        return { ...book, reviews: (book.reviews || []).filter(r => !(r.username === user.username && r.date === review.date)) };
      }
      return book;
    });
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setNotif('Reseña eliminada correctamente');
    setTimeout(()=>setNotif(''), 2000);
  };

  // Edición de perfil real
  const handleEditProfile = () => {
    setEditMode(true);
    setEditForm({ username: user?.username || "", email: user?.email || "", avatar: user?.avatar || "" });
    setAvatarPreview(user?.avatar || "");
  };

  const handleEditFormChange = e => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = ev => setAvatarPreview(ev.target.result);
      reader.readAsDataURL(files[0]);
      setEditForm(f => ({ ...f, avatar: files[0] }));
    } else {
      setEditForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleEditFormSubmit = e => {
    e.preventDefault();
    let avatarUrl = avatarPreview;
    setUser({ ...user, username: editForm.username, email: editForm.email, avatar: avatarUrl });
    setEditMode(false);
    setNotif('Perfil actualizado correctamente');
    setTimeout(()=>setNotif(''), 2000);
  };

  // Accesibilidad: foco en el formulario de edición
  const editFormRef = useRef(null);
  useEffect(() => {
    if (editMode && editFormRef.current) {
      editFormRef.current.focus();
    }
  }, [editMode]);

  return (
    <section className={`profile-container${darkMode ? ' dark' : ''}`}> 
      <header className={`profile-header${darkMode ? ' dark' : ''}`}> 
        <span className="profile-icon">👤</span>
        <h1 className="profile-title">Perfil de Usuario</h1>
   
      </header>
      {notif && (
        <div className="notif-anim" role="alert">{notif}</div>
      )}
      {user ? (
        <article>
          <div className="profile-info">
            <div className="profile-avatar">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="profile-avatar-img" />
              ) : (
                <div className="avatar-placeholder">{user.username?.charAt(0).toUpperCase()}</div>
              )}
            </div>
            <div>
              {!editMode ? (
                <>
                  <p className="profile-user">
                    <strong>{user.username}</strong>
                    {user.email && <span className="profile-user-email"> (<em>{user.email}</em>)</span>}
                  </p>
                  <button className="edit-profile-btn" onClick={handleEditProfile} aria-label="Editar perfil">
                    <span className="edit-profile-icon">✏️</span>Editar perfil
                  </button>
                </>
              ) : (
                <form className="profile-edit-form" onSubmit={handleEditFormSubmit} aria-label="Formulario de edición de perfil">
                  <input
                    ref={editFormRef}
                    name="username"
                    type="text"
                    value={editForm.username}
                    onChange={handleEditFormChange}
                    placeholder="Nombre de usuario"
                    className="profile-edit-input"
                    required
                    aria-label="Nombre de usuario"
                  />
                  <input
                    name="email"
                    type="email"
                    value={editForm.email}
                    onChange={handleEditFormChange}
                    placeholder="Correo electrónico"
                    className="profile-edit-input"
                    required
                    aria-label="Correo electrónico"
                  />
                  <input
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleEditFormChange}
                    className="profile-edit-input"
                    aria-label="Avatar"
                  />
                  <div className="profile-edit-actions">
                    <button type="submit" className="profile-edit-btn">Guardar</button>
                    <button type="button" className="profile-cancel-btn" onClick={()=>setEditMode(false)}>Cancelar</button>
                  </div>
                </form>
              )}
            </div>
          </div>
          <h2 className="profile-reviews-title">Mis Reseñas</h2>
          <div className="profile-reviews-list">
            {userReviews.length === 0 ? (
              <p>No has hecho reseñas todavía.</p>
            ) : (
              <ul className="profile-reviews-ul">
                {userReviews.map((review, idx) => (
                  <li key={idx} className={`review-item${darkMode ? ' dark' : ''}`}> 
                    <img src={review.bookCover} alt={review.bookTitle} className="profile-review-cover" />
                    <div className="review-details">
                      <strong className="profile-review-title">{review.bookTitle}</strong>
                      <span className="profile-review-date">({new Date(review.date).toLocaleDateString()})</span><br />
                      <span className="profile-review-rating" aria-label={`Calificación: ${review.rating} estrellas`} title={`Calificación: ${review.rating} estrellas`}>{review.rating} ⭐</span> — <span className="profile-review-comment">{review.comment}</span>
                    </div>
                    <button className="delete-review-btn" onClick={() => handleDeleteReview(review, idx)} aria-label={`Eliminar reseña de ${review.bookTitle}`} title={`Eliminar reseña de ${review.bookTitle}`} tabIndex={0}>
                      🗑 Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ) : (
        <p className="profile-no-user">No hay usuario logueado.</p>
      )}
    </section>
  );
}

export default Profile;