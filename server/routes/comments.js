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

 





module.exports = router;
