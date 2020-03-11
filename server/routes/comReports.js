var express = require("express");
var router = express.Router();
var mongojs = require("mongojs")


var db = mongojs("mongodb+srv://devmobileIG4:devmobileIG4@devmobile-vr63q.mongodb.net/DevMobile?retryWrites=true&w=majority",["comReports"])

router.get("/", function(req,res,next){
  db.reportsCom.find(function(err,reportsCom){
    if(err){
      res.send(err);
    }
    res.json(reportsCom);
  })
})

router.get("/:comment/:user", function(req,res,next){
  const idCom = req.params.idCom
  const mailUser = req.params.user
  db.reportsCom.find({
    emailUser: mailUser,
    idCom: idCom
  },function(err,reportsCom){
    if(err){
      res.send(err);
    }
    res.json(reportsCom);
  })
})


router.post("/", function(req,res,next){
  var report = req.body
  db.reportsCom.find({
    emailUser: report.emailUser,
    idCom: report.idCom
  },function(err,reports){
    if(err){
      res.send(err);
    }
    else{
        if(reports.length==0){
          db.reportsCom.insertOne(report,function(err,report){
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
