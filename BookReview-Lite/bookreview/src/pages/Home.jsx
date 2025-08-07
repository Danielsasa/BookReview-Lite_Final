import React, { useState, useEffect } from 'react';
import booksData from '../data/books.json';
import BookCard from '../components/BookCard';

function Home() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Cargar desde localStorage si existe, si no, el JSON original
    const storedBooks = JSON.parse(localStorage.getItem('books')) || booksData;
    setBooks(storedBooks);
  }, []);

  // Filtrar por búsqueda (título o autor)
  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author}`.toLowerCase().includes(search.toLowerCase())
  );

  // Ordenar por rating promedio
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const avgA = a.reviews.length
      ? a.reviews.reduce((s, r) => s + r.rating, 0) / a.reviews.length
      : 0;
    const avgB = b.reviews.length
      ? b.reviews.reduce((s, r) => s + r.rating, 0) / b.reviews.length
      : 0;
    return avgB - avgA;
  });

  return (
    <div className="home-container">
      <h1 className="home-title">📚 Catálogo de Libros</h1>

      <input
        className="home-search"
        type="text"
        placeholder="Buscar por título o autor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="book-grid">
        {sortedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Home;
