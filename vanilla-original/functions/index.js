const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

//middlewares
const express = require('express');
const bodyParser = require('body-parser')


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const pw_verify = express();

pw_verify.use(bodyParser.urlencoded({
    extended: false
})) // parse application/x-www-form-urlencoded
pw_verify.use(bodyParser.json()) // parse application/json


pw_verify.post('/api/v1/auth/verify', (req, res) => {
    if (req.body.pw != functions.config().auth.key) {
        return res.status(400).json({msg:'Password Not Valid'});
    } 
    res.status(200).send("it worked");
    
    
});


pw_verify.get('/api/v1/auth/submitKey', (req, res) => {
    return res.status(200).json(functions.config().asana.key)

});

exports.pw_verify = functions.https.onRequest(pw_verify);