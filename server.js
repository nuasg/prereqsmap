// server.js

// BASE SETUP
// =============================================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@ds053784.mongolab.com:53784/prereqsmap');
var User = require('./models/user.js');
var Major = require('./models/major.js');
var Certficate= requre('./models/certficate.js');
var class = require('./models/class.js');
var degree = require('./models/degree.js');
var minor = require('./models/minor.js');
var requirement = require('./models/requirement.js');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

router.route('/user')
	.post(function(req, res) {
			var user = new User();
			//possibly change based on diff fields
			user.majors = req.body.majors;
			user.minors = req.body.minors;
			user.certificates = req.body.certificates;
			user.degree = req.body.degree;
			user.classes = req.body.classes;
			user.name = req.body.name;

		user.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'User created!'});
		});
	});

router.route('/major')
	.post(function(req, res) {
			var major = new Major();
			major.name = req.body.name;
			major.classes = req.body.classes;

		major.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'Major created!'})
		})
	})

router.route('/minor')
	.post(function(req, res) {
			var minor = new Minor();
			minor.name = req.body.name;
			minor.classes = req.body.classes;

		minor.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'Minor created!'})
		})
	})

router.route('/certficate')
	.post(function(req, res) {
			var certficate = new Certficate();
			certficate.name = req.body.name;
			certficate.classes = req.body.classes;

		certficate.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'Certficate created!'})
		})
	})

router.route('/class')
	.post(function(req, res) {
			var class = new Class();
			class.name = req.body.name;
			class.schedule = req.body.schedule;
			class.professor= req.body.professor;
			class.description= req.body.description;
			class.prerequisites=req.body.prerequisites;
			class.fulfillments=req.body.fulfillments;

		class.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'Class created!'})
		})
	})

router.route('/degree')
	.post(function(req, res) {
			var degree = new Degree();
			degree.name = req.body.name;
			degree.school = req.body.school;
			degree.major = req.body.major;
			degree.requirements = req.body.requirements;

		degree.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'Degree created!'})
		})
	})

router.route('/requirement')
	.post(function(req, res) {
			var requirement = new Requirement();
			requirement.name = req.body.name;
			requirement.classes = req.body.classes;

		requirement.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'Requirement created!'})
		})
	})

	//get all bears
	/*
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

    .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    });
    */

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);