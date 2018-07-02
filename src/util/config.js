import firebase from 'Firebase'
import 'Firebase/firestore'

const config = {
  apiKey: "AIzaSyBTbP9rVzz37B5ZDNYm0YoqRRsFxoVqGfM",
    authDomain: "family-social-5026d.firebaseapp.com",
    databaseURL: "https://family-social-5026d.firebaseio.com",
    projectId: "family-social-5026d",
    storageBucket: "family-social-5026d.appspot.com",
    messagingSenderId: "697955346223"
}

let app = firebase.initializeApp(config)
let users = app.database().ref('users')
let comments = app.database().ref('comments')
let wishlist = app.database().ref('wishlist')
let fs = firebase.firestore(app)
let timestamp = new Date().getTime();

export { config, app, users, comments, wishlist, fs, timestamp };
