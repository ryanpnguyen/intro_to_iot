var express		=require('express'),
	db			=require('../models')
	router		=express.Router();


router.get('/', (req, res) => {

	var setting;

	db.Settings.findOne({})
	.then( function(result){
		console.log('settings found')
		setting = result;
		return db.Stats.findOne()
	})
	.then( function(statResult){
		
		var timeInHot = statResult.timeInHot/statResult.timeTotal;
		var timeInCold = statResult.timeInCold/statResult.timeTotal;
		var timeInHumid = statResult.timeInHumid/statResult.timeTotal;
		var timeInDry = statResult.timeInDry/statResult.timeTotal;
		var timeOn = statResult.timeOn/statResult.timeTotal;

		var stats = {
			avgTemperature: statResult.avgTemperature.toFixed(2),
			avgHumidity: statResult.avgHumidity.toFixed(2),
			avgBrightness: statResult.avgBrightness,
			temperatureData: [timeInHot, 1-timeInHot-timeInCold, timeInCold],
			humidityData: [timeInHumid, 1-timeInHumid-timeInDry, timeInDry],
			onData: [timeOn, 1-timeOn]
		};

		res.render('home', {settings: setting, stats: stats});
	})
	.catch( function(err){
		res.send(err);
	})
});

router.get('/details', (req, res) => {
	res.render('details');
}); 

router.post('/set-color', (req, res) =>{

	db.Settings.findOne({})
	.then( function(result){
		var setting = {
		'lightColor': req.body.color,
		'lightIsOn': true
		}

		if (req.body.options){
			if (req.body.options.setAsDefault){
				setting['defaultColor'] = req.body.color;
			} else if (req.body.options.changeToDefault){
				setting['lightColor'] = result['defaultColor'];
			} else if (req.body.options.turnOff || req.body.color == '000000'){
				setting['lightColor'] = '000000';
				setting['lightIsOn'] = false;
			}
		}

		return db.Settings.findOneAndUpdate({}, setting, {'new': true, upsert: true})
	})
	.then( function(edited){
		console.log(edited);
		res.redirect('/');
	})
	.catch( function(err){
		res.send(err);
	});
});


router.post('/configure', (req, res) =>{
	db.Settings.findOneAndUpdate({}, req.body.setting, {'new': true, upsert: true})
	.then( function(edited){
		console.log(edited);
		res.redirect('/');
	})
	.catch( function(err){
		res.send(err);
	});
});

router.get('/seedStats', (req, res) =>{
	var seed ={
		avgTemperature: 32,
		avgHumidity: 11,
		avgBrightness: 721,
		timeInHot: 20,
		timeInCold: 60,
		timeInDry: 80,
		timeInHumid: 8,
		timeOn: 59,
		timeTotal: 100
	}

	db.Stats.findOneAndUpdate({}, seed, {'new': true, upsert: true})
	.then( function(stats){
		console.log(stats);
		res.redirect('/');
	})
	.catch( function(err){
		res.send(err);
	})
})

module.exports = router;