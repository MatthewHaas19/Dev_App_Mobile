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


router.delete("/", async function(req,res,next) {
  var id = ObjectId(req.body._id)
  var idString = req.body._id
  var str = ""

  await db.users.find({"_id" : id}, async function(err, user) {

    await db.posts.find({"user" : user.email}, async function(err,posts){
      if(err){
        console.log("Erreur remove post")
        res.send(err);
      }

      for await (p of posts) {
        postId = String(p._id)


        await db.comments.find({
          "postId" : postId
        },async function(err,comments){
          if(err){
            res.send(err);
          }
          for await (c of comments) {
            str = String(c._id)
            console.log(str)
            await db.comReports.remove({"idCom":str}, function(err,msg){
              if(err){
                console.log("Erreur remove commentReport")
                res.send(err);
              }
              console.log("Remove commentReport")
            })
            await db.votesComment.remove({"idCom":str}, function(err,msg){
              if(err){
                console.log("Erreur remove votesComment")
                res.send(err);
              }
              console.log("Remove votesComment")
            })
          }
        })


        await db.reports.remove({"idPost":postId})
        console.log("reports remove")
        await db.comments.remove({"postId" : postId})
        console.log("comments remove")
        await db.votes.remove({"post" : postId})
        console.log("votes remove")
        res.json({
          res:"correct",
          message:"delete post, reports, comment and votes ok"
        });

      }

      await db.posts.remove({"user":user.email})
      console.log("posts remove")

    })


  })
  await db.users.remove({"_id":id})
  console.log("user remove")

})




module.exports = router;
