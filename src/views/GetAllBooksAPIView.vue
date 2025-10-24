<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const allBooksData = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const functionUrl = 'https://getallbooks-u4xnpypv2q-uc.a.run.app/'; 
    const response = await axios.get(functionUrl);
    allBooksData.value = response.data;
  } catch (err) {
    console.error('Error fetching all books API:', err);
    error.value = 'Failed to fetch API data.';
  }
});
</script>

<template>
  <div>
    <pre v-if="allBooksData">{{ allBooksData }}</pre>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
  </div>
</template>

<style scoped>
pre {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>

