var express = require("express");
var router = express.Router();
var mongojs = require("mongojs")


var db = mongojs("mongodb+srv://devmobileIG4:devmobileIG4@devmobile-vr63q.mongodb.net/DevMobile?retryWrites=true&w=majority",["posts"])

router.get("/posts", function(req,res,next){
  db.posts.find(function(err,posts){
    if(err){
      res.send(err);
    }
    res.json(posts);
  })
})

router.get("/posts/categorie/:categorie", function(req,res,next){
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




module.exports = router;
