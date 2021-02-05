/*
 * Created Date: Wednesday, 3rd February 2021, 7:08:22 pm
 * Author: Kingsley Chimezie
 */


let dbData = {
    lastAnswer: '',
    lastAnswerDate: '',
    lastAnswerIP: '',
    submissionsArr: []
};

// TODO: PERSIST DATA

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


const dataProcessor = (doc) => {

    // set header title
    header.innerHTML = `${data.valentinesFirstName} ${data.valentinesLastName}, <br> ${data.headerMessage}`;

    // No answer yet
    if (dbData.lastAnswer === '') {
        loader.style.display = 'block';
        setTimeout(() => { loader.style.display = 'none'; }, 1500);
        btnYes.style.display = 'inline';
        btnNo.style.display = 'inline';
        resultDiv.style.display = 'none';
        btnChangeAnswer.style.display = 'none';
        lastAnswerDateText.style.display = 'none';
    }
    // Answer is yes
    else if (dbData.lastAnswer === 'yes') {
        loader.style.display = 'block';
        setTimeout(() => { loader.style.display = 'none'; }, 1500);
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
        loader.style.display = 'block';
        setTimeout(() => { loader.style.display = 'none'; }, 1500);
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
dataProcessor();

/* BUTTONS CLICKED
-------------------------------- */
const yesClicked = () => {
    setData('yes');
    dataProcessor();
};

const noClicked = () => {
    setData('no');
    dataProcessor();
};

const changeAnswerClicked = () => {
    setData('');
    dataProcessor();
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
            lastAnswer: dbData.lastAnswer,
            lastAnswerDate: dbData.lastAnswerDate,
            lastAnswerIP: dbData.lastAnswerIP
        });
        console.log(dbData.submissionsArr);
    }
};

