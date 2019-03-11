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
