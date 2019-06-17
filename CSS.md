# CSS

#### 文字换行

```css
/*强制不换行*/
white-space: nowrap;
/*自动换行*/
word-wrap: break-word;
word-break: normal;
/*强制英文单词断行*/
word-break: break-all;
```

#### 两端对齐

```css
text-align: justify;
text-justify: inter-ideogra;
```

#### [去掉 Webkit(chrome)浏览器中 input(文本框)或 textarea 的黄色焦点框](http://www.cnblogs.com/niao/archive/2012/09/07/2674511.html)

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

#### [去掉 chrome 记住密码后自动填充表单的黄色背景](http://www.tuicool.com/articles/EZ777n)

- ie6: position:fixed

```css
.fixed-top {
  position: fixed;
  bottom: auto;
  top: 0;
}
* html .fixed-top {
  position: absolute;
  bottom: auto;
  top: expression(eval(document.documentElement.scrollTop));
}
* html {
  background-image: url(about:blank);
  background-attachment: fixed;
}
```

#### 取消 textarea 右下角可拖动手柄

```css
resize: none;
```

#### 取消 chrome form 表单的聚焦边框

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

#### 取消 a 链接的黄色边框

```css
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```

#### 取消 input,button 焦点或点击时蓝色边框

```css
input {
  outline: none;
}
```

#### 实现一个半圆

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

#### 仿拼多多小程序指示点动画（未添加 js）

```html
<div class="indicator">
  <div class="indicator-move"></div>
  <div class="indicator-gary"></div>
  <div class="indicator-gary"></div>
</div>
```

```css
.indicator {
  border-radius: 50px;
  width: 20px;
  height: 4px;
  position: relative;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.indicator-move {
  position: absolute;
  background-color: #e41749;
  border-radius: 50px;
  width: 100%;
  height: 100%;
  animation: indicatorMove 2s alternate infinite ease-in-out;
  /* animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1); */
}
.indicator-gary {
  background-color: darkgray;
  width: 35%;
  height: 100%;
  border-radius: 50px;
}
@keyframes indicatorMove {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(50%);
  }
}

//方法二 这两种方法用于微信小程序实体机浏览时 都不OK 我也是醉了 🙂
@keyframes indicatorMove {
  0% {
    transform-origin: 0 0;
    transform: scaleX(0.4);
  }
  49% {
    transform-origin: 0 0;
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1);
  }
  51% {
    transform-origin: 100% 0;
    transform: scaleX(1);
  }
  100% {
    transform-origin: 100% 0;
    transform: scaleX(0.4);
  }
}
```

#### 小优惠券

```html
<div class="coupon">
  <span>满2000减10</span>
  <div class="coupon-circle coupon-left-circle">
    <div class="coupon-cir coupon-left-cir"></div>
  </div>
  <div class="coupon-circle coupon-right-circle">
    <div class="coupon-cir coupon-right-cir"></div>
  </div>
</div>
```

```css
.coupon {
  height: 31px;
  border: 1px solid #ff6b00;
  border-radius: 4px;
  font-size: 22px;
  color: #ff6b00;
  box-sizing: border-box;
  padding: 0 10px;
  position: relative;
  display: flex;
  align-items: center;
  float: left;
}
.coupon-circle {
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  background: #fff;
}
.coupon-cir {
  border-radius: 200px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid #ff6b00;
  border-top-color: #fff;
  border-left-color: #fff;
}
.coupon-left-circle {
  left: -1px;
  transform: translate(-50%, -50%);
}
.coupon-right-circle {
  right: -1px;
  transform: translate(50%, -50%);
}
.coupon-left-cir {
  transform: rotate(-45deg);
}
.coupon-right-cir {
  transform: rotate(135deg);
}
```

#### 大优惠券

```html
<div class="collect-coupon">
  <div class="collect-coupon-box">
    <div class="collect-coupon-left">
      <div class="collect-coupon-content">
        <div class="collect-coupon-amount">
          ¥ <span class="collect-coupon-num">30</span>
        </div>
        <div class="collect-coupon-des">
          满1000-200
        </div>
      </div>
      <div class="collect-coupon-date">
        2019.04.01-2019.10.01
      </div>
    </div>
    <div class="collect-coupon-dashed"></div>
    <div class="collect-coupon-right">
      <div class="collect-coupon-state">
        立即领取
      </div>
    </div>
    <div class="collect-coupon-top">
      <div class="collect-coupon-top-circle"></div>
    </div>
    <div class="collect-coupon-bottom">
      <div class="collect-coupon-bottom-circle"></div>
    </div>
  </div>
</div>
```

