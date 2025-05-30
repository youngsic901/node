const {odd, even} = require('./ex2-1');
const chkOddEven = require('./ex2-2');

console.log(odd, ', ', even);
console.log(chkOddEven(2));

function chkStringShow(str) {
    if(str.length % 2) {
        return odd;
    } else {
        return even;
    }
}

console.log(chkStringShow('good'));
console.log(chkStringShow('air'));
