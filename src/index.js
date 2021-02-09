/*
 * Created Date: Wednesday, 3rd February 2021, 7:08:22 pm
 * Author: Kingsley Chimezie
 */


 
/* VARIABLES
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

// Object used to temporarily store and send data to DB
let dbData = {
    lastAnswer: '',
    lastAnswerDate: '',
    lastAnswerIP: '',
    submissionsArr: []
};



/* GET PUBLIC IP
************************************************************************************/
const getIP = async () => {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const jsonObj = (res.json()).then(d => dbData.lastAnswerIP = d.ip);
    } catch (err) {
        console.error(err);
    }
};
getIP();



/* FIREBASE
************************************************************************************/

// INITIALISE FIREBASE
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();


// Get Firebase data
const getFirebaseData = async () => {
    try {
        // get collection document data, where the doc's ID matches the defined ID
        const ref = db.collection(firestore.collectionName).doc(firestore.docID);
        const doc = await ref.get();
        const docData = doc.data();

        // document does not exist
        if (!doc.exists) {
            setUI();
            console.log(`Firstore collection '${firestore.collectionName}' with document ID '${firestore.docID}' does not exist.`);
        } 
        // document does exist
        else {
            setLocalObjToFirebaseData(docData);
        }
        
    } catch (err) {
        console.error(err);
    }
};
getFirebaseData();


// setting Firebase data to local object
const setLocalObjToFirebaseData = (docData) => {
    dbData.lastAnswer = docData.lastAnswer;
    dbData.lastAnswerDate = docData.lastAnswerDate;
    dbData.lastAnswerIP = docData.lastAnswerIP;
    dbData.submissionsArr = docData.submissionsArr;
    console.log('DATA RETRIEVED FROM FIRESTORE: ', dbData);
    setUI();
};


// setting Firebase data
const setFirebaseDataToLocalObj = () => {
    const ref = db.collection('valentines').doc(firestore.docID).set(dbData, { merge: true });
    console.log('DATA ADDED TO FIRESTORE: ', dbData);
};


/* LOADER
---------------------------------------------------- */
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



/* SET UI 
---------------------------------------------------- */
const setUI = () => {
    // set header title
    header.innerHTML = `${uiData.valentinesFirstName} ${uiData.valentinesLastName}<br>${uiData.headerMessage}`;
    
    // Answer is yes
    if (dbData.lastAnswer === 'yes') {
        load();
        resultHeader.innerHTML = uiData.resultHeaderYes;
        lastAnswerDateText.innerHTML = `${uiData.lastAnswerHeading} ${dbData.lastAnswerDate}`;
        resultImg.src = uiData.yesImgLink;
        resultDiv.style.display = 'block';
        btnChangeAnswer.style.display = 'inline';
        lastAnswerDateText.style.display = 'block';
        btnYes.style.display = 'none';
        btnNo.style.display = 'none';
    }
    // Answer is no
    else if (dbData.lastAnswer === 'no') {
        load();
        resultHeader.innerHTML = uiData.resultHeaderNo;
        lastAnswerDateText.innerHTML = `${uiData.lastAnswerHeading} ${dbData.lastAnswerDate}`;
        resultImg.src = uiData.noImgLink;
        resultDiv.style.display = 'block';
        btnChangeAnswer.style.display = 'inline';
        lastAnswerDateText.style.display = 'block';
        btnYes.style.display = 'none';
        btnNo.style.display = 'none';
    }
    // No valid answer (yes / no) available
    else {
        load();
        btnYes.style.display = 'inline';
        btnNo.style.display = 'inline';
        resultDiv.style.display = 'none';
        btnChangeAnswer.style.display = 'none';
        lastAnswerDateText.style.display = 'none';
    }
};



/* BUTTONS CLICKED
---------------------------------------------------- */
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



/* SET DATA
---------------------------------------------------- */
const setData = (answer) => {
    // submissions array cannot be undefined, this will cause an error when using push!
    // if submissions array is undefined 
    if (dbData.submissionsArr === undefined) {
        // set to empty array
        dbData.submissionsArr = [];
    }

    // set data
    dbData.lastAnswer = answer;
    dbData.lastAnswerDate = getTimestamp();
    
    // record a submission only if answer is yes or no
    if (answer === 'yes' || answer === 'no') {
        
        // push submissions array
        dbData.submissionsArr.push({
            answer: dbData.lastAnswer,
            answerDate: dbData.lastAnswerDate,
            submissionIP: dbData.lastAnswerIP
        });

        // send data to Firestore
        setFirebaseDataToLocalObj();
    }
};



/* GET TODAY'S DATE
---------------------------------------------------- */
const getTimestamp = () => {
    return new Date().toUTCString();
};

