console.log('sourced');

var config = {
    apiKey: 'AIzaSyBpt6WgJi6-Dm3MNmHpRjFIePzGW9sEVeg',
    authDomain: 'devfest2017-eeab3.firebaseapp.com',
    databaseURL: 'https://devfest2017-eeab3.firebaseio.com',
    storageBucket: 'devfest2017-eeab3.appspot.com',
    messagingSenderId: '909625978259'
};
firebase.initializeApp(config);

var header = document.getElementById('header');

var dbRef = firebase.database().ref().child('header');

var signInButton = document.getElementById('signInButton');
var signOutButton = document.getElementById('signOutButton');
var provider = new firebase.auth.GoogleAuthProvider();

signInButton.addEventListener('click', function() {
    firebase.auth().signInWithPopup(provider).then(function(user) {
        if (user) {
            dbRef.on('value', function(snap) {
                header.innerText = snap.val();
            });
            playgroundRef.on('value', function(snap) {
                playground.value = snap.val();
            });
        }
    });
});

signOutButton.addEventListener('click', function() {
    firebase.auth().signOut().then(function() {
        header.innerText = 'You got signed out lulz';
        playground.value = 'sign in buddy';
    });
});

var playground = document.getElementById('playground');
var playgroundRef = firebase.database().ref().child('playground');

playground.addEventListener('keyup', function() {
    playgroundRef.set(playground.value);
});

document.getElementById('testButton').addEventListener('click', function() {
    console.log('Hit the test button');
    var req = new XMLHttpRequest();

    firebase.auth().currentUser.getToken(true).then(function(idToken) {
        $.ajax({ type: 'POST', url: '/', data: { token: idToken } });
    });
});
