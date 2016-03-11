var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/posts');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected!');
});

var postSchema = mongoose.Schema({
  title: String,
  categories: [String],
  content: String
});

postSchema.plugin(timestamps);

var Post = mongoose.model('Post', postSchema);


router.get('/posts', function(req, res, next) {
  Post
  .find({})
  .select({content: 0, __v: 0, updatedAt: 0, createdAt: 0})
  .limit(100)
  .sort({createdAt: -1})
  .exec(function(err, posts) {
    if (err) {
      console.log(err);
      return res.status(500).json({error: 'Could not retrieve posts'});
    }
    res.json(posts);  
  });
});

router.post('/posts', function(req, res, next) {
  var body = req.body;

  //simulate error if title, categories and content are all "test"
  //This is demo field-validation error upon submission. 
  if(body.title === 'test' && body.categories === 'test' && body.content === 'test') {
    return res.status(403).json({title:'Title Error', categories: 'Categories Error', content: 'Content Error', submitError: 'Ultimate Error!'});
  }

  var post = new Post({
    title: body.title,
    categories: body.categories.split(','),
    content: body.content
  });

  post.save(function (err, post) {

    console.log(post.createdAt);

    if (err) {
      console.log(err);
      return res.status(500).json({error: 'Could not save post'});
    }
    res.json(post);
  });
});

router.get('/posts/:id', function(req, res, next) {
  Post.findById({'_id': req.params.id}, function(err, post){
    if (err) {
      console.log(err);
      return res.status(500).json({error: 'Could not retrieve post'});
    }
    res.json(post);
  });
});

router.delete('/posts/:id', function(req, res, next) {
  var id = req.params.id;
  if(id.length != 24) {
    return res.json({error: 'id must be a valid 24 char hex string'});
  }
  var id = mongoose.Types.ObjectId(req.params.id);//convert to objectid
  Post.remove({'_id': id}, function(err, post) {
    if (err) {
      console.log(err);
      return res.status(500).json({error: 'could not delete post'});
    }
    res.json({result: 'Deleted Post'});
  });
});

router.post('/validatePostFields', function(req, res, next){
  var body = req.body;
  var title = body.title ? body.title.trim() : '';

  Post.findOne({'title': new RegExp(title, "i") }, function(err, post){
    if (err) {
      console.log(err);
      return res.json({error: 'Could not find post for title uniqueness'});
    }
    if(post) {
      res.json({title: 'Title "'+title+'" is not unique!'});
    } else {
      return res.json({});
    }
  });
});


module.exports = router;
