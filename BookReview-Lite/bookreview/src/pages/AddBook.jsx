import React, { useState } from 'react';
import booksData from '../data/books.json';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [cover, setCover] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const validateImageUrl = (url) => {
    // Solo permite URLs que parecen imágenes válidas
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  };

  const validate = () => {
    if (!title.trim() || !author.trim() || !year.trim() || !synopsis.trim() || !genre.trim()) {
      setError('Todos los campos son obligatorios.');
      return false;
    }
    if (isNaN(Number(year)) || Number(year) < 1000 || Number(year) > 2100) {
      setError('El año debe ser válido (1000-2100).');
      return false;
    }
    if (cover && !validateImageUrl(cover)) {
      setError('La URL de portada debe ser una imagen válida (jpg, png, webp, gif).');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const books = JSON.parse(localStorage.getItem('books')) || booksData;
    const newBook = {
      id: (books.length + 1).toString(),
      title,
      author,
      year: Number(year),
      cover: cover || 'https://picsum.photos/120/180?random=' + (books.length + 1),
      synopsis,
      genre,
      reviews: []
    };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    setSuccess('Libro agregado correctamente');
    setTimeout(()=>{
      setSuccess('');
      setTitle('');
      setAuthor('');
      setYear('');
      setCover('');
      setSynopsis('');
      setGenre('');
      setShowPreview(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="addbook-anim" style={{maxWidth:'500px',margin:'2rem auto',background:'var(--addbook-bg, #fff)',padding:'2rem',borderRadius:'16px',boxShadow:'0 4px 16px #2a7ae422',animation:'fadeInBlock 0.7s'}}>
      <h2 style={{color:'var(--addbook-title, #2a7ae4)',textAlign:'center',marginBottom:'1.5rem'}}>Agregar nuevo libro</h2>
      <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.2rem'}} aria-label="Formulario para agregar libro">
        <label style={{fontWeight:'bold'}}>Título:
          <input type="text" value={title} onChange={e=>setTitle(e.target.value)} required style={{width:'100%',marginTop:'0.3rem',marginBottom:'0.7rem',padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #2a7ae4',fontSize:'1rem'}} aria-label="Título del libro"/>
        </label>
        <label style={{fontWeight:'bold'}}>Autor:
          <input type="text" value={author} onChange={e=>setAuthor(e.target.value)} required style={{width:'100%',marginTop:'0.3rem',marginBottom:'0.7rem',padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #2a7ae4',fontSize:'1rem'}} aria-label="Autor del libro"/>
        </label>
        <label style={{fontWeight:'bold'}}>Año:
          <input type="number" value={year} onChange={e=>setYear(e.target.value)} required style={{width:'100%',marginTop:'0.3rem',marginBottom:'0.7rem',padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #2a7ae4',fontSize:'1rem'}} aria-label="Año de publicación"/>
        </label>
        <label style={{fontWeight:'bold'}}>Género:
          <input type="text" value={genre} onChange={e=>setGenre(e.target.value)} required placeholder="Ej: Fantasía, Novela, Ciencia Ficción..." style={{width:'100%',marginTop:'0.3rem',marginBottom:'0.7rem',padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #2a7ae4',fontSize:'1rem'}} aria-label="Género literario"/>
        </label>
        <label style={{fontWeight:'bold'}}>URL de portada:
          <input type="text" value={cover} onChange={e=>{setCover(e.target.value); setShowPreview(!!e.target.value);}} placeholder="https://...jpg/png/webp/gif" style={{width:'100%',marginTop:'0.3rem',marginBottom:'0.7rem',padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #2a7ae4',fontSize:'1rem'}} aria-label="URL de portada"/>
        </label>
        {showPreview && cover && validateImageUrl(cover) && (
          <div style={{
            textAlign:'center',
            marginBottom:'1rem',
            animation:'fadeInBlock 0.7s',
            background:'linear-gradient(135deg,#e4eaf7 60%,#fff 100%)',
            borderRadius:'12px',
            boxShadow:'0 4px 16px #2a7ae422',
            padding:'1rem 0.5rem',
            border:'1.5px solid #2a7ae4',
            position:'relative'
          }}>
            <img src={cover} alt="Previsualización de portada" style={{
              maxWidth:'120px',
              maxHeight:'180px',
              borderRadius:'10px',
              boxShadow:'0 4px 16px #2a7ae422',
              border:'2px solid #1976d2',
              transition:'transform .3s',
              transform:'scale(1.04)',
              background:'#fff'
            }} />
            <div style={{
              fontSize:'1.05rem',
              color:'#1976d2',
              marginTop:'0.7rem',
              fontWeight:'bold',
              letterSpacing:'0.5px',
              textShadow:'0 1px 4px #2a7ae422'
            }}>Previsualización de portada</div>
            <span style={{
              position:'absolute',
              top:'10px',
              right:'14px',
              background:'#1976d2',
              color:'#fff',
              fontSize:'0.8rem',
              padding:'2px 10px',
              borderRadius:'8px',
              boxShadow:'0 2px 8px #2a7ae422',
              fontWeight:'bold',
              opacity:'0.85'
            }}>Preview</span>
          </div>
        )}
        <label style={{fontWeight:'bold'}}>Sinopsis:
          <textarea value={synopsis} onChange={e=>setSynopsis(e.target.value)} rows={3} style={{width:'100%',marginTop:'0.3rem',marginBottom:'0.7rem',padding:'0.7rem',borderRadius:'8px',border:'1.5px solid #2a7ae4',fontSize:'1rem'}} aria-label="Sinopsis"/>
        </label>
        {error && <div style={{color:'#e53935',background:'#fff0f0',borderRadius:'8px',padding:'0.5rem 1rem',fontWeight:'bold',textAlign:'center',animation:'fadeNotif 0.6s'}}>{error}</div>}
        {success && <div style={{color:'#1976d2',background:'#e4eaf7',borderRadius:'8px',padding:'0.5rem 1rem',fontWeight:'bold',textAlign:'center',animation:'fadeNotif 0.6s'}}>{success}</div>}
        <button type="submit" style={{
          background:'linear-gradient(90deg,#1976d2 60%,#2a7ae4 100%)',
          color:'#fff',
          border:'none',
          borderRadius:'12px',
          padding:'1rem 2rem',
          fontSize:'1.18rem',
          cursor:'pointer',
          boxShadow:'0 4px 16px #2a7ae422',
          fontWeight:'bold',
          letterSpacing:'0.5px',
          transition:'background .2s, transform .2s',
          marginTop:'0.5rem',
          textShadow:'0 1px 4px #2a7ae422'
        }}>Agregar libro</button>
      </form>
    </div>
  );
}

export default AddBook;
