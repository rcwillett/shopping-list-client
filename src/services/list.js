import api from './api';

export default new class {
    async getList() {
        return api.get(`/list/getitems`);
    }

    async createItem(name, quantity) {
        return api.post('/list/create', { name, quantity });
    }

    async removeItem(item_id) {
        return api.post('/list/remove', { item_id });
    }

    async updateItem(item_id, name, quantity) {
        return api.post('/list/update', { item_id, name, quantity })
    }

    async purchasedItem(item_id) {
        return api.post('/list/purchased', { item_id })
    }
};