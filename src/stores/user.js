import { defineStore } from 'pinia';
import { local } from '../services';

export const useUserStore = defineStore('userStore', {
    state: () => {
        const user = local.get('user') || null;
        return { user };
    },
    actions: {
        setUser (user) {
            this.user = user;
            local.set('user', user);
        },
        clearUser () {
            this.user = null;
            local.set('user', null);
        }
    }
});
