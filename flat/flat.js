//concat方法在执行的时候，会将参数自动flat一层
const flat = (list) => list.reduce((a, b) => a.concat(b), []);

let num = [1,2,[3],4];
let result = flat(num);


Array.prototype.mapFlat = function (fn){
    return this.map(fn).flat();
}

let fn1 = function (a){
    return a + 1;
}

let result2 = num.mapFlat(fn1);
console.log(result2)