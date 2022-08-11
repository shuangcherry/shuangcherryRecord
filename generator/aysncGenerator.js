function _asyncToGenerator (fn){
   return function(){
    let self = this;
    let args = arguments;
    return new Promise((resolve, reject) => {
        let gen = fn.apply(self, args);
        function _next(val){
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', val);
        }
        function _throw(err){
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
        }
        _next(undefined);
    })
   }
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg){
    let info, value;
    try{
        info = gen[key](arg);
        value = info.value;
    }catch(error){
        reject(error);
        return;
    }
    if(info.done){
        resolve(value);
    }else{
        Promise.resolve(value).then(_next, _throw);
    }
}


let testFn = function* (){
    let res1 = yield new Promise((resolve, reject) => setTimeout(() => resolve(10),1000));
    console.log(res1)
    let res2 = yield new Promise((resolve, reject) => setTimeout(() => resolve(res1 + 10),1000));
    console.log(res2)
    let res3 = yield new Promise((resolve, reject) => setTimeout(() => resolve(res2 + 10),1000));
    console.log(res3);
    return res3;
}

let result = _asyncToGenerator(testFn);
result().then(res => console.log(res))