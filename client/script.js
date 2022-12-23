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