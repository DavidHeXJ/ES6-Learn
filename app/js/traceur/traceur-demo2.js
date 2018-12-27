var traceur = require('traceur');
var fs = require('fs');

// 将 ES6 脚本转为字符串
var contents = fs.readFileSync('demo.js').toString();

var result = traceur.compile(contents, {
    filename: 'demo.js',
    sourceMap: true,
    // 其他设置
    modules: 'commonjs'
});

if (result.error)
    throw result.error;

console.log(contents);
// result 对象的 js 属性就是转换后的 ES5 代码
fs.writeFileSync('out.js', result.js);
console.log(result.js);
// sourceMap 属性对应 map 文件
fs.writeFileSync('out.js.map', result.sourceMap);
