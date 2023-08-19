// const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.mongodb_url,{ useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to atlas");
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch(() => {
//     console.log("Error!! DB Connection lost");
//   });



const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ReshmaAS:reshmaas1995@cluster0.gg53hr9.mongodb.net/ExitTest?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String,
});

const Task = mongoose.model('Task', taskSchema);

// Fetch posts from JSONPlaceholder and store them in the MongoDB collection
app.get('/storePosts', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;
    await Post.insertMany(posts);
    res.json({ message: 'Posts stored in MongoDB collection' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
