const {log, max} = require('./utils')

class Node {
    constructor(element) {
        this.element = element
        this.leftChild = null
        this.rightChild = null
        this.height = 0
    }
}


class Avl {
    constructor() {
        this.root = null
    }

    static height(node) {
        if(node === null) {
            return -1
        } else {
            return node.height
        }
    }

    static rotateSingleLeft(tree) {
        const subtree = tree.leftChild
        tree.leftChild = subtree.rightChild
        subtree.rightChild = tree

        tree.height = max(Avl.height(tree.leftChild), Avl.height(tree.rightChild)) + 1
        subtree.height = max(Avl.height(subtree.leftChild), tree.height) + 1
        return subtree
    }

    static rotateSingleRight(tree) {
        const subtree = tree.rightChild
        tree.rightChild = subtree.leftChild
        subtree.leftChild = tree

        tree.height = max(Avl.height(tree.rightChild), Avl.height(tree.leftChild)) + 1
        subtree.height = max(Avl.height(subtree.rightChild), tree.height) + 1
        return subtree
    }

    static rotateDoubleLeft(tree) {
        tree.leftChild = Avl.rotateSingleRight(tree.leftChild)
        return Avl.rotateSingleLeft(tree)
    }

    static rotateDoubleRight(tree) {
        tree.rightChild = Avl.rotateSingleLeft(tree.leftChild)
        return Avl.rotateSingleRight(tree)
    }

    insert(element) {
        if(this.root === null) {
            this.root  = new Node(element)
        } else {
            this._insert(element, this.root)
        }
    }

    _insert(element, tree) {
        log('tree', tree)
        if(tree === null) {
            tree = new Node(element)
            return tree
        }

        // 插入节点
        if(element < tree.element) {
            // 插入到左树
            tree.leftChild = this._insert(element, tree.leftChild)

            // 高度差
            const diff = Avl.height(tree.leftChild) - Avl.height(tree.rightChild)
            if(diff === 2) {
                if(element < tree.leftChild.element) {
                    tree = Avl.rotateSingleLeft(tree)
                } else {
                    tree = Avl.rotateDoubleLeft(tree)
                }
            }
        } else if(element > tree.element) {
            tree.right = this._insert(element, tree.rightChild)
            const diff = Avl.height(tree.rightChild) - Avl.height(tree.leftChild)
            if(diff === 2) {
                if(element > tree.rightChild.element) {
                    tree = Avl.rotateSingleLeft(tree)
                } else {
                    tree = Avl.rotateDoubleRight(tree)
                }
            }
        } else {
            log('element is in the tree already, we will do nothing')
        }

        tree.height = max(Avl.height(tree.leftChild, tree.rightChild)) + 1
        return tree
    }

    del(element) {

    }

    retrieve(element) {

    }

    find(element, tree = this.root) {

    }

    findMin(tree = this.root) {

    }

    findMax(tree = this.root) {

    }

    clear() {

    }
    log() {
        log(this.root)
    }
}


if(require.main === module) {
    const avl = new Avl()
    avl.insert(5)
    avl.insert(4)
    avl.insert(3)
    avl.log()
}

/*
- todo
    - 前端
        - 复习以前的项目为主
            - 游戏
                - sweep_line(扫雷）
                    - 解决一些其他遗留的问题
                - block
                    - 完成一个 3d_block
                - plane
                    - 玩家 子弹位置居中
                - happy_bird
                    - 添加分数功能
                - mario
                    - 水平移动时，与砖块碰撞检测
                    - 卷轴移动时（地面水平移动），mario的相对偏移量改变
                - plant_zombie
                    - 添加纸牌，点击可拖动
            - 轮播图
                - 添加到我的个人主页上
                - 复习里面的 css
                    - 熟悉掌握 animation transform transition
            - 个人主页 + 简历 + 博客
                - 添加 轮播图组件
                - 添加 置顶功能
                - 博客 完成 crud 功能
                - 简历 极简主义
            - vue rect
                - 熟悉掌握 vue
                    - 重新 todo_list
                    - 轮播图
                    - music
                    - weather
                - 了解 rect
                    - todo_list
                    - time
            - 数据结构
                - list
                - map  hash_table
                - stack
                - queue
                - db_list
                - tree
                - binary_tree
                - binary_search_tree
                - alv_tree
            - 知乎
                - 完成 删除功能
                - 以知乎为例 写个博客程序
            - markdown
                - 把 mark_down 添加到 博客程序（实现写博客功能）
            - calculator
                - 计算器 实现的思路
                - 里面的 简单的 css 渐变色
            - relation_calculator
                - 程序的划分
            - paint
                - undo 功能 解决
            - SPA_todo_list
                - 单页面，用到 博客程序中
            - weather
                - 复习 自己实现的 AJAX
                - 准备写个 weather 小程序
            - music
                - 163 模块化的设计
                - 准备 写桌面应用程序
            - render 渲染器
                - 复习 2d 渲染器
                - 准备 实现 3d
            - 爬虫
                - 复习 豆瓣 知乎
                - 复习 可视化工具 echart.js 写个配置函数
                - 准备爬 boss pm2.5
            -  led
                - 复习 数据转换
   - 后端
        - node.js
            - 知乎
            - 博客
            - 爬虫
            - 准备 写个类似 sever web frame
            - 复习 刚入门的 20 个小项目
        - python
            - 复习 自己写个 sever web frame
            - 准备 写 博客程序
            - 准备 写 bbs
            - 复习爬虫
            - 复习 刚入门的 20 个小项目
        - 数据库
            - 了解 mysql
            - 熟悉 mongodb
        - linux
   - 其他
        - 学校课设
            - 前三天准备
        - 考试
            - 前一个星期准备
        - 六级
            - 背单词
        - 教资
            - 背背
            - 数学 准备
        - 篮球
            - 转身
 */