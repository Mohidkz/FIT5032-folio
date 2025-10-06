// 2.1 & 2.2: Import necessary modules from Firebase libraries
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

// 2.3: Import and configure CORS to allow requests from your web app
const cors = require("cors")({origin: true});

// Initialize the Firebase Admin SDK
admin.initializeApp();

/**
 * 2.4: Create the countBooks function.
 * This function counts documents in the 'books' collection.
 */
exports.countBooks = onRequest((req, res) => {
  // Use the cors middleware to handle CORS headers
  cors(req, res, async () => {
    try {
      // 2.5: Access the 'books' collection in Firestore
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      // Get the total number of documents in the collection
      const count = snapshot.size;

      // Send a successful response back with the count
      res.status(200).send({count: count});
    } catch (error) {
      // 2.6: Handle any errors that occur
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

