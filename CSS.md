# CSS

> 盲点，你发现了华生

css 令人记不住的&非常规的操作

- [文本](#文本)

## 文本

- [文本换行](#文本换行)
- [文字省略号](#文字省略号)
- [文字两端对齐](#文字两端对齐)
- [取消 textarea 右下角可拖动手柄](#取消textarea右下角可拖动手柄)
- [取消 chrome form 表单的聚焦边框](#取消chromeform表单的聚焦边框)
- [取消 a 链接的黄色边框](#取消a链接的黄色边框)
- [取消 input,button 焦点或点击时蓝色边框](#取消input,button焦点或点击时蓝色边框)
- [高度随宽度自适应](#高度随宽度自适应)
- [半圆](#半圆)
- [css相关总结网址](#css相关总结网址)

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

#### 多行文本超出父级 div 时出现省略号（/_! autoprefixer: off _/ 该属性是为了避免在 react 或者 vue 中-webkit-box-orient: vertical 失效）

```css
 {
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 文字两端对齐

```css
text-align: justify;
text-justify: inter-ideogra;
```

### 取消 textarea 右下角可拖动手柄

```css
resize: none;
```

### 取消 chromeform 表单的聚焦边框

```css
input,
button,
select,
textarea {
  outline: none;
}
textarea {
  resize: none;
}
```

### 取消 a 链接的黄色边框

```css
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```

### 取消 input,button 焦点或点击时蓝色边框

```css
input {
  outline: none;
}
```

### 高度随宽度自适应

> 主要是根据 padding 取百分比时，是根据父级宽度来的，可以在某些盒子或者图片需要宽高同比例时使用
> 当如果父级有 flex 属性，好像不起作用，需要测试一下

```html
<div class="is-div">
  <img src="..." alt="" />
</div>
```

```css
.is-div{
  padding:30% 0 0;
  position:relative;
}
.is-div img{
  position:absolute;
  width;100%;
  height:100%;
  left:0;
  top:0;
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

- rem 适配

  - [rem 自适应方案](https://github.com/imweb/mobile/issues/3)
  - [html5 移动端页面分辨率设置及相应字体大小设置的靠谱使用方式](http://www.cnblogs.com/willian/p/3573353.html)
  - [移动端高清、多屏适配方案](http://www.html-js.com/article/Mobile-terminal-H5-mobile-terminal-HD-multi-screen-adaptation-scheme%203041)
  - [通过 rem 布局+media-query:aspect-ratio 实现移动端全机型适配覆盖](http://xiaoyuze88.github.io/blog/2015/05/12/%E9%80%9A%E8%BF%87rem%E5%B8%83%E5%B1%80+media-query%E7%9A%84aspect-ratio%E5%AE%9E%E7%8E%B0%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%85%A8%E6%9C%BA%E5%9E%8B%E9%80%82%E9%85%8D%E8%A6%86%E7%9B%96/)
  - [web app 变革之 rem](http://isux.tencent.com/web-app-rem.html)
  - [手机淘宝的 flexible 设计与实现](http://www.html-js.com/article/2402)
  - [移动端自适应方案](https://github.com/amfe/lib-flexible)
  - [【原创】移动端高清、多屏适配方案](http://www.html-js.com/article/3041)
  - [6 个 html5 页面适配 iphone6 的技巧](http://qietuwang.baijia.baidu.com/article/73861)
  - [关于移动端 rem 布局的一些总结](http://segmentfault.com/a/1190000003690140)
  - [从网易与淘宝的 font-size 思考前端设计稿与工作流](http://www.cnblogs.com/lyzg/p/4877277.html)
  - [移动端自适应方案](http://f2e.souche.com/blog/yi-dong-duan-zi-gua-ying-fang-an/)
  - [MobileWeb 适配总结](http://www.w3ctech.com/topic/979)
  - [移动端 web app 自适应布局探索与总结](http://www.html-js.com/article/JavaScript-learning-notes%203234)

### css相关总结网址

- [css 常用效果总结](http://www.haorooms.com/post/css_common)
- [css 的不常用效果总结](http://www.haorooms.com/post/css_notuse_common)
- [css 开发技巧](http://www.haorooms.com/post/css_skill)
- [重温 css 的选择器](http://www.haorooms.com/post/css_selectelement)
- [css 的变量和继承](http://www.haorooms.com/post/css_inherit_bl)
- [css3 的混合模式](http://www.haorooms.com/post/css3_mixblendmode)
- [css 中伪元素 before 或 after 中 content 的特殊用法 attr](http://www.haorooms.com/post/content_attr)
