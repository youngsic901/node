import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(express.urlencoded({extended:true})); // urlencoded 데이터(주로 html의 form 데이터)를 파싱하도록 설정
app.use(session({
    secret:'secret-key', // 세션 암호화를 위한 비밀키 설정
    resave:false, // 세션이 수정되지 않은 경우에도 세션을 다시 저장할지 여부를 설정
    saveUninitialized: true, // 초기화되지 않은 세션을 저장할지 여부
    cookie: {maxAge:30 * 60 * 1000} // 세션 쿠키의 유효시간 30분

}));

app.set('view engine', 'ejs'); // ejs를 템플릿 엔진으로 사용(ejs 파일은 view폴더 내에 있어야 함)
app.set('views', path.join(__dirname, 'views')); // 뷰 파일의 디렉토리 설정

const auth = { // 인증에 사용할 정보
    id: 'kor',
    password: '111'
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const {id, password} = req.body;
    // console.log(id, password);

    if(id === auth.id && password === auth.password){
        req.session.user = id;  // 세션에 사용자 id 저장
        res.redirect('/main');    // 로그인 성공시 메인 페이지로 이동하기 위한 요청
    } else {
        res.send(`로그인 실패! <a href="/">다시 로그인</a>`);
    }
});

app.get('/main', (req, res) => {
    if(req.session.user) {
        res.render('mymain', {sessionId:req.session.user});    // forwarding
    } else {
        res.send(`접근 권한이 없음 <a href="/">로그인</a>`);
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            // 세션 제거 중 오류 발생 시 메인 페이지로 이동
            return res.redirect(`/main`);
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});