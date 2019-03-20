/**
 * 1.扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列
 *   该运算符主要用于函数调用
 */
{
	console.log(...[1,2]); // 1 2
	let array = "1,2,3";
	console.log(array.split(','))
	//使用
	function add(x, y) {
		return x
	}
}