// 파일 저장 후 읽기
import {promises} from 'fs';

const ss = "텍스트 문서를 작성합니다. 작성자는 유비";

console.log('처리1');

promises.writeFile('./ex3write.txt', ss)
    .then(() => {
        return promises.readFile('./ex3write.txt')
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        console.log('err : ', err);
    });

console.log('처리2');