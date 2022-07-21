function Person(name){
    this.name = name;
}

function myNew(fn,...args){
    let obj = {};
    obj.__proto__ = fn.prototype;
    const res = fn.apply(obj,args);
    return typeof res === 'object' ? res : obj;
}

console.log(new Person('aa'));
console.log(myNew(Person,'aa'))


let person = name => {
    this.name = name;
}

let obj = {
    name:''
}

person.call(obj,'aaa');
console.log(obj)
console.log(window.name)