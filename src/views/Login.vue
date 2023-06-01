<script>
import Loader from '../components/Loader.vue';
import { auth } from '../services';
import { useUserStore } from '../stores/user';

export default {
    data() {
        return {
            username: '',
            password: '',
            error: '',
            loading: false,
            userStore: useUserStore(),
        }
    },
    methods: {
        async login() {
            if (this.username !== '' && this.password !== '') {
                try {
                    this.loading = true;
                    await auth.login(this.username, this.password);
                    this.userStore.setUser(this.username);
                    this.$router.push('/list');
                } catch (error) {
                    console.log(error);
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
    <div class="row justify-content-center" v-if="loading">
        <div class="col-12 text-center">
            <Loader />
        </div>
    </div>
    <div v-else class="paper">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-6 mx-auto">
                <div class="row">
                    <div class="col-12 my-3 text-center">
                        <h2>Login to access your grocery list!</h2>
                    </div>
                    <div class="col-12 my-1">
                        <input class="form-control" v-model="username" placeholder="Enter a user name" />
                    </div>
                    <div class="col-12 my-1">
                        <input class="form-control" v-model="password" type="password" placeholder="Enter your password" />
                    </div>
                    <div class="col-12 my-1">
                        <button class="btn-block btn btn-primary" @click="login">Login</button>
                    </div>
                    <div class="col-12 my-1">
                        <button class="btn-block btn btn-secondary" @click="$router.push('/signup')">Sign Up</button>
                    </div>
                    <div v-if="error" class="col-12 my-1">
                        <div class="error">{{ error }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>