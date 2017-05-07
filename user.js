var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt-nodejs');
//module used to encrypt password data


var UserSchema = new Schema({
	name:{type: String, required: true},
	email:{ type:String, required:true},
	school:{ type: String, required:true},
	personalPhone:{ type: Number, required:true},
	parentPhone:{ type: Number, required:true},
	arrivalTime:{type:String, required: false},
	laptopId:{type:String, required:false},
	checkIn:{ type:Number, required:false},
	checkOut:{ type:Number, required:false}

});

module.exports = mongoose.model('User', UserSchema);
