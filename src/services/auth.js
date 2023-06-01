import api from './api';

export default new class {
    async login(username, password) {
        return api.post('/auth/login', { username, password });
    }

    async register(username, password) {
        return api.post('/auth/register', { username, password });
    }

    async logout() {
        return api.post('/auth/logout');
    }
}