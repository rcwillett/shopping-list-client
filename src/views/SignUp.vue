<script>
import Loader from '../components/Loader.vue';
import { auth } from '../services';

export default {
    data() {
        return {
            username: '',
            password: '',
            error: '',
            loading: false,
        }
    },
    methods: {
        async register() {
            if (this.username !== '' && this.password !== '') {
                try {
                    this.loading = true;
                    await auth.register(this.username, this.password);
                    this.$router.push('/login');
                } catch (error) {
                    this.loading = false;
                    this.error = 'Failed to register please try again!';
                }
            } else {
                this.loading = false;
                this.error = 'Invalid username or password';
            }
        },
    },
    components: {
        Loader,
    },
}
</script>

<template>
    <div v-if="loading">
        <Loader />
    </div>
    <div v-else class="row">
        <div class="col-12">
            <h2>Sign up to start creating your grocery list!</h2>
        </div>
        <div class="col-12">
            <input class="form-control" v-model="username" placeholder="Enter a user name"/>
        </div>
        <div class="col-12">
            <input class="form-control" v-model="password" type="password" placeholder="Enter your password"/>
        </div>
        <div class="col-12">
            <button class="btn btn-primary" @click="register">Sign Up</button>
        </div>
        <div class="col-12">
            <button class="btn btn-secondary" @click="$router.push('/login')">Log In</button>
        </div>
        <div class="col-12" v-if="error">
            <div class="error">{{ error }}</div>
        </div>
    </div>
</template>