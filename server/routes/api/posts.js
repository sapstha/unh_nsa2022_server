const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
  });

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
      title:req.body.title,
      text: req.body.text,
      createdAt: new Date(),
      duration:req.body.duration,
      location:req.body.location,
      eventStatus:req.body.eventStatus
    });
    res.status(201).send();
  });
//update
router.put('/update/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    posts.findOneAndUpdate(
        { id: req.body.id },
        {
          $set: {
            text: req.body.text,
          }
        },
        {
          upsert: true
        }
      )
   // posts.updateOne({ _id: req.params.id},{$set:{"text":req.body.text}})
   
    res.status(200).send(await posts.find({}).toArray());
  });
  
  // Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send({});
  });

  async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
      'mongodb+srv://admin:root@cluster0.rualx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true
      }
    );
  
    return client.db('myFirstDatabase').collection('posts');
  }
module.exports = router;