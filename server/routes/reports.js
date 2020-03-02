var express = require("express");
var router = express.Router();
var mongojs = require("mongojs")


var db = mongojs("mongodb+srv://devmobileIG4:devmobileIG4@devmobile-vr63q.mongodb.net/DevMobile?retryWrites=true&w=majority",["reports"])

router.get("/", function(req,res,next){
  db.reports.find(function(err,reports){
    if(err){
      res.send(err);
    }
    res.json(reports);
  })
})

router.get("/:post/:user", function(req,res,next){
  const idpost = req.params.idpost
  const mailUser = req.params.user
  db.reports.find({
    emailUser: mailUser,
    idPost: idPost
  },function(err,reports){
    if(err){
      res.send(err);
    }
    res.json(reports);
  })
})


router.post("/", function(req,res,next){
  var report = req.body
  if(reports.find({ emailUser: mailUser, idPost: idPost }).length == 0) {
    db.users.insertOne(report,function(err,report){
      if(err){
        res.send(err);
      }
      console.log(report)
      res.json({
        res:"correct",
        message:"add report ok"
      });
    })
  }
  else {
    res.json({
      res:"exists",
      message:"Already exists"
    });
  }


})

module.exports = router;
