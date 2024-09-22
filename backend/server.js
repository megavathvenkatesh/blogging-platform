const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('./models/Post');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://venkateshmegavath75:venkey123@cluster0.6xlis.mongodb.net/mydatabase', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Get all posts
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// Get post by ID
app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

// Create a new post
app.post('/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).json(post);
});

// Update post
app.put('/posts/:id', async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
});

// Delete post
app.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

