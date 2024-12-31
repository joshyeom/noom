import http from "http";
import WebSocket from "ws";
import express from "express";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

function handleConnection(socket) {
  sockets.push(socket);
  socket.on("close", () => console.log("Disconnected from Browser ❌"));
  socket.on("message", (message) => {
    const { type, value } = JSON.parse(message);
    switch (type) {
      case "nickname":
        socket.nickname = value;
        break;
      case "message":
        sockets.forEach((eachSocket) =>
          eachSocket.send(`${socket.nickname}: ${value}`)
        );
        break;
      default:
        break;
    }
  });
}

wss.on("connection", handleConnection);

server.listen(3000, handleListen);
