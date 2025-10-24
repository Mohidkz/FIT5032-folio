<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, db } from '../firebase/init.js'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const email = ref('');
const password = ref('');
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Successfully registered user with Auth:', user.uid);
      return setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: 'user'
      });
    })
    .then(() => {
        console.log('User role successfully saved to Firestore.');
        router.push('/FireLogin'); 
    })
    .catch((error) => {
      console.error("Registration Error:", error.code, error.message);
      alert(error.message);
    });
};
</script>

<template>
  <div class="container mt-5">
    <h1>Create an Account</h1>
    <div class="mb-3">
      <input type="email" class="form-control" placeholder="Email" v-model="email" />
    </div>
    <div class="mb-3">
      <input type="password" class="form-control" placeholder="Password" v-model="password" />
    </div>
    <button class="btn btn-primary" @click="register">Create Account</button>
  </div>
</template>

