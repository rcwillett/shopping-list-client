<script>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user';
import { auth } from './services';

export default {
  data() {
    return {
      userStore: useUserStore(),
    }
  },
  components: {
    RouterLink,
    RouterView,
  },
  methods: {
    async logout() {
      try {
        await auth.logout();
        this.$router.push('/login');
        this.userStore.clearUser();
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto" v-if="!userStore.user" >
          <li class="nav-item">
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink  class="nav-link" to="/signup">Sign Up</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-if="userStore.user" >
          <li class="nav-item">
            <RouterLink class="nav-link" to="/list">Grocery List</RouterLink>
          </li>
          <li class="nav-item">
            <button class="btn btn-link nav-link" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <div class="container-fluid">
    <RouterView />
  </div>
</template>