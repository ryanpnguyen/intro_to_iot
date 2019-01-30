var express		=require('express'),
	db			=require('../models')
	router		=express.Router();


router.get('/', (req, res) => {
	res.render('home');
});

router.get('/details', (req, res) => {
	res.render('details');
}); 

router.post('/set-color', (req, res) =>{
	console.log(req.body.color);
	console.log(req.body.options);

	var setting = {
		'lightColor': req.body.color,
		'lightIsOn': true
	}

	if (req.body.options){
		if (req.body.options.setAsDefault){
			setting['defaultColor'] = req.body.color;
		} else if (req.body.options.changeToDefault){
			setting['lightColor'] = '444444';
		} else if (req.body.options.turnOff || req.body.color == '000000'){
			setting['lightColor'] = '000000';
			setting['lightIsOn'] = false;
		}
	}

	console.log(setting);

	db.Settings.findOneAndUpdate({}, setting, {'new': true, upsert: true})
	.then( function(edited){
		console.log(edited);
		res.redirect('/');
	})
	.catch( function(err){
		res.send(err);
	})

	res.redirect('/');
} );

module.exports = router;