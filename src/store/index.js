import Vue from 'vue'
import Vuex from 'vuex'
// 导入保存 token 和获取token d的方法
import { setItem, getItem, removeItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 将token 保存到 vuex中
        user: getItem('token')
    },
    mutations: {
        // 将token 保存到本地存储中
        setUser(state, data) {
            state.user = data
            setItem('token', state.user)
        },
    },
    actions: {},
    modules: {}
})