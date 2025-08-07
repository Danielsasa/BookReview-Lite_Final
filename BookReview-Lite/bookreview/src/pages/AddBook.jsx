import React, { useState } from 'react';
import '../styles/AddBook.css';
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
    <div className="addbook-anim">
      <h2>Agregar nuevo libro</h2>
      <form className="addbook-form" onSubmit={handleSubmit} aria-label="Formulario para agregar libro">
        <label className="addbook-label">Título:
          <input className="addbook-input" type="text" value={title} onChange={e=>setTitle(e.target.value)} required aria-label="Título del libro"/>
        </label>
        <label className="addbook-label">Autor:
          <input className="addbook-input" type="text" value={author} onChange={e=>setAuthor(e.target.value)} required aria-label="Autor del libro"/>
        </label>
        <label className="addbook-label">Año:
          <input className="addbook-input" type="number" value={year} onChange={e=>setYear(e.target.value)} required aria-label="Año de publicación"/>
        </label>
        <label className="addbook-label">Género:
          <input className="addbook-input" type="text" value={genre} onChange={e=>setGenre(e.target.value)} required placeholder="Ej: Fantasía, Novela, Ciencia Ficción..." aria-label="Género literario"/>
        </label>
        <label className="addbook-label">URL de portada:
          <input className="addbook-input" type="text" value={cover} onChange={e=>{setCover(e.target.value); setShowPreview(!!e.target.value);}} placeholder="https://...jpg/png/webp/gif" aria-label="URL de portada"/>
        </label>
        {showPreview && cover && validateImageUrl(cover) && (
          <div className="addbook-preview">
            <img src={cover} alt="Previsualización de portada" className="addbook-preview-img" />
            <div className="addbook-preview-title">Previsualización de portada</div>
            <span className="addbook-preview-badge">Preview</span>
          </div>
        )}
        <label className="addbook-label">Sinopsis:
          <textarea className="addbook-textarea" value={synopsis} onChange={e=>setSynopsis(e.target.value)} rows={3} aria-label="Sinopsis"/>
        </label>
        {error && <div className="addbook-error">{error}</div>}
        {success && <div className="addbook-success">{success}</div>}
        <button type="submit" className="addbook-btn">Agregar libro</button>
      </form>
    </div>
  );
}

export default AddBook;
