# Google Cloud Functions & Firebase Serverless Demo

This demo shows how to set up the basics of a serverless Firebase application that uses Firebase Authentication, Hosting, and Google Cloud Functions.

The Function with code code in the [functions](functions) directory demonstrates a Cloud Function protected by Firebase Authentication and responds with a simple 'Hello <username>'. Only users who pass a valid Firebase ID token as a Bearer token in the `Authorization` header of the HTTP request or in a `__session` cookie are authorized to use the Cloud Function. Checking the ID token is done with an ExpressJs middleware.

The Hosting site with code in the [public](public) directory lets you sign-in with Google Authentication and initiates the authorized call to the Function.

## Setting up the sample

 1. Create a Firebase Project using the [Firebase Console](https://console.firebase.google.com).
 1. Enable the **Google** Provider in the **Auth** section.
 1. Ensure that the **Support Email** within the Firebase **Project Settings** is configured, or authentication will fail with a 'restricted_client' error.
 1. Clone or download this repo.
 1. You must have the Firebase CLI installed. If you don't have it install it with `npm install -g firebase-tools` and then configure it with `firebase login`.
 1. Configure the CLI locally by using `firebase use --add` and select your project in the list.
 1. Install dependencies locally by running: `cd functions; npm install; cd -`



## Deploy and test

To test locally do:

 1. Start serving your project locally using `firebase serve --only hosting,functions`
 1. Open the app in a browser at `http://localhost:5000`.
 1. Sign in the web app in the browser using Google Sign-In and two authenticated requests will be performed from the client and the result will be displayed on the page, normally "Hello <user displayname>".


To deploy and test on prod do:

 1. Deploy your project using `firebase deploy`
 1. Open the app using `firebase open hosting:site`, this will open a browser.
 1. Sign in the web app in the browser using Google Sign-In and two authenticated requests will be performed from the client and the result will be displayed on the page, normally "Hello <user displayname>".


## Acknowledgements

The code within this repository utilizes sample code from: [firebase / functions-samples / authorized-https-endpoint](https://github.com/firebase/functions-samples/tree/master/authorized-https-endpoint)
