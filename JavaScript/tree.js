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

/*

 */
class Node extends Gua {
    constructor(element) {
        super()
        this.setup(element)
    }

    setup(element) {
        this.element = element
        this.firstChild = null
        this.nextSibling = null
    }
}

/*
- insert: 插入指定节点
- remove：删除指定节点
- find：查找指定节点
- preorderLog: 先序遍历
- postorderLog: 后序遍历
- log： 打印树中的所有元素
 */
class Tree extends Gua {
    constructor() {
        super()
        this.setup()
    }

    static find(element, nodeList) {
        // 在结点列表中查找指定元素的 index, 找不到返回 -1
        for (let i = 0; i < nodeList.length; i++) {
            const node = nodeList[i]
            if (node != null && node.element === element) {
                return i
            }
        }
        return -1
    }

    static children(node) {
        const siblings = []

        const first = node.firstChild
        // log('first', first)
        if (first !== null) {
            // 该节点至少有一个子节点
            siblings.push(first)
            // 下一个兄弟节点
            let next = first.nextSibling
            while (next !== null) {
                siblings.push(next)
                next = next.nextSibling
            }
        }
        return siblings
    }

    setup() {
        this.root = Node.new('/')
    }

    insert(node) {
        // child 描述了要添加的子节点从根节点开始完整的路径的字符串
        // 根节点用 / 表示
        // /animal/cat/tom

        // 元素列表
        let elements = node.split('/')
        elements.splice(0, 1)
        // log('elements', elements)

        // 当前层的父节点
        let parent = this.root
        for (let i = 0; i < elements.length; i++) {
            // log('parent', parent, i)
            // 当前元素
            const element = elements[i]

            // 当前节点
            let current = null

            // 获取当前节点的所有兄弟节点
            const siblings = Tree.children(parent)
            // log('siblings', siblings)

            // 在当前层查找当前元素
            const index = Tree.find(element, siblings)
            if (index >= 0) {
                // 已有的节点
                current = siblings[index]
                // log('已有的节点', current)
            } else {
                // log('创建新节点', element)
                // 创建新节点
                current = Node.new(element)
                // 挂载
                if (siblings.length === 0) { // 第一个孩子
                    // 挂载为父节点的第一个子节点
                    parent.firstChild = current
                    // log('挂载 parent.first', parent)
                } else { // 不是第一个孩子
                    // 挂载到最后一个兄弟节点后面
                    siblings[siblings.length - 1].nextSibling = current
                    // log('挂载 siblings.next', )
                }
            }

            parent = current
        }
    }

    remove(child) {
        // /animal/cat/tom
        // 元素列表
        let elements = child.split('/')
        elements.splice(0, 1)
        const target = elements[elements.length - 1]
        // log('elements', elements)
        // log('target', target)

        // 当前层的父节点
        let parent = this.root
        for(let i = 0; i < elements.length; i++) {
            // log('parent', parent, i)
            // 当前元素
            const element = elements[i]

            // 当前节点
            let current = null

            // 获取当前节点的所有兄弟节点
            const siblings = Tree.children(parent)
            // log('siblings', siblings)

            // 在当前层查找当前元素
            const index = Tree.find(element, siblings)
            if(index >= 0) {
                // 已有的节点
                current = siblings[index]
                // 当前节点是要删除的节点
                if(target === current.element) {
                    log('current', current)
                    // 删除目标节点的所有子节点
                    current.firstChild = null
                    // 删除目标节点
                    if(index === 0) {
                        // 目标节点是 firstChild
                        parent.firstChild = current.nextSibling
                        // log('first', parent)
                    } else {
                        // 目标节点不是 firstChild
                        siblings[index - 1].nextSibling = current.nextSibling
                        // log('sibling', siblings[index - 1])
                    }
                    return
                }
            } else {
                log('要删除的节点不存在')
            }
            parent = current
        }
    }
    static preorderTraversal(node, n) {
        // preorder traversal
        formattedLog(node.element, n)
        // 遍历元素所有的子级元素
        let current = node.firstChild
        while(current !== null) {
            Tree.preorderTraversal(current, n + 1)
            current = current.nextSibling
        }
    }

    postorderTraversal(node, n) {
        // postorder traversal
        // 遍历元素所有的子级元素
        let current = node.firstChild
        while(current !== null) {
            Tree.preorderTraversal(current, n + 1)
            current = current.nextSibling
        }
        formattedLog(node.element, n)
    }

    log() {
        Tree.preorderTraversal(this.root, 0)
    }
}

const test_tree = () => {
    const t =  Tree.new()
    log('test insert')
    t.insert('/animal/cat/tom')
    t.insert('/animal/rat/jerry')
    t.insert('/plant/flower/rose')
    t.log()
    log('test remove')
    t.remove('/animal/cat')
    // t.remove('/animal/rat/jerry')
    t.log()
}
const __main = () => {
    test_tree()
}
if (require.main = module) {
    __main()
}
/*
2020-3-23 星期一  11:1:29 >>>>> test insert
2020-3-23 星期一  11:1:29 >>>>> /
2020-3-23 星期一  11:1:29 >>>>> ___|animal
2020-3-23 星期一  11:1:29 >>>>> ___|___|cat
2020-3-23 星期一  11:1:29 >>>>> ___|___|___|tom
2020-3-23 星期一  11:1:29 >>>>> ___|___|rat
2020-3-23 星期一  11:1:29 >>>>> ___|___|___|jerry
2020-3-23 星期一  11:1:29 >>>>> ___|plant
2020-3-23 星期一  11:1:29 >>>>> ___|___|flower
2020-3-23 星期一  11:1:29 >>>>> ___|___|___|rose
2020-3-23 星期一  11:1:29 >>>>> test remove
2020-3-23 星期一  11:1:29 >>>>> current Node {
  element: 'cat',
  firstChild: Node { element: 'tom', firstChild: null, nextSibling: null },
  nextSibling:
   Node {
     element: 'rat',
     firstChild:
      Node { element: 'jerry', firstChild: null, nextSibling: null },
     nextSibling: null } }
2020-3-23 星期一  11:1:29 >>>>> /
2020-3-23 星期一  11:1:29 >>>>> ___|animal
2020-3-23 星期一  11:1:29 >>>>> ___|___|rat
2020-3-23 星期一  11:1:29 >>>>> ___|___|___|jerry
2020-3-23 星期一  11:1:29 >>>>> ___|plant
2020-3-23 星期一  11:1:29 >>>>> ___|___|flower
2020-3-23 星期一  11:1:29 >>>>> ___|___|___|rose
 */