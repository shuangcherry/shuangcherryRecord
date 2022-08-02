function get (source, path, defaultValue = undefined) {
    const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
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

