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
                setTimeout(() => {
                    this.onFulfilled.forEach(item => item(this.value));
                },0)
            }
        }
        let reject = (val) => {
            if(this.state === PENDING){
                this.state = REJECTED;
                this.value = val;
                setTimeout(() => {
                    this.onRejected.forEach(item => item(this.value));
                },0)
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
                    if(result instanceof Promise){
                        result.then(res => resolve(res), err => reject(err))
                    }else{
                        resolve(result);
                    }
                }catch(err){
                    reject(err);
                }
            }
            if(this.state === FULFILLED){
                setTimeout(callback, 0, onFulfilled);
            }else if(this.state === REJECTED){
                setTimeout(callback, 0, onRejected);
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

    finally(onFinally){
        return new Promise((resolve, reject) => {
            let callback = () => {
                try{
                    onFinally();
                    if(this.state === REJECTED){
                        reject(this.value);
                    }else if(this.state === FULFILLED){
                        resolve(this.value);
                    }
                }catch(err){
                    reject(this.value);
                }
            }
            if(this.state !== PENDING){
                this.onFulfilled.push(callback);
                this.onRejected.push(callback);
            }else{
                setTimeout(callback, 0);
            }
        })
    }

    static resolve(val){
        return new Promise((resolve, reject) => {
            if(val instanceof Promise){
                val.then(res => {
                    resolve(res);
                }, err => {
                    reject(err);
                })
            }else{
                resolve(val);
            }
        })
    }


    static reject(val){
        return new Promise((resolve, reject) => {
            reject(val);
        })
    }

    static all(promiseArr){
        let resultArr = [];
        let count = 0;
        return new Promise((resolve, reject) => {
            for(let i = 0; i < promiseArr.length; i++){
                Promise.resolve(promiseArr[i]).then(res => {
                    count++;
                    resultArr[i] = res;
                    if(count === promiseArr.length){
                        resolve(resultArr);
                    }
                }, err => {
                    reject(err);
                })
            }
        })
    }

    static race(promiseArr){
        return new Promise((resolve, reject) => {
            for(let i = 0; i < promiseArr.length; i++){
                Promise.resolve(promiseArr[i]).then(res => {
                    resolve(res);
                }, err => {
                    reject(err);
                })
            }
        })
    }

    static any(promiseArr){
        let count = 0;
        let errArr = [];
        return new Promise((resolve, reject) => {
            if(promiseArr.length === 0){
                reject(new AggregateError(errArr, 'All promises were rejected'))
            }
            for(let i = 0; i < promiseArr.length; i++){
                Promise.resolve(promiseArr[i]).then(res => {
                    resolve(res);
                }).catch(err => {
                    count++;
                    errArr[i] = err;
                    if(count === promiseArr.length){
                        reject(new AggregateError(errArr, 'All promises were rejected'))
                    }
                })
            }

        })
    }
}


