import React, { createContext, useState, useEffect } from 'react';
import booksData from '../data/books.json';


export const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Al montar, carga libros y sus reseñas desde localStorage
    const booksWithReviews = booksData.map(book => {
      const storedReviews = JSON.parse(localStorage.getItem(`reviews-${book.id}`)) || [];
      return { ...book, reviews: storedReviews };
    });
    setBooks(booksWithReviews);
  }, []);

  // Función para agregar una reseña a un libro
  const addReview = (bookId, review) => {
    setBooks(prevBooks => {
      const updatedBooks = prevBooks.map(book => {
        if (book.id === bookId) {
          const updatedReviews = [...book.reviews, review];
          // Guardar en localStorage
          localStorage.setItem(`reviews-${bookId}`, JSON.stringify(updatedReviews));
          return { ...book, reviews: updatedReviews };
        }
        return book;
      });
      return updatedBooks;
    });
  };

  return (
    <BooksContext.Provider value={{ books, addReview }}>
      {children}
    </BooksContext.Provider>
  );
}
