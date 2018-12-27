/*'use strict';*/
{
    let a = 1;
    var b = 2;
    console.log('a' + a);
}
/*console.log(a);*/
console.log('b=' + b);

for (let i = 0; i < 3; i++) { //i 只在这个循环内有效
    console.log(i);
}
console.log('\n');
/*console.log(i);*/ // i is undefined

var a = [];
for (var i = 0; i < 10; i++) { //i 在这里是全局变量， 循环执行完后i = 10
    a[i] = function () {
        console.log(i);
    };
    /*a[i]();*/
}
a[6](); // 10, a[6] = function() {console.log(10)}

var a = [];
for (let i = 0; i < 10; i++) { //i 在这里是局部变量， 每次循环都会生成新的变量i, for循环内有机制可以记录上一轮循环变量的值
    a[i] = function () {
        console.log(i);
    };
    /*a[i]();*/
}
a[6](); // 6 ，a[6] = function() {console.log(6)}

/**
 * 父子作用域
 */
for (let i = 0; i < 3; i++) { //循环变量这部分是父作用域
    let i = 'abc'; //循环体内部是子作用域
    console.log(i);
}

/**
 * 变量提升， var 存在‘变量提升’现象
 * var 命令可以先使用变量再申明， 未申明就使用，值为undefined
 * let 命令必须先申明再使用，不然会报错
 */
console.log(foo); // foo 为undefined
var foo = 'foo';

/*console.log(bar);*/ //报错ReferenceError
let bar1 = 'bar1';

/**
 *  暂时性死区， let命令所申明的变量绑定let所在的块级作用域， 不受外部影响
 *  使用let 申明变量之前不允许使用这个变量
 */
/*var tmp = 123;*/

if (true) {
    /*tmp = 'abc';*/ // ReferenceError
    let tmp;
}

if (true) {
    // TDZ开始
    /*tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError*/

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}

/*console.log(typeof x);*/ // ReferenceError
let x1;
console.log(typeof x1);
console.log(typeof undeclared_variable); // "undefined"
//参数x的默认值是y, y这时还没申明，会报错
/*function bar(x = y, y = 2) {
    return [x, y];
}*/

/*bar();*/ // 报错
function bar(x = 2, y = x) {//参数y的默认值是x, x这时已经申明，不会报错
    return [x, y];
}
console.log(bar()); // [2, 2]
// 不报错
var x = x;
// 报错
/*let y = y;*/  // ReferenceError: y is not defined

/**
 * let 相同作用域内不允许重复声明
 */
function  func1() {
    let a = 1;
    /*var a = 10;*/ //报错
}
function  func2() {
    let a1 = 1;
    /*let a1 = 2;*/ //报错
}

/**
 * 函数内部不能重复声明
 */
function func3(args) {
    /*let args;*/ //报错， 重复申明
}
function func4(args) {// 函数内部局部块内可以再次申明
    console.log(args);
    {
        let args = 10;
        console.log('args = ' + args);
    }
}
func4(1);