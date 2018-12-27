/**
 * 1.声明后不能再修改，一般声明为只读的常量
 * @type {number}
 */
const PI = 3.14;
console.log(PI);

/*PI = 3.1415;*/ //报错

/*const foo;*/ //声明是必须初始化
// SyntaxError: Missing initializer in const declaration

/**
 * 作用域，同let, 块级作用域有效
 */
if (true) {
    const MAX = 5;
}

/*MAX */// Uncaught ReferenceError: MAX is not defined