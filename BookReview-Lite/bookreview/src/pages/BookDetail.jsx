import React from 'react';
import { useParams } from 'react-router-dom';
import booksData from '../data/books.json';
import ReviewForm from '../components/ReviewForm';
import '../styles/BookDetail.css';

function BookDetail() {
  const { id } = useParams();

  // Cargar libros desde localStorage o desde JSON si es primera vez
  const storedBooks = JSON.parse(localStorage.getItem('books')) || booksData;
  const book = storedBooks.find((b) => b.id === id);

  if (!book) return <h2>Libro no encontrado</h2>;

  return (
    <div className="book-detail-container">
      <div className="book-detail-header">
        <img className="book-detail-cover" src={book.cover} alt={book.title} />
        <div className="book-detail-info">
          <h2>{book.title}</h2>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Año:</strong> {book.year}</p>
          <p>{book.synopsis}</p>
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
                <strong>{r.author}</strong> ({r.date}) - {r.rating}⭐<br />
                {r.comment}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="book-detail-form">
        <h3>Agregar Reseña</h3>
        <ReviewForm bookId={book.id} />
      </div>
    </div>
  );
}

export default BookDetail;