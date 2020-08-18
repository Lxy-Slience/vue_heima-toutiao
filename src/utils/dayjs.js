// 导入dayjs
import dayjs from 'dayjs'

import vue from 'vue'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 处理相对时间配置插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用

// 定义一个全局过滤器，这样子所以组件的模板都可以使用
vue.filter('relativeTime', (value) => {
    return dayjs().to(dayjs(value))
})