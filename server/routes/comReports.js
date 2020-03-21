var express = require("express");
var router = express.Router();
var mongojs = require("mongojs")


var db = mongojs("mongodb+srv://devmobileIG4:devmobileIG4@devmobile-vr63q.mongodb.net/DevMobile?retryWrites=true&w=majority",["comReports"])

router.get("/", function(req,res,next){
  db.comReports.find(function(err,comReports){
    if(err){
      res.send(err);
    }
    res.json(comReports);
  })
})


router.get("/:comment", function(req,res,next){
    const id = req.params.comment
    db.comReports.find({
      idCom: id
    },function(err,comments){
      if(err){
        res.send(err);
      }
      res.json(comments);
    })
  })


router.get("/:comment/:user", function(req,res,next){
  const idCom = req.params.idCom
  const mailUser = req.params.user
  db.comReports.find({
    emailUser: mailUser,
    idCom: idCom
  },function(err,comReports){
    if(err){
      res.send(err);
    }
    res.json(comReports);
  })
})



router.post("/", function(req,res,next){
  var report = req.body
  db.comReports.find({
    emailUser: report.emailUser,
    idCom: report.idCom
  },function(err,reports){
    if(err){
      res.send(err);
    }
    else{
        if(reports.length==0){
          db.comReports.insertOne(report,function(err,report){
            if(err){
              res.send(err);
            }
            console.log(report)
            res.json({
              res:"correct",
              message:"add reportcom ok"
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
