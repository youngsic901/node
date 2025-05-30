// get, post 요청 처리 연습
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import jikwonRouter from './routes/jikwon.js';
import gogekRouter from './routes/gogek.js'

const app = express();
app.use(cors());
app.use(express.json());    // 직원(json 형식) 추가시 JSON 형식의 요청 본문을 파싱할 수 있는 미들웨어 추가

app.set('port', process.env.PORT || 3000);

const __filename = fileURLToPath(import.meta.url); // __filename : ESM 환경에서 사용할 변수는 _를 선행
const __dirname = path.dirname(__filename);

// 라우팅 처리
app.get('/', (req,res) => { // root 요청
    // res.send('메인');
    res.sendFile(path.join(__dirname, './public/main.html'));
});

app.use('/jikwon', jikwonRouter);
app.use('/gogek', gogekRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트번호로 웹서버 서비스 시작...');
})