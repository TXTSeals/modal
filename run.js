let express = require('express');
let app = express();
var router = express.Router();
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var User = require('./user');
var mongoose = require('mongoose');
var objId = mongo.ObjectId;
var cors = require('cors');
var jwt = require('jsonwebtoken');

//serve our static files
app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

//connect to the mongo db using moongose module
mongoose.connect('mongodb://localhost:27017/cubeData', function(err){
    if(err){
      console.log("error " + err);
  }else{
      console.log("mongoose connected");
  }
})





//Sign Up Post Method
app.post('/signUp', jsonParser,function(req,res){
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.school = req.body.school;
    user.personalPhone = req.body.personalPhone;
    user.parentPhone = req.body.parentPhone;
            res.json({success:false,message:"Please make sure you fill out all of your information correctly!"});
        }else{
            console.log(user);
            res.json({success:true,message:"Cool! You successfully signed up!"})

        }

    });
};

//Check In Post Method
app.post('/check', jsonParser,function(req,res){
        var user =  new currentUser ();
      //user.laptopId = req.body.arrivalTime;
      user.checkIn = req.body.arrivalTime;
      user.checkOut = req.body.depatureTime;
      // user.laptopId = req.body.?

    user.save(function(err){
        if(err){
            console.log(err);
            res.json({success:false,message:"Please make sure you fill out all of your information correctly!"});
        }else{
            console.log(user);
            res.json({success:true,message:"Cool! You successfully checked in!"})

        }

    });
});




// app.put('/user/:_id', jsonParser,function(req,res){
//   UserSchema.findOneandUpdate({_id: id}), function(err, foundObject)({
//     var id = req.params.id;
//   },
//   {arrivalTime = req.body.arrivalTime
//   }, function(err, user){
//       if (err){
//         console.log("err");
//       }else{
//         res.send(UserSchema);
//       }
//   });


// app.post('/user', jsonParser,function(req,res){
//     var id = objId(req.params.id);
//     console.log(req.params.id);
//     $scope.currentUser.findOneandUpdate({_id: id}), function(err, foundObject){
//       if(err){
//         console.log("Seems there's an issue :/")
//         res.status(500).send();
//       } else{
//         if(!foundObject){
//           res.status(404).send();
//           console.log("line 84");
//         }else{
//           if(objId.toString(req.body.arrivalTime)){
//             objId.toString(foundObject.arrivalTime) =  objId.toString(req.body.arrivalTime);
//             console.log("Set the current Arrival");
//           }
//           foundObject.save(function(err, updatedObject){
//             if (err){
//               console.log("hmm.. another error");
//               res.status(500).send();
//             }else{
//               console.log(updatedObject);
//               res.send(updatedObject);
//             }
//           });
//         }
//       }
//     }

    // user.arrivalTime= req.body.arrivalTime;
    // user.depatureTime = req.body.depatureTime;
    // user.reasonForVisit = req.body.reasonForVisit;

    // laptopId:{type:String, required:false},
    // checkIn:{ type:Number, required:true},
    // checkOut:{ type:Number, required:true}

//     user.save(function(err){
//         if(err){
//             console.log(err);
//             res.json({success:false,message:"Please make sure you fill out all of your information correctly!"});
//         }else{
//             console.log(user);
//             res.json({success:true,message:"Cool! You successfully signed up!"})
//
//         }
//
//     });
// });

// app.post('/user', jsonParser,function(req,res){
//     var user= new User();
//     user.laptopId = req.body.laptopId;
//     user.checkIn = req.body.checkIn;
//     user.checkOut = req.body.checkOut;
//
// });

app.get('/users', function(req,response){
    User.find({}, { name: true }, function(err, users) {
        response.json(users);
    });
});

// app.post('/signUp', jsonParser,function(req,res){
//     user.laptopId = req.body.laptopId;
//     user.checkIn = req.body.checkIn;
//     user.checkOut = req.body.checkOut;
//

// decipher our token in the client side
app.post('/me',function(req,res){
    res.send(req.decoded);
});

var port = 8080;
app.listen(port, () => console.log("listening on  " + port));
