<script setup>
import BHeader from './components/BHeader.vue'
import { isAuthenticated } from './auth'
</script>

<template>
  <header>
    <BHeader :is-authenticated="isAuthenticated" />
  </header>

  <main class="container mt-5">
    <router-view></router-view>
  </main>
</template>

<style>
/* Global styles for a consistent look and feel */
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
}
</style>