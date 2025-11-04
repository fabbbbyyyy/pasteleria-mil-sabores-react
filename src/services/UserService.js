javascript
import axios from 'axios';

const BASE_URL = 'http://localhost:9090/api/user';

class UserService {
    getAllUsers() {
        return axios.get(BASE_URL);
    }

    getUserById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    createUser(user) {
        return axios.post(BASE_URL, user);
    }

    updateUser(id, user) {
        return axios.put(`${BASE_URL}/${id}`, user);
    }

    deleteUser(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }
}

export default new UserService();
