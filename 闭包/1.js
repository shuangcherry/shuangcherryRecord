
// 1.块级作用域
/*
let arr= [];
for(let i = 0; i < 5; i++){
    arr.push(function(){
        console.log(i)
    })
}
arr[0]()
*/

//2.全局作用域
/*
let arr= [];
for(var i = 0; i < 5; i++){
    arr.push(function(){
        console.log(i)
    })
}
arr[0]()
*/

//3.立即执行函数
/*
let arr= [];
for(var i = 0; i < 5; i++){
    (function(i){
        arr.push(function(){
            console.log(i)
        })
    })(i);
}
arr[0]()
*/


//4.偏函数 :在原函数的基础上，将函数的部分参数固定住，其他参数重新扩展传递给原函数，对外则是生成一个新函数
/*
const partial = (f, ...args) => {
    return (...moreArgs) => {
        return f(...args, ...moreArgs)
    }
}
const add3 = (a, b, c) => a + b + c​
const fivePlus = partial(add3, 2, 3) 
fivePlus(4) 
*/

//5.函数柯里化 :将一个 n元参数的函数 转换成 n个一元参数的函数
let currying = function (fn,...args){
    let _this = this;
    let _initArgs = args || [];
    return function (){
        let _args = [..._initArgs,...arguments];
        if(_args.length < fn.length){
            return currying.call(_this,fn,..._args)
        }
        return fn.call(_this,..._args);
    }
}
let curryingAdd = currying(function (a, b, c, d) {
    return a + b + c + d
},1,2)
console.log(curryingAdd(1,2))
console.log(curryingAdd(1)(2))


