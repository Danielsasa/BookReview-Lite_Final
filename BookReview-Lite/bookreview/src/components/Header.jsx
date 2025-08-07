
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ThemeContext } from '../App';

function Header() {
  const { user, logout } = useContext(UserContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <header className={`header${darkMode ? ' dark' : ''}`}>
      <nav className="nav" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'2rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'1.5rem'}}>
          <h2 className="logo" style={{marginRight:'1.5rem'}}>📚 BookReview-Lite</h2>
          <ul className="nav-links" style={{display:'flex',alignItems:'center',gap:'1.2rem'}}>
            <li><Link to="/">Inicio</Link></li>
            {user ? (
              <>
                <li><Link to="/add-book" style={{background:'#2a7ae4',color:'#fff',borderRadius:'8px',padding:'0.3rem 1rem',fontWeight:'bold'}}>Agregar libro</Link></li>
                <li><Link to="/profile">Perfil</Link></li>
                <li>
                  <button
                    onClick={logout}
                    style={{background:'#e53935',color:'#fff',border:'none',borderRadius:'8px',padding:'0.3rem 1rem',fontWeight:'bold',cursor:'pointer'}}>
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
        <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
          {user && (
            <span style={{background:darkMode?'#23272a':'#e4eaf7',color:darkMode?'#90caf9':'#2a7ae4',fontWeight:'bold',borderRadius:'8px',padding:'0.4rem 1rem',fontSize:'1rem',boxShadow:'0 1px 4px rgba(0,0,0,.08)'}}>Usuario: {user.username}</span>
          )}
          <button
            onClick={()=>setDarkMode(m=>!m)}
            style={{background:darkMode?'#23272a':'#e4eaf7',color:darkMode?'#fff':'#2a7ae4',border:'none',borderRadius:'8px',padding:'0.4rem 1rem',fontWeight:'bold',fontSize:'1rem',cursor:'pointer',boxShadow:'0 1px 4px rgba(0,0,0,.08)',transition:'background .2s'}}
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
