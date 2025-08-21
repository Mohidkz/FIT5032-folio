import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.min.css'
// import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura'; // Corrected import path

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount('#app'); // Mount the app instance you already created
