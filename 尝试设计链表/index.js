
//设计链表的思路就是以对象{val:'',next:'指向下一个节点'}的形式来表示节点，不同节点之间的链接以对象嵌套对象的方式，
    //这种比较符合链表的前一个节点的next指向后一个节点的特征

//链表

var MyLinkedList = function() {
    this.node = undefined;
};

/**
 * 获取指定index位置的节点的值
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    if(index < 0) return -1;
    var i = 0;
    var pre = this.node;
    while(pre.next !== undefined && i < index){
        pre = pre.next;
        i++;
    }
    if(i < index) return -1;
     return pre.val=== undefined ? -1 : pre.val;
};

/**
 * 在链表的首部增加节点
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    this.node = {
        val:val,
        next:this.node
    }
};

/**
 * 在链表尾部增加节点，思路是： 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    if(this.node === undefined){
        this.node = {
            val:val,
            next:undefined
        }
        return;
    }
    var pre = this.node;
    while(pre.next !== undefined){
        pre = pre.next;
    }
    pre.next = {
        val:val,
        next:undefined
    }
};

/**
 *  在index位置增加一个节点，分以下几种情况：
 *  1.index === 0相当于从头部添加一个节点，
 *  2.index >节点长度，就是无效的操作了，
 *  3.其他情况下就是正常的在index位置添加一个节点，逻辑就是找到index之前的一个节点pre，pre.next指向新增节点 {val:'',next :pre.next}
 * 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if(index === 0){
        this.addAtHead(val);
        return;
    }
    var i = 0;
    var pre = this.node;
    while(pre.next!== undefined && i < index-1){
        pre = pre.next;
        i++;
    }
    if(i < index - 1)  return;
    pre.next = {
        val:val,
        next:pre.next
    }
};

/**
 * 删除index位置的节点，分以下几种情况：
 * 1.链表为空链表的时候，直接返回，操作无效。
 * 2.index === 0的时候，则相当于删除第一个节点
 * 3.index > 0 && index > 节点的长度的时候，属于无效操作。
 * 4.其它情况就是正常的删除index位置的节点，逻辑是：找到index前面一个节点，将pre.next 置为 它的下下个节点，前提是下个节点还有下个节点。
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    if(this.node === undefined) return;
    var pre = this.node;
    if(index === 0){
        pre = this.node.next;
        this.node = pre;
        return;
    }
    var i = 0;
    while(pre.next!== undefined && i < index - 1){
        pre = pre.next;
        i++;
    }
    if(i < index - 1) return;
    pre.next = pre.next ? pre.next.next : undefined;
};