
import React, { useState, createContext } from 'react';
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import AddBook from './pages/AddBook';

export const ThemeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);

  React.useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <UserProvider>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <Router>
          <Header />
          <main className={darkMode ? 'dark' : ''} style={{ minHeight: '80vh', padding: '2rem', background: darkMode ? '#181a1b' : '#f6f8fa', color: darkMode ? '#fff' : '#222', transition: 'background .2s, color .2s' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book/:id" element={<BookDetail />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/add-book" element={<AddBook />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ThemeContext.Provider>
    </UserProvider>
  );
}

export default App;
