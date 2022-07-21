
export let activeEffect = null;
class ReactiveEffect{
    deps = [];
    isActive = true;
    _parent = null; //当前effect的父级effect，是为了防止嵌套effect的问题
    constructor(fn){
        this.fn = fn;
    }
    run(){
        if(!this.isActive) return this.fn();
        // this._parent = activeEffect;
        activeEffect = this;
        clearDeps(this);
        let result = this.fn();
        activeEffect = this._parent;
        return result;
    }
}

function clearDeps(effect){
    let deps = effect.deps;
    for(let i = 0; i<deps.length; i++){
        deps[i].delete(effect);
    }
    deps.length = 0;
}

export function effect(fn){
    //第一次就运行这个函数，然后在运行函数的时候收集依赖
    const reactiveEffect = new ReactiveEffect(fn);
    reactiveEffect.run();
}


// effect(()=>{
//     console.log(111);  //e1
//     effect(()=>{ 
//         console.log(22);  //e2
//     })
// })