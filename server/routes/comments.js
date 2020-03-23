var express = require("express");
var router = express.Router();
var mongojs = require("mongojs")


var db = mongojs("mongodb+srv://devmobileIG4:devmobileIG4@devmobile-vr63q.mongodb.net/DevMobile?retryWrites=true&w=majority",["comments"])

router.get("/", function(req,res,next){
  db.comments.find(function(err,comments){
    if(err){
      res.send(err);
    }
    res.json(comments);
  })
})

router.get("/:post", function(req,res,next){
    const id = req.params.post
    db.comments.find({
      postId: id
    },function(err,comments){
      if(err){
        res.send(err);
      }
      res.json(comments);
    })
  })

  router.get("/user/:emailUser", function(req,res,next){
      const id = req.params.emailUser
      db.comments.find({
        user: id
      },function(err,comments){
        if(err){
          res.send(err);
        }
        res.json(comments);
      })
    })


  router.post("/", function(req,res,next){
    var comment = req.body
    db.comments.insertOne(comment,function(err,post){
      if(err){
        res.send(err);
      }
      console.log(comment)
      res.json({
        res:"correct",
        message:"add comment ok"
      });
    })
  })


  router.delete("/", function(req,res,next) {
    var id = ObjectId(req.body._id)
    db.comments.remove({"_id" : id}, function(err,comment){
      if(err){
        res.send(err);
      }
      res.json({
        res:"correct",
        message:"delete comment ok"
      });
    })
  })


  router.put("/addVote/:vote",function(req,res,next){
    var id = ObjectId(req.body._id)
    if(req.params.vote=="true"){
      db.comments.updateOne({"_id":id},{$inc: { "voteCom" : 1}},function(err,users){
        if(err){
          res.json({
            res:"not correct",
            message:err
          });
        }
        res.json({
          res:"correct",
          message:"increment ok"
        });
      })
    }
    else{
      db.comments.updateOne({"_id" : id},{$inc: { "voteCom" : -1}},function(err,users){
        if(err){
          res.json({
            res:"not correct",
            message:err
          });
        }
        res.json({
          res:"correct",
          message:"decrement ok"
        });
      })
    }

  })




  router.delete("/", function(req,res,next) {
    var id = ObjectId(req.body._id)
    var idString = req.body._id

      db.comments.remove({
        "_id" : id
      },async function(err,comments){
        if(err){
          res.send(err);
        }
        await db.comReports.remove({"idCom":idString}, function(err,msg){
          if(err){
            console.log("Erreur remove commentReport")
            res.send(err);
          }
          console.log("Remove commentReport")
        })
        await db.votesComment.remove({"idCom":idString}, function(err,msg){
          if(err){
            console.log("Erreur remove votesComment")
            res.send(err);
          }
          console.log("Remove votesComment")
        })

        res.json({
          res:"correct",
          message:"delete post, reports, comment and votes ok"
        });
      })
  })



module.exports = router;
