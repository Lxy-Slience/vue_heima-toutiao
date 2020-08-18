// PostCss 的配置文件

module.exports = {
    plugins: {
        // vue-cli 内部已经配置了autoprefixer
        // autoprefixer: {
        //     browsers: ['Android >= 4.0', 'iOS >= 8'],
        // },
        'postcss-pxtorem': {
            // lib-flexible 的适配方案 分为十等分
            rootValue({ file }) {
                // 基于750设计稿
                // 当处理vant 的 css 文件时，设置成37.5  自己的css文件设置成75
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            // rootValue: 37.5,
            // 配置要转换的所有 CSS 属性
            propList: ['*'],
            // 配置不要转换的样式资源
            exclude: 'github-markdown'
        },
    },
};