//单个get
function get (source, path, defaultValue = undefined) {
    const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.'); //使用正则将[]改成.的形式，然后分割成数组
    let result = source
    for (const p of paths) {
        result = Object(result)[p]
        if (result === undefined) {
            return defaultValue
        }
    }
    return result
}


let result1 = get({ a: null }, 'a.b.c', 3);
console.log(result1)

let result2 = get({ a: undefined }, 'a', 3);
console.log(result2);

let result3 = get({ a: null }, 'a', 3);
console.log(result3);

let result4 = get({ a: [{ b: 1 }]}, 'a[0].b', 3);
console.log(result4);

//多个get
function _get(object, ...path) {
    return path.map((item) => {
        let res = object;
        item.replace(/\[/g, ".")
            .replace(/\]/g, "")
            .split('.')
            .map(path => res = res && res[path]);
        return res;
    })
}

// input
const obj = { 选择器: { to: { toutiao: "FE Coder"} }, target: [1, 2, { name: 'byted'}]};
let result = _get(obj, '选择器.to.toutiao', 'target[0]', 'target[2].name');
console.log(result)

