var mongoose 	= require('mongoose');

var settingsSchema = new mongoose.Schema({
	defaultColor: {
		type: String
	},
	lightColor: {
		type: String
	},
	lightIsOn: {
		type: Boolean
	}
});

var Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;