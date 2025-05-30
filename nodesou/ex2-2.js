const {odd, even} = require('./ex2-1');
// console.log(odd," ",even);

function chkOddEven(num) {
    if(num % 2) {
        return odd;
    }
    return even;
}

// console.log(chkOddEven(5));
// console.log(chkOddEven(6));

module.exports = chkOddEven;