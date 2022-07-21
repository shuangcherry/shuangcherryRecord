function getMaxNumberTag(){
    let eles = [...document.querySelectorAll('*')];
    console.log(eles)
    let tags = eles.map(i => i.tagName);
    let resultObj = tags.reduce((result, i) => {
        if(!result[i]){
            result[i] = 1;
        }else{
            result[i] += 1;
        }
        return result;
    },{})
    function getTagNum(tag){
        return resultObj[tag[0]];
    }
    return Object.entries(resultObj).reduce((x, y) =>{
     return getTagNum(x) > getTagNum(y) ? x : y;
    })
}

console.log(getMaxNumberTag());