//简单promise调用


const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'reject';


class Promise{
    value = null;
    state = PENDING;
    onFulfilled = [];
    onRejected = [];
    constructor(exec){
        let resolve = (val) => {
            if(this.state === PENDING){
                this.state = FULFILLED;
                this.value = val;
                this.onFulfilled.forEach(item => item(this.value));
            }
        }
        let reject = (val) => {
            if(this.state === PENDING){
                this.state = REJECTED;
                this.value = val;
                this.onRejected.forEach(item => item(this.value));
            }
        }
        try{
            exec(resolve,reject);
        }catch(err){
            reject(err);
        }
    }
    
    then(onFulfilled, onRejected){
        if(typeof onRejected !== 'function'){
            onRejected = (err) => { throw err };
        }
        if(typeof onFulfilled !== 'function'){
            onFulfilled = val => val;
        }
        return new Promise((resolve, reject) => {
            let callback = (fn) => {
                try{
                    let result = fn(this.value);
                    if(typeof result === 'promise'){
                        result.then(res => resolve(res), err => reject(err))
                    }else{
                        resolve(result);
                    }
                }catch(err){
                    reject(err);
                }
            }
            if(this.state === FULFILLED){
                callback(onFulfilled);
            }else if(this.state === REJECTED){
                callback(onRejected);
            }else{
                this.onFulfilled.push(() => {
                    callback(onFulfilled);
                });
                this.onRejected.push(() => {
                    callback(onRejected);
                }); 
            }
        })
    }
    catch(onFulfilled){
        return this.then(undefined, onFulfilled);
    }

    static resolve(){

    }

    static all(){

    }

    static race(){
        
    }
}


