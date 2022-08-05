/*
    1.就是设置三个指针 x, y, z
    2.因为要找最小的下标组合，所以第三层循环只要找到一个符合条件，就不需要继续往下找了。然后就把当前值存入结果数组，
      如果结果数组之前有值就比较这次找出来的组合是否更小，更小就把这次的下标组合存入结果数组中。
    3.因为这样找比较消耗性能，所以做了一个优化，就是当已经找到一个下标组合满足条件，
       且当前循环的每个值都比该下表组合的每一个值大或者相等的情况下，就没有必要继续循环了，表明最小下标组合已经找到了。

*/

function getIndexArr(arr, target){
    let resultArr = [];
    let flag = false;
    let endFlag = false;
    for(let x = 0; x < arr.length && !endFlag; x++){
        for(let y = x + 1; y < arr.length && !endFlag; y++){
            for(let z = y + 1; z < arr.length && !endFlag; z++){
                if( resultArr.length && 
                    x >= resultArr[0] && 
                    y >= resultArr[1] && 
                    z >= resultArr[2]
                ){
                    endFlag = true;
                    break;
                }
                if(arr[x] + arr[y] + arr[z] === target){
                    console.log([...[x, y, z]])
                    if(resultArr.length === 0){
                        resultArr = [...[x, y, z]];
                    }else if((x + y + z) < resultArr.reduce((x, y) => x + y, 0)){
                        resultArr = [...[x, y, z]];
                    }
                    flag = true;
                }
                if(flag){
                    flag = false;
                    break;
                }
            }
        }
    }
    return resultArr;
}

let arr = [3, 1, 2, 10, 4, 5, 6, 2, 3];
let target = 10;

console.log(getIndexArr(arr, target), 11)