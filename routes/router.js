var express = require('express');
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs('ibrahima:sarr@ds011168.mlab.com:11168/ballot', ['magasin','facture','equipement','reservation']);
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
router.get('/facture', function (req, res) {
    db.facture.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });

});

router.post('/facture/', function (req,res) {
    console.log(req.body);
    db.facture.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

//------------------------------------------------------------------
//BALOT FIN
//------------------------------------------------------------------

router.get('/departmentList', function (req, res) {
    db.department.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });

});

router.get('/contactlist', function (req, res) {
    db.magasin.find( function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

router.get('/questions', function (req, res) {
    db.questions.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});
//**********************Pour retrouver la liste des employées et procédures par département ****************************************

router.get('/departmentEmployees:id', function (req, res) {
    var id = req.params.id;
    db.employee.find({ departmentID: id }, function (err, docs) {       
        console.log(docs);
        res.json(docs);
    });


});
router.get('/departmentProcedures:id', function (req, res) {
    var id = req.params.id;
    db.procedures.find({ departmentID: id }, function (err, docs) {
        console.log(docs);
        res.json(docs);
    });


});
router.get('/departmentQuestions:id', function (req, res) {
    var id = req.params.id;
    db.questions.find({ departmentID: id }, function (err, docs) {
        console.log(docs);
        res.json(docs);
    });


});

//*****************************************************************************
router.post('/contactlist/', function (req,res) {
    console.log(req.body);
    db.employee.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

router.delete('/contactlist/:id', function (req,res) {
    var id = req.params.id;
    console.log(id);
    db.employee.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    });
});

router.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    console.log(mongojs.ObjectId(id));
    db.employee.findOne({_id: mongojs.ObjectId(id)}, function (err,doc) {
        res.json(doc);
        console.log(doc);
    });
    
});


router.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.lastName);
    db.employee.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: { lastName: req.body.lastName, firstName: req.body.firstName, position: req.body.position, department: req.body.department } },
        new: true
    }, function (err,doc) { 
        res.json(doc );
    });
});

module.exports = router;












