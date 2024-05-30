document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    var firebaseConfig = {
        apiKey: "AIzaSyDvuRibRNRjRAh90WMVnITDbINs5lzX7QY",
        authDomain: "newly-936f6.firebaseapp.com",
        projectId: "newly-936f6",
        storageBucket: "newly-936f6.appspot.com",
        messagingSenderId: "263386213231",
        appId: "1:263386213231:android:fe2ba64bfd03259d7cd69a"
    };

    firebase.initializeApp(firebaseConfig);
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    // Attach event listeners to buttons
    document.querySelector('.sign-in').addEventListener('click', login);
    document.querySelector('.sign').addEventListener('click', signIn);
}

// Function to handle login
function login() {
    const email = document.querySelector('#login-form #email').value;
    const password = document.querySelector('#login-form #password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            alert('User signed in: ' + user.email);
            window.location.href = 'home.html';  // Redirect to home page
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Error: ' + errorMessage);
        });
}

// Function to handle sign-up
function signIn() {
    const email = document.querySelector('#signup-form #email').value;
    const password = document.querySelector('#signup-form #password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            alert('User signed up: ' + user.email);
            window.location.href = 'home.html';  // Redirect to home page
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Error: ' + errorMessage);
        });
}
