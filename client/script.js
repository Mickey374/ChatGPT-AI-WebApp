import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

// Function to load the messages with the 3 dots
function loader(element) {
    element.textContent = "";

    loadInterval = setInterval(() => {
        element.textContent += '.';
    }, 300);

    if(element.textContent === '....'){
        element.textContent = "";
    }
}

//Function to implement the AI response letter by letter
function typeText(element, text){
    let index = 0;
    let interval = setInterval(()=> {
        //Check if the index is less than text length
        if(index < text.length){
            element.innerHTML += text.charAt(index);
        }
        //else if we reach end of text, clear the interval
        else{
            clearInterval(interval);
        }
    }, 20);


}

//Function to generate unique ID for each chat to Map over them
function generateUnique(){
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}