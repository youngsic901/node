console.log("vs code 에서 실습");

function f1 () {
    console.log("hello");
    f2();
}

function f2 () {
    console.log("world");
}

f1();
console.log("end");