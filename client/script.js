import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

// Function to load the messages with the 3 dots
function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";
  }, 300);

  if (element.textContent === "....") {
    element.textContent = "";
  }
}

//Function to implement the AI response letter by letter
function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    //Check if the index is less than text length
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
    }
    //else if we reach end of text, clear the interval
    else {
      clearInterval(interval);
    }
  }, 20);
}

//Function to generate unique ID for each chat to Map over them
function generateUnique() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

//Function that segments the color background for AI or User with their images
function chatStripe(isAi, value, uniqueId) {
  return (
    `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div className="profile">
                    <img 
                        src="${isAi ? bot : user}"
                        alt="${isAi ? 'bot' : 'user'}"
                    />
                </div>
                <div class="message" id="${uniqueId}">${value}</div>
            </div>
        </div>
    
    `
  )
}


//Function to check User input in form and integrates chatStripe
const handleSubmit = async(e) => {
    e.preventDefault();

    const data = new FormData(form);

    //User's chatStripe::: UserInputFromTextarea
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

    //Clear form textarea
    form.reset();

    //Bot's chatStripe::: GenerateUniqueID->
    const uniqueId = generateUnique();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

    //Scroll to top as AI is typing
    chatContainer.scrollTop = chatContainer.scrollHeight;

    const msgDiv = document.getElementById(uniqueId);
    loader(msgDiv);

    //Fetch the Data from the server -> bot's resp
    const response = await fetch('http://localhost:5000', {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        prompt: data.get('prompt')
       })
    })

    clearInterval(loadInterval);

    //Clear loading dots and add message
    msgDiv.innerHTML = '';

    //Check the reponse of the data
    if(response.ok){
        const data = await response.json();

        //Pass the data
        const parsedData = data.bot.trim();
        typeText(msgDiv, parsedData);
    }else{
        // HandleError 
        const err = await response.text();
        msgDiv.innerHTML = "Ooopss ...Something went wrong.";
        alert(err);
    }

}

// Submit form and check to see if the enter key is pressed
form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
    if(e.keyCode === 13){
        handleSubmit(e);
    }
});
