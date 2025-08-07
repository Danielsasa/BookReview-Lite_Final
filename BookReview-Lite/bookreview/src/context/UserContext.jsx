import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const LOCAL_STORAGE_KEY = 'bookreview-users';
const LOGGED_USER_KEY = 'bookreview-user';

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar usuario logueado de localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(LOGGED_USER_KEY);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Función para registrar nuevo usuario
  const signup = ({ username, email, age, password }) => {
    // Traer lista actual de usuarios
    const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

    // Verificar si usuario o email ya existen
    if (users.find(u => u.username === username)) {
      throw new Error('El nombre de usuario ya está en uso.');
    }
    if (users.find(u => u.email === email)) {
      throw new Error('El correo electrónico ya está en uso.');
    }

    // Guardar nuevo usuario
    const newUser = { username, email, age, password };
    users.push(newUser);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));

    // Loguear automáticamente
    setUser({ username, email, age });
    localStorage.setItem(LOGGED_USER_KEY, JSON.stringify({ username, email, age }));
  };

  // Función para login (valida usuario y password)
  const login = ({ username, password }) => {
    const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const existingUser = users.find(u => u.username === username && u.password === password);
    if (!existingUser) {
      throw new Error('Usuario o contraseña incorrectos.');
    }
    const { email, age } = existingUser;
    setUser({ username, email, age });
    localStorage.setItem(LOGGED_USER_KEY, JSON.stringify({ username, email, age }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOGGED_USER_KEY);
  };

  return (
    <UserContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
