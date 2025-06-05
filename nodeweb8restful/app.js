import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sangRoute from './sangdataroute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.static('public')); // 정적파일(html) 작성용 디렉토리 지정

app.get('/', (req, res) => {
    res.send('<h1>메인 페이지</h1> 요청은 /sangdata ...');
});

// 라우터 연결
app.use('/sangdata', sangRoute);

// 웹 서버
const startServer = (app, port) => {
    app.listen(port, () => {
        console.info(`[info] Server is running at http://127.0.0.1:${port}`);
    })
    .on('error', (err) => {
        console.info(`[INFO] Server failed : ${err.message}`);
        process.exit(1);
    });
};

const PORT = process.env.PORT || 3000;
startServer(app, PORT)