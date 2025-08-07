import React from 'react';
import './BookCard.css'; // Assuming you have a CSS file for styling


function BookCard({ book }) {
  const averageRating = book.reviews.length
    ? (book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length).toFixed(1)
    : "Sin calificaciones";

  return (
    <div className="book-card">
      <img src={book.cover} alt={book.title} className="book-cover" />
      <div className="book-info">
        <h3>{book.title}</h3>
        <p><strong>{book.author}</strong> ({book.year})</p>
        <p><em>Rating:</em> {averageRating} ⭐</p>
      </div>
    </div>
  );
}

export default BookCard;