var express = require("express");
var router = express.Router();
var mongojs = require("mongojs")


var db = mongojs("mongodb+srv://devmobileIG4:devmobileIG4@devmobile-vr63q.mongodb.net/DevMobile?retryWrites=true&w=majority",["users"])

router.get("/", function(req,res,next){
  db.users.find(function(err,users){
    if(err){
      res.send(err);
    }
    res.json(users);
  })
})

router.get("/:name", function(req,res,next){
  const name = req.params.name
  db.users.find({
    email: name
  },function(err,users){
    if(err){
      res.send(err);
    }
    res.json(users);
  })
})


router.post("/", function(req,res,next){
  var user = req.body

  db.users.insertOne(user,function(err,users){
    if(err){
      res.send(err);
    }
    console.log(users)
    res.json({
      res:"correct",
      message:"register ok"
    });
  })

})

module.exports = router;
