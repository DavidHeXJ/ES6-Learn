/**
 * 1.扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列
 *   该运算符主要用于函数调用
 */
{
	console.log(...[1, 2]); // 1 2
	let array = "1,2,3";
	console.log(array.split(','))

	//使用
	function add(x, y) {
		return x
	}
}

/**
 * 2.扩展运算符的应用
 */
{
	/*
	  2.1 复制数组
	 */
	{
		const a1 = [1, 2];
		// const a2 = a1;//复制指针地址，修改a2会影响a1
		//写法一
		const a2 = [...a1];
		//写法二
		const [...a3] = a1;
		a2[0] = 2;
		console.log(a1 + "\n" + a2);
	}

	/*
	   2.2 合并数组
	 */
	{
		const a1 = [1, 2];
		const a2 = [3, 4];
		console.log(a1.concat(a2));// ES5写法
		console.log([...a1, ...a2]);
	}

	/*
	   2.3与解构赋值结合
	 */
	{
		const [first, ...rest] = [1, 2, 3];
		console.log(first);//1
		console.log(rest);//[2,3]

		const [first1, ...rest1] = [];
		console.log(first1);// undefined
		console.log(rest1);//[]

		//展运算符用于数组赋值，只能放在参数的最后一位，否则会报错
		// const [...first2, rest2] = [1,2];//报错
	}

	/*
	   2.4 字符串
	 */
	{
		console.log([...'hello']);//[ 'h', 'e', 'l', 'l', 'o' ]
		//能够正确识别四个字节的 Unicode 字符
		console.log('x\uD83D\uDE80y'.length); // 4
		console.log([...'x\uD83D\uDE80y'].length); // 3
	}
}

/**
 * 3.Array.from方法用于将两类对象转为真正的数组：
 * 类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
 */
{
	/*
	  1.实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组
	 */
	{
		let arrayLike = {
			'0': 'a',
			'1': 'b',
			'2': 'c',
			length: 3
		};

		console.log(Array.from(arrayLike));

		//只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组
		console.log(Array.from('hello'));//[ 'h', 'e', 'l', 'l', 'o' ]

		let namesSet = new Set(['a', 'b'])
		Array.from(namesSet) // ['a', 'b']
		//参数是数组，返回一个一摸一样的全新数组
		console.log(Array.from([1, 2, 3]));

		//Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性
		console.log(Array.from({length: 2}));//[ undefined, undefined ]
		//Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
		let newArr1 = Array.from(['1', '2', '3'], (x) => x*x);//Array.from(['1', '2', '3'], x => x*x)
		//等同于
		let newArr2 = Array.from(['1', '2', '3']).map(x => x*x);
		console.log(newArr1);
		console.log(newArr2);

		let obj1 = {};
		obj1.name = "david";
		obj1.age = 20;
		let array = [];
		array.push(obj1);
		let arrayObj = [{
			"name": "david",
			"age": 20
		}, {"name": "jack", "age": 21}];
		console.log(Array.from(array));

		//Array.from的第一个参数还可以指定第二个参数运行的次数
		Array.from({ length: 2 }, () => 'test');// ['test', 'test']
	}

}
/**
 * 4. Array.of方法用于将一组值，转换为数组, (弥补数组构造函数Array()的不足)
 *    Array() // []
 *    Array(3) // [, , ,]
 *    Array(3, 11, 8) // [3, 11, 8]
 */
{
	Array.of(3);//[3]
	console.log(Array(3));
	console.log(Array.of(3));
}

/**
 * copyWithin
 */
{
	//从第3位开始取到最后一位[4,5]复制到第0位
	let newArr = [1,2,3,4,5].copyWithin(0,3);//[ 4, 5, 3, 4, 5 ]
	//从第3位开始取到第4位[4]复制到第0位
	let newArr1 = [1,2,3,4,5].copyWithin(0,3,4);//[ 4, 2, 3, 4, 5 ]
	let newArr2 = [1, 2, 3, 4, 5].copyWithin(0, -2, -1);
	console.log(newArr);
	console.log(newArr1);
	console.log(newArr2);
}

/**
 * find()和findIndex()
 */
{
	let obj = [1,2,-1,-2,3].find((x) => x < 0);
	console.log(obj);//-1

	let obj1 = [1,2,-1,-2,3].find(function (val, index, arr) {//val:当前值， index: 当前位置， arr： 原数组
		if (val < 0){
			console.log(val, index);
			console.log(arr);
			return val < 0;
		}
	})
	console.log('find:' + obj);
	let index = [1,2,-1,-2,3].findIndex((x) => x < 0);
	console.log(index);//2
}
/**
 * 6.fill()
 */
{
	let fiilArr1 = new Array(3).fill(1);
	console.log(fiilArr1);//[1,1,1]

	let fillArr2 = [2,2,2].fill(1);//原数组全部元素都会被替换
	console.log(fillArr2);//[1,1,1]

	let fillArr3 = [1,2,3].fill(3,0,1);//将从第0位到第1位替换成3
	console.log(fillArr3);//[3,2,3]

	//如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象
	let arr = new Array(3).fill({name: "Mike"});
	arr[0].name = 'david';
	console.log(arr);//[ { name: 'david' }, { name: 'david' }, { name: 'david' } ]
}

/**
 * 7.数组的keys(), values(), entries()
 */
{
	let arr = ['a', 'b', 'c'];
	for (let index of arr.keys()) {
		console.log('index: ' +index);
	}

	for (let value of arr.values()) {
		console.log('value: '+ value);
	}

	for (let [index, elem] of arr.entries()) {
		console.log('index:' + index + ', value:' + elem);
	}
}

/**
 * 8. includes()
 */
{
	let arr = [1,2,3];
	console.log(arr.includes(1));
	console.log(arr.includes(1,1));//从第1位开始搜索是否包含1

	//es5
	console.log(arr.indexOf(1) !== -1);
}

/**
 * flat(),flatMap()
 */
{
	let a = new Array(2).fill(1);
	// a.flatMap(x => x*2);
}

//*注意空位的处理， ES6里面会将空位转为undefined
{
	console.log(Array.from([1,,2]));//[1,undefined,2]
}