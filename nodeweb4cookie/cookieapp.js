import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(__dirname)); // 정적 파일(html) 환경을 설정

// 요청 처리
app.get('/', (req, res) => {
    console.log(req.url, req.headers.cookie);
    res.cookie('mycookie', 'test', {httpOnly:true, maxAge:3600000}); // 클라이언트에 쿠키 설정
    res.send('Hello Cookie'); // 클라이언트(브라우저)에 응답 데이터 전송
});

app.get('/login', (req, res) => {
    const {name} = req.query;
    if(name) {
        res.cookie('username', name, {httpOnly:true}); // httpOnly: true => 클라이언트(브라우저)에서는 접근 불가
        res.send(`<h2>${name}님 로그인 성공</h2>`)
    } else {
        // 400 : Bad request
        res.status(400).send('<h2>이름을 입력하세요</h2>')
    }
});

app.listen(8080, () => {
    console.log('8080번 포트로 웹 서비스 진행...');
});