import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Crear el contexto
const AuthContext = createContext(null);

// URL base de la API de autenticación
const AUTH_URL = 'http://Opasteleria-api-env.eba-ctypcpd8.us-east-1.elasticbeanstalk.com/api/auth';

// Crear instancia de axios para autenticación
const authApi = axios.create({
  baseURL: AUTH_URL,
  timeout: 10000,
});

// Interceptor para agregar el token automáticamente a todas las requests
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirigir al login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Provider del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, verificar si hay sesión guardada
  useEffect(() => {
    checkAuth();
  }, []);

  // Verificar si hay token guardado en localStorage
  const checkAuth = () => {
    try {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      // Validaciones
      if (!email || !password) {
        return {
          success: false,
          message: 'Por favor completa todos los campos.'
        };
      }

      // Realizar petición a la API
      const response = await authApi.post('/login', {
        email,
        password
      });

      // Extraer token y datos del usuario de la respuesta
      const { token: authToken,email: userEmail, name: userName , address: userAddress, number: userNumber, paymentMethod, id: userId } = response.data;

      // Crear objeto de usuario
      const userData = {
        email: userEmail,
        name: userName,
        address: userAddress,
        number: userNumber,
        paymentMethod: paymentMethod?.name || 'No especificado',
        id: userId
      };
       console.log('Datos del usuario Logeado:', userData);

      // Guardar en estado
      setToken(authToken);
      setUser(userData);
      setIsAuthenticated(true);

      // Persistir en localStorage
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true, user: userData };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error al iniciar sesión'
      };
    }
  };

  // Función para registrar usuario
  const register = async (name, email, password, number, address, paymentMethodId) => {
    try {
      // Validaciones
      if (!name || !email || !password) {
        return {
          success: false,
          message: 'Por favor completa todos los campos obligatorios.'
        };
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          success: false,
          message: 'Por favor ingresa un correo electrónico válido.'
        };
      }

      // Validar longitud de contraseña
      if (password.length < 6) {
        return {
          success: false,
          message: 'La contraseña debe tener al menos 6 caracteres.'
        };
      }

      const response = await authApi.post('/register', {
        name,
        email,
        password,
        number,
        address,
        paymentMethodId
      });

      // Extraer token y datos del usuario de la respuesta
      const { token: authToken,email: userEmail, name: userName , address: userAddress, number: userNumber, paymentMethod, id: userId } = response.data;

      // Crear objeto de usuario
      const userData = {
        email: userEmail,
        name: userName,
        address: userAddress,
        number: userNumber,
        paymentMethod: paymentMethod?.name || 'No especificado',
        id: userId
      };
       console.log('Datos del usuario Registrado:', userData);

      // Guardar en estado
      setToken(authToken);  
      setUser(userData);
      setIsAuthenticated(true);

      // Persistir en localStorage
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true, user: userData };
    } catch (error) {
      console.error('Error al registrar:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error al registrar usuario'
      };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    // Limpiar estado
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Función para actualizar datos del usuario
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Valor que se proveerá a los componentes
  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};

export default useAuth;
