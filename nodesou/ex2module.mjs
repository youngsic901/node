import {odd, even} from './ex2_1.mjs';
import chkNumber from './ex2_2.mjs';

function chkStringShow(str) {
    if(str.length % 2) {
        return odd;
    } else {
        return even;
    }
}

console.log(chkNumber(3));
console.log(chkNumber(4));
console.log(chkStringShow('book'));
console.log(chkStringShow('air'));
