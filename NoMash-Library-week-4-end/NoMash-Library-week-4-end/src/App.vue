<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { auth } from './firebase/init.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import BHeader from './components/BHeader.vue';

const router = useRouter();
const route = useRoute(); // Get access to the current route information
const isLoggedIn = ref(false);

// This listener checks the user's auth state and updates it
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
});

// This function handles the logout logic
const handleLogout = () => {
  signOut(auth).then(() => {
    router.push('/FireLogin');
  });
};

// This computed property checks if the header should be shown
// It looks for `meta: { hideHeader: true }` in the current route
const showHeader = computed(() => {
  return !route.meta.hideHeader;
});
</script>

<template>
  <!-- Use v-if to only render the header when showHeader is true -->
  <header v-if="showHeader">
    <BHeader :is-logged-in="isLoggedIn" @logout="handleLogout" />
  </header>
  
  <main class="container mt-4">
    <router-view />
  </main>
</template>

