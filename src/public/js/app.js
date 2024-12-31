const socket = new WebSocket(`ws://${window.location.host}`);

// socket connected
socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
  socket.send("Hello");
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
  console.log(message);
  console.log(message.data);
});
