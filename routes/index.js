var express = require('express');
var path = require('path');
var router = express.Router();
require('dotenv').config();
var argon2 = require('argon2');

var user = require('./users')
var sequelize = require('./db');
const { log } = require('console');

sequelize.sync().then(() => console.log('db set'))


var options = {
    root: path.join(path.dirname(__dirname), 'views'),        
};
/* GET login page. */
router.get('/', function(req, res, next) {
    res.sendFile('log.html', options);
});

router.post('/', async function(req, res, next) {
    console.log(req.body);

    try{
        const rec = await user.findOne({
            attributes: ['username', 'email', 'pass'],
            where: { username: req.body.username, email: req.body.email },
        });
        if (rec === null) {
            console.log('No Account Found');
            return res.redirect('/');
            
        }
        console.log('----------------------------------------------------------------------------');
        argon2.verify(rec.pass, req.body.pass).then(
            (val) => {
                if (val) {
                    console.log('Logged In');
                }
                else{
                    console.log('Wrong password');
                }
            }
        )



        // console.log(v.zipcode.toString()); 
    }
    catch(e) {
        console.log(e);
    }
    // shift it to top
    console.log('done');
    return res.redirect('/');
});

router.get('/register', function(req, res, next) {
    res.sendFile('register.html', options);
});

router.post('/register', function(req, res, next) {
    argon2.hash(req.body.pass).then(
        (hash) => {
            req.body.pass = hash;
            console.log(hash);
            console.log(req.body);
            user.create(req.body).then(() => {
                console.log('user saved');
                res.redirect('/');
            })
        }
    )
});

module.exports = router;
