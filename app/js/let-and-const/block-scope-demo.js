/**
 * 场景一：内部变量可能覆盖外部变量
 * @type {Date}
 */
var tmp = new Date();
console.log(tmp);

function f() {
    console.log(tmp);
    if (false) {
        var tmp = 'hello world'; //存在变量提升，覆盖了外部的tmp变量
    }
}
f(); // undefined

/**
 * 场景二： 用来计数的变量泄漏为全局变量
 * @type {string}
 */
var s = 'hello';

for (var i = 0; i < s.length; i++) { //循环完后 i并没有被销毁
    console.log(s[i]);
}
console.log(i); // 5

/**
 * let 新增块级作用域
 */
function f1() {
    let n = 5;
    if (true) {
        let n = 10;
        console.log('inner:' + n);//10
    }
    console.log('outer:' + n); // 5
}
f1();

{{{{{let insane = 'Hello World'}}}}};

{{{{
    {let insane = 'Hello World'}
    /*console.log(insane);*/ // 报错， 外层作用域无法读取层作用域的变量
}}}};

{{{{
    let insane = 'Hello World';
    {let insane = 'Hello World'} //内层作用域可以定义外层作用域同名的变量
}}}};

function f() { console.log('I am outside!'); }

(function () {
    if (false) {
        // 重复声明一次函数f
        function f() { console.log('I am inside!'); }
    }

    /*f();*/ //报错， f is not a function
}());
//实际执行代码如下：
function f() { console.log('I am outside!'); }
(function () {
    var f = undefined;
    if (false) {
        // 重复声明一次函数f
        function f() { console.log('I am inside!'); }
    }
   /* f(); *///报错
}());

// 函数声明语句
{
    let a = 'secret';
    function f() {
        return a;
    }
}

// 函数表达式
{
    let a = 'secret';
    let f = function () {
        return a;
    };
    console.log(f());
}

// 不报错
'use strict';
if (true) {
    // noinspection JSAnnotator
    function f11() {}
}
// 报错
'use strict';
/*if (true)
    function f22() {}*/


