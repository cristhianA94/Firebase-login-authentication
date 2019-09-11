// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


/* Rules Firebase original:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}

*/
// Firebase API connect
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAQ37PQ4mi1ZpAGSqUn0_3La1lxNzXW1i4",
    authDomain: "fir-auth-web-75274.firebaseapp.com",
    databaseURL: "https://fir-auth-web-75274.firebaseio.com",
    projectId: "fir-auth-web-75274",
    storageBucket: "",
    messagingSenderId: "10805534927"
  }
};
