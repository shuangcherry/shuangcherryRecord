function copy(source){
    if(typeof source !== 'object'){
        return source;
    }
    let type = Object.prototype.toString.call(source).slice(8,-1);
    let result = null;
    if(type === 'Map'){
        result = new Map();
        for(let key of source.keys()){
            result.set(key, copy(source[key]));
        }
    }else if(type === 'Set'){
        result = new Set();
        for(let key of source.keys()){
            result.add(copy(source[key]));
        }
    }else if(type === 'RegExp'){
        result = new RegExp(source);
    }else if(type === 'Date'){
        result = new Date(source);
    }else if(type === 'Object' || type === 'Array'){
        result = type === 'Object' ? {} : [];
        for(let i in source){
            result[i] = copy(source[i]);
        }
    }
    return result;
}

const obj4 = {
    re: /hello/,
    f() {},
    date: new Date(),
    map: new Map(),
    set: new Set(),
    list: [1, 2, 3],
    h: {
    name: "wby",
    age: 29,
    love: [
        {
            name: '羽毛球',
            value:100
        }
    ]
    },
    a: 3,
    b: '你好呀',
    e: undefined,
    d: null,
    j: true,
    k: Symbol()
};
  
let result = copy(obj4);
console.log(result);
console.log(obj4.k === result.k)