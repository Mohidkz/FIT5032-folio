<script setup>
defineProps({
  isLoggedIn: Boolean
});

const emit = defineEmits(['logout']);

const triggerLogout = () => {
  emit('logout'); 
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">MyApp</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
              <router-link class="nav-link" to="/AddBook">Add Book</router-link>
          </li>
          <li class="nav-item">
              <router-link class="nav-link" to="/GetBookCount">Book Counter</router-link>
          </li>
          <template v-if="!isLoggedIn">
            <li class="nav-item">
              <router-link class="nav-link" to="/FireRegister">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/FireLogin">Sign In</router-link>
            </li>
          </template>
          <template v-if="isLoggedIn">
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            
            <li class="nav-item">
              <router-link class="nav-link" to="/AdvancedQuery">Advanced Query</router-link>
            </li>
            
          </template>
        </ul>
        <button class="btn btn-outline-danger" v-if="isLoggedIn" @click="triggerLogout">Logout</button>
      </div>
    </div>
  </nav>
</template>

