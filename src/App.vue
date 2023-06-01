<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/signup">Sign Up</RouterLink>
        <RouterLink to="/list">Grocery List</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>