# JS

常用函数和代码 & 收集的黑科技

#### 返回指定范围的随机数(m-n 之间)的公式

```js
Math.random() * (n - m) + m;
```

#### 快速去掉小数点

```js
1.1 | 0  //1
2.2 | 0  //2
```

#### 奇偶

```js
//奇数-true 偶数-false
!!(23 & 1) //true
!!(22 & 1) //false
!!(23 % 2) //true
```

#### 保留小数点

```js
const decimalPoint = (number, digits = 2) => {
  let numStr = number + "";
  return (
    numStr
      .trim()
      .slice(
        0,
        numStr.indexOf(".") === -1
          ? numStr.length
          : numStr.indexOf(".") + digits + 1 
     ) - 1 + 1
  );
};
```

#### 防止滚动穿透

准备的css

```css
.modal_open {
  position: fixed;
  height: 100%;
}
```

```js
let ModalHelper = (function(bodyClass) {
    let scrollTop;
    return {
        afterOpen: function() {
            scrollTop = document.scrollingElement.scrollTop  ||
                        document.documentElement.scrollTop || 
                        document.body.scrollTop;
            document.body.classList.add(bodyClass);
            document.body.style.top = -scrollTop + 'px';
        },
        beforeClose: function() {
            document.body.classList.remove(bodyClass);
            document.scrollingElement.scrollTop = document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
        }
    };
})('modal_open');

// method
modalSwitch: function(){
    let self = this;
    if( self.switchFlag === 'close' ){
        ModalHelper.afterOpen();
        self.switchFlag = 'open';
    }else{
        ModalHelper.beforeClose();
        self.switchFlag = 'close';
    }
}
```


#### 判断 ip 输入正确与否

```js
const IP = (ip = "0.0.0.0") => {
  ip = ip + "";
  const re = /^\d+\.\d+\.\d+\.\d+$/;
  const ipArr = ip.split(/\./);
  if (re.test(ip)) {
    return ipArr.reduce((bool, key) => {
      if (key < 256) {
        bool = true;
      } else {
        bool = false;
        console.log("IP地址范围有误:" + key);
      }
    }, false);
  } else {
    console.log("IP地址格式有误！");
  }
};
```

#### 防抖

```js
/**
 * @desc 函数防抖：任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行。
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
//ps:当某些函数具有返回值时，在不使用全局变量的情况下该怎么拿到这个返回值呢？？？如果有这种需求，只能包裹函数，其中一个函数用以返回值，另一个用以使用该值？？？
function debounce(fn,wait,immediate){
  let timer;
  let result;
  let debounced = function(){
    let context = this;
    let args = arguments;
    if(timer) clearTimeout(timer);
    if(immediate){
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if(callNow) result = fn.apply(context,args);
    }else{
      timer = setTimeout(()=>{
        result = fn.apply(context,args);
        timer = null
      },wait);
    }
  }
  debounced.cancel = function(){
    clearTimeout(timer);
    timer = null;
  }
  return debounced
}
//应用：1.search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
//     2.window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
```

#### 节流

```js
/**
 * @desc 函数节流：指定时间间隔内只会执行一次任务。
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
function throttle(func, wait, type) {
  if (type === 1) {
    let previous = 0;
    return function() {
      let context = this;
      let args = arguments;
      let now = Date.now();
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    };
  } else if (type === 2) {
    let timeout;
    return function() {
      let context = this;
      let args = arguments;
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    };
  }
}
// 区别： 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。
//应用：1.懒加载要监听计算滚动条的位置，使用节流按一定时间的频率获取。
//     2.用户点击提交按钮，假设我们知道接口大致的返回时间的情况下，我们使用节流，只允许一定时间内点击一次。
//tips：时间戳版本有bug，input框中高频输入的时候，会无法获取完框中的内容，使用计时器版便不会有此情况
```

#### 复制数组-浅拷贝

```js
const arr = [1, 2, 3];
let copyArr = [];

copyArr = arr.slice();
copyArr = arr.concat();
Array.prototype.push.apply(copyArr, arr);
copyArr = arr.map(v => v);
array = Array.from(arr);
//以上方法均为浅拷贝，只能对每一项是原始类型的数据的数组进行拷贝，如果其中某些项包含引用类型，如数组（js 里的二维数组）和对象等，则拷贝后的也仅仅是引用原项
```

