const {log, ensure} = require('./utils')

class Node {
    constructor(element) {
        this.element = element
        this.next = null
        this.prev = null
    }
}

class DLList {
    constructor() {
        this.length = 0
        this.setup()
    }

    setup() {
        this.head = null
        this.tail = null
    }

    static new(...args) {
        let i = new this(...args)
        return i
    }

    prepend(element) {
        const n = new Node(element)
        n.next = this.head

        if(this.head === null) {
            this.tail = n
        } else {
            this.head.prev = n
        }
        this.head = n

        this.length += 1
    }

    append(element) {
        const n = new Node(element)

        if(this.head == null) {
            this.head = n
        } else {
            this.tail.next = n
            n.prev = this.tail
        }

        this.tail = n
        this.length += 1
    }

    contains(element) {
        let contained = false
        let current = this.head
        while(current !== null) {
            if(current.element === element) {
                contained = true
                break
            }
            current = current.next
        }
        return contained
    }

    shift() {
        this.length -= 1
        const first = this.head
        let e
        if(first === null) {
            return -1
        } else {
            e = first.element
        }
        this.next = this.head.next
        this.head.prev = null
        return e
    }

    pop() {
        this.length -= 1
        const last = this.tail
        let e
        if(last === null) {
            return -1
        } else {
            e = last.element
        }
        this.tail.prev.next = null
        return e
    }

    insert(index, element) {
        if(index === 0) {
            this.prepend(element)
        }

        let i = 0
        let current = this.head
        while(current != null) {
            if(i === index - 1) {
                const n = new Node(element)
                n.next = current.next
                n.prev = current
                current.next = n
                return index
            }
            current = current.next
            i ++
        }
    }

    log() {
        let current = this.head
        while(current !== null) {
            log(current.element)
            current = current.next
        }
    }
}
const test_double_list = () => {
    const list = DLList.new()

    list.append(2)
    list.append(3)
    list.prepend(1)
    list.prepend(0)
    ensure(list.length === 4, 'test list length')
    list.log()

    ensure(list.contains(5) === false, 'test list contains 1')
    ensure(list.contains(3) === true, 'test list contains 2')

    list.insert(2, 2.5)
    list.log()

    list.shift()
    ensure(list.length === 3, 'test list shift 1')
    list.log()

    list.pop()
    list.log()
}
const __main = () => {
    test_double_list()
}
if(require.main = module) {
   __main()
}
/*
2020-3-23 星期一  11:0:29 >>>>> *** 测试成功   大侄子牛逼啊 test list length
2020-3-23 星期一  11:0:29 >>>>> 0
2020-3-23 星期一  11:0:29 >>>>> 1
2020-3-23 星期一  11:0:29 >>>>> 2
2020-3-23 星期一  11:0:29 >>>>> 3
2020-3-23 星期一  11:0:29 >>>>> *** 测试成功   大侄子牛逼啊 test list contains 1
2020-3-23 星期一  11:0:29 >>>>> *** 测试成功   大侄子牛逼啊 test list contains 2
2020-3-23 星期一  11:0:29 >>>>> 0
2020-3-23 星期一  11:0:29 >>>>> 1
2020-3-23 星期一  11:0:29 >>>>> 2.5
2020-3-23 星期一  11:0:29 >>>>> 2
2020-3-23 星期一  11:0:29 >>>>> 3
2020-3-23 星期一  11:0:29 >>>>> *** 测试成功   大侄子牛逼啊 test list shift 1
2020-3-23 星期一  11:0:29 >>>>> 0
2020-3-23 星期一  11:0:29 >>>>> 1
2020-3-23 星期一  11:0:29 >>>>> 2.5
2020-3-23 星期一  11:0:29 >>>>> 2
2020-3-23 星期一  11:0:29 >>>>> 3
2020-3-23 星期一  11:0:29 >>>>> 0
2020-3-23 星期一  11:0:29 >>>>> 1
2020-3-23 星期一  11:0:29 >>>>> 2.5
2020-3-23 星期一  11:0:29 >>>>> 2
 */