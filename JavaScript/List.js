const {
    log,
    ensure,
    formattedLog,
    hash,
    nextPrime,
} = require('./utils')

class Gua {
    constructor() {

    }

    static new(...args) {
        let i = new this(...args)
        return i
    }
}

class Node extends Gua {
    constructor(element) {
        super()
        this.element = element
        // 存的是 下一个节点
        this.next = null
    }
}

/*
- length: 获取列表长度
- contains: 检查列表中是否包含指定元素
- append: 在列表末尾添加元素
- prepend: 在列表开始添加元素
- isEmpty: 元素是否在列表中
- shift: 在列表开始移除元素
- indexOf: 获取指定元素的索引
- elementAt: 获取指定索引处的元素
- insert: 在指定索引位置插入元素
- change: 设置指定索引处元素的值
- clear: 删除列表中的所有元素
- log: 打印列表中的所有元素
 */
class List extends Gua {
    constructor() {
        super()
        this.setup()
    }

    setup() {
        // 头结点
        this.head = null
        // 尾节点
        this.tail = null
        // 元素的个数
        this.length = 0
    }

    prepend(element) {
        let e = element
        let self = this
        // 生成节点
        let new_node = Node.new(e)
        // 将节点 发在最前面
        new_node.next = self.head
        // 更新头节点
        self.head = new_node

        // 特殊处理
        self.length += 1
        return self.length
    }

    isEmpty() {
        return this.length == 0
    }

    append(element) {
        let e = element
        let self = this
        // 生成节点
        let new_node = Node.new(e)
        if (self.isEmpty()) {
            // 设置为第一个节点
            self.head = new_node
        } else {
            // 将节点 发在最后面
            self.tail.next = new_node
        }
        // 更新尾节点
        self.head = new_node

        // 特殊处理
        self.length += 1
        return self.length
    }

    shift() {
        let self = this
        let e
        if (self.isEmpty()) {
            // 不可以删除
            return -1
        } else {
            // 找到头节点 元素
            e = self.head.element
            // 更头节点
            self.head = self.head.next
        }

        // 特殊处理
        self.length -= 1
        return e
    }
    removeLast() {
        let self = this
        let current = self.head
        let len = self.length
        if (self.isEmpty()) {
            // 不可以删除
            return -1
        } else {
            let i = 0
            while(current !== null) {
                if (i === len - 1) {
                    self.tail = current
                    current.next = null
                }
                current = current.next
                i += 1
            }
        }

        // 特殊处理
        self.length -= 1
        return 'remove last ok'
    }
    removeElement(element) {
        let self = this
        let e = element
        let index = self.indexOf(e)
        let i = 0
        let current = self.head
        while(current !== null) {
            if (index - 1 == i) {
                // 开始 curret_node     current_node.next
                current.next = current.next.next
            } else if (index = i) {
                current.next = null
            }
            current = current.next
            i += 1
        }
        return null

    }
    contains(element) {
        let e = element
        let self = this
        let current = self.head
        while(current !== null) {
            if (current.element === element) {
                return true
            }
            current = current.next
        }
        return false
    }
    indexOf(element) {
        let e = element
        let self = this
        let current = self.head
        let index = 0
        while(current !== null) {
            if (current.element === element) {
                return index
            }
            current = current.next
            index += 1
        }
        return -1
    }
    elementAt(index) {
        let self = this
        let i = 0
        let current = self.head
        while(current !== null) {
            if (index == i) {
                return current.element
            }
            current = current.next
            i += 1
        }
        return null
    }
    insert(index, element) {
        let self = this
        let e = element
        let i = 0
        let current = self.head
        while(current !== null) {
            if (index == i) {
                // new_node
                // 开始 curret_node   new_node   current_node.next
                let new_node = Node.new(e)
                new_node.next = current.next
                current.next = new_node
                return index
            }
            current = current.next
            i += 1
        }
        return -1
    }

    change(index, element) {
        let self = this
        let e = element
        let i = 0
        let current = self.head
        while(current !== null) {
            if (index == i) {
                // new_node
                // 开始 curret_node   new_node   current_node.next
                current.element = e
                return e
            }
            current = current.next
            i += 1
        }
        return null
    }
    clear() {
        let self = this
        self.head = null
        self.tail = null
    }
    log() {
        let current = this.head
        while (current != null) {
            log(current.element)
            current = current.next
        }
    }
}
/*
- enqueue
- dequeue
- isEmpty
- clear
 */
class Queue extends List {
    constructor() {
        super()
    }
    enqueue(element) {
        this.append(element)
    }
    dequeue() {
        this.shift()
    }
    isEmpty() {
        return super.isEmpty()
    }
    clear() {
        while(!this.isEmpty()) {
            this.dequeue()
        }
    }
}
/*
- push
- pop
- isEmpty
- clear
 */
class Stack extends List {
    constructor() {
        super()
    }
    push(element) {
        this.prepend(element)
    }
    pop() {
        return this.shift()
    }
    isEmpty() {
        return super.isEmpty()
    }
    clear() {
        while(!this.isEmpty()) {
            this.pop()
        }
    }
}
/*
- set
- get
- has
- clear
 */

