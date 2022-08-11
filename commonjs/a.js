let name = require('./b.js');

console.log('a加载');
function say() {
    console.log('hello');
}
console.log(name);

setTimeout(() => {
    console.log(name);
},3000)
exports.say = say;