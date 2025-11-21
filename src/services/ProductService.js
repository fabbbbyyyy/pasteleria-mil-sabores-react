import axios from 'axios';

const BASE_URL = 'http://Opasteleria-api-env.eba-ctypcpd8.us-east-1.elasticbeanstalk.com/api/product';

class ProductService {
    getAllProducts() { 
        return axios.get(BASE_URL);
    }

    getProductById(id) { 
        return axios.get(`${BASE_URL}/${id}`);
    }

    getProductsByCategory(categoryId) { 
        return axios.get(`${BASE_URL}/category/${categoryId}`);
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