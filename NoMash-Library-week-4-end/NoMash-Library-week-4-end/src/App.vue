<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from './firebase/init.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import BHeader from './components/BHeader.vue'; // 1. Import the header component

const router = useRouter();
const isLoggedIn = ref(false);

// This listener checks the user's auth state when the app loads and whenever it changes
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user; // Sets to true if user exists, false otherwise
  });
});

// This function handles the logout logic
const handleLogout = () => {
  signOut(auth).then(() => {
    console.log("User logged out.");
    router.push('/FireLogin');
  });
};
</script>

<template>
  <header>
    <!-- 2. Use the BHeader component, passing the login state and logout function as props -->
    <BHeader :is-logged-in="isLoggedIn" @logout="handleLogout" />
  </header>
  
  <main class="container mt-4">
    <router-view />
  </main>
</template>

