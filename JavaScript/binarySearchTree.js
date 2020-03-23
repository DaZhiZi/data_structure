const {log,
    formattedLog,
} = require('./utils')
class Node {
    constructor(element) {
        this.element = element
        this.leftChild = null
        this.rightChild = null
    }
}



class BinarySearchTree {
    constructor() {
        this.root = null
    }

    static find(element, nodeList) {
        // 在结点列表中查找指定元素的 index, 找不到返回 -1
        for(let i = 0; i < nodeList.length; i++) {
            const node = nodeList[i]
            if(node && node.element === element) {
                return i
            }
        }
        return -1
    }

    insert(element) {
        this.root = this._insertIterative(element, this.root)
    }

    _insertIterative(element, tree) {
        if(tree === null) {
            // 空树
            tree = new Node(element)
            log('空树', tree)
        } else {
            if(element < tree.element) {
                // 添加到左树
                tree.leftChild = this._insertIterative(element, tree.leftChild)
            } else if(element > tree.element) {
                // 添加到右树
                tree.rightChild = this._insertIterative(element, tree.rightChild)
            } else {
                log('element is in the tree already')
            }
        }
        return tree
    }

    find(element, tree = this.root) {
        // 查找特定元素， 找不到返回 null
        if(tree === null) {
            return null
        } else if(element < tree.element) {
            return this.find(element, tree.leftChild)
        } else if(element > tree.element) {
            return this.find(element, tree.rightChild)
        } else {
            return tree.element
        }
    }

    findMin(tree = this.root) {
        if(tree === null) {
            return null
        } else {
            if(tree.leftChild === null) {
                return tree.element
            } else {
                return this.findMin(tree.leftChild)
            }
        }
    }

    findMax(tree = this.root) {
        if(tree === null) {
            return null
        } else {
            if(tree.rightChild === null) {
                return tree.element
            } else {
                return this.findMax(tree.rightChild)
            }
        }
    }

    clear(tree = this.root) {
        if(tree !== null) {
            this.clear(tree.leftChild)
            this.clear(tree.rightChild)
            tree.element = null
            tree.leftChild = null
            tree.rightChild = null
        } else {
            return
        }
    }

    _preorderTraversal(tree, n) {
        // preorder traversal
        if(tree !== null) {
            formattedLog(tree.element, n)
            this._preorderTraversal(tree.leftChild, n + 1)
            this._preorderTraversal(tree.rightChild, n + 1)
        } else {
            return
        }
    }

    log() {
        log(this.root)
        this._preorderTraversal(this.root, 0)
    }
}

if(require.main === module) {
    const t = new BinarySearchTree()
    t.insert(5)
    t.insert(2)
    t.insert(8)
    t.insert(1)
    t.insert(4)
    t.insert(3)
    t.insert(7)
    t.insert(6)
    const e = t.find(9)
    log('e', e)
    const min = t.findMin()
    log('min', min)
    const max = t.findMax()
    log('max', max)
    // t.clear()
    t.log()
}