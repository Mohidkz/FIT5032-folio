<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const jsonData = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const functionUrl = 'https://countbooks-u4xnpypv2q-uc.a.run.app';
    const response = await axios.get(functionUrl);
    
    jsonData.value = response.data;
  } catch (err) {
    console.error('Error fetching book count API:', err);
    error.value = 'Failed to fetch API data.';
  }
});
</script>

<template>
  <div>
    <pre v-if="jsonData">{{ jsonData }}</pre>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
  </div>
</template>

<style scoped>
pre {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 5px;
  white-space: pre-wrap;    /* Ensures long lines wrap */
  word-wrap: break-word;    /* Breaks long words if necessary */
  font-family: monospace;   /* A standard font for code */
}
</style>

