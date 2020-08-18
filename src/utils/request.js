// 请求模块
import axios from 'axios'
import store from '@/store/index'
// JSONBig 可以处理 js处理不了的大于+-2的53次方的数字
// import JSONBig from 'json-bigint'
const request = axios.create({
    // 接口地址的基准值
    baseURL: 'http://ttapi.research.itcast.cn',

    // 自定义后端返回的原始数据
    // data就是后端返回的原始数据 JSON格式的字符串
    // transformResponse: [function(data) {
    //     try {
    //         return JSONBig.parse(data)
    //     } catch (err) {
    //         return data
    //     }
    //     // axios 默认会在内部处理返回来的数据
    //     // return JSON.parse(data)
    // }],
})

// 请求拦截器
request.interceptors.request.use(
    config => {
        const user = store.state.user
        if (user && user.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
// 响应拦截器


export default request