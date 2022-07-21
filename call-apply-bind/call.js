let env = this.window ? window : {};
function myCall(obj,...args){
    obj = (obj === null || obj === undefined) ? env : Object(obj);
    Object.defineProperty(obj,'fn',{
        configurable: false,
        value: this
    })
    let result = obj.fn(...args);
    delete obj.fn;
    return result;
}
let name = 'a';

function test(...args){
    console.log(this.name,1);
    console.log(...args,2);
    return args[0];
}
Function.prototype.myCall = myCall;
let xiaoming = {
    name:'xm'
}
let result = test.myCall();
console.log(result)