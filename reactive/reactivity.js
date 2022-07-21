import { isObject } from './share.js';
import { activeEffect } from './effect.js';

let targetWeakMaps = new WeakMap();
export function reactivity(target){
    if(!isObject(target)) return;
    const val = targetWeakMaps.get(target);
    if(val) return val; 
    const result =  new Proxy(target,{
        get(target, key, receiver){
            //收集依赖
            if(activeEffect){
                track(target, 'get', key, activeEffect);   
            }
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value, receiver){
            //触发依赖
            const oldValue = target[key];
            let result = Reflect.set(target, key, value, receiver);
            if(value !== oldValue){
                trigger(target, 'set', key);
            }
            return result;
        }
    })
    targetWeakMaps.set(target, result);
    return result;
}

let effectWeakMaps = new WeakMap();
function track(target, type, key, effect){
    let maps = effectWeakMaps.get(target);
    if(!maps){
        effectWeakMaps.set(target,(maps = new Map()))
    }
    let keyMaps = maps.get(key);
    if(!keyMaps){
        maps.set(key, (keyMaps = new Set()))
    }
    if(!keyMaps.has(effect)){
        keyMaps.add(effect);
        effect.deps.push(keyMaps);
    }
}

function trigger(target, type, key){
    let maps = effectWeakMaps.get(target);
    if(maps){
        let effectSets = maps.get(key);
        if(effectSets){
            let copyEffectSets = [...effectSets]
            copyEffectSets.forEach(effect => {
                effect.run();
            })
        }
    }
}