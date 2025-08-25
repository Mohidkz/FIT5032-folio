<script setup>
import { ref, computed } from 'vue';

// 1. Import the new page components
import HomeView from './views/HomeView.vue';
import LoginView from './views/LoginView.vue';
import RegisterView from './views/RegisterView.vue';
import LearnView from './views/LearnView.vue';

const currentPage = ref('home');

const activeComponent = computed(() => {
  if (currentPage.value === 'login') return LoginView;
  if (currentPage.value === 'register') return RegisterView;
  if (currentPage.value === 'learn') return LearnView;
  return HomeView; // Default to HomeView
});

const navigate = (page) => {
  currentPage.value = page;
};
</script>

<template>
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
    <component :is="activeComponent" />
  </main>
</template>