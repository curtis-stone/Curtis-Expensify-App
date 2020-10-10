// WHERE APP CONNECTS TO DATABASE

import * as firebase from "firebase";
// TAKES ALL FIREBASE NAMED EXPORTS AND DUMPS TO A VARIABLE (FIREBASE)

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
}; // code from firebase

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// valid connection created ^

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// for google authentication. docs = https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider 

export { firebase, googleAuthProvider, database as default };

// // CHILD_REMOVED EVENT
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// }) // runs/listens every time a child is removed

// // CHILD_CHANGED EVENTS
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// }) // runs when a child is changed in database

// // CHILD_ADDED EVENTS
// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// }) // listens/ runs every time a child is added
//    // fires once for all data already in location as well

// database.ref('expenses').push({
//     description: 'car',
//     note: 'monthly fee',
//     amount: 150,
//     createdAt: null
// })
// ^ PUSHES INFO TO DATABASE

// PARSE INTO AN ARRAY
// database.ref('expenses')
// .once('value')
// .then((snapshot) => {

//    const expenses = []; // set empty array to start

//    snapshot.forEach((childSnapshot) => {
//     expenses.push({
//         id: childSnapshot.key, // .key method to get access to firebase's random id
//         ...childSnapshot.val() // spread out whatever comeSs back from childsnapshot
//     })
//    })
//    console.log(expenses)
// }); // .forEach() creates child snapshots for each 
// ^ PULLS DATABASE DATA AND PUTS IT INTO A LOG ARRAY


// LISTENING TO DATABASE ARRAY BASED CHANGES
// database.ref('expenses').on('value', (snapshot) => {

//     const expenses = []; // set empty array to start

//    snapshot.forEach((childSnapshot) => {
//     expenses.push({
//         id: childSnapshot.key, // .key method to get access to firebase's random id
//         ...childSnapshot.val() // spread out whatever comeSs back from childsnapshot
//     })
//    })
//      console.log(expenses)
//     }) // .on(arg, callback) allows us to listen for something over and over

// this gets ALL database methods that comes with firebase and puts them in a const
// testing connection
// ref = reference > access to a specific part of database
// set = sets value for reference
// .on() = subrscribe to changes | unsub. is listed below in comments

// ACTUALLY STORE LIST BASED DATA STRUCTURE I WILL USE | USE PUSH!!!
// database.ref('notes').push({
//     title: 'title 1',
//     body: 'this text'
// }) // .push() pushes an object to database w/ its own random unique id

// database.ref('notes/-MJ4_ZI4eAgEwZ2JvPWS').remove()

// database
//   .ref()
//   .set({
//     name: "Curtis Stone",
//     age: 23,
//     stressLevel: 6,
//     job: {
//         title: 'Software developer',
//         company: 'Google'
//     },
//     location: {
//       city: "Norcross",
//       country: "United States",
//     },
//   })
//   .then(() => {
//     console.log("data is saved");
//   })
//   .catch((error) => {
//     console.log("This failed.", error);
//   }); // asycnhronous code to database

//   database.ref().update({
//       stressLevel: 9,
//       'job/company': 'Amazon',
//       'location/city': 'Seattle'
//   })
// database.ref().update({ name: "James", age: 24, job: "web developer", isSingle: null});
// update() only works on root level (not in nested values)
// for nested use syntax below.
// database.ref().update({
//     job: 'manager',
//     'location/city': 'Jacksonville'
// })

// 

// database.ref().set('This is my data') // set can be called w/ any value

// database.ref('age').set(27);
// database.ref('location/city').set('Atlanta')

// database.ref('atrributes').set({
//     height: 69,
//     weight: 185
// }).then(() => {
//     console.log('Attributes added')
// }).catch((error) => {
//     console.log('Attributes not added: ', error)
// })
// adds another property to root object

// asynchronous > runs in background while connecting to database ( requests )
// to know when data has actually ran and changed, I will use promises

// REMOVE DATA EXAMPLE
// database.ref('isSingle').remove().then(() => {
//     console.log('Data is removed')
// }).catch((error) => {
//     console.log('Did not remove Data: ', error)
// })

// READING FROM DATABASE

// database.ref('location/city') //once gives us data a single time and never re-runs. won't be aware of any changes
// .once('value')
// .then((snapshot) => { // snapshot gives us access to the data recieved from fetching (snapshot.val())
//     const val = snapshot.val() 
//     console.log(val)
// })
// .catch((error) => {
//     console.log('Error fetching data: ', error)
// })

// database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val())
// }) // .on(arg, callback) allows us to listen for something over and over

// setTimeout(() => {
//     database.ref('age').set(32);
// }, 3500)

// setTimeout(() => {
//     database.ref().off(); // .off() cancels all subsrcriptions for a ref
// }, 7000) // to remove a specific subscript, put the subscription in a variable and pass ot in .off()

// setTimeout(() => {
//     database.ref('age').set(38);
// }, 10500)

// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// }, (error) => {
//     console.log('error with data fetching: ', error)
// });

// database.ref().on('value', (snapshot) => {
//     const val = snapshot.val()
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}!`)
// })

// setTimeout(() => {
//    database.ref().update({
//        name: 'James Curtis',
//        'job/title': 'Web Developer'
//    }).then(() => {
//        console.log('data updated')
//    })
// .catch((error) => {
//     console.log('error changing data: ', error)
// })
// }, 3000)