// 이전 실습을 순서대로 처리하고 싶다면 promise 객체를 사용

import {promises as fspro} from 'fs';

console.log('시작');

// readFile 함수에 chaining기법을 사용해 처리 순서를 보장한다.
fspro.readFile('./ex3read.txt')
    .then((data) => {
        console.log("1번", data.toString());
        return fspro.readFile('./ex3read.txt');
    })
    .then((data) => {
        console.log("2번", data.toString());
        return fspro.readFile('./ex3read.txt');
    })
    .then((data) => {
        console.log("3번", data.toString());
        console.log("끝");
    })
    .catch((err) =>{
        console.log("에러 : " , err);
    });

console.log('종료');