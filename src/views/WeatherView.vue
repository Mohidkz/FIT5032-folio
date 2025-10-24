<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

// --- STATE ---
const apiKey = "fc534a8e82bd6b804e456f3a69a18a70";
const city = ref('');
const weatherData = ref(null);
const error = ref(null);

// --- COMPUTED PROPERTIES ---
const temperature = computed(() => {
  if (!weatherData.value) return null;
  return Math.floor(weatherData.value.main.temp - 273.15);
});

const iconUrl = computed(() => {
  if (!weatherData.value) return null;
  return `https://openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`;
});

// --- METHODS ---
const fetchWeatherData = async (url) => {
  error.value = null;
  weatherData.value = null; // Clear old data before fetching
  try {
    const response = await axios.get(url);
    weatherData.value = response.data;
  } catch (err) {
    console.error("Error fetching weather data:", err);
    error.value = "Could not find weather data for that city. Please try again.";
  }
};

const fetchCurrentLocationWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      await fetchWeatherData(url);
    });
  } else {
    error.value = "Geolocation is not supported by this browser.";
  }
};

// --- NEW METHOD FOR D/HD ---
// Fetches weather for the city name entered in the input field
const searchByCity = () => {
  if (city.value) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`;
    fetchWeatherData(url);
  }
};

// --- LIFECYCLE HOOK ---
onMounted(() => {
  fetchCurrentLocationWeather();
});
</script>

<template>
  <div class="container mt-5">
    <h1>Weather Check</h1>

    <!-- --- NEW SEARCH FORM FOR D/HD --- -->
    <div class="input-group mb-4 mt-4">
      <input 
        type="text" 
        class="form-control" 
        placeholder="e.g., Clayton, AU" 
        v-model="city"
        @keyup.enter="searchByCity"
      />
      <button class="btn btn-primary" @click="searchByCity">Search</button>
    </div>
    
    <!-- Weather display section (unchanged) -->
    <main class="mt-4 p-3 border rounded bg-light" v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div class="d-flex align-items-center">
        <img :src="iconUrl" alt="Weather Icon" style="width: 50px; height: 50px;">
        <p class="h3 ms-3 mb-0">{{ temperature }}°C</p>
      </div>
      <span class="text-capitalize">{{ weatherData.weather[0].description }}</span>
    </main>

    <div v-if="error" class="alert alert-danger mt-4">
      {{ error }}
    </div>
  </div>
</template>
