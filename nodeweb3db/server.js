import express from 'express';
import mariadb from 'mariadb';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'test',
    port: 3306,
    connectionLimit: 5
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // 정적파일 작성용 폴더 설정

// select : sangdata 테이블 읽은 후 클라이언트에 전송
app.get('/sangdata', async(req, res) => {
    try{
        const conn = await pool.getConnection();
        const rows = await conn.query("select * from sangdata");
        res.json(rows);
        conn.release();
    } catch(error) {
        res.status(500).json({error: 'error fetching data', details: error.message});
    }
});

// next 매개변수 : next가 없으면 현재 미들웨어에서 종료.
// 미들웨어 함수 간의 흐름을 제어하는 콜백. next로 요청이 현재 미들웨어에서 다음 미들웨어로 넘어 가다록 제어
app.use((req, res, next) => {
    res.status(404).send('페이지를 찾을 수 없습니다.');
});

app.use((req, res, next) => {
    res.status(500).send('서버 파일에 오류');
});

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});