let env = this.window ? window : {};
function myApply(obj, args){
    obj = (obj === null || obj === undefined) ? env : Object(obj);
    Object.defineProperty(obj,'fn',{
        configurable: false,
        value: this
    })
    let result = args ? obj.fn(...args) : obj.fn();
    delete obj.fn;
    return result;
}
let name = 'a';

function test(a, b, c, d){
    console.log(this.name,1);
    console.log(a, b, c, d);
    return a;
}
Function.prototype.myApply = myApply;
let xiaoming = {
    name:'xm'
}
let result = test.myApply(xiaoming,['a','b','c','d']);
console.log(result)