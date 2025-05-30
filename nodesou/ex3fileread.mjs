import fs from 'fs';            // Es module 문법
// const fs = require('fs');    // CommonJs 문법

// 비동기 방식으로 파일 읽기
fs.readFile('./ex3read.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString() + '비동기');
});

console.log("-------------------------------------")
// 동기 방식으로 파일 읽기
const filedata = fs.readFileSync('./ex3read.txt', 'utf-8');
console.log(filedata + '처리 완료');

console.log("-------------------------------------")
//fs는 기본적으로 콜백 형식의 모듈이다. 이 때 promise 형식을 사용해 바동기 방식으로 파일을 읽기도 가능하다.
import {promises} from 'fs';

promises.readFile('./ex3read.txt')
    .then((data) => {
        console.log(data.toString() + 'promise');
    })
    .catch((err) => {
        console.log('err : ', err);
    });

const readFileAsync = async () => {
    try{
        const data = await promises.readFile('./ex3read.txt');
        console.log(data.toString() + 'await');
    }catch (e) {
        console.error(e);
    }
};
readFileAsync();