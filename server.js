const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const admin = require('firebase-admin');

const serviceAccount = require(
    path.join(
        __dirname,
        'devfest2017-eeab3-firebase-adminsdk-5rtu0-22460ba4ba.json'
    )
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_URL
});

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    console.log(req.body);
    admin
        .auth()
        .verifyIdToken(req.body.token)
        .then(decodedToken => console.log(decodedToken))
        .catch(err => console.log(err));
});

app.listen(8000, () => console.log('listening'));
