var express = require("express");
var router = express.Router();
var mongojs = require("mongojs")


var db = mongojs("mongodb+srv://devmobileIG4:devmobileIG4@devmobile-vr63q.mongodb.net/DevMobile?retryWrites=true&w=majority",["votes"])

router.get("/", function(req,res,next){
  db.votes.find(function(err,users){
    if(err){
      res.send(err);
    }
    res.json(users);
  })
})

router.get("/post/:post", function(req,res,next){
  const post = req.params.post
  db.votes.find({
    post: post
  },function(err,users){
    if(err){
      res.send(err);
    }
    res.json(users);
  })
})

router.get("/user/:user", function(req,res,next){
  const user = req.params.user
  db.votes.find({
    user: user
  },function(err,users){
    if(err){
      res.send(err);
    }
    res.json(users);
  })
})


router.post("/", function(req,res,next){
  var votes = req.body
  db.votes.find({
    user: votes.user,
    post: votes.post
  },function(err,result){
    if(err){
      res.send(err);
    }
    else{
        if(result.length==0){
          db.votes.insertOne(votes,function(err,vote){
            if(err){
              res.send(err);
            }
            console.log(vote)
            res.json({
              res:"correct",
              message:"add report ok"
            });
        })
      }else {
        if(result[0].like != votes.like){
          db.votes.updateOne({
            user: votes.user,
            post: votes.post
          },{$set: { "like" : votes.like}},function(err,users){
            if(err){
              res.json({
                res:"not correct",
                message:err
              });
            }
            res.json({
              res:"change",
              message:"change ok"
            });
          })
        }
        else{
          res.json({
            res:"exists",
            message:"Already exists"
          });
        }
      }
    }
  })
})

module.exports = router;
