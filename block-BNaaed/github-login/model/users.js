var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
  name:{type:String},
  username:{type:String},
  email:{type:String,required:true, unique:true},
  photo:{type:String}
},{timestamps:true})

module.exports = mongoose.model('user', userSchema);