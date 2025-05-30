// 비동기로 파일, 웹문서 읽기 + 이벤트 처리
import {readFile} from 'fs';
import { EventEmitter } from 'events';

const fileEvent = new EventEmitter();

fileEvent.on('myreadfile', (filePath) => {
    readFile(filePath, "utf-8", (err, data) => {
        if(err){
            console.error('error reading file : ', err);
            return;
        }
        console.log(data);
    });
});

fileEvent.emit('myreadfile', 'ex3read.txt');
console.log('파일 내용 조회');

console.log('비동기 처리로 웹 문서 읽기----------------------');
// https://jsonplaceholder.typicode.com/posts/1
import https from 'https';
const webEvent = new EventEmitter();

webEvent.on('myfetchData', () => {
    https.get('https://jsonplaceholder.typicode.com/posts/1', (resp) => {
        let data = '';
        
        resp.on('data', (chunk) => {
            data += chunk;
        });
        console.log('data : ', data);

        // 읽기가 완료된 후
        resp.on('end', () => {
            try{
                const jsonData = JSON.parse(data);
                console.log('jsonData : ', jsonData);
            }catch(error) {
                console.log('parsing err : ', error);
            }
        });
    }).on("error", (err) => {
        console.log('fetch fail : ', err.message);
    });
});

webEvent.emit('myfetchData');
console.log('웹문서 내용 출력');