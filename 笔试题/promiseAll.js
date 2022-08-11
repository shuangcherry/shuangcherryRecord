/*
    前面四条都比较好实现，
    1.首先需要返回一个promise对象，所以需要new Promise,
    2.然后就是通过一个遍历去监听每个promise的最终结果， 如果有一个失败了，就直接把reject外层的promise,
        成功的话，就存入结果数组对应的位置.
    3.给一个count计数器， 记录成功了几个，当所有都成功了的时候，就resolve外层的promise.
    4.倒数第二条的话，我感觉实现不了，因为for循环是同步的，在每次Promise.resove的时候已经同步生成了一个promise了，
        而then里面的函数和catch里面的函数都是异步执行的，所以等知道有一个promise失败的时候，所有的promise已经生成了。
        而promise一旦生成就没有办法终止了。
    5. 倒数第一条的话，我感觉也实现不了，原因也是跟上面差不多。因为传入的参数：就是promise对象了, 就没有办法去控制它并发几条。
    ps： 如果要是现实的话，得改Promise构造函数的实现了。去控制他延迟执行。
*/
function all(promiseArr){
    let arr = [...promiseArr];
    let resultArr = [];
    let count = 0;
    return new Promise((resolve, reject) => {
        for(let i = 0; i < arr.length; i++){
            Promise.resolve(arr[i]).then(res => {
                count++;
                resultArr[i] = res;
                if(count === arr.length){
                    resolve(resultArr);
                }
            }, err => {
                reject(err);
            })
        }
    })
}