class HashTable extends Gua {
    constructor(length) {
        super()
        this.setup(length)
    }
    setup() {
        this.length = nextPrime(length)
        this.array = []
        for(let i = 0; i < this.length; i++) {
            this.array[i] = List.new()
        }
    }
    set(key, value) {
        const index = hash(key, this.length)
        const list = this.array[index]
        list.append(value)
    }
    get(key) {
        const index = hash(key, this.length)
        const list = this.array[index]
        return list.elementAt(0)
    }
    has(key) {
        const index = hash(key, this.length)
        const list = this.array[index]
        return list.length !== 0
    }

    clear() {
        const len = this.length
        for(let i = 0; i < len; i++) {
            const list = this.array[i]
            list.clear()
        }
    }
}

// 基于链表实现 LRU 缓存淘汰算法
// 维护一个有序单链表，越靠近链表尾部的结点是越早之前访问的
// 当有新数据被访问时，从链表头开始顺序遍历链表:
// 1. 如果此数据之前已经被缓存在链表中了，遍历得到对应结点， 并将其从原来的位置删除，然后再插入到链表的头部
// 2. 如果此数据没有在缓存链表中，又可以分为两种情况：
//如果此时缓存未满，则将此结点直接插入到链表的头部；
// 如果此时缓存已满，则链表尾结点删除，将新的数据结点插入链表的头部。
class LRUBaseLinkedList extends Gua {
    constructor(length = 10) {
        super()
        this.setup(length)
    }
    setup(length) {
        this.length = length
        this.list = List.new()
    }
    append(e) {
        let index = this.list.indexOf(e)
        // 判断是否存在链表中
        if (index === -1) {
            // 不在链表中, 判断链表是否已满
            if (this.isFull()) {
                // 列表已满, 删除末尾元素后插入
                this.list.removeLast()
                this.list.prepend(e)
            } else {
                // 链表未满, 直接插入开头
                this.list.prepend(e)
            }
        } else {
            // 已经在链表中, 先删除再插入头部
            this.list.removeElement(e)
            this.list.prepend(e)
        }
    }

    isFull() {
        return this.list.length >= this.length
    }

    log() {
        this.list.log()
    }
}
const test_list = () => {
    // append
    log('test_append')
    let array = List.new()
    array.append(123)
    array.log()
    // prepend
    log('test prepend')
    array.prepend(321)
    array.log()
    // isEmpty
    let is_empty = array.isEmpty()
    log('is_empty', is_empty)
    // contains
    let is_contains = array.contains(123)
    log('is_contains', is_contains)
    // shift
    // let shift = array.shift()
    // log('shift', shift)
    // log
    log('log')
    array.log()
    // indexOf
    let index = array.indexOf(123)
    log('index', index)
    // elementAt
    let element_at_index = array.elementAt(123)
    log('element_at_index', element_at_index)
    // insert
    log('insert')
    array.insert(1, 'insert davizi 大侄子好帅啊')
    array.log()
    // change
    log('test  _____change')
    array.change(0, '第一个元素 hahh啊')
    array.log()
    // clear
    log('clear')
    // array.clear()
    // array.log()
    // removeElement
    // array.removeElement(123)
    // array.log()
}
const test_queue = () => {
    // enqueue
    log('test --- enqueue')
    let q = Queue.new()
    q.enqueue('入队')
    q.log()
    log('test --- dequeue')
    q.dequeue()
    q.log()
    let is_empty = q.isEmpty()
    log('is_empty', is_empty)
}
const test_stack = () => {
    // push
    let s = Stack.new()
    log('test push')
    s.push('push davizi')
    s.push('push  22222')
    s.log()
    // pop
    log('test  pop')
    s.pop()
    s.log()
}
const test_hashTable = () => {
    const h =  HashTable.new(100)
    h.set('name', 'davizi')
    h.set('age', 24)
    log(h.get('age'))
    log(h.get('name'))
    log(h.has('name'))
}
const test_LRUBaseLinkedList = () => {
    let l = LRUBaseLinkedList.new(4)
    l.append('1')
    l.append('2')
    l.append('3')
    l.append('4')
    l.append('5')
    l.log()
    l.append('3')
    l.log()
}
const __main = () => {
    // test_list()
    // test_queue()
    // test_stack()
    // test_hashTable()
    test_LRUBaseLinkedList()
}
if (require.main = module) {
    __main()
}

/*
2020-3-23 星期一  11:1:4 >>>>> 5
2020-3-23 星期一  11:1:4 >>>>> 4
2020-3-23 星期一  11:1:4 >>>>> 3
2020-3-23 星期一  11:1:4 >>>>> 2
2020-3-23 星期一  11:1:4 >>>>> 1
2020-3-23 星期一  11:1:4 >>>>> 3
2020-3-23 星期一  11:1:4 >>>>> 5
2020-3-23 星期一  11:1:4 >>>>> 4
 */