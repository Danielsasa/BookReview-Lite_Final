
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ThemeContext } from '../App';

function Header() {
  const { user, logout } = useContext(UserContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <header className={`header${darkMode ? ' dark' : ''}`}>
      <nav className="nav">
        <div className="nav-group">
          <h2 className="logo">📚 BookReview-Lite</h2>
          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            {user ? (
              <>
                <li><Link to="/add-book" className="addbook-link">Agregar libro</Link></li>
                <li><Link to="/profile">Perfil</Link></li>
                <li>
                  <button
                    onClick={logout}
                    className="logout-btn">
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login">Iniciar Sesión</Link></li>
                <li><Link to="/signup">Registrarse</Link></li>
              </>
            )}
          </ul>
        </div>
        <div className="header-user-group">
          <button
            onClick={()=>setDarkMode(m=>!m)}
            className={`header-toggle${darkMode ? ' dark' : ''}`}
            title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {darkMode ? '🌙 Modo claro' : '🌙 Modo oscuro'}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
