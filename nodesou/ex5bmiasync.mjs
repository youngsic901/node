// 키와 몸무게를 입력받아 BMI 계산하기 : 비동기 처리

import readline from 'readline';

// BMI 판정 기준 함수
const getBMIcategory = (bmi) => {
    if(bmi < 18.5) return '저체중';
    if(bmi >= 18.5 && bmi < 23) return '정상';
    if(bmi >= 23 && bmi < 25) return '비만 전단계';
    if(bmi >= 25 && bmi < 30) return '1단계 비만';
    if(bmi >= 30 && bmi < 35) return '2단계 비만';
    return '3단계 비만';
};

// 표준 입출력 장치 선언
const rdata = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('비동기 처리 시작 ---------------------------------');

rdata.question('키(cm) : ', (height) => {
    rdata.question('몸무게(kg) : ', (weight) => {
        console.log(`키와 몸무게 : ${height} ${weight}`);

        const height2Meter = parseFloat(height) / 100;
        const weightKg = parseFloat(weight);

        const bmi = weightKg / (height2Meter * height2Meter);
        const result = getBMIcategory(bmi);

        console.log(`BMI 판정 결과는 ${bmi.toFixed(2)} 이므로 ${result}`);

        rdata.close();
    });
});

// console.log('\n 비동기 테스트');