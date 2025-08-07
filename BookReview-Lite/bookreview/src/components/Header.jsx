import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Header.css';

function Header() {
  const { user, logout } = useContext(UserContext);

  return (
    <header className="header">
      <nav className="nav">
        <h2 className="logo">📚 BookReview-Lite</h2>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>

          {user ? (
            <>
              <li><Link to="/profile">Perfil</Link></li>
              <li>
                <button
                  onClick={logout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
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
      </nav>
    </header>
  );
}

export default Header;
