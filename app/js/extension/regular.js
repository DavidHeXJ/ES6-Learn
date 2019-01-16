{
	var regex = new RegExp('xyz', 'i');
	// 等价于
	var regex = /xyz/i;

	//ES5 不允许此时使用第二个参数添加修饰符，否则会报错
	var regex = new RegExp(/xyz/, 'i');//Uncaught TypeError

	//原有正则对象的修饰符是ig，它会被第二个参数i覆盖
	new RegExp(/abc/ig, 'i').flags;
}

/**
 * 字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和split()
 */

/**
 * 3，u修饰符
 * ES6 对正则表达式添加了u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码
 */
{
	//\uD83D\uDC2A是一个四个字节的 UTF-16 编码，代表一个字符。但是，ES5 不支持四个字节的 UTF-16 编码，会将其识别为两个字符
	/^\uD83D/.test('\uD83D\uDC2A'); // true
	//加了u修饰符以后，ES6 就会识别其为一个字符
	/^\uD83D/u.test('\uD83D\uDC2A'); // false

	/**
	 * 点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符
	 */
	{
		var s = '𠮷';

		console.log(/^.$/.test(s)); // false
		console.log(/^.$/u.test(s)); // true
	}

	/**
	 * ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词
	 */
	{
		console.log('\u{61}');//a
		/\u{61}/.test('a'); // false //不加u修饰会被认为连续匹配61个u
		console.log(/\u{61}/u.test('a')); // true
		/\u{20BB7}/u.test('𠮷'); // true
	}
	/**
	 * 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符
	 */
	{
		/a{2}/.test('aa'); // true
		/a{2}/u.test('aa'); // true
		/𠮷{2}/.test('𠮷𠮷'); // false
		/𠮷{2}/u.test('𠮷𠮷'); // true
	}
}

/**
 * 4.正则实例对象新增unicode属性，表示是否设置了u修饰符
 */
{
	const r1 = /hello/;
	const r2 = /hello/u;

	console.log(r1.unicode); // false
	console.log(r2.unicode); // true
}

/**
 * 5, y修饰符
 * ES6 还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。
 *
 * y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。
 * 不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义
 */
{
	var s = 'aaa_aa_a';
	var r1 = /a+/g;
	var r2 = /a+/y;

	r1.exec(s) // ["aaa"]
	r2.exec(s) // ["aaa"]
	// 剩余字符是_aa_a, g修饰符表示任意匹配都可以
	r1.exec(s) // ["aa"]
	// 剩余字符是_aa_a， y修饰表示必须从第一个位置开始匹配
	r2.exec(s) // null

	/**
	 * lastIndex属性指定每次搜索的开始位置
	 */
	{
		const REGEX = /a/g;
		// 指定从2号位置（y）开始匹配
		REGEX.lastIndex = 2;
		// 匹配成功
		const match = REGEX.exec('xaya');
		// 在3号位置匹配成功
		match.index // 3
		// 下一次匹配从4号位开始
		REGEX.lastIndex // 4
		// 4号位开始匹配失败
		REGEX.exec('xaya') // null
	}
}

/**
 * 6, RegExp.prototype.sticky
 * ES6 的正则实例对象多了sticky属性，表示是否设置了y修饰符
 */
{
	var r = /hello\d/y;
	console.log(r.sticky); // true
}
/**
 * 7,RegExp.prototype.flags
 * ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符
 */
{
	// ES5 的 source 属性
	// 返回正则表达式的正文
	console.log(/abc/ig.source);// "abc"

	// ES6 的 flags 属性
	// 返回正则表达式的修饰符
	console.log(/abc/ig.flags);// 'gi'
}

/**
 * 8， s修饰符：dotAll模式
 * 正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用u修饰符解决；另一个是行终止符
 * 行终止符： \n(换行符),\r (回车符)， 行分隔符， 段分隔符
 *
 * ES2018 引入s修饰符，使得.可以匹配任意单个字符
 */
{
	/foo.bar/.test('foo\nbar'); //false

	//很多情况希望匹配的是任意单个字符，这时有一种变通的写法。
	/foo[^]bar/.test('foo\nbar');//true

	//s修饰符
	/foo.bar/s.test('foo\nbar') // true

	/**
	 * dotAll属性，返回一个布尔值，表示该正则表达式是否处在dotAll模式
	 */
	{
		const re = /foo.bar/s;
		// 另一种写法
		// const re = new RegExp('foo.bar', 's');

		re.test('foo\nbar') // true
		console.log(re.dotAll); // true
		console.log(re.flags); // 's'
	}
}

/**
 * ES2018引入后行断言和后行否定断言，JS的正则表达式，只支持先行断言（lookahead）和先行否定断言（negative lookahead）
 * #1，”先行断言“指的是x只有在y前面才匹配， 写法： /x(?=y)/
 * #2，”先行否定断言“指的是x只有不在y前面才匹配， 写法： /x(?!y)/
 * #3，”后行断言“指的是x只有在y后面才匹配， 写法： /(?<=y)x/
 * #4，”后行否定断言“指的是，x只有不在y后面才匹配， 写法： /(?<!y)x/
 */
{
	//#1, 如100%， 获取%前面的数字， /\d+(?=%)/
	//#2, 如获取$20, 获取美元符号后的数字， /\d+(?!\$)/
	//#3, 如获取$20, 获取美元符号后的数字， /(?<=\$)\d+/
	//#1, 如100%， 获取%前面的数字， /(?<!\$)\d+/
}
/**
 * 具名组匹配 ?<name>
 * 允许为每一个组匹配指定一个名字
 *
 */
{
	{
		const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
		const matchObj = RE_DATE.exec('1999-12-31');
		const year = matchObj[1]; // 1999
		const month = matchObj[2]; // 12
		const day = matchObj[3]; // 31
	}

	const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

	const matchObj = RE_DATE.exec('1999-12-31');
	const year = matchObj.groups.year; // 1999
	const month = matchObj.groups.month; // 12
	const day = matchObj.groups.day; // 31
}

{
	let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
	console.log(one);//foo
	console.log(two);//bar
}