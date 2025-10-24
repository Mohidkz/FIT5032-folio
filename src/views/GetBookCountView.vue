<script setup>
import { ref } from 'vue';
import axios from 'axios';

const count = ref(null);
const error = ref(null);

const getBookCount = async () => {
  error.value = null;
  count.value = null;

  try {
    const functionUrl = 'https://countbooks-u4xnpypv2q-uc.a.run.app';

    const response = await axios.get(functionUrl);

    count.value = response.data.count;

  } catch (err) {
    console.error('Error fetching book count:', err);
    error.value = 'Failed to fetch book count. Please check the console.';
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1>Book Counter</h1>
    <p>This page will call a cloud function to get the total number of books in the library.</p>
    
    <button @click="getBookCount" class="btn btn-primary">Get Book Count</button>

    <div class="mt-4 p-3 border rounded bg-light">
      <p v-if="count !== null" class="h4">Total number of books: {{ count }}</p>

      <p v-if="error" class="h4 text-danger">{{ error }}</p>
    </div>
  </div>
</template>

