import {odd, even} from './ex2_1.mjs';

export default function chkOddEven(num) {
    if(num % 2) {
        return odd;
    }
    return even;
}