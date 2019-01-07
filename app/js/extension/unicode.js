/**
 * 1.字符unicode表示法
 * 限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示
 */
{
	console.log('\u0061');//a
	console.log('\uD842\uDFB7');//𠮷
	console.log('\u20BB7'); // 7
}
/**
 * 如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7），JavaScript 会理解成\u20BB+7。由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7
 * ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符
 */
{
	console.log("\u{20BB7}");//𠮷
	console.log("\"\u{41}\u{42}\u{43}\"");//ABC
	console.log('\u{1F680}' === '\uD83D\uDE80');// true

	//大括号表示法与四字节的 UTF-16 编码是等价的
	//有了上面的表示方法，字符就有六种表示，如下
	console.log('\z' === 'z');  // true
	console.log('\172' === 'z'); // true
	console.log('\x7A' === 'z'); // true
	console.log('\u007A' === 'z'); // true
	console.log('\u{7A}' === 'z'); // true
}
/**
 * 2.codePointAt
 * codePointAt方法会正确返回 32 位的 UTF-16 字符的码点。对于那些两个字节储存的常规字符，它的返回结果与charCodeAt方法相同
 */
{
	let s = '𠮷a'; //'𠮷'被JavaScript视为两个字符
	console.log(s.codePointAt(0));//134071
	console.log(s.codePointAt(1));//57271
	console.log(s.codePointAt(2));//97

	//toString(16)返回16进制的值
	console.log(s.codePointAt(0).toString(16)); // "20bb7"
	console.log(s.codePointAt(2).toString(16)); // "61"

	/**
	 * codePointAt方法的参数，仍然是不正确的。比如，上面代码中，字符a在字符串s的正确位置序号应该是 1，但是必须向codePointAt方法传入 2。
	 * 解决这个问题的一个办法是使用for...of循环，因为它会正确识别 32 位的 UTF-16 字符
	 */
	{
		let s = '𠮷a';
		for (let ch of s) {
			console.log(ch.codePointAt(0).toString(16));
		}
	}
}
/**
 * codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法
 */
{
	function is32Bit(c) {
		return c.codePointAt(0) > 0xFFFF;
	}
	console.log(is32Bit("𠮷")); // true
	console.log(is32Bit("a")) // false
}
/**
 * 3.String.fromCharCode
 * ES5: 用于从码点返回对应字符，但是这个方法不能识别 32 位的 UTF-16 字符（Unicode 编号大于0xFFFF）
 * ES6:可以识别大于0xFFFF的字符，弥补了String.fromCharCode方法的不足。在作用上，正好与codePointAt方法相反
 * 注意：fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上
 */
{
	console.log(String.fromCodePoint(0x20BB7));// "𠮷"
	let s = '𠮷';
	console.log(s.codePointAt(0).toString(16));//20bb7
	// 如果String.fromCodePoint方法有多个参数，则它们会被合并成一个字符串返回。
	console.log(String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y');// true
}

/**
 * 4.ES6添加了遍历器接口，字符串可以被for...of循环遍历，
 * 这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点
 */
{
	let text = String.fromCodePoint(0x20BB7);

	for (let i = 0; i < text.length; i++) {
		console.log(text[i]);
	}
    // " "
    // " "

	for (let i of text) {
		console.log(i);
	}
    // "𠮷"
}
/**
 * 5. normalize
 * ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化
 * Unicode 提供了两种方法。一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。另一种是提供合成符号
 * 即原字符与重音符号的合成，两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）
 */
{
	'\u01D1'==='\u004F\u030C' //false

	'\u01D1'.length // 1
	'\u004F\u030C'.length // 2

	console.log('\u01D1'.normalize() === '\u004F\u030C'.normalize());//true

}

/**
 * 6.includes(), startsWith(), endsWith(),这三个方法都支持第二个参数，表示开始搜索的位置
 * #1,includes()第二个参数为n时，第n个位置直到字符串结束，包含n
 * #2,startsWith().第二个参数为n时，第n个位置直到字符串结束，包含n
 * #3,endsWith().第二个参数为n时，第n个位置直到字符串结束，不包含n
 */
{
	let s = 'Hello world!';

	s.startsWith('Hello') // true
	s.endsWith('!') // true
	s.includes('o') // true

	s.startsWith('world', 6) // true
	console.log(s.endsWith('Hello', 5)); // true
	s.includes('Hello', 6) // false
}

/**
 * 7.repeat
 * repeat方法返回一个新字符串，表示将原字符串重复n次
 */
{
	'x'.repeat(3) // "xxx"
	'hello'.repeat(2) // "hellohello"
	'na'.repeat(0) // ""

	//1.参数如果是小数，会被取整
	console.log('na'.repeat(2.9)); // "nana"
	console.log('na'.repeat(2.4)); // "nana"

	//2.repeat的参数是负数或者Infinity，会报错
	// 'na'.repeat(Infinity)// RangeError
	// 'na'.repeat(-1)// RangeError

	//3.参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0
	console.log('na'.repeat(-0.9)); // ""

	//4. NaN等同于 0
	console.log('na'.repeat(NaN));// ""

	//5.repeat的参数是字符串，则会先转换成数字
	'na'.repeat('na') // ""
	console.log('na'.repeat('3')) // "nanana"
}
/**
 * 8. 字符串自动补全 padStart(), padEnd()
 * ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全
 * padStart()和padEnd()一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串,若省略第二个参数，默认用空格补全
 */
{
	let s = 'x';
	s.padStart(5, 'ab'); // 'ababx'
	s.padStart(4, 'ab') // 'abax'

	s.padEnd(5, 'ab') // 'xabab'
	s.padEnd(4, 'ab') // 'xaba'

	//2.如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串
	console.log('xxx'.padStart(2, 'ab')); // 'xxx'
	'xxx'.padEnd(2, 'ab') // 'xxx'

	//3, 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
	'abc'.padStart(10, '0123456789')// '0123456abc'

	//4. 省略第二个参数，默认使用空格补全长度
	'x'.padStart(4) // '   x'
	'x'.padEnd(4) // 'x   '

	//常见用途
	//1.padStart()的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串
	'1'.padStart(10, '0') // "0000000001"
	'12'.padStart(10, '0') // "0000000012"
	'123456'.padStart(10, '0') // "0000123456"
	//2, 提示字符串格式
	'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
	'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
}

/**
 * 9, matchAll
 * 如果一个正则表达式在字符串里面有多个匹配,以一次性取出所有匹配。不过，它返回的是一个遍历器（Iterator），而不是数组
 */
{
	const str = 'test1test2test3';
	// g 修饰符加不加都可以
	const regex = /t(e)(st(\d?))/g;

	console.log(str.match(regex));//返回数组， [ 'test1', 'test2', 'test3' ]
	// for (const match of str.matchAll(regex)) {
	// 	console.log(match);
	// }
// ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
// ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
// ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
}

/**
 * 10,ES6 引入了模板字符串
 * 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量
 * 模板字符串中嵌入变量，需要将变量名写在${}之中
 * 模板字符串之中还能调用函数
 */
{
	// 写法一
	let str1 = 'return ' + '`Hello ${name}!`';
	let func1 = new Function('name', str1);
	console.log(func1('Jack')); // "Hello Jack!"

// 写法二
	let str = '(name) => `Hello ${name}!`';
	let func2 = eval.call(null, str);
	func2('Jack') // "Hello Jack!"
}

/**
 * 11.String.raw方法
 * 往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串
 */
{
	console.log(String.raw`Hi\n${2+3}!`);
	console.log(String.raw`Hi\\n`);//返回 "Hi\\\\n"
}