```css
//其中padding-box需要重点理解
.collect-coupon {
  box-sizing: border-box;
  background: #fef2e6;
  border-radius: 8px;
  padding-left: 40px;
  color: #ff6b00;
  height: 160px;
  width: 690px;
  position: relative;
  font-size: 32px;
}
.collect-coupon-box {
  height: 100%;
  position: relative;
  display: flex;
}
.collect-coupon-left {
  width: 65%;
  height: 100%;
  box-sizing: border-box;
  padding: 44px 0 27px;
}
.collect-coupon-content {
  display: flex;
}
.collect-coupon-amount {
  padding-right: 20px;
}
.collect-coupon-num {
  font-size: 72px;
  line-height: 0;
}
.collect-coupon-des {
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 30px;
  position: relative;
}
.collect-coupon-des::after {
  content: "";
  position: absolute;
  height: 35px;
  width: 1px;
  background: #ff6b00;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.collect-coupon-date {
  font-size: 22px;
  margin-top: 17px;
}
.collect-coupon-dashed {
  width: 0;
  height: 100%;
  box-sizing: border-box;
  padding-right: 1px;
  background: linear-gradient(transparent, transparent) padding-box, repeating-linear-gradient(
      0deg,
      #ff6b00 0,
      #ff6b00 0.35em,
      #fef2e6 0,
      #fef2e6 0.65em
    );
}
.collect-coupon-right {
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.collect-coupon-top,
.collect-coupon-bottom {
  position: absolute;
  left: 65%;
  width: 25px;
  height: 25px;
}
.collect-coupon-top {
  top: 0;
  transform: translate(-50%, -50%);
}
.collect-coupon-bottom {
  bottom: 0;
  transform: translate(-50%, 50%);
}
.collect-coupon-top-circle,
.collect-coupon-bottom-circle {
  border-radius: 200px;
  background: #fff;
  border-right-color: #ff6b00;
  border-bottom-color: #ff6b00;
  width: 100%;
  height: 100%;
}
.collect-coupon-top-circle {
  transform: rotate(45deg);
}

.collect-coupon-bottom-circle {
  transform: rotate(-135deg);
}
```

#### 大优惠券-2

```html
<div class="coupon">
      <div class="coupon-box">
        <div class="coupon-left">
          <div class="coupon-content">
            <div class="coupon-amount">
              ¥ <span class="coupon-num">20</span>
            </div>
            <div class="coupon-amount-text">
              满1000可用
            </div>
          </div>
        </div>
        <div class="coupon-dashed"></div>
        <div class="coupon-right">
          <div class="coupon-info-button">
            <div class="coupon-info">
              <span class="coupon-text">满1000减30</span>
              <span class="coupon-date">2019.04.01-2019.10.01</span>
            </div>
            <div class="coupon-button-box">
              <div class="coupon-button">立即使用</div>
              <!-- 此处在已使用时显示图片 -->
              <!-- <div class="coupon-state-receive"></div> -->
            </div>
          </div>
          <!-- 没有使用说明时以下内容需要隐藏 -->
          <!-- 开始 -->
          <div class="coupon-right-dashed"></div>
          <div class="coupon-desc">
            <span>使用说明</span>
            <img src="jiantou.png" alt="展开箭头" class="coupon-jianotu">
          </div>
          <!-- 结束 -->
        </div>
        <div class="coupon-top">
          <div class="coupon-top-circle"></div>
        </div>
        <div class="coupon-bottom">
          <div class="coupon-bottom-circle coupon-expand-show"></div>
        </div>
      </div>
      <div class="expand coupon-expand-show">
          <span>同一用户限领1张，自营店铺及其他特例商品不可使用</span>
        </div>
    </div>
```

