//节流 delay时间内最多只执行一次
function throttle(fn, delay){
    let timer = null;
    return (...args) => {
        if(timer) return;
        timer = setTimeout(() => {
            fn(...args);
            clearTimeout(timer);
            timer = null;
        },delay)
    }
}