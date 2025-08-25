<script setup>
// This is our JavaScript section.
import { ref } from 'vue';

// "reactive variable" to keep track of which page is currently active.
// It starts on the 'home' page by default.
const currentPage = ref('home');

// This is a function that changes the currentPage variable.
// We will call this function when a user clicks a navigation link.
const navigate = (page) => {
  currentPage.value = page;
};
</script>

<template>
  <!-- BR (A.2) Responsiveness: Bootstrap's navbar classes handle this automatically. -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container">
      <a class="navbar-brand" href="#" @click.prevent="navigate('home')">MindHaven</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="navigate('learn')">Learn</a>
          </li>
        </ul>
        <div class="d-flex">
          <button class="btn btn-outline-primary me-2" @click="navigate('login')">Login</button>
          <button class="btn btn-primary" @click="navigate('register')">Register</button>
        </div>
      </div>
    </div>
  </nav>

  <main class="container my-5">
    <p>Current Page: <strong>{{ currentPage }}</strong></p>
  </main>
</template>

<style scoped>
</style>