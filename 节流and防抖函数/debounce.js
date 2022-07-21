//防抖  delay时间内再次触发的话，会重新等待delay时间执行
function debounce(fn, delay) {
    let timer = null;
    return (...args) => {
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn(...args);
            clearTimeout(timer);
            timer = null;
        }, delay)
    }
}