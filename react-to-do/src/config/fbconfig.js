import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'

var config = {
    apiKey: "AIzaSyAej3HGNOPYBzgbZ4XM-WO2lqC_mPqJcNg",
    authDomain: "todo1010.firebaseapp.com",
    databaseURL: "https://todo1010.firebaseio.com",
    projectId: "todo1010",
    storageBucket: "todo1010.appspot.com",
    messagingSenderId: "772523286584"
};
firebase.initializeApp(config);
// firebase.firestore().settings({timestampsInSnapshots:true})
export default firebase