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

function handleConnection(socket) {
  socket.send("Hello");
  socket.on("close", () => console.log("Disconnected from Browser ❌"));
  socket.on("message", (message) => console.log(message));
}

wss.on("connection", handleConnection);

server.listen(3000, handleListen);

// 클라이언트, 서버 둘 중 하나라도 연결이 끊어지면 다른 하나도 연결이 끊어진다.
// socket.on() 메서드는 이벤트 리스너를 추가하는 메서드
// socket.send() 메서드는 메시지를 보내는 메서드
