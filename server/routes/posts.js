var express = require("express");
var router = express.Router();
var mongojs = require("mongojs")


var db = mongojs("mongodb+srv://devmobileIG4:devmobileIG4@devmobile-vr63q.mongodb.net/DevMobile?retryWrites=true&w=majority",["posts"])

router.get("/", function(req,res,next){
  db.posts.find(function(err,posts){
    if(err){
      res.send(err);
    }
    res.json(posts);
  })
})


router.get("/categorie/:categorie", function(req,res,next){
  const cat = req.params.categorie
  db.posts.find({
    categorie: {$eq :cat}
  },function(err,users){
    if(err){
      res.send(err);
    }
    res.json(users);
  })
})


router.get("/user/:user", function(req,res,next){
  const user = req.params.user
  db.posts.find({
    user: user
  },function(err,users){
    if(err){
      res.send(err);
    }
    res.json(users);
  })
})

router.put("/addVote/:vote",function(req,res,next){
  const vote = -1
  if(req.params.vote){
    vote = 1
  }
  const post = req.body
  db.posts.updateOne(req.body,function(err,users){
    if(err){
      res.send(err);
    }
    res.json(users);
  })


})


router.post("/", function(req,res,next){
  var post = req.body
  db.posts.insertOne(post,function(err,post){
    if(err){
      res.send(err);
    }
    console.log(post)
    res.json({
      res:"correct",
      message:"add post ok"
    });
  })
})


router.delete("/", function(req,res,next) {
  var post = req.body
  db.posts.delete({_id : post._id}, function(err,post){
    if(err){
      res.send(err);
    }
    console.log(err)
    res.json({
      res:"correct",
      message:"delete post ok"
    });
  })
})



module.exports = router;
