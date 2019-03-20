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

{
	const foo = {};

// 为 foo 添加一个属性，可以成功
	foo.prop = 123;
	foo.prop // 123

// 将 foo 指向另一个对象，就会报错
// 	foo = {}; // TypeError: "foo" is read-only

	//常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。
}