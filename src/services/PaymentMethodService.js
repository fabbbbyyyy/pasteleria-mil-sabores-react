import axios from 'axios';

const PAYMENT_METHOD_URL = 'http://localhost:9090/api/payment_method';

class PaymentMethodService {
    getAllPaymentMethods() {
        return axios.get(PAYMENT_METHOD_URL);
    }

    getPaymentMethodById(id) {
        return axios.get(`${PAYMENT_METHOD_URL}/${id}`);
    }

    createPaymentMethod(method) {
        return axios.post(PAYMENT_METHOD_URL, method);
    }

    updatePaymentMethod(id, method) {
        return axios.put(`${PAYMENT_METHOD_URL}/${id}`, method);
    }

    deletePaymentMethod(id) {
        return axios.delete(`${PAYMENT_METHOD_URL}/${id}`);
    }

}

export default new PaymentMethodService();
