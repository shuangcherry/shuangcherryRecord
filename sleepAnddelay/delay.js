function delay(fn, seconds, ...args){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            Promise.resolve(fn(...args)).then(resolve).catch(reject);
        }, seconds)
    })
    
}


console.log(new Date(), 111)
delay((str) => {
  console.log(new Date(), 222)
  console.log(str, 333)
  return str
}, 3000, 'shanyue').then(o => console.log(o))
