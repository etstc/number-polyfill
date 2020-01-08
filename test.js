require('./number-polyfill.js')

console.log("0.1 + 0.2 === 0.3 is " + (0.1 + 0.2 === 0.3))
console.log("0.1.add(0.2) === 0.3 is " + (0.1.add(0.2) === 0.3))
console.log("91.29 * 10 === 912.9 is " + (91.29 * 10 === 912.9))
console.log("91.29.mul(10) === 912.9 is " + (91.29.mul(10) === 912.9))
console.log("0.3 - 0.2 === 0.1 is " + (0.3 - 0.2 === 0.1))
console.log("0.3.sub(0.2) === 0.1 is " + (0.3.sub(0.2) === 0.1))
console.log("1.111.div(0.11) === 1.111 / 0.11 is " + (1.111.div(0.11) === 1.111 / 0.11))