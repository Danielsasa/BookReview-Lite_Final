import React from 'react';
import { useParams } from 'react-router-dom';
import booksData from '../data/books.json';
import ReviewForm from '../components/ReviewForm';
import '../styles/BookDetail.css';

function BookDetail() {
  const { id } = useParams();
  const [books, setBooks] = React.useState(() => JSON.parse(localStorage.getItem('books')) || booksData);
  const book = books.find((b) => b.id === id);

  // Función para agregar reseña y rating
  const addReview = (bookId, review) => {
    setBooks(prevBooks => {
      const updatedBooks = prevBooks.map(b => {
        if (b.id === bookId) {
          // Evitar que el mismo usuario deje más de una reseña
          const filteredReviews = b.reviews.filter(r => r.username !== review.username);
          return { ...b, reviews: [...filteredReviews, review] };
        }
        return b;
      });
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      return updatedBooks;
    });
  };

  if (!book) return <h2>Libro no encontrado</h2>;

  // Calcular rating promedio
  const averageRating = book.reviews.length
    ? (book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length).toFixed(1)
    : 'Sin calificaciones';

  return (
    <div className="book-detail-container">
      <div className="book-detail-header">
        <img className="book-detail-cover" src={book.cover} alt={book.title} />
        <div className="book-detail-info">
          <h2>{book.title}</h2>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Año:</strong> {book.year}</p>
          <p>{book.synopsis}</p>
          <p style={{marginTop: '1rem', fontWeight: 'bold', fontSize: '1.1rem'}}>
            Rating promedio: {averageRating} {averageRating !== 'Sin calificaciones' && '⭐'}
          </p>
        </div>
      </div>

      <div className="book-detail-reviews">
        <h3>Reseñas</h3>
        {book.reviews.length === 0 ? (
          <p>No hay reseñas aún.</p>
        ) : (
          <ul>
            {book.reviews.map((r, index) => (
              <li key={index} className="review-item">
                <strong style={{color: '#2a7ae4'}}>{r.username}</strong> <span style={{color: '#888'}}>({new Date(r.date).toLocaleDateString()})</span> - <span style={{color: '#e4a72a'}}>{r.rating}⭐</span><br />
                <span style={{fontStyle: 'italic'}}>{r.comment}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="book-detail-form">
        <h3>Agregar Reseña</h3>
        {window.localStorage.getItem('bookreview-user') ? (
          <div style={{textAlign:'center', margin:'1.5rem 0'}}>
            <button style={{background:'#2a7ae4',color:'#fff',border:'none',borderRadius:'8px',padding:'0.7rem 1.5rem',fontSize:'1.1rem',cursor:'pointer',boxShadow:'0 2px 8px #2a7ae422', marginBottom:'1rem'}} onClick={()=>{
              document.getElementById('review-form-section').scrollIntoView({behavior:'smooth'});
            }}>
              Agregar reseña
            </button>
            <div id="review-form-section">
              <ReviewForm bookId={book.id} addReview={addReview} />
            </div>
          </div>
        ) : (
          <div style={{textAlign:'center', margin:'1.5rem 0'}}>
            <p style={{color:'#e53935', fontWeight:'bold'}}>Debes iniciar sesión para dejar una reseña.</p>
            <a href="/login">
              <button style={{background:'#2a7ae4',color:'#fff',border:'none',borderRadius:'8px',padding:'0.7rem 1.5rem',fontSize:'1.1rem',cursor:'pointer',boxShadow:'0 2px 8px #2a7ae422'}}>Iniciar sesión</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetail;