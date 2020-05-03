# javascript

常用函数和代码 & 收集的黑科技

- [常用函数和代码](#常用函数和代码)
- [黑科技](#黑科技)

## 常用函数和代码

- [截取到小数点 n 位](#截取到小数点n位)
- [滚动穿透](#滚动穿透)
- [判断 IP](#判断IP)
- [浅拷贝](#浅拷贝)
- [深拷贝](#深拷贝)
- [阶乘递归函数](#阶乘递归函数)
- [二维数组的转换](#二维数组的转换)
- [Promise(简)](<#Promise(简)>)
- [IE8](#IE8)
- [邮箱验证](#邮箱验证)
- [手机号验证](#手机号验证)

### 截取到小数点 n 位

```js
/**
 * @desc 默认直接截取小数点后的位数
 * @param { number } number 需要转换的数字
 * @param { number = 2 } digits 小数点位数
 * @return { number } 截取之后的数
 */
const decimalPoint = (number, digits = 2) => {
  const pow = Math.pow(10, digits);
  return parseInt(parseFloat(number) * pow) / pow;
};
```

### 滚动穿透

```css
.modal_open {
  position: fixed;
  height: 100%;
}
```

```js
const ModalHelper = (function (bodyClass) {
  let scrollTop;
  /**
   * @desc modal状态切换前后的scrollTop值
   * @param { Function } afterOpen modal显示之后记录当前scrollTop
   * @param { Function } beforeClose modal隐藏之前赋给scrollTop原来的值
   */
  return {
    afterOpen: function () {
      scrollTop =
        document.scrollingElement.scrollTop ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      document.body.classList.add(bodyClass);
      document.body.style.top = -scrollTop + "px";
    },
    beforeClose: function () {
      document.body.classList.remove(bodyClass);
      document.scrollingElement.scrollTop = document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
    },
  };
})("modal_open");

/**
 * @desc modal状态变化时触发
 * @event
 */
modalSwitch.addEventListener = () => {
  const self = this;
  if (self.switchFlag === "close") {
    ModalHelper.afterOpen();
    self.switchFlag = "open";
  } else {
    ModalHelper.beforeClose();
    self.switchFlag = "close";
  }
};
```

### 判断 IP

```js
/**
 * @desc 判断IP输入格式是否正确
 * @param { string } ip ip地址
 */
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

### 浅拷贝

```js
const arr = [1, 2, 3];
let copyArr = [];

copyArr = arr.slice();
copyArr = arr.concat();
Array.prototype.push.apply(copyArr, arr);
copyArr = arr.map((v) => v);
array = Array.from(arr);
//以上方法均为浅拷贝，只能对每一项是原始类型的数据的数组进行拷贝，如果其中某些项包含引用类型，如数组（js 里的二维数组）和对象等，则拷贝后的也仅仅是引用原项
```

### 深拷贝

```js
const objArr = [{ id: 1 }, { id: 2 }, { id: 3 }];
let copyArr = [];

copyArr = JSON.parse(JSON.stringify(arr));
//该方法存在一个问题，如果数组中某项中的属性值为 undefined，那么转换后则会变为 null
```

### 阶乘递归函数

针对该递归函数用`Memoization`法优化,在这里会用函数本身的一个`cache`来储存计算情况，达到减少计算次数的目的

```js
/**
 * @desc 递归的研究
 */
const factorial = (n) => {
  if (n == 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};
function memfactorial(n) {
  if (!memfactorial.cache) {
    memfactorial.cache = {
      "0": 0,
      "1": 1,
    };
  }
  if (!memfactorial.cache.hasOwnProperty(n)) {
    memfactorial.cache[n] = n * memfactorial(n - 1);
  }
  return memfactorial.cache[n];
}
```

### 二维数组的转换

重写

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

### Promise(简)

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
      that.resolvedCallbacks.map((cb) => cb(that.value));
    }
  }

  function reject(value) {
    if ((that.state = PENDING)) {
      that.state = REJECTED;
      that.value = value;
      that.rejectedCallbacks.map((cb) => cb(that.value));
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
MyPromise.prototype.then = function (onResolve, onReject) {
  const that = this;
  onResolve = typeof onResolve === "function" ? onResolve : (v) => v;
  onReject =
    typeof onReject === "function"
      ? onReject
      : (v) => {
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
  (v) => {
    console.log(v);
  },
  (v) => {
    console.log(v);
  }
);
```

### IE8

```js
/**
 * @desc bind函数，不存在便创建一个
 */
const bind = () => {
  if (!Function.prototype.bind) {
    Function.prototype.bind = function () {
      if (typeof this !== "function") {
        throw new TypeError(
          "Function.prototype.bind - what is trying to be bound is not callable"
        );
      }
      var _this = this;
      var obj = arguments[0];
      var ags = Array.prototype.slice.call(arguments, 1);
      return function () {
        _this.apply(obj, ags);
      };
    };
  }
};

/**
 * @desc addEventListener函数判断
 */
const addEventListener = (ele, event, fn) => {
  if (ele.addEventListener) {
    ele.addEventListener(event, fn, false);
  } else {
    ele.attachEvent("on" + event, fn.bind(ele));
  }
};

/**
 * @desc removeEventListener函数，不存在便创建一个
 */
const removeEventListener = (ele, event, fn) => {
  if (ele.removeEventListener) {
    ele.removeEventListener(event, fn, false);
  } else {
    ele.detachEvent("on" + event, fn.bind(ele));
  }
};
```

### 邮箱验证

```js
const validateEmail = (email) => {
  const reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
  return reg.test(email);
};
```

### 手机号验证

```js
const validatePhone = (phone) => {
  const reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
  return reg.test(phone);
};
```

## 黑科技

- [随机数(m-n)](<#随机数(m-n)>)
- [快速去掉小数点](#哭诉去掉小数点)
- [快速判断奇偶](#快速判断奇偶)

### 随机数(m-n)

```js
Math.random() * (n - m) + m;
```

### 快速去掉小数点

```js
1.1 | 0; //1
2.2 | 0; //2
```

### 快速判断奇偶

```js
//奇数-true 偶数-false
!!(23 & 1); //true
!!(22 & 1); //false
!!(23 % 2); //true
```
