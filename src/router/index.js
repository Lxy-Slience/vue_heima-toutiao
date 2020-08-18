import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        component: () =>
            import ('@/components/login/Login.vue')
    }, {
        path: '/home',
        redirect: '/index',
        component: () =>
            import ('@/components/home/Home.vue'),
        children: [{
            path: '/index',
            component: () =>
                import ('@/components/home/Index.vue'),
        }, {
            path: '/qa',
            component: () =>
                import ('@/components/home/Qa.vue'),
        }, {
            path: '/video',
            component: () =>
                import ('@/components/home/Video.vue'),
        }, {
            path: '/my',
            component: () =>
                import ('@/components/home/My.vue'),
        }]
    },
    {
        path: '/search',
        component: () =>
            import ('@/views/Search.vue')
    }, {
        path: '/article/:articleId',
        component: () =>
            import ('@/views/ArticleIndex.vue'),
        props: true // 开启props 路由传参
    },
    {
        path: '/user/profile',
        component: () =>
            import ('@/views/user-profile/UserProfile.vue'),
    }
]

const router = new VueRouter({
    routes
})

export default router