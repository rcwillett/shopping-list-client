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
        async login() {
            if (this.username !== '' && this.password !== '') {
                try {
                    this.loading = true;
                    await auth.login(this.username, this.password);
                    this.$router.push('/list');
                } catch (error) {
                    this.loading = false;
                    this.error = 'Failed to login please try again!';
                }
            } else {
                this.error = 'Invalid username or password';
            }
        }
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
            <h2>Login to access your grocery list!</h2>
        </div>
        <div class="col-12">
            <input class="form-control" v-model="username" placeholder="Enter a user name" />
        </div>
        <div class="col-12">
            <input class="form-control" v-model="password" type="password" placeholder="Enter your password" />
        </div>
        <div class="col-12">
            <button class="btn btn-primary" @click="login">Login</button>
        </div>
        <div v-if="error" class="col-12">
            <div class="error">{{ error }}</div>
        </div>
        <div class="col-12">
            <button class="btn btn-secondary" @click="$router.push('/signup')">Sign Up</button>
        </div>
    </div>
</template>