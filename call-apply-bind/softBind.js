(function (){
    let env = this.window ? window : global;
    if(!Function.prototype.softBind){
        Function.prototype.softBind = function(obj, ...args){
            let fn = this;
            let bound = function(...rest){
                return fn.apply((!this || this === env ? obj : this),
                        [...args,...rest]);
            }
            bound.prototype = Object.create(fn.prototype);  //不知道为啥要这样做
            return bound;
        }
    }
})()

function test(a, b, c){
    console.log('name:' + this.name);
    console.log(a,b,c)
}

let obj1 = {
    name: 'obj1'
}
let obj2 = {
    name: 'obj2'
}
let obj3 = {
    name: 'obj3'
}


let fn = test.softBind(obj1,'a');
fn('b','c');
obj2.fn = fn;
obj2.fn();

fn.call(obj3);

setTimeout(obj2.fn,1000)