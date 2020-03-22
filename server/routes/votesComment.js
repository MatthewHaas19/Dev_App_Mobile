var express = require("express");
var router = express.Router();
var mongojs = require("mongojs")


var db = mongojs("mongodb+srv://devmobileIG4:devmobileIG4@devmobile-vr63q.mongodb.net/DevMobile?retryWrites=true&w=majority",["votesComment"])

router.get("/", function(req,res,next){
  db.votesComment.find(function(err,users){
    if(err){
      res.send(err);
    }
    res.json(users);
  })
})

router.get("/comment/:comment", function(req,res,next){
  const post = req.params.post
  db.votesComment.find({
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
  db.votesComment.find({
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
  db.votesComment.find({
    user: votes.user,
    comment: votes.comment
  },function(err,result){
    if(err){
      res.send(err);
    }
    else{
        if(result.length==0){
          db.votesComment.insertOne(votes,function(err,vote){
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
          db.votesComment.updateOne({
            user: votes.user,
            comment: votes.comment
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
