# JS

## 数组

### 复制数组的方法

#### 浅拷贝

```js
const arr = [1,2,3];
let copyArr = [];
```

##### slice

```js
copyArr = arr.slice();
```

##### concat

```js
copyArr = arr.concat();
```

##### push

```js
Array.prototype.push.apply(copyArr,arr);
```

##### map

```js
copyArr = arr.map(v => v);
```

##### from

```js
array = Array.from(arr);
```

>以上方法均为浅拷贝，只能对每一项是原始类型的数据的数组进行拷贝，如果其中某些项包含引用类型，如数组（js里的二维数组）和对象等，则拷贝后的也仅仅是引用原项

#### 深拷贝

```js
const objArr = [{id:1},{id:2},{id:3}];
let copyArr = [];
```

##### JSON

```js
copyArr = JSON.parse(JSON.stringify(arr));
```

该方法存在一个问题，如果数组中某项中的属性值为undefined，那么转换后则会变为null

### 二维数组的转换

```js
const twoDArr = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];
let newTwoDArr = [];
for(let i=0;i<4;i++){
     let arr = [];
     for(let j=0;j<twoDArr.length;j++){
          arr.push(twoDArr[j][i]);
     }
     newTwoDArr.push(arr);
     arr = [];
}
console.log(newTwoDArr);                 //[1, 5, 9]
                                         //[2, 6, 10]
                                         //[3, 7, 11]
                                         //[4, 8, 12]
```

### 迭代对数组排序

```js
function merge(left, right) {
    let result = [];

    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left).concat(right);
}
let d = [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 111, 400, 500, 600, 750, 800, 700, 600, 400];

function mergeSort(items) {
    if (items.length == 1) {
        return items
    }

    let work = [];
    for (let i = 0, len = items.length; i < len; i++) {
        work.push([items[i]]);
    }
    work.push([]); //如果数组长度为奇数

    for (let lim = len; lim > 1; lim = (lim + 1) / 2) {
        for (let j = 0, k = 0; k < lim; k += 2, j++) {
            work[j] = merge(work[k], work[k + 1]);
        }
        work[j] = []; //如果数组长度为奇数
    }

    return work[0]
}
mergeSort(d)
```

### Memoization法减少递归计算次数

阶乘递归函数

```js
function factorial(n) {
    if (n == 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
```

针对该递归函数用`Memoization`法优化,在这里会用函数本身的一个`cache`来储存计算情况，达到减少计算次数的目的

```js
function memfactorial(n) {
    if (!memfactorial.cache) {
        memfactorial.cache = {
            '0': 0,
            '1': 1
        }
    }
    if (!memfactorial.cache.hasOwnProperty(n)) {
        memfactorial.cache[n] = n * memfactorial(n - 1);
    }
    return memfactorial.cache[n]
}
```

## Promise

实现一个简易版本Promise

```js
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';


function MyPromise(fn) {
    const that = this;
    that.state = PENDING;
    that.value = null;
    that.resolvedCallbacks = [];
    that.rejectedCallbacks = [];

    function resolve(value) {
        if (that.state === PENDING) {
            that.state = RESOLVED;
            that.value = value;
            that.resolvedCallbacks.map(cb => cb(that.value));
        }
    }

    function reject(value) {
        if (that.state = PENDING) {
            that.state = REJECTED;
            that.value = value;
            that.rejectedCallbacks.map(cb => cb(that.value));
        }
    }

    try {
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}
MyPromise.prototype.then = function(resolve, reject) {
    const that = this;
    resolve = typeof resolve === 'function' ? resolve : v => v;
    reject = typeof reject === 'function' ? reject : v => { throw v };

    if (that.state === PENDING) {
        that.resolvedCallbacks.push(resolve);
        that.rejectedCallbacks.push(reject);
    }
    if (that.state === RESOLVED) {
        resolve(that.value);
    }
    if (that.state === REJECTED) {
        reject(that.value);
    }
}

let newPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(111)
    }, 1000);
})

newPromise.then((v) => {
    console.log(v)
}, (v) => {
    console.log(v)
})
```

## IE8兼容

### bind函数

```js
if(!Function.prototype.bind){
    Function.prototype.bind = function(){
        if(typeof this !== 'function'){
　　　　　　throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
　　　　}
        var _this = this;
        var obj = arguments[0];
        var ags = Array.prototype.slice.call(arguments,1);
        return function(){
            _this.apply(obj,ags);
        };
    };
}
```

#### addEventListener函数

```js
function addEventListener(ele,event,fn){
    if(ele.addEventListener){
        ele.addEventListener(event,fn,false);
    }else{
        ele.attachEvent('on'+event,fn.bind(ele));
    }
}
```

#### removeEventListener函数

```js
function removeEventListener(ele,event,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(event,fn,false);
    }else{
        ele.detachEvent('on'+event,fn.bind(ele));
    }
}
```

## DVA状态码叙述

```js
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};
```

## updating...
