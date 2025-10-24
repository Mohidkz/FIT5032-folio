<script>
import { ref, onMounted } from 'vue';
import { db } from '../firebase/init.js';
import { collection, doc, deleteDoc, updateDoc, query, where, onSnapshot } from 'firebase/firestore';

export default {
  setup() {
    const filteredBooks = ref([]);
    const allBooks = ref([]);
    onMounted(() => {
      const qFiltered = query(collection(db, 'books'), where('isbn', '>', 1000));
      onSnapshot(qFiltered, (querySnapshot) => {
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        filteredBooks.value = booksArray;
      });
      const qAll = query(collection(db, 'books'));
      onSnapshot(qAll, (querySnapshot) => {
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        allBooks.value = booksArray;
      });
    });
    const deleteBook = async (bookId) => {
      if (confirm('Are you sure you want to delete this book?')) {
        await deleteDoc(doc(db, "books", bookId));
        alert('Book deleted!');
      }
    };
    const updateBook = async (book) => {
      const newName = prompt("Enter the new name for the book:", book.name);
      if (newName && newName !== book.name) {
        const bookRef = doc(db, "books", book.id);
        await updateDoc(bookRef, { name: newName });
        alert('Book updated!');
      }
    };
    return {
      filteredBooks,
      allBooks,
      deleteBook,
      updateBook
    };
  }
};
</script>

<template>
  <div>
    <div class="mt-5 p-3">
      <h2>Books with ISBN > 1000</h2>
      <ul class="list-group">
        <li v-for="book in filteredBooks" :key="book.id" class="list-group-item">
          {{ book.name }} - ISBN: {{ book.isbn }}
        </li>
      </ul>
    </div>
    <div class="mt-5 p-3 border-top">
      <h2>Full Book List (with Controls)</h2>
      <ul class="list-group">
        <li v-for="book in allBooks" :key="book.id" class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ book.name }} - ISBN: {{ book.isbn }}</span>
          <div>
            <button @click="updateBook(book)" class="btn btn-warning btn-sm me-2">Update</button>
            <button @click="deleteBook(book.id)" class="btn btn-danger btn-sm">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