```css
.coupon {
  box-sizing: border-box;
  color: #ff6b00;
  width: 690px;
  font-size: 32px;
  font-family: PingFang-SC-Medium;
}
.coupon-box {
  height: 210px;
  position: relative;
  display: flex;
  border: 1px solid #ffc9c2;
  background: #fffafa;
  border-radius: 8px;
  z-index: 1;
}
.coupon-left {
  width: 230px;
  height: 100%;
  background-color: #fff2ee;
  border-radius: 8px;
}
.coupon-content {
  display: flex;
  flex-wrap: wrap;
  color: #fd614c;
  padding: 35px;
}
.coupon-amount {
  width: 100%;
  text-align: center;
}
.coupon-num {
  font-family: PingFangSC-Semibold;
  font-size: 72px;
  text-align: center;
  line-height: 100px;
}
.coupon-amount-text {
  width: 100%;
  font-size: 30px;
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.coupon-right {
  width: 35%;
  flex: 1;
}
.coupon-info-button {
  display: flex;
  box-sizing: border-box;
  padding: 32px 21px 30px 23px;
  align-items: flex-end;
}
.coupon-info {
  display: flex;
  color: #333333;
  flex-wrap: wrap;
}
.coupon-text {
  width: 100%;
  font-size: 30px;
  margin-bottom: 12px;
  line-height: 42px;
}
.coupon-date {
  width: 100%;
  font-size: 22px;
  line-height: 46px;
}
.coupon-button-box {
  display: flex;
  height: 100%;
}
.coupon-button {
  font-size: 26px;
  color: #ffffff;
  background-image: linear-gradient(-90deg, #fd4d37 5%, #fd7953 100%);
  border-radius: 23px;
  padding: 4px 15px;
  box-sizing: border-box;
  width: 134px;
  height: 46px;
  line-height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.coupon-state-receive {
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 92px;
  height: 80px;
}
.coupon-desc {
  font-size: 24px;
  color: #666666;
  padding: 8px 28px 9px 23px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.coupon-jianotu {
  height: 16px;
}
.expand {
  width: 100%;
  top: 100%;
  transform: translateY(-10px);
  left: -1px;
  border: 1px solid #ffc9c2;
  font-size: 24px;
  color: #999999;
  padding: 29px 20px 19px;
  box-sizing: border-box;
}
.coupon-dashed {
  width: 0;
  height: 100%;
  box-sizing: border-box;
  padding-right: 1px;
  background: linear-gradient(transparent, transparent) padding-box,
    repeating-linear-gradient(
      0deg,
      #ffc9c2 0,
      #ffc9c2 0.2em,
      #fef2e6 0,
      #fef2e6 0.33em
    );
}
.coupon-right-dashed {
  width: 100%;
  height: 0;
  box-sizing: border-box;
  padding-top: 1px;
  background: linear-gradient(transparent, transparent) padding-box,
    repeating-linear-gradient(
      90deg,
      #ffc9c2 0,
      #ffc9c2 0.2em,
      #fef2e6 0,
      #fef2e6 0.33em
    );
}
.coupon-top,
.coupon-bottom {
  position: absolute;
  left: 230px;
  width: 15px;
  height: 15px;
}
.coupon-top {
  top: -2px;
  transform: translate(-50%, -50%);
}
.coupon-bottom {
  bottom: 0px;
  transform: translate(-50%, 50%);
}
.coupon-top-circle,
.coupon-bottom-circle {
  border-radius: 200px;
  background: #fff;
  border-right-color: #ff6b00;
  border-bottom-color: #ff6b00;
  width: 100%;
  height: 100%;
}
.coupon-top-circle {
  transform: rotate(45deg);
  border: 1px solid transparent;
  border-bottom-color: #ffc9c2;
  border-right-color: #ffc9c2;
}

.coupon-bottom-circle {
  transform: rotate(-135deg);
  border: 1px solid transparent;
  border-bottom-color: #ffc9c2;
  border-right-color: #ffc9c2;
}
.coupon-expand-show {
  background-color: #fffafa;
  display: show;
}

```

#### 手机多终端适配 media query[web app iphone4 iphone5 iphone6 响应式布局 适配代码](http://club.zoomla.cn/PItem?id=12594)

```css
@media (device-height: 480px) and (-webkit-min-device-pixel-ratio: 2) {
  /* 兼容iphone4/4s */
  .class {
  }
}
@media (device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  /* 兼容iphone5 */
  .class {
  }
}
@media (device-height: 667px) and (-webkit-min-device-pixel-ratio: 2) {
  /* 兼容iphone6 */
  .class {
  }
}
@media (device-height: 736px) and (-webkit-min-device-pixel-ratio: 2) {
  /* 兼容iphone6 Plus */
  .class {
  }
}
```

#### [CSS 判断横屏竖屏](http://www.w3cways.com/1772.html)

```css
@media screen and (orientation: portrait) {
  /*竖屏 css*/
}
@media screen and (orientation: landscape) {
  /*横屏 css*/
}
```

```js
//判断手机横竖屏状态：
window.addEventListener(
  "onorientationchange" in window ? "orientationchange" : "resize",
  function() {
    if (window.orientation === 180 || window.orientation === 0) {
      alert("竖屏状态！");
    }
    if (window.orientation === 90 || window.orientation === -90) {
      alert("横屏状态！");
    }
  },
  false
);
//移动端的浏览器一般都支持window.orientation这个参数，通过这个参数可以判断出手机是处在横屏还是竖屏状态。
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

  公式

  ```javascript
  var PAGE_MAX_WIDTH = 1280,
    BASE_FONT_SIZE = 50;
  (function() {
    function n() {
      e.fontSize =
        Math.min(
          (window.innerWidth / PAGE_MAX_WIDTH) * BASE_FONT_SIZE,
          BASE_FONT_SIZE
        ) + "px";
    }
    var e = document.documentElement.style;
    window.addEventListener("load", n),
      window.addEventListener("resize", n),
      n();
  })();
  ```

#### css 相关总结网址

- [css 常用效果总结](http://www.haorooms.com/post/css_common)
- [css 的不常用效果总结](http://www.haorooms.com/post/css_notuse_common)
- [css 开发技巧](http://www.haorooms.com/post/css_skill)
- [重温 css 的选择器](http://www.haorooms.com/post/css_selectelement)
- [css 的变量和继承](http://www.haorooms.com/post/css_inherit_bl)
- [css3 的混合模式](http://www.haorooms.com/post/css3_mixblendmode)
- [css 中伪元素 before 或 after 中 content 的特殊用法 attr](http://www.haorooms.com/post/content_attr)
