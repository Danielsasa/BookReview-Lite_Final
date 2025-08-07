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
      <header className={`profile-header${darkMode ? ' dark' : ''}`} style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2.2rem 1rem 1.5rem 1rem',background:'linear-gradient(90deg, #2a7ae4 60%, #fff 100%)',boxShadow:'0 2px 8px rgba(0,0,0,.08)',borderRadius:'16px 16px 0 0',marginBottom:'2rem',overflow:'hidden'}}> 
        <span style={{fontSize:'3.2rem',marginBottom:'0.5rem',display:'block',textShadow:'1px 2px 8px #0002'}}>👤</span>
        <h1 style={{fontSize:'2.2rem',fontWeight:'bold',color:'#fff',textShadow:'1px 1px 4px #0005',marginBottom:'0.2rem',textAlign:'center',letterSpacing:'1px'}}>Perfil de Usuario</h1>
        <button 
          style={{position:'absolute',top:'1.2rem',right:'1.2rem',padding:'0.5rem 1.2rem',borderRadius:'8px',border:'none',background:darkMode?'#222':'#e4eaf7',color:darkMode?'#fff':'#222',cursor:'pointer',boxShadow:'0 1px 4px rgba(0,0,0,.08)',fontWeight:'bold',fontSize:'1rem',transition:'background .2s'}} 
          onClick={()=>setDarkMode(m=>!m)}
          title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {darkMode ? '🌙 Modo claro' : '🌙 Modo oscuro'}
        </button>
      </header>
      {notif && (
        <div className="notif-anim" style={{background:'#1976d2',color:'#fff',borderRadius:'8px',padding:'0.7rem 1.2rem',textAlign:'center',margin:'1rem auto',maxWidth:'400px',boxShadow:'0 1px 4px rgba(25,118,210,.12)',fontWeight:'bold'}} role="alert">{notif}</div>
      )}
      {user ? (
        <article>
          <div className="profile-info">
            <div className="profile-avatar" style={{transition:'transform .3s',transform:'scale(1.05)'}}>
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" width={80} style={{boxShadow:'0 2px 8px rgba(0,0,0,.12)'}} />
              ) : (
                <div className="avatar-placeholder" style={{transition:'background .3s'}}>{user.username?.charAt(0).toUpperCase()}</div>
              )}
            </div>
            <div>
              {!editMode ? (
                <>
                  <p style={{fontSize:'1.2rem',marginBottom:'0.3rem',color:darkMode?'#fff':'#222'}}>
                    <strong>{user.username}</strong>
                    {user.email && <span style={{color:darkMode?'#90caf9':'#1976d2'}}> (<em>{user.email}</em>)</span>}
                  </p>
                  <button className="edit-profile-btn" onClick={handleEditProfile} style={{position:'relative'}} aria-label="Editar perfil">
                    <span style={{marginRight:'6px'}}>✏️</span>Editar perfil
                  </button>
                </>
              ) : (
                <form onSubmit={handleEditFormSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem',marginTop:'0.5rem'}} aria-label="Formulario de edición de perfil">
                  <input
                    ref={editFormRef}
                    name="username"
                    type="text"
                    value={editForm.username}
                    onChange={handleEditFormChange}
                    placeholder="Nombre de usuario"
                    style={{padding:'0.5rem',borderRadius:'6px',border:'1px solid #ccc',fontSize:'1rem'}}
                    required
                    aria-label="Nombre de usuario"
                  />
                  <input
                    name="email"
                    type="email"
                    value={editForm.email}
                    onChange={handleEditFormChange}
                    placeholder="Correo electrónico"
                    style={{padding:'0.5rem',borderRadius:'6px',border:'1px solid #ccc',fontSize:'1rem'}}
                    required
                    aria-label="Correo electrónico"
                  />
                  <input
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleEditFormChange}
                    style={{padding:'0.5rem',borderRadius:'6px',border:'1px solid #ccc',fontSize:'1rem'}}
                    aria-label="Avatar"
                  />
                  <div style={{display:'flex',gap:'1rem'}}>
                    <button type="submit" style={{background:'#1976d2',color:'#fff',border:'none',borderRadius:'6px',padding:'0.5rem 1.2rem',fontWeight:'bold',cursor:'pointer'}}>Guardar</button>
                    <button type="button" style={{background:'#e53935',color:'#fff',border:'none',borderRadius:'6px',padding:'0.5rem 1.2rem',fontWeight:'bold',cursor:'pointer'}} onClick={()=>setEditMode(false)}>Cancelar</button>
                  </div>
                </form>
              )}
            </div>
          </div>
          <h2 style={{marginTop:'2.5rem',color:darkMode?'#fff':'#222'}}>Mis Reseñas</h2>
          <div style={{marginBottom:'1.5rem',color:darkMode?'#bbb':'#888',fontSize:'1rem'}}>
            {userReviews.length === 0 ? (
              <p>No has hecho reseñas todavía.</p>
            ) : (
              <ul style={{padding:0}}>
                {userReviews.map((review, idx) => (
                  <li key={idx} className={`review-item${darkMode ? ' dark' : ''}`}> 
                    <img src={review.bookCover} alt={review.bookTitle} width={40} style={{borderRadius:'6px',boxShadow:'0 1px 4px rgba(0,0,0,.10)'}} />
                    <div className="review-details">
                      <strong style={{color:darkMode?'#90caf9':'#1a73e8'}}>{review.bookTitle}</strong>
                      <span style={{color:darkMode?'#bbb':'#888'}}>({new Date(review.date).toLocaleDateString()})</span><br />
                      <span style={{color:'#e4a72a',fontWeight:'bold'}} aria-label={`Calificación: ${review.rating} estrellas`} title={`Calificación: ${review.rating} estrellas`}>{review.rating} ⭐</span> — <span style={{fontStyle:'italic',color:darkMode?'#eee':'#444'}}>{review.comment}</span>
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
        <p style={{textAlign:'center',color:'#e53935',fontWeight:'bold'}}>No hay usuario logueado.</p>
      )}
    </section>
  );
}

export default Profile;