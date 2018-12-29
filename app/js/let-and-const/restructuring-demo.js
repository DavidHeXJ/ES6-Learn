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
    let {foo, bar} = {foo: "foo", bar: "bar"}
    console.log(foo);//foo
    console.log(bar);//bar
}
/**
 * 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
 */
{
    let {bar, foo, aaa} = {foo: "foo", bar: "bar", aaa1: "aaa"}
    console.log(foo);//foo
    console.log(bar);//bar
    console.log(aaa);//undefined
}

//若对象名与属性名不一致，则需要用下面的写法
{
    let {foo:aaa} = {foo:"aaa", bar: "bbb"}
    console.log('aaa: ' + aaa);

    let obj = { first: 'hello', last: 'world' };
    let { first: f, last: l } = obj;
    console.log('f: ' + f); // 'hello'
    console.log('l: ' + l); // 'world'

    //对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者
    let { foo11: baz1 } = { foo11: "aaa", bar: "bbb" };
    console.log(baz1) // "aaa"
    //console.log(foo11) // error: foo is not defined //foo11是匹配模式，baz1才是变量

    //解构赋值也适用于嵌套模式
    let obj1 = {
        p: [
            'Hello',
            { y: 'World'}
        ]
    };

    let { p: [x, { y }] } = obj1; //p是模式
    console.log(x); // "Hello"
    console.log(y); // "World"

    //写成下面的模式，就能给p赋值了
    let {p, p:[x1, { y1 }]} = {p:['hello', {y1: 'world'}]};
    console.log(p);
    console.log(x1);
    console.log(y1);


    const node = {
        loc: {
            start: {
                line: 1,
                column: 5
            }
        }
    };

    let { loc, loc: { start }, loc: { start: { line }} } = node;
    //只有line是变量，loc和start都是模式，不是变量。
    console.log(loc);
    console.log(start);
    console.log(line);
    console.log('\n');

    /**
     * 对象的解构也可以指定默认值
     */
    {
        let {x = 3} = {};
        console.log(x); // 3

        var {x11, y11= 5} = {x11: 1};
        console.log(x11); // 1
        console.log(y11); // 5

        var {x2: y2 = 3} = {};
        console.log(y2); // 3

        var {x3: y3 = 3} = {x: 5};
        console.log(y3); // 5

        var { message: msg = 'Something went wrong' } = {};
        console.log(msg); // "Something went wrong"

        /**
         * 默认值生效的条件是，对象的属性值严格等于undefined
         * @type {number}
         */
        var {a = 3} = {a: undefined};
        console.log(a); // 3

        var {b = 3} = {b: null};
        console.log(b); // null
        /**
         * 解构失败，变量的值为undefined
         */
        let {foo} = {bar: 'bar'}
        console.log(foo); //undefined

        // let {foo: {bar}} = {baz: 'baz'};
        // console.log(bar) //报错， foo为undefined, 取子属性bar会报错
    }
 console.log('\n');
    /**
     * j将已经声明对象用于解构赋值
     */
    {
        /**
         * 错误写法
         */
        {
            let x;
            // {x} = {x:1}; //语法错误，JavaScript引擎会将{x}理解成一个代码块，从而引发语法错误
        }
        /**
         * 正确写法
         */
        {
            let x;
            ({x} = {x:1});
            console.log(x);
        }

        //允许{} 里面不放任何变量，语法是合法的，但没任何意义
        ({} = [true, false]);
        ({} = 'abc');
        ({} = []);

        /**
         * 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
         * @type {number[]}
         */
        let arr = [1, 2, 3];
        let {0 : first, [arr.length - 1] : last} = arr; //let {0: firset, [2] : last} //[2]，方括号这种写法，属于“属性名表达式”
        console.log(first) // 1 // arr[0] == 1
        console.log(last) // 3  // 取arr[2]
    }
}
/**
 * 3.字符串解构赋值
 */
{
    //字符串被转换成了一个类似数组的对象
    const [a, b, c, d, e] = 'hello';
    console.log(a,b,c,d,e);

    //类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值
    let {length : len} = 'hello';
    console.log(len); // 5
}
/**
 * 4.数值和布尔值的解构赋值
 *   如果等号右边是数值和布尔值，则会先转为对象
 */
{
    let {toString: s} = 123;
    console.log(s === Number.prototype.toString) // true
    s = 'test string'
    console.log(s);

    let {valueOf: v} = 123;
    v = 123;
    console.log(v.valueOf());

    let {toString: b} = true;
    console.log(b === Boolean.prototype.toString);

    //解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错
    //let { prop: x } = undefined; // TypeError
    //let { prop: y } = null; // TypeError
}
/**
 * 5.函数参数的解构赋值
 */
{
    function add([x, y]){
        return x + y;
    }
    console.log(add([1, 2]));

    //函数参数的解构也可以使用默认值
    function move({x = 0, y = 0} = {}) {
        return [x, y];
    }

    console.log(move({x: 3, y: 8})); // [3, 8]
    move({x: 3}); // [3, 0]
    move({}); // [0, 0]
    move(); // [0, 0]

    {
        function move({x, y} = { x: 0, y: 0 }) {
            return [x, y];
        }

        move({x: 3, y: 8}); // [3, 8]
        console.log(move({x: 3})); // [3, undefined]
        move({}); // [undefined, undefined]
        move(); // [0, 0]
    }
}
/**
 * 圆括号问题。
 * 可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。
 */
{
    //错误情况
    //let [(a)] = [1]; //报错
    //let {x: (c)} = {};
    //function f([(z)]) { return z; }
    //({ p: a }) = { p: 42 };

    //正确情况, 它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分
    [(b)] = [3]; // 正确
    ({ p: (d) } = {});
    console.log(b,d);
}