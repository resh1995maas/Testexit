

const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://ReshmaAS:reshmaas1995@cluster0.gg53hr9.mongodb.net/ExitTest?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a post schema and model
const postSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String,
});
const Post = mongoose.model('Post', postSchema);

// Fetch posts from JSONPlaceholder and store in MongoDB
app.get('/fetch-posts', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;
    
    // Save posts to MongoDB
    await Post.insertMany(posts);
    
    res.json({ message: 'Posts fetched and stored in MongoDB' });
  } catch (error) {
    console.error('Error fetching and storing posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching and storing posts' });
  }
});


app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "/build/index.html"));
  }
  );

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
