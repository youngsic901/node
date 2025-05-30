// 이벤트 처리
// events 모듈 사용. EventEmitter 객체로 이벤트와 핸들러를 연결 - 동기적으로 호출

import {EventEmitter} from 'events';

const myEvent = new EventEmitter();

myEvent.addListener('event1', () => { // addListener(이벤트명, 콜백). on()과 같은 기능
    console.log('이벤트 1');
});

myEvent.on('event2', () => {
    console.log('이벤트 2');
});

myEvent.on('event2', () => {
    console.log('이벤트 2 추가');
});

myEvent.once('event3', () => { // once : 1회만 호출됨
    console.log('이벤트 3');
});

myEvent.emit('event1'); // 이벤트 호출. 이벤트를 발생시키는 메소드
myEvent.emit('event2');
myEvent.emit('event3');
myEvent.emit('event3');

console.log('-------------------------------------------');

myEvent.on('event4', () => {
    console.log('이벤트4');
});
myEvent.removeAllListeners('event4'); // 이벤트 해제
myEvent.emit('event4');

const hiListener = () => {  // 이벤트 핸들러 별도 작성
    console.log('HI')
}

myEvent.on('event5', hiListener);   // 이벤트 등록 방법2
myEvent.emit('event5');

console.log('event5 호출 횟수:', myEvent.listenerCount('event5'));

myEvent.off('event5', hiListener);
myEvent.emit('event5');

console.log("\n이벤트 호출 시 매개변수 전달");

// const myEvent2 = new EventEmitter();
class myEmmiter extends EventEmitter{};
const myEvent2 = new myEmmiter();

myEvent2.on('event', () => {
    console.log('이벤트1');
});
myEvent2.emit('event');

const myEvent3 = new myEmmiter();
// const myEvent3 = new EventEmitter();
myEvent3.on("eventok", (a, b) => {
    console.log(a, ':', b);
});

myEvent3.emit("eventok", 'kbs', '공영방송');

