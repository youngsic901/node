import { WebSocketServer } from "ws";
import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

// WebSocketServer 서버 생성
const wss = new WebSocketServer({server});

const clients = new Map(); // 여러 user와 통신(각 ws)을 할 때 정보 담기 (목록)

function broadcast(message, exceptWs = null){
    wss.clients.forEach(client => {
        if(client.readyState === 1 && client !== exceptWs){
            client.send(message);
        }
    })
}

function sendUserList() {
    const users = Array.from(clients.values());
    const listMessage = `현재 접속자: ${users.join(', ')}`;
    broadcast(listMessage);
}

wss.on('connection', (ws) => {
    let username = null;

    ws.on('message', (msg) => {
        const message = msg.toString();

        if(!username){
            username = message;
            clients.set(ws, username);
            broadcast(`${username} 님 접속`);
            sendUserList();
            return;
        }

        broadcast(`${username} : ${message}`);
    })

    ws.on('close', () => {
        if(username) {
            broadcast(`${username} 님 퇴장`);
            clients.delete(ws);
            sendUserList();
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`채팅 서버 서비스 중 : http://127.0.0.1:${PORT}`);
});