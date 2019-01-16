/**
 * 1,ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示
 * 从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀0表示，ES6 进一步明确，要使用前缀0o表示
 */
{
	console.log(0b111110111 === 503); // true
	console.log(0o767 === 503); //true
}

/**
 * 转10进制，使用Number方法
 */
{
	console.log(Number('0b111'));  // 7
	console.log(Number('0o10'));  // 8
}

/**
 * 2,ES6新增了Number.isFinite()和Number.isNaN()
 * Number.isFinite检查一个数值是否为有限的,参数类型不是数值，Number.isFinite一律返回false
 * 它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，
 * Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。
 */
{
	console.log(Number.isFinite(15));//true
	console.log(Number.isFinite('15'));//false
	console.log(Number.isFinite('aaa'));//false
	console.log(Number.isFinite(NaN));//false
	console.log(Number.isFinite(Infinity));//false

	Number.isNaN(NaN) // true
	Number.isNaN(15) // false
	Number.isNaN('15') // false
	Number.isNaN(true) // false
	Number.isNaN(9/NaN) // true
	Number.isNaN('true' / 0) // true
	Number.isNaN('true' / 'true') // true

	console.log('\n');
	console.log(Number.isFinite('15'));//false
	console.log(isFinite('15'));//true

	console.log(Number.isNaN('NaN'));//false
	console.log(isNaN("NaN")); // true
}

/**
 * 3.ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变
 * 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化
 */
{
	// ES5的写法
	parseInt('12.34') // 12
	parseFloat('123.45#') // 123.45

	// ES6的写法
	Number.parseInt('12.34') // 12
	Number.parseFloat('123.45#') // 123.45
}

/**
 * 4. Number.isInteger()
 * 用来判断一个数值是否为整数
 * 注意： 一个数值太小，或者精度较高，不建议用Number.isInteger来判断
 * 误判的特殊情况：
 * #1，数值精度最多可以达到 53 个二进制位，超过53位，后面的位数则会丢失
 * #2，一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0
 */
{
	Number.isInteger(25) // true
	Number.isInteger(25.0) // true //JS内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值
	Number.isInteger(25.1); // false

	//误判情况：
	//#1
	console.log(Number.isInteger(3.0000000000000002)); // true
	//#2
	Number.isInteger(5E-324) // false
	Number.isInteger(5E-325) // true
}

/**
 * 5. ES6 在Number对象上面，新增一个极小的常量Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差
 * 引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围
 */
{
	console.log(Number.EPSILON === Math.pow(2,-52));
	console.log(0.1 + 0.2);//0.30000000000000004
	console.log(0.1 + 0.2 === 0.3);//false

	//比如误差范围设置为2的-50次方
	function withinErrorMargin (left, right) {
		return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
	}

	0.1 + 0.2 === 0.3 // false
	console.log(withinErrorMargin(0.1 + 0.2, 0.3)); // true

	1.1 + 1.3 === 2.4 // false
	withinErrorMargin(1.1 + 1.3, 2.4) // true
}

/**
 * 6.ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量
 * 用来表示这个范围的上下限
 * JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值
 *
 * Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内
 */
{
	console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1);//true, 超过最大范围，所以不准确了
	console.log(Number.MAX_SAFE_INTEGER);//9007199254740991
	console.log(Number.MIN_SAFE_INTEGER);

	console.log(Number.isSafeInteger(9007199254740992));//false
	Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
	Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
	Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
	Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false

	console.log(Math.round(1));
}

/**
 * 7. ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用
 * #1, Math.trunc()方法用于去除一个数的小数部分，返回整数部分
 * #2, Math.sign()方法用来判断一个数到底是正数、负数、还是零
 * #3, Math.cbrt()方法用于计算一个数的立方根
 * #4，Math.clz32()方法将参数转为 32 位无符号整数的形式，然后这个 32 位值里面有多少个前导 0
 */
{
	//1. Math.trunc()方法用于去除一个数的小数部分，返回整数部分
	{
		console.log(Math.trunc(-0.11));//-0
		console.log(Math.trunc(4.1));//4
		console.log(Math.trunc(-4.9));//-4
		//对于非数值，Math.trunc内部使用Number方法将其先转为数值
		Math.trunc('123.456') // 123
		Math.trunc(true) //1
		Math.trunc(false) // 0
		Math.trunc(null) // 0
		//对于空值和无法截取整数的值，返回NaN
		Math.trunc(NaN);      // NaN
		Math.trunc('foo');    // NaN
		Math.trunc();         // NaN
		Math.trunc(undefined) // NaN
	}
	//2.Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值
	{
		Math.sign(-5) // -1
		console.log(Math.sign(5)); // +1
		Math.sign(0) // +0
		console.log(Math.sign(-0)); // -0
		Math.sign(NaN) // NaN
		Math.sign(null)  // 0
	}

	//3. Math.cbrt计算立方根
	{
		console.log(Math.cbrt(8));//2
		Math.cbrt('hello') // NaN
	}

	//4.Math.clz32()方法将参数转为 32 位无符号整数的形式，然后这个 32 位值里面有多少个前导 0
	{
		Math.clz32(0) // 32
		console.log(Number('0b00000000000000000000000000000001'));//1
		Math.clz32(1) // 31, 1的二进制前面有31个前导0

		//对于小数，Math.clz32方法只考虑整数部分
		Math.clz32(3.2) // 30
		Math.clz32(3.9) // 30

		Math.clz32() // 32
		Math.clz32(NaN) // 32
	}
}