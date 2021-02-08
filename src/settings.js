/*
 * Created Date: Friday, 5th February 2021, 1:06:30 am
 * Author: Kingsley Chimezie
 */


/* FIREBASE CONFIG
-------------------------------- */
const firebaseConfig = {
    apiKey: "AIzaSyDqh0NM-ZRNIW-Csl-YQS3J6BOAjkUt68o",
    authDomain: "kcc-be-my-valentine.firebaseapp.com",
    databaseURL: "https://kcc-be-my-valentine-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "kcc-be-my-valentine",
    storageBucket: "kcc-be-my-valentine.appspot.com",
    messagingSenderId: "461637234904",
    appId: "1:461637234904:web:0cb468809b249c602867ad",
    measurementId: "G-QD987DDLLQ"
};


/* CLOUD FIRESTORE CONFIG
-------------------------------- */
const firestore = {
    collectionName: 'valentines',
    docID: 'test'
};


/* UI DATA
-------------------------------- */
const uiData = {
    valentinesFirstName: 'Ashley',
    valentinesLastName: 'Testington',
    headerMessage: 'will you bee my Valentine? 🌹',
    resultHeaderYes: 'You said yes! 😍',
    resultHeaderNo: 'You said no 😢',
    yesImgLink: 'https://media.giphy.com/media/b5LTssxCLpvVe/giphy.gif',
    noImgLink: 'https://media.giphy.com/media/wIhfELB4LvDhe/giphy.gif',
    lastAnswerHeading: 'Last answered:',
};