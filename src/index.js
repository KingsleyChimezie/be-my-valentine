/*
 * Created Date: Wednesday, 3rd February 2021, 7:08:22 pm
 * Author: Kingsley Chimezie
 */


/* VARIABLES DECLARATION
************************************************************************************/
 // Get elements
let header = document.getElementById('header');
let loader = document.getElementById('loader');
let resultDiv = document.getElementById('result');
let resultHeader = document.getElementById('resultHeader');
let resultImg = document.getElementById('resultImg');
let btnYes = document.getElementById('btnYes');
let btnNo = document.getElementById('btnNo');
let btnChangeAnswer = document.getElementById('btnChangeAnswer');
let lastAnswerDateText = document.getElementById('lastAnswerDate');

// Object used to retrieve and send data to DB
let dbData = {
    lastAnswer: '',
    lastAnswerDate: '',
    lastAnswerIP: '',
    submissionsArr: []
};

let cloudFirestoreIdExists = false;
/************************************************************************************/



/* FIREBASE
************************************************************************************/

// INITIALISE FIREBASE
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();


/* GET FIREBASE DATA
-------------------------------- */
db.collection('valentines').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        docData = doc.data();
        // check if defined ID exists in DB
        if (doc.id === data.cloudFirestoreId) {
            cloudFirestoreIdExists = true;

            console.log(Object.keys(docData).length === 0 && docData.constructor === Object);
        }
    });
});
const setLocalObjToFirebaseData = (doc) => {
    console.log("setLocalObjToFirebaseData");
    // setting retrived Firbase data
    data.valentinesFirstName = doc.data().valentinesFirstName;
    data.valentinesLastName = doc.data().valentinesLastName;
    data.lastAnswerHeading = doc.data().lastAnswerHeading;
    data.headerMessage = doc.data().headerMessage;
    data.resultHeaderYes = doc.data().resultHeaderYes;
    data.resultHeaderNo = doc.data().resultHeaderNo;
    data.yesImgLink = doc.data().yesImgLink;
    data.noImgLink = doc.data().noImgLink;
};
/************************************************************************************/


/* LOADER
-------------------------------- */
const load = () => {
    // scroll to top
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // hide UI content
    header.style.display = 'none';
    loader.style.display = 'block';

    setTimeout(() => { 
        loader.style.display = 'none'; 
        header.style.display = 'inline';
    }, 2000);
};


/* BUTTONS CLICKED
-------------------------------- */
const yesClicked = () => {
    setData('yes');
    setUI();
};

const noClicked = () => {
    setData('no');
    setUI();
};

const changeAnswerClicked = () => {
    setData('');
    setUI();
};


/* GET TODAY'S DATE
-------------------------------- */
const getTodaysDate = () => {
    return new Date().toUTCString();
};


/* GET IP
-------------------------------- */
async function getIP() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const jsonObj = (res.json()).then(d => dbData.lastAnswerIP = d.ip);
    } catch (err) {
        console.error(err);
    }
}


/* SET DATA
-------------------------------- */
const setData = (answer) => {
    // set data
    dbData.lastAnswer = answer;
    dbData.lastAnswerDate = getTodaysDate();
    
    if (answer !== '') {
        getIP();
        
        // push to submission tracking array / DB
        dbData.submissionsArr.push({
            answer: dbData.lastAnswer,
            answerDate: dbData.lastAnswerDate,
            submissionIP: dbData.lastAnswerIP
        });
        console.log(dbData);
    }
};


/* SET UI 
-------------------------------- */
const setUI = (doc) => {

    // set header title
    header.innerHTML = `${data.valentinesFirstName} ${data.valentinesLastName}<br>${data.headerMessage}`;

    // No answer yet
    if (dbData.lastAnswer === '') {
        load();
        btnYes.style.display = 'inline';
        btnNo.style.display = 'inline';
        resultDiv.style.display = 'none';
        btnChangeAnswer.style.display = 'none';
        lastAnswerDateText.style.display = 'none';
    }
    // Answer is yes
    else if (dbData.lastAnswer === 'yes') {
        load();
        resultHeader.innerHTML = data.resultHeaderYes;
        lastAnswerDateText.innerHTML = `${data.lastAnswerHeading} ${dbData.lastAnswerDate}`;
        resultImg.src = data.yesImgLink;
        resultDiv.style.display = 'block';
        btnChangeAnswer.style.display = 'inline';
        lastAnswerDateText.style.display = 'block';
        btnYes.style.display = 'none';
        btnNo.style.display = 'none';
    }
    // Answer is no
    else if (dbData.lastAnswer === 'no') {
        load();
        resultHeader.innerHTML = data.resultHeaderNo;
        lastAnswerDateText.innerHTML = `${data.lastAnswerHeading} ${dbData.lastAnswerDate}`;
        resultImg.src = data.noImgLink;
        resultDiv.style.display = 'block';
        btnChangeAnswer.style.display = 'inline';
        lastAnswerDateText.style.display = 'block';
        btnYes.style.display = 'none';
        btnNo.style.display = 'none';
    }
};
setUI();
