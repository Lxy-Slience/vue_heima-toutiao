// 评论请求模块

import request from '@/utils/request'

// 获取评论
export const getComments = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/comments',
        params
    })
}