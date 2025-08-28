import { ref } from 'vue';

export const isAuthenticated = ref(false);

const correctUsername = 'user';
const correctPassword = 'password';

export const auth = {
  login(username, password) {
    if (username === correctUsername && password === correctPassword) {
      isAuthenticated.value = true;
      return true;
    }
    return false;
  },

  logout() {
    isAuthenticated.value = false;
  }
};