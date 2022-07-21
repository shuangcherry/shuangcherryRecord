var eventBus = {
    callbacks:{

    },
    on:function(eventName,cb){
        if(this.callbacks[eventName]){
           this.callbacks[eventName].push(cb);
        }else{
           this.callbacks[eventName] = [cb];
        }
    },
    emit:function(eventName){
        if(this.callbacks[eventName]){
            this.callbacks[eventName].forEach(cb=>{
                cb();
            })
        }
    }
}

eventBus.on('click',function(){
    console.log('点击一下');
})
eventBus.on('click',function(){
    console.log('点击两下');
})

console.log(eventBus.callbacks)
eventBus.emit('click')