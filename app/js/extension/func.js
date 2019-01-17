/**
 * 1.函数参数默认值
 */
{
	function f1(x = 0, y = 0) {
		console.log(x, y);
	}
	f1(); // 0 0
	f1(1);// 1 0
	f1(1, 1);// 1 1

	//参数变量是默认声明的，不能用let或const再次声明
	/*function foo(x = 5) {
		let x = 1; // error
		const x = 2; // error
	}*/

	//数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的
	let x = 99;
	function foo(p = x + 1) {
		console.log(p);
	}

	foo() // 100
	x = 100;
	foo() // 101

	{
		function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
			console.log(method);
		}

		fetch('http://example.com'); //GET

		{
			function fetch(url, { body = '', method = 'GET', headers = {} }) {
				console.log(method);
			}

			fetch('http://example.com', {})// "GET"

			//不能省略第二个参数
			//fetch('http://example.com');// 报错
		}
	}

	{
		// 写法一
		// 函数参数的默认值是空对象，但是设置了对象解构赋值的默认值
		function m1({x = 0, y = 0} = {}) {
			return [x, y];
		}


		// 写法二
		// 参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值
		function m2({x, y} = { x: 0, y: 0 }) {
			return [x, y];
		}

		// 函数没有参数的情况
		m1() // [0, 0]
		m2() // [0, 0]

		// x 和 y 都有值的情况
		m1({x: 3, y: 8}) // [3, 8]
		m2({x: 3, y: 8}) // [3, 8]

		// x 有值，y 无值的情况
		m1({x: 3}) // [3, 0]
		m2({x: 3}) // [3, undefined]

		// x 和 y 都无值的情况
		m1({}) // [0, 0];
		m2({}) // [undefined, undefined]

		m1({z: 3}) // [0, 0]
		m2({z: 3}) // [undefined, undefined]
	}

	//默认值参数不能省略
	//如果传入undefined，将触发该参数等于默认值，null则没有这个效果
	{
		function f(x, y = 5, z) {
			return console.log([x, y, z]);
		}

		f() // [undefined, 5, undefined]
		f(1) // [1, 5, undefined]
		//f(1, ,2) // 报错
		f(1, undefined, 2) // [1, 5, 2]
		f(1, null, 2) // [1, null, 2]
	}
}
/**
 *  函数的length属性，返回没有指定默认值的参数个数
 * 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了
 */
{
	(function (a) {}).length; // 1
	(function (a = 5) {}).length; // 0
	(function (a, b, c = 5) {}).length; // 2
	(function (a = 0, b, c) {}).length; // 0
	(function (a, b = 1, c) {}).length;// 1
}
/**
 * ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。
 * rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
 */
{
	function add(...values) {
		let sum = 0;

		for (var val of values) {
			sum += val;
		}

		return sum;
	}

	add(2, 5, 3) // 10
}

/**
 * 3.作用域
 */
{
	{
		var x = 1;

		function f(x, y = x) { //y的默认值是x,x指向第一个参数x,而不是全局的x
			console.log(y);
		}
		f();//undefined
		f(2) // 2
	}

	{
		let x = 1;
		//参数y = x形成一个单独的作用域。这个作用域里面，变量x本身没有定义，所以指向外层的全局变量x
		//函数调用时，函数体内部的局部变量x影响不到默认值变量x
		//注意： 全局变量x不存在，就会报错
		function f(y = x) {
			let x = 2;
			console.log(y, x);
		}

		f(); // 1 2
		f(3); // 3 2
	}
}
/**
 * 4. name属性， 返回该函数的函数名
 */
{
	function foo() {}
	console.log(foo.name); // "foo"

	{
		var f = function () {};

		// ES5
		f.name // ""
		// ES6
		f.name // "f"

		const bar = function baz() {};

		// ES5
		bar.name // "baz"

		// ES6
		bar.name // "baz"
		//Function构造函数返回的函数实例，name属性的值为anonymous
		console.log((new Function()).name);
	}
}

/**
 * 5. 箭头函数
 */
{
	//无参数
	let s = () => 1;// let s = function() { return 1;}
	console.log(s());

	//一个参数
	var f = v => v; // var f = function(v) {return v;}
	console.log(f(2));
	//多个参数
	var sum = (x, y) => x + y; var sum = function(x, y) {return x + y; }
	console.log(sum(1, 2));

	//参数是对象
	var fullName = ({first, last}) => first + ' ' + last;
	console.log(fullName({first:'David', last:'He'}));

	var person = {};
	person.first = 'David';
	person.last = 'He';
	console.log(fullName(person));

	//返回对象， 需要加上圆括号， {}会被认定为代码块
	let getTempItem = id => ({ id: id, name: "Temp" });
	// let getTempItem1 = id => { id: id, name: "Temp" }; //报错
}

/**
 * 6.双冒号运算符
 * 箭头函数并不适用于所有场合，提出了“函数绑定”（function bind）运算符，用来取代call、apply、bind调用
 * 该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面
 */
{
	{
		foo::bar;
		// 等同于
		bar.bind(foo);

		var arguments = [];
		foo::bar(...arguments);
		// 等同于
		bar.apply(foo, arguments);
	}
	// 如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。
	{
		var method = obj::obj.foo;
		// 等同于
		var method = ::obj.foo;

		var log = ::console.log;
		// 等同于
		var log = console.log.bind(console);
	}
}