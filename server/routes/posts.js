var express = require("express");
var router = express.Router();
var mongojs = require("mongojs")


var db = mongojs("mongodb+srv://devmobileIG4:devmobileIG4@devmobile-vr63q.mongodb.net/DevMobile?retryWrites=true&w=majority",["posts"])

// fonction pour ercuperer tout les posts de la bdd
router.get("/posts", function(req,res,next){
  db.posts.find(function(err,posts){
    if(err){
      res.send(err);
    }
    res.json(posts);
  })
})

//fonction pour recuperer les post d'un mail (associé a un user) precis
router.get("/posts/:mail", function(req,res,next){
    const mail = req.params.mail
    db.posts.find({
      user: mail
    },function(err,posts){
      if(err){
        res.send(err);
      }
      res.json(posts);
    })
  })

  

module.exports = router;
