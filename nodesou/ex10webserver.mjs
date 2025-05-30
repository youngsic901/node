// 웹서버 구축하기
// import https from 'https'; // 고정ip 필요
import http from 'http';

http.createServer((req, res) => {
    res.writeHead(200, {'content-type' : 'text/html;charset=utf-8'});
    res.write('<h2>테스트 메인</h2>');
    res.write('TEST<br>');
    res.end('Hello');
})
.listen(8080, () => {
    console.log('서버 서비스 중...');
})
