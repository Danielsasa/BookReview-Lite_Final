import React, { useState, useEffect } from 'react';
import booksData from '../data/books.json';
import BookCard from '../components/BookCard';

function Home() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Simula carga desde JSON
    setBooks(booksData);
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
    <div style={{ padding: '2rem' }}>
      <h1>Catálogo de Libros</h1>

      <input
        type="text"
        placeholder="Buscar por título o autor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          margin: '1rem 0',
          padding: '0.5rem 1rem',
          width: '100%',
          maxWidth: '400px',
          fontSize: '1rem',
        }}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem',
      }}>
        {sortedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Home;
