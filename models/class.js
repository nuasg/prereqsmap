var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClassSchema = new Schema({
	name			: String,
	schedule		: String,
	professor		: String,
	description 	: Array,
	prerequisites	: Array,
	fulfillments	: Array
})

module.exports = mongoose.model('Class', ClassSchema);