<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, db } from '../firebase/init.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const email = ref('');
const password = ref('');
const router = useRouter();

const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Successfully signed in! Current user:", user);
      const userDocRef = doc(db, "users", user.uid);
      return getDoc(userDocRef);
    })
    .then(userDoc => {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data from Firestore:", userData);
        alert(`Welcome! Your role is: ${userData.role}`);
        router.push('/'); 
      } else {
        console.error("Error: User document does not exist in Firestore.");
        alert("Login successful, but couldn't find your user role.");
      }
    })
    .catch((error) => {
      console.log("Sign In Error:", error.code, error.message);
      alert(error.message);
    });
};
</script>

<template>
  <div class="container mt-5">
    <h1>Sign In</h1>
    <div class="mb-3">
      <input type="email" class="form-control" placeholder="Email" v-model="email" />
    </div>
    <div class="mb-3">
        <input type="password" class="form-control" placeholder="Password" v-model="password" />
    </div>
    <button class="btn btn-success" @click="signIn">Sign In</button>
  </div>
</template>

