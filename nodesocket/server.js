import { WebSocketServer } from "ws";
import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from "url";
import {v4 as uuidv4} from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

// WebSocketServer 서버 생성
const wss = new WebSocketServer({server});

//uuid v4를 이용 : 무작위로 고유 id를 생성해 클라이언트를 구분. 실습용
wss.on('connection', (ws, req) => {
    // 클라이언트 고유 id 부여
    const clientid = uuidv4();
    ws.id = clientid;
    console.log(`클라이언트(${clientid})와 연결됨`);

    ws.on('message', (message) => {
        console.log(`수신 메세지 : (from, ${ws.id}) - ${message}`);
        ws.send(`서버 응답 ${message}`);
    });

    ws.on('close', () => {
        console.log(`클라이언트 ${ws.id}와 연결종료`);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`서버 서비스 중 : http://127.0.0.1:${PORT}`);
});