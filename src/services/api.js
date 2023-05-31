import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_VUE_APP_API_URL;

export default new class {
    async post(url, data) {
        try {
            return await axios.post(`${API_BASE_URL}${url}`, data);
        } catch (error) {
            if (error && error.reponse && error.reseponse.status === 401) {
                window.location.href = '/login';
            }
        }
    }

    async get(url, config) {
        try {
            return axios.get(`${API_BASE_URL}${url}`, config);
        } catch (error) {
            if (error && error.reponse && error.reseponse.status === 401) {
                window.location.href = '/login';
            }
        }
    }

    async put(url, data) {
        try {
            return axios.put(`${API_BASE_URL}${url}`, config);
        } catch (error) {
            if (error && error.reponse && error.reseponse.status === 401) {
                window.location.href = '/login';
            }
        }
    }

    async delete(url) {
        try {
            return axios.delete(`${API_BASE_URL}${url}`, config);
        } catch (error) {
            if (error && error.reponse && error.reseponse.status === 401) {
                window.location.href = '/login';
            }
        }
    }
}