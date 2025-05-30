// 라우팅 연습
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';  // 현재 모듈의 파일 경로와 디렉토리 경로 설정에 사용

//cors 정책을 해제해서 어디서든 현재 서버 호출이 가능하도록 허용
import cors from 'cors';

const app = express();
app.use(cors()) // cors 미들웨어를 활성화 어디서든 현재 서버 호출이 가능
const corsOptions = {
    origin:'*',
    methods : ['GET', 'POST'],
    allowedHeaders : ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions));

app.set('port', process.env.PORT || 3000);

// import.meta.url : 현재 실행중인 파일 경로
const __filename = fileURLToPath(import.meta.url); // __filename : ESM 환경에서 사용할 변수는 _를 선행
const __dirname = path.dirname(__filename);

// 라우팅 처리
app.get('/', (req,res) => { // root 요청
    res.send('Hello express');
});

app.get('/java', (req,res) => {
    res.send('<h2>Hello java</h2>');
});

app.get('/node', (req,res) => {
    res.send('<a href="https://cafe.daum.net/flowlife">node 안내</a>');
});

app.get('/abc', (req,res) => {
    res.sendFile(path.join(__dirname, 'abc.html'));
});

// json 전송
app.get('/json', (req,res) => {
    res.json({'이름':'공기밥'});
});

//참고 : 요청?변수=값 일때는 req.query로 받음
app.get('/member/:bun/:irum', (req,res) => {
    const {bun, irum} = req.params;
    res.json({bun, irum});
});

app.get('/user/:season', (req,res) => {
    const {season} = req.params;

    if(season === "summer") {
        res.json({'season' : '더워'});
    } else {
        res.json({'season' : '추워'});  
    }
});

app.get('/test', (req,res) => {
    res.sendFile(path.join(__dirname, 'test.html'))
})


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트번호로 웹서버 서비스 시작...');
})