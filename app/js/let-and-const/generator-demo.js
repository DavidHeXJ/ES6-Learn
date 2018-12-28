/**
 * function 和函数名中间多一个*， 表示这个函数是Generator函数
 */

function * generatorFun() {
    var result1 = yield 'hello';
    console.log('result1: ' + result1);
    var result2 = yield 'world';
    console.log('result2: ' + result2);
    console.log(result1, result2);
    return result1 + result2;
}
//调用Generator函数时，并不会执行该函数，而是会返回一个遍历器，遍历器包含一个next()方法
//每次执行next方法，Generator函数才会执行，直至遇到yield语句，执行该yield语句并在该语句暂停
var gen = generatorFun();
console.log('first execute:');
console.log(gen.next(1)); // { value: 'hello', done: false } // generator函数会返回一个对象，{value:  , done:   }, value是当前yield语句的值，done表示函数体是否执行完成
console.log('second execute:');
console.log(gen.next(2));
console.log('third execute:');
console.log(gen.next(3));

/**
 * next方法接受一个参数，该参数作为yield语句的返回值
 */
