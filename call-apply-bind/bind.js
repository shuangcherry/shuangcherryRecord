let env = this.window ? window : {};
function myBind(obj, ...arg1){
    obj = (obj === null || obj === undefined) ? env : Object(obj);
    return (...args) => {
        Object.defineProperty(obj,'fn',{
            configurable: false,
            value: this
        })
        result = obj.fn(...arg1, ...args);
        delete obj.fn;
        return result;
    }
}
let name = 'a';

function test(a, b, c, d){
    console.log(this.name,1);
    console.log(a, b, c, d);
    return a;
}
Function.prototype.myBind = myBind;
let xiaoming = {
    name:'xm'
}
let result = test.myBind(xiaoming,'a','b','c');
console.log(result('d'))