var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema = new Schema({
	major		: String,
	degree		: String,
	classes 	: Array,
	name		: String
})

module.exports = mongoose.model('User', UserSchema);