#### 复制数组-深拷贝

```js
const objArr = [{ id: 1 }, { id: 2 }, { id: 3 }];
let copyArr = [];

copyArr = JSON.parse(JSON.stringify(arr));
//该方法存在一个问题，如果数组中某项中的属性值为 undefined，那么转换后则会变为 null
```

#### 二维数组的转换

```js
const twoDArr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
let newTwoDArr = []
for (let i = 0 i < 4 i++) {
  let arr = []
  for (let j = 0 j < twoDArr.length j++) {
    arr.push(twoDArr[j][i])
  }
  newTwoDArr.push(arr)
  arr = []
}
console.log(newTwoDArr) //[1, 5, 9]
//[2, 6, 10]
//[3, 7, 11]
//[4, 8, 12]
```

#### 迭代对数组排序

```js
function merge(left, right) {
  let result = []

  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  return result.concat(left).concat(right)
}
let d = [
  300,
  280,
  250,
  260,
  270,
  300,
  550,
  500,
  400,
  390,
  380,
  390,
  111,
  400,
  500,
  600,
  750,
  800,
  700,
  600,
  400
]

function mergeSort(items) {
  if (items.length == 1) {
    return items
  }

  let work = []
  for (let i = 0, len = items.length i < len i++) {
    work.push([items[i]])
  }
  work.push([]) //如果数组长度为奇数

  for (let lim = len lim > 1 lim = (lim + 1) / 2) {
    for (let j = 0, k = 0 k < lim k += 2, j++) {
      work[j] = merge(work[k], work[k + 1])
    }
    work[j] = [] //如果数组长度为奇数
  }

  return work[0]
}
mergeSort(d)
```

#### 阶乘递归函数

```js
function factorial(n) {
  if (n == 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
```

#### 针对该递归函数用`Memoization`法优化,在这里会用函数本身的一个`cache`来储存计算情况，达到减少计算次数的目的

```js
function memfactorial(n) {
  if (!memfactorial.cache) {
    memfactorial.cache = {
      "0": 0,
      "1": 1
    };
  }
  if (!memfactorial.cache.hasOwnProperty(n)) {
    memfactorial.cache[n] = n * memfactorial(n - 1);
  }
  return memfactorial.cache[n];
}
```

#### 实现一个简易版本 Promise

```js
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

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
    if ((that.state = PENDING)) {
      that.state = REJECTED;
      that.value = value;
      that.rejectedCallbacks.map(cb => cb(that.value));
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
MyPromise.prototype.then = function(onResolve, onReject) {
  const that = this;
  onResolve = typeof onResolve === "function" ? onResolve : v => v;
  onReject =
    typeof onReject === "function"
      ? onReject
      : v => {
          throw v;
        };

  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onResolve);
    that.rejectedCallbacks.push(onReject);
  }
  if (that.state === RESOLVED) {
    onResolve(that.value);
  }
  if (that.state === REJECTED) {
    onReject(that.value);
  }
};

let newPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(111);
  }, 1000);
});

newPromise.then(
  v => {
    console.log(v);
  },
  v => {
    console.log(v);
  }
);
```

#### bind 函数

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function() {
    if (typeof this !== "function") {
      throw new TypeError(
        "Function.prototype.bind - what is trying to be bound is not callable"
      );
    }
    var _this = this;
    var obj = arguments[0];
    var ags = Array.prototype.slice.call(arguments, 1);
    return function() {
      _this.apply(obj, ags);
    };
  };
}
```

#### addEventListener 函数

```js
function addEventListener(ele, event, fn) {
  if (ele.addEventListener) {
    ele.addEventListener(event, fn, false);
  } else {
    ele.attachEvent("on" + event, fn.bind(ele));
  }
}
```

#### removeEventListener 函数

```js
function removeEventListener(ele, event, fn) {
  if (ele.removeEventListener) {
    ele.removeEventListener(event, fn, false);
  } else {
    ele.detachEvent("on" + event, fn.bind(ele));
  }
}
```

#### updating...
