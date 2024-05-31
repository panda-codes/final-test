document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // FIREBASE CONFIG
  var firebaseConfig = {
    apiKey: "AIzaSyApR2mlGQjiBC8P1iPD90JZJDQW0IOVR3U",
    authDomain: "authentication-612a2.firebaseapp.com",
    projectId: "authentication-612a2",
    storageBucket: "authentication-612a2.appspot.com",
    messagingSenderId: "858333147899",
    appId: "1:858333147899:android:9e9275592f536921b1365e",
  };

  firebase.initializeApp(firebaseConfig);

  // EVENT LISTENER FOR SIGNUP BUTTON
  document.querySelector(".sign").addEventListener("click", signIn);
}

// FUNTION TO HANDLE SIGNUP
function signIn() {
  const email = document.querySelector("#signup-form #email").value;
  const password = document.querySelector("#signup-form #password").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      alert("User signed up: " + user.email);
      window.location.href = "home.html"; // REDIRECT TO HOME PAGE
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
}

onDeviceReady();
