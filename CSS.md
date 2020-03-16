# CSS

css:总是令人猜不透&记不住的

## 常用笔记

### 文本换行

```css
/*强制不换行*/
white-space: nowrap;
/*自动换行*/
word-wrap: break-word;
word-break: normal;
/*强制英文单词断行*/
word-break: break-all;
```

### 文字省略号

#### 单行文本在超出父级 div 时出现省略号

```css
 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

#### 多行文本超出父级 div 时出现省略号（`/_! autoprefixer: off _/` 该属性是为了避免在 react 或者 vue 中`-webkit-box-orient: vertical` 失效）

```css
 {
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  /* 👇显示几行之后开始出现省略号 */
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 取消 chromeform 表单的聚焦边框

```css
input,
button,
select,
textarea {
  outline: none;
}
/* textarea {
  resize: none;
} */
```

### 高度随宽度自适应

> 主要是根据 padding 取百分比时，是根据父级宽度来的，而自身的 height 为 0，所以盒子的整体高度有 padding-top 决定了，可以在某些盒子或者图片需要宽高同比例时使用

```html
<div class="parent">
  <div class="child-box">
    <div class="child">
      用child-box来包裹取高度，如果需要，可以加一个width来自己确定宽高比例
    </div>
  </div>
</div>
```

```css
.parent {
  width: 500px;
  height: 500px;
}
.child-box {
  width: 30%;
  padding: 30% 0 0;
  position: relative;
}
.child {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
```

### 清除浮动

```css
// 清除浮动
.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  width: 0;
  height: 0;
  clear: both;
  font-size: 0;
  line-height: 0;
  overflow: hidden;
}
.clearfix {
  zoom: 1;
}
```

### 半圆

```css
.div {
  width: 0;
  border: 200px solid red;
  border-radius: 100%;
  border-color: transparent transparent red red;
  transform: rotate(45deg);
}
```

或者

```css
.div {
  width: 200px;
  height: 400px;
  background: red;
  border-top-left-radius: 200px;
  border-bottom-left-radius: 200px;
}
```

推荐阅读：

+ [1](https://segmentfault.com/a/1190000022019129#item-42)
