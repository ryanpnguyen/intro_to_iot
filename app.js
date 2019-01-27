var	express		= require('express'),
	bodyParser	=require('body-parser'),
	app			= express();

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/details', (req, res) => {
	res.render('details');
}); 

app.post('/set-color', (req, res) =>{
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

	res.redirect('/');
} )

app.listen(app.get('port'), () => console.log('Listening on port ' + app.get('port')));

