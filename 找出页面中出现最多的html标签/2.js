//使用reduce 和 递归 进行遍历整颗dom树
function getAllTags1(el = document) {
    const children = Array.from(el.children).reduce((x, y) => {
        return [...x, y, ...getAllTags(y)];
    },[]);
    return children;
}


// 或者通过 flatMap 和 递归实现
function getAllTags2(el = document) {
    const children = Array.from(el.children).flatMap(item => getAllTags2(item));
    return [el, ...children];
}


let result = getAllTags2();


console.log(result)
