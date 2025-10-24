<script>
import { ref, onMounted } from 'vue';
import { db } from '../firebase/init.js';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

export default {
  setup() {
    const lowIsbnBooks = ref([]);
    const highIsbnBooks = ref([]);

    const fetchLowIsbnBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'),
          where('isbn', '<', 5000),
          orderBy('isbn', 'desc'),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => { booksArray.push({ id: doc.id, ...doc.data() }); });
        lowIsbnBooks.value = booksArray;
      } catch (error) { console.error('Error fetching low ISBN books: ', error); }
    };

    const fetchHighIsbnBooks = async () => {
        try {
            const q = query(
                collection(db, 'books'),
                where('isbn', '>', 5000), 
                orderBy('isbn', 'asc'),         
                limit(3)                        
            );
            const querySnapshot = await getDocs(q);
            const booksArray = [];
            querySnapshot.forEach((doc) => { booksArray.push({ id: doc.id, ...doc.data() }); });
            highIsbnBooks.value = booksArray;
        } catch (error) { console.error('Error fetching high ISBN books: ', error); }
    };

    onMounted(() => {
        fetchLowIsbnBooks();
        fetchHighIsbnBooks();
    });

    return { lowIsbnBooks, highIsbnBooks };
  }
};
</script>

<template>
  <div>
    <div class="mt-5 p-3 border rounded bg-light">
      <h2>Query 1: Top 3 Books with ISBN &lt; 5000</h2>
      <ul class="list-group">
        <li v-if="lowIsbnBooks.length === 0" class="list-group-item">No books match this query.</li>
        <li v-for="book in lowIsbnBooks" :key="book.id" class="list-group-item">
          <strong>{{ book.name }}</strong> - ISBN: {{ book.isbn }}
        </li>
      </ul>
    </div>

     <div class="mt-5 p-3 border rounded bg-info-subtle">
      <h2>Query 2: First 3 Books with ISBN > 5000 (by ISBN)</h2>
      <ul class="list-group">
        <li v-if="highIsbnBooks.length === 0" class="list-group-item">No books match this query.</li>
        <li v-for="book in highIsbnBooks" :key="book.id" class="list-group-item">
          <strong>{{ book.name }}</strong> - ISBN: {{ book.isbn }}
        </li>
      </ul>
    </div>
  </div>
</template>

