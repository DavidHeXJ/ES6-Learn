/**
 * ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构
 * 变量解构赋值
 */
{
    /**
     * let a = 1;
     * let b =2;
     * let c =3;
     */
    let [a, b, c] = [1, 2, 3];
    console.log(a, b, c);
}

{
    let [foo, [[bar], baz]] = [1, [[2], 3]];
    console.log(foo, bar, baz);
}

let [ , , third] = ["foo", "bar", "baz"];
console.log(third); // "baz"

let [x, , y] = [1, 2, 3];
console.log(x, y);
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail);
head // 1
tail // [2, 3, 4]
{
    let [x, y, ...z] = ['a'];
    console.log(x, y,z);
    x // "a"
    y // undefined
    z // []
}

//如果解构不成功，变量的值就等于undefined。
let [foo] = []; //foo 为undefined
console.log(foo);
let [bar, foo1] = [1];


/**
 * 默认值
 */
{
    let [foo = true] = [];
    console.log(foo); // true
    let [x, y = 'b'] = ['a']; // x='a', y='b'
 }


console.log(x, y);
{
    let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
}
console.log('aaaaa');

/**
 * fibs是一个Genertor函数
  * @returns {IterableIterator<number>}
 */
function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
        console.log(a, b);
        yield a;
        [a, b] = [b, a + b];
    }
}
//解构赋值会依次从fibs函数取值，即调用next函数取值
let [a1, a2, a3, a4, a5,a6,a7,a8] = fibs();// 0 1 1 2 3 5 8 13
console.log(a6); // 5

/**
 * 解构赋值允许指定默认值
 */
{
    let [foo = true] = [];
    console.log(foo); // true

    let [x, y = 'b'] = ['a']; // x='a', y='b'
    console.log(x,y);
    {
        let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
        console.log(x,y);
    }
}
/**
 * 注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
 * 所以，只有当一个数组成员严格等于undefined，默认值才会生效。
 */
{
    let [x = 1] = [undefined];
    console.log(x); // 1

    let [y = 1] = [null];
    console.log(y); // null
}

/**
 * 2.对象的解构赋值
 */
{

}