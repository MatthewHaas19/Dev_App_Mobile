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

router.get("/posts/:post", function(req,res,next){
    const id = req.params.post
    db.reports.find({
      idPost: id
    },function(err,comments){
      if(err){
        res.send(err);
      }
      res.json(comments);
    })
  })

  router.get("/users/:emailUser", function(req,res,next){
      const id = req.params.emailUser
      db.reports.find({
        emailUser: id
      },function(err,comments){
        if(err){
          res.send(err);
        }
        res.json(comments);
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
  db.reports.find({
    emailUser: report.emailUser,
    idPost: report.idPost
  },function(err,reports){
    if(err){
      res.send(err);
    }
    else{
        if(reports.length==0){
          db.reports.insertOne(report,function(err,report){
            if(err){
              res.send(err);
            }
            console.log(report)
            res.json({
              res:"correct",
              message:"add report ok"
            });
        })
      }else {
        res.json({
          res:"exists",
          message:"Already exists"
        });
      }
    }
  })
})

module.exports = router;
