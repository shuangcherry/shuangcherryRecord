let sleep = time => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve,time);
    })
}

(async function(){
    await sleep(2000);
 console.log(111)
})()