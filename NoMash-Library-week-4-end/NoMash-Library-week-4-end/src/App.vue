<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from './firebase/init.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const router = useRouter();
const isLoggedIn = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
});

const handleLogout = () => {
  signOut(auth).then(() => {
    console.log("User logged out.");
    console.log("Current user:", auth.currentUser);
    router.push('/FireLogin');
  });
};
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">MyApp</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/FireRegister">Register</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/FireLogin">Sign In</router-link>
            </li>
          </ul>
          <button class="btn btn-outline-danger" v-if="isLoggedIn" @click="handleLogout">Logout</button>
        </div>
      </div>
    </nav>
  </header>
  
  <main class="container mt-4">
    <router-view />
  </main>
</template>


