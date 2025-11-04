import axios from 'axios';

const BASE_URL = 'http://localhost:9090/api/product';

class ProductService {
    getAllProducts() { 
        return axios.get(BASE_URL);
    }

    getProductById(id) { 
        return axios.get(`${BASE_URL}/${id}`);
    }

    createProduct(product) { 
        return axios.post(BASE_URL, product);
    }

    updateProduct(id, product) { 
        return axios.put(`${BASE_URL}/${id}`, product);
    }

    deleteProduct(id) { 
        return axios.delete(`${BASE_URL}/${id}`);
    }
}

export default new ProductService();