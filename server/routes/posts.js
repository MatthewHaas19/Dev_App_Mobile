var express = require("express");
var router = express.Router();
var mongojs = require("mongojs")

ObjectId = require('mongodb').ObjectID;

var db = mongojs("mongodb+srv://devmobileIG4:devmobileIG4@devmobile-vr63q.mongodb.net/DevMobile?retryWrites=true&w=majority",["posts"])

router.get("/", function(req,res,next){
  db.posts.find(function(err,posts){
    if(err){
      res.send(err);
    }
    res.json(posts);
  })
})


router.get("/categorie/:categorie", function(req,res,next){
  const cat = req.params.categorie
  db.posts.find({
    categorie: {$eq :cat}
  },function(err,users){
    if(err){
      res.send(err);
    }
    res.json(users);
  })
})


router.get("/user/:user", function(req,res,next){
  const user = req.params.user
  db.posts.find({
    user: user
  },function(err,users){
    if(err){
      res.send(err);
    }
    res.json(users);
  })
})


router.put("/addVote/:vote",function(req,res,next){
  var id = ObjectId(req.body._id)
  if(req.params.vote=="true"){
    db.posts.updateOne({"_id":id},{$inc: { "note" : 1}},function(err,users){
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
    db.posts.updateOne({"_id" : id},{$inc: { "note" : -1}},function(err,users){
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

router.post("/", function(req,res,next){
  var post = req.body
  db.posts.insertOne(post,function(err,post){
    if(err){
      res.send(err);
    }
    res.json({
      res:"correct",
      message:"add post ok"
    });
  })
})

router.get("/:id", function(req,res,next) {
  const id = req.params.id
  db.posts.find({
    _id : id
  }, function(err,posts) {
    if(err){
      res.send(err)
    }
    res.json(posts)
  })
})


router.delete("/", function(req,res,next) {
  var id = ObjectId(req.body._id)
  var idString = req.body._id
  await db.posts.remove({"_id" : id})

    const commentsList = await db.comments.find({"postId" : idString});
    for await (c of commentsList) {
      console.log("Dans la boucle")
      await db.reportsCom.remove({"idCom":c._id});
    }
    await db.reports.remove({"idPost":idString})
    await db.comments.remove({"postId" : idString})
    await db.votes.remove({"post" : idString})
    
    res.json({
      res:"correct",
      message:"delete post, reports, comment and votes ok"
    });

})



router.put("/filter/:categorie", function(req,res,next){
  const cat = req.params.categorie
  const filter = req.body
  const tags = filter.tags
  var regex = ""
  if(tags.length>0){
    regex = "("+tags[0]
    for(let i=1;i<tags.length-1;i++){
      regex = regex + "|" + tags[i]
    }
    regex = regex + "|" + tags[tags.length-1] +")"
    console.log(regex)

    if(req.body.type=="Plus populaire"){
    db.posts.find({
      categorie: {$in :filter.categorie},
      $or: [ { titre: { $regex: regex,$options:'i' } }, { texte: { $regex: regex,$options:'i' } } ]
    }).sort({note:-1}).toArray(function(err,users){
      if(err){
        res.send(err);
      }
      res.json(users);
    })
    }
    else{
    db.posts.find({
      categorie: {$in :filter.categorie},
      $or: [ { titre: { $regex: regex,$options:'i' } }, { texte: { $regex: regex,$options:'i' } } ]
    }).sort({date:-1}).toArray(function(err,users){
      if(err){
        res.send(err);
      }
      res.json(users);
    })
    }

  }else{

    if(req.body.type=="Plus populaire"){
    db.posts.find({
      categorie: {$in :filter.categorie}
    }).sort({note:-1}).toArray(function(err,users){
      if(err){
        res.send(err);
      }
      res.json(users);
    })
    }
    else{
    db.posts.find({
      categorie: {$in :filter.categorie}
    }).sort({date:-1}).toArray(function(err,users){
      if(err){
        res.send(err);
      }
      res.json(users);
    })
    }

  }



})




module.exports = router;
