const inputContainer = document.querySelector(".input-container");
const countdownForm = document.querySelector("#countdownForm");
const dateElement = document.querySelector(".date-picker");

const countdownElement = document.querySelector(".countdown");
const countdownElementTitle = document.querySelector(".countdown__title");
const countdownBtn = document.querySelector(".countdown__button");
const timeElements = document.querySelectorAll("span");

const completeElement = document.querySelector(".complete");
const completeElementInfo = document.querySelector(".complete__info");
const completeBtn = document.querySelector(".complete__button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input 
const today = new Date().toISOString().split("T")[0];
dateElement.setAttribute("min", today);

// DOM Update
const updateDOM = () => {
    countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const timeSpan = countdownValue - now;

    const days = Math.floor(timeSpan / day);
    const hours = Math.floor((timeSpan % day) / hour);
    const minutes = Math.floor((timeSpan % hour) / minute);
    const seconds = Math.floor((timeSpan % minute) / second);

    inputContainer.hidden = true;

    if(timeSpan < 0){
        countdownElement.hidden = true;
        clearInterval(countdownActive);
        completeElementInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeElement.hidden = false;
    } else {
        countdownElementTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeElement.hidden = true;
        countdownElement.hidden = false;
    }

    }, second);
}

// Take values from input
const updateCountdown = (e) => {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    // Local storage
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    }
    
    localStorage.setItem("countdown", JSON.stringify(savedCountdown));
    // Is date valid
    if(countdownDate === "" || countdownTitle === ""){
        alert("Please enter a valid date or title");
    } else {
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Reset all values
const resetTimer = () =>{
    countdownElement.hidden = true;
    completeElement.hidden = true;
    inputContainer.hidden = false;

    clearInterval(countdownActive);
    countdownTitle = "";
    countdownDate = "";
    localStorage.removeItem("countdown");
}

restorePreviousCountdown = () => {
    // Get countdown from local storage
    if(localStorage.getItem("countdown")){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem("countdown"));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", resetTimer);
completeBtn.addEventListener("click", resetTimer);

// Check local storage on load
restorePreviousCountdown();
