const $messageForm = document.querySelector("#messageForm");
const $nicknameForm = document.querySelector("#nicknameForm");
const $message = $messageForm.querySelector("#message");
const $nickname = $nicknameForm.querySelector("#nickname");
const $ul = document.querySelector("ul");

const socket = new WebSocket(`ws://${window.location.host}`);

// 메시지 분기처리
const stringifyMessage = (type, value) => {
  const msg = {
    type: type,
    value: value,
  };
  return JSON.stringify(msg);
};
// socket connected
socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

// socket disconnected
socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

// socket error
socket.addEventListener("error", (error) => {
  console.log("Error ❌", error);
});

// socket.send()
socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  $ul.appendChild(li);
});

const handleSubmit = (event) => {
  event.preventDefault();
  socket.send(stringifyMessage("message", $message.value));
  $message.value = "";
};

const handleNicknameSubmit = (event) => {
  event.preventDefault();
  socket.send(stringifyMessage("nickname", $nickname.value));
  $nickname.value = "";
};

$messageForm.addEventListener("submit", handleSubmit);
$nicknameForm.addEventListener("submit", handleNicknameSubmit);
