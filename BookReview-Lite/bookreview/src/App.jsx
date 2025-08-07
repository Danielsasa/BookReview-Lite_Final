import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';


function App() {
  return (
    <Router>
      <Header />

      <main style={{ minHeight: '80vh', padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/profile"element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
