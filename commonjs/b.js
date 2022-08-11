// let say = require('./a.js');
console.log('b加载')
// console.log(say)

let name = 'aaaa';
setTimeout(() => {
    name = 'bbb';
})
module.exports = name;