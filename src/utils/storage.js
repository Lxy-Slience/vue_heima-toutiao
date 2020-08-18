// 保存到本地存储
export const setItem = (key, value) => {
    // if (typeof value === 'Object') {
    //     value = JSON.stringify(value)
    // }
    window.localStorage.setItem(key, JSON.stringify(value))
}

// 获取本地存储数据
export const getItem = (key) => {
    try {

        return JSON.parse(window.localStorage.getItem(key))
    } catch (err) {
        return window.localStorage.getItem(key)
    }
}

// 删除对应的本地存储
export const removeItem = (key) => {
    window.localStorage.removeItem(key)
}