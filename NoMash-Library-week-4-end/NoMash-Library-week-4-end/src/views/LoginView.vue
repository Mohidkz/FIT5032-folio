<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../auth';

const username = ref('');
const password = ref('');
const router = useRouter();
const errorMessage = ref('');

const login = () => {
  if (auth.login(username.value, password.value)) {
    router.push('/about');
  } else {
    errorMessage.value = 'Invalid username or password.';
  }
};
</script>

<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1 class="text-center">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" id="username" v-model="username" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required>
        </div>
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>