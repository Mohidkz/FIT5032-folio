// --- Existing Code ---
const {onRequest} = require("firebase-functions/v2/https");
// --- ADD THIS LINE for the new function type ---
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

// --- FUNCTION 1 (from Task 9.1) ---
// Keep this function as it is.
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;
      res.status(200).send({count: count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});


// --- FUNCTION 2 (for Task 9.2 - D/HD Level) ---
// This function triggers when a new document is added to 'books'.
exports.capitalizeBookName = onDocumentCreated("books/{bookId}", (event) => {
  const data = event.data.data();
  const name = data.name;

  if (name && name !== name.toUpperCase()) {
    console.log(`Capitalizing name for book ID: ${event.params.bookId}`);
    const docRef = event.data.ref;
    return docRef.update({
      name: name.toUpperCase(),
    });
  }
  // Return null if no update is needed to avoid unnecessary writes.
  return null;
});


// --- NEW FUNCTION 3 (for Task 10.2 - D/HD Level) ---
// This function will return all documents from the 'books' collection.
exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const books = [];
      snapshot.forEach((doc) => {
        books.push({id: doc.id, ...doc.data()});
      });
      // Send the array of books as a JSON response
      res.status(200).send(books);
    } catch (error) {
      console.error("Error getting all books:", error.message);
      res.status(500).send("Error getting all books");
    }
  });
});

