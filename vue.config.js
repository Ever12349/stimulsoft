const is_prod = ["production", "prod"].includes(process.env.NODE_ENV);

console.log(is_prod, 'is_prod');

// // let path = require('path')
// // let glob = require('glob')
// // //配置pages多页面获取当前文件夹下的html和js
// // function getEntry(globPath) {
// //     let entries = {},
// //         basename, tmp, pathname, appname;

// //     glob.sync(globPath).forEach(function (entry) {
// //         basename = path.basename(entry, path.extname(entry));
// //         // console.log(entry)
// //         tmp = entry.split('/').splice(-3);
// //         console.log(tmp, appname)
// //         pathname = basename; // 正确输出js和html的路径

// //         // console.log(pathname)
// //         entries[pathname] = {
// //             entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.js',
// //             template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
// //             title: tmp[2],
// //             filename: tmp[2]
// //         };
// //     });
// //     return entries;
// // }

// // let pages = getEntry('./src/pages/**?/*.html');
// // console.log(pages);
const glob = require('glob')
const pagesInfo = require('./pages.config')
let pages = null;

// glob.sync('./src/**/main.js').forEach(p => {
//     let result = p.match(/\.\/src\/(.*)\/main\.js/)
//     result = result ? result[1] : '';
//     const key = result ? result : 'main';
//     if (pagesInfo[key]) {
//         pages[key] = {
//             entry: result ? `src/${result}/main.js` : 'src/main.js'
//         }
//         for (const info in pagesInfo[key]) {
//             pages[key] = {
//                 ...pages[key],
//                 [info]: pagesInfo[key][info]
//             }
//         }
//     }
// })

glob.sync('./src/**/main.js').forEach(p => {
    // console.log(p, 'pppppppp')
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

console.log('ssssssssssss', !!pages)

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

    ...pages,

}
console.log('pages', pages, export_obj)
module.exports = export_obj;