<script setup>
import { ref } from 'vue';
import { db } from '../firebase/init.js';
import { collection, addDoc } from 'firebase/firestore';
import BookList from '../components/BookList.vue';

const name = ref('');
const isbn = ref(null);

const addBook = async () => {
  try {
    const docRef = await addDoc(collection(db, "books"), {
      name: name.value,
      isbn: isbn.value
    });
    console.log("Document written with ID: ", docRef.id);
    alert('Book successfully added to Firestore!');
    name.value = '';
    isbn.value = null;
  } catch (e) {
    console.error("Error adding document: ", e);
    alert('There was an error adding the book. Please check the console.');
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1>Add a New Book to the Library</h1>
    <form @submit.prevent="addBook">
      <div class="mb-3">
        <label for="bookName" class="form-label">Book Name</label>
        <input 
          type="text" 
          class="form-control" 
          id="bookName" 
          v-model="name" 
          required 
        />
      </div>
      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN</label>
        <input 
          type="number" 
          class="form-control" 
          id="isbn" 
          v-model.number="isbn" 
          required 
        />
      </div>
      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>
    <BookList />
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
}
</style>

