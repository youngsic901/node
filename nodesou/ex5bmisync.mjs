// 키와 몸무게를 입력받아 BMI 계산하기 : 동기 처리

import {createRequire} from 'module';
import readlineSync from 'readline-sync';
const require = createRequire(import.meta.url);

// BMI 판정 기준 함수
const getBMIcategory = (bmi) => {
    if(bmi < 18.5) return '저체중';
    if(bmi >= 18.5 && bmi < 23) return '정상';
    if(bmi >= 23 && bmi < 25) return '비만 전단계';
    if(bmi >= 25 && bmi < 30) return '1단계 비만';
    if(bmi >= 30 && bmi < 35) return '2단계 비만';
    return '3단계 비만';
};

if(process.platform === 'win32') {
    require('child_process').execSync('chcp 65001'); // 터미널의 charset를 utf-8로 변환
}

// 키(height) 입력
console.log('키 입력');
const height = readlineSync.question('키(cm): ');
console.log('키는 ', height);

// 몸무게(weight) 입력
console.log('몸무게 입력');
const weight = readlineSync.question('몸무게(kg): ');
console.log('몸무게는 ', weight);

console.log('동기 처리 시작 ---------------------------------');

const height2Meter = parseFloat(height) / 100;
const weightKg = parseFloat(weight);

const bmi = weightKg / (height2Meter * height2Meter);
const result = getBMIcategory(bmi);

console.log(`BMI 판정 결과는 ${bmi.toFixed(2)} 이므로 ${result}`)

// console.log('\n 비동기 테스트');