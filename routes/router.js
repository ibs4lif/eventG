var express = require('express');
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs('ibrahima:sarr@ds011168.mlab.com:11168/ballot', ['equipement','reservation']);
var bodyParser = require('body-parser');
var cors = require('cors');
//var app = express();
var test =1;

router.use(bodyParser.json());
router.use(cors());

//------------------------------------------------------------------
//EQUIPEMENT
//------------------------------------------------------------------
router.get('/', function (req, res) {
    res.send('Test');
});
router.get('/equipement', function (req, res) {
    db.equipement.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });

});
router.get('/reservation', function (req, res) {
    db.reservation.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });

});
//----------------------------------POST
router.post('/equipement/', function (req,res) {
    console.log(req.body);
    db.equipement.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});
router.post('/reservation/', function (req,res) {
    console.log(req.body);
    db.reservation.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

//------------------------------------------------------------------
//BALOT
//------------------------------------------------------------------

module.exports = router;












