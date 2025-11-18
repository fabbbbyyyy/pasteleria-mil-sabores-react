import axios from 'axios';

const BASE_URL = 'http://localhost:9090/api/user';

// Crear instancia de axios
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// Interceptor para agregar el token automáticamente a todas las requests
api.interceptors.request.use(
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
api.interceptors.response.use(
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


class UserService {
    getAllUsers() {
        return api.get('/');
    }

    getUserById(id) {
        return api.get(`/${id}`);
    }

    createUser(user) {
        return api.post('/', user);
    }

    updateUser(id, user) {
        return api.put(`/${id}`, user);
    }

    deleteUser(id) {
        return api.delete(`/${id}`);
    }

}

export default new UserService();
