var mongoose	=require('mongoose'),
	dotenv		=require('dotenv');

dotenv.load();

mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE);
mongoose.promise = Promise;

module.exports.Settings = require('./settings');