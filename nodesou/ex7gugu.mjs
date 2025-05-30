// 키보드로 단을 입력 받아 구구단 출력
import {EventEmitter} from 'events';
import readline from 'readline';

const myEvent = new EventEmitter();
const inout = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const printGugudan = (dan) => {
    console.log(`\n구구단 ${dan} 출력`);
    for(let i = 1; i <= 9; i++){
        console.log(`${dan} * ${i} = ${dan * i}`);
    }
};

// 이벤트 등록
myEvent.on('guguevent', (dan) => {
    printGugudan(dan);
    inout.close();  // 키보드 입력 종료
});

inout.question('출력할 단은:', (input) => {
    const dan = parseInt(input,10);
    if(!isNaN(dan)){
        myEvent.emit('guguevent', dan);
    } else {
        console.log('올바른 숫자 입력 필요');
        inout.close();
    }
})