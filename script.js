const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const name = prompt("Whats ur name?");
appendMessage("You joined");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}:${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});
socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault(); //prevents from refereshing the page again and again
  const message = messageInput.value;
  appendMessage(`YOU:${message}`);
  socket.emit("send-chat-message", message); //It emits the chat messages
  messageInput.value = ""; //It clear the output
});

function appendMessage(message) {
  const messageElement = document.createElement("div"); //It creates a new div
  messageElement.innerText = message; //It changes the value of the element to a particular message
  messageContainer.append(messageElement); //It appends it to the container
}
