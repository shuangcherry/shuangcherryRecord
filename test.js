Array.prototype[Symbol.iterator] = function (){
    let data = this;
    let index = 0;
    return {
        next: function() {
            if(index < data.length){
                return { value: index++, done: false};
            }else{
                return { value: -1, done: true};
            }
        }
    }
}

let arr = [3, 4, 5, 6];
for(let val of arr){
    console.log(val);
}
Object.prototype[Symbol.iterator] = function() {
    let index = 0;
    let data = this;
    let keys = Object.keys(data)
    return {
        next: function() {
            if(index < keys.length){
                result = { value: data[keys[index]], done: false};
            }else{
                result = { done: true};
            }
            index++;
            return result;
        }
    }
}

let obj = {
    name:'aa',
    age:'11'
};
for(let val of obj){
    console.log(val);
}


function* Book() {
	yield 'bilibili：Jimmyhao'
	yield '公众号：Jimmy前端'
}
let jimmy = Book()
console.log('jimmy', jimmy)