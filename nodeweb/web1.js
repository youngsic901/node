// express 모듈로 웹서버 운영하기
import express from 'express';

// app 객체 생성
const app = express();

// route 설정
app.get('/', function(req, res) {
    res.send('Hello world!');
});

app.get('/good', function(req, res) {
    res.send('Express good');
});

app.get('/nice', function(req, res) {
    res.send('Express nice');
});

app.get('/ok', function(req, res) {
    res.send('Express ok');
});

app.listen(3000,'0.0.0.0', () => {
    console.log('서버 서비스 시작 ...');
});