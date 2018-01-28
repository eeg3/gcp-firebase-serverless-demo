// Set the API URL using the page's location. If doing firebase local testing then it is likely done on a non-standard port, which is why we add the logic to include that if necessary.
var HELLO_API_URL = window.location.protocol + '//' + window.location.hostname + ( (window.location.port != "") ? `:${window.location.port}` : "") + '/hello';
// Set the Firebase Authentication provider to Google.
var provider = new firebase.auth.GoogleAuthProvider();

function init() {

    // Initiates the sign-in flow using GoogleAuthProvider sign in in a popup.
    $(".signinAction").on('click', function () {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        });
    });

    // Signs-out of Firebase.
    $(".signoutAction").on('click', function () {
        firebase.auth().signOut();
    });

    // Listening for Firebase auth state changes.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $(".authenticated").show();
            $(".unauthenticated").hide();

            populateUserDetails(user);
            googleCloudFunctionRequest();
        } else {
            $(".authenticated").hide();
            $(".unauthenticated").show();
        }
    });
}

// Populate User Details Card
function populateUserDetails(user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;

    $("#displayName").text(displayName);
    $("#email").text(email);
    $("#emailVerified").text(emailVerified);
    $("#photoURL").text(photoURL);
    $("#isAnonymous").text(isAnonymous);
    $("#uid").text(uid);
    $("#providerData").text(JSON.stringify(providerData));
}

// Does an authenticated request to a Firebase Functions endpoint using an Authorization header.
function googleCloudFunctionRequest() {

    $("#url").text(HELLO_API_URL);

    firebase.auth().currentUser.getIdToken().then(function (token) {

        // (Optional) If desired, uncomment and a cookie will be saved for authentication.
        //document.cookie = '__session=' + token + ';max-age=3600';

        console.log('Calling Cloud Function at: ' + HELLO_API_URL);

        $.ajax({
            method: 'GET',
            url: HELLO_API_URL,
            headers: {
                Authorization: 'Bearer ' + token
            },
            error: function () {
                $("#response").text("There was an error");
            },
            success: function (data) {
                $("#response").text(data);
            }
        });

    });
};

window.onload = init;