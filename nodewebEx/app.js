import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import boardRoute from './boardRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(
        '<h1>메인 화면</h1>' + 
        '<a href="#">메뉴1</a>&nbsp;&nbsp;<a href="#">메뉴2</a>&nbsp;&nbsp;<a href="./select.html">게시판</a>'
    );
});

app.use('/board', boardRoute);

// 웹 서버
const startServer = (app, port) => {
    app.listen(port , () => {
        console.info(`[INFO] Server is running at http:127.0.0.1:${port}`);
    })
    .on('error', (err) => {
        console.info(`[INFO] Server Faild : ${err.message}`);
        process.exit(1);
    });
};

const PORT = process.env.PORT || 3000;
startServer(app, PORT);