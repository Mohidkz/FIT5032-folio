import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6X95D7DndNYHJfJkf2Fq8Wk9mnokvOac",
  authDomain: "week7-mohid.firebaseapp.com",
  projectId: "week7-mohid",
  storageBucket: "week7-mohid.firebasestorage.app",
  messagingSenderId: "256425801066",
  appId: "1:256425801066:web:febade28b60aca20222113"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')