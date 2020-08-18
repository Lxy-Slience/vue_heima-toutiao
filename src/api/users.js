// 用户请求模块

// 登录请求
import request from '@/utils/request'

export const login = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

// 获取接口
export const sendSms = (mobile) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}

// 获取用户自己信息
export const userInfo = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user`,
    })
}

// 获取用户频道列表
export const channelList = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user/channels`,
    })
}

// 关注用户
export const addFollow = (target) => {
    return request({
        method: 'POST',
        url: `/app/v1_0/user/followings`,
        data: {
            target
        }
    })
}

// 取消关注用户
export const deleteFollow = (target) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${target}`,
    })
}

// 获取用户个人资料
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user/profile`,
    })
}

// 编辑用户个人资料
export const editUserProfile = (data) => {
    return request({
        method: 'PATCH',
        url: `/app/v1_0/user/profile`,
        data
    })
}

// 编辑用户照片资料
export const editUserPhoto = (data) => {
    return request({
        method: 'PATCH',
        url: `/app/v1_0/user/photo`,
        data
    })
}