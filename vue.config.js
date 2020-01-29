/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-console */
const is_prod = ["production", "prod"].includes(process.env.NODE_ENV);

// console.log(is_prod, 'is_prod');

const glob = require('glob')
const pagesInfo = require('./pages.config')
let pages = null;


glob.sync('./src/**/main.js').forEach(p => {
    console.log(p, 'pppppppp')
    let result = p.match(/\.\/src\/(.*)\/main\.js/)
    result = result ? result[1] : '';
    const key = result ? result : 'main';

    if (pagesInfo[key]) {
        if (!pages) {
            pages = {};
        }
        pages[key] = {
            entry: result ? `src/${result}/main.js` : 'src/main.js'
        }
        for (const info in pagesInfo[key]) {
            pages[key] = {
                ...pages[key],
                [info]: pagesInfo[key][info]
            }
        }
    }
})

// console.log('ssssssssssss', !!pages)

if (!!pages) {

    pages = {
        pages,
    }
}

let export_obj = {
    publicPath: is_prod ? './' : '/',
    productionSourceMap: !is_prod,
    filenameHashing: !is_prod,
    lintOnSave: !is_prod,
    outputDir: 'docs',
    configureWebpack: config => {
        if (is_prod) {
            config.externals = {
                vue: "Vue",
                // "element-ui": "ELEMENT",
                "vue-router": "VueRouter",
                vuex: "Vuex",
                axios: "axios",
                // "cube-ui": "Cube",
                // "socket.io": 'io',
                // "mint-ui": 'mintUi',
                // "crypto-js": 'CryptoJS',
                // "moment": "moment",
                // "core-js":"core"
            };


        }
    },
    chainWebpack: config => {
        if (is_prod) {
            const cdn = {
                // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
                css: [
                    // "//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css",
                    // "https://unpkg.com/cube-ui/lib/cube.min.css",
                    // "https://unpkg.com/mint-ui/lib/style.css"
                ],
                js: [
                    "https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js", // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
                    "https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.1.3/vue-router.min.js",
                    "https://cdnjs.cloudflare.com/ajax/libs/vuex/3.1.2/vuex.min.js",
                    "https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js",
                    // "https://unpkg.com/cube-ui/lib/cube.min.js",
                    // "https://unpkg.com/mint-ui/lib/index.js",
                    // "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.slim.js",
                    // "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js",
                    // "https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js",
                    // "https://lib.baomitu.com/core-js/2.6.11/library.min.js"
                    // "//unpkg.com/element-ui@2.10.1/lib/index.js"
                ]
            };
            // console.log(config.plugin, 'config.plugin', cdn)
            // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
            // config.plugin("html").tap(args => {
            //     // html中添加cdn
            //     // console.log(args, 'args')
            //     args[0].cdn = cdn;
            //     return args;
            // });
            // 多页面cdn添加
            Object.keys(pagesInfo).forEach(page => {
                try {
                    // console.log(page, `html-${page}`, 'page')
                    config.plugin(`html-${page}`).tap(args => {
                        // html中添加cdn
                        args[0].cdn = cdn;

                        // 修复 Lazy loading routes Error
                        args[0].chunksSortMode = "none";
                        return args;
                    });

                } catch (err) {
                    // console.log(error)
                }
            })


        }
        return config;
    },

    ...pages,

}
// console.log('pages', pages, export_obj)
module.exports = export_obj;