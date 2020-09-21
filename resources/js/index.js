const nameInput = document.getElementById(`myName`);
const myMessage = document.getElementById(`myMessage`);
const sendButton = document.getElementById(`sendButton`);
const chatBox = document.getElementById(`chat`);

function fetchMessages() {
  // eslint-disable-next-line no-undef
  return fetch(serverURL)
    .then(response => response.json());
}

async function updateMessages() {
  // Fetch Messages
  const messages = await fetchMessages();

  let formattedMessages = ``;                                    
  messages.forEach(message => {                                   
    formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;                     
}

function formatMessage(message, myName) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;
  // Loop over the messages. Inside the loop we will get each message
  // format it and add it to the chatbox
  if (myName === message.sender) {
    return `
        <div class="mine messages">
            <div class="message">
                ${message.text}
            </div>
            <div class="sender-info">
                ${formattedTime}
            </div>
        </div>
        `;
  } else {
    return `
            <div class="yours messages">
                <div class="message">
                    ${message.text}
                </div>
                <div class="sender-info">
                    ${message.sender} ${formattedTime}
                </div>
            </div>
        `;
  }
}


