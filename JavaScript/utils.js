const nowTime = () => {
    let d = new Date()
    let nm = d.getFullYear()
    let yt = d.getMonth() + 1
    let ri = d.getDate()
    let week = d.getDay()
    let ui = d.getHours()
    let ff = d.getMinutes()
    let mc = d.getSeconds()
    let array = ['日', '一', '二', '三', '四', '五', '六']
    let weeks = array[week]
    let time = `${nm}-${yt}-${ri} 星期${weeks}  ${ui}:${ff}:${mc}`
    // log('time', time)
    return time
}
const log = console.log.bind(console, `${nowTime()} >>>>>`)
/*
const log = function() {
    console.log.apply(console, arguments)
}
*/
const ensureEqual = (a, b, message) => {
    if (JSON.stringify(a) != JSON.stringify(b)) {
        log(`*** 测试失败, 结果(${a})  预期 (${b}), ${message}`)
    } else {
        log(`    ***  ${message} 测试成功, 大侄子牛逼呀`)
    }
}
const ensure = (condition, message) => {
    // 在条件不成立的时候, 输出 message
    if (!condition) {
        log('*** 测试失败:', message)
    } else {
        log('*** 测试成功   大侄子牛逼啊', message)
    }
}
const hash = (key, length) => {
    let hash = 0
    for(let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i)
    }
    // while(key !== '\0') {
    //     hash += key++
    // }
    return hash % length
}

const nextPrime = (length) => {
    if(length % 2 === 0) {
        length += 1
    }

    let isPrime = true
    while(true) {
        length += 2
        for(let i = 3; i * i <= length; i += 2) {
            if(length % i === 0) {
                isPrime = false;
                break
            }
        }
        if(isPrime) {
            return length
        }
    }
}
module.exports = {
    log,
    ensureEqual,
    ensure,
    hash,
    nextPrime,
}