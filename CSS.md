# CSS

#### 文字换行

```css
/*强制不换行*/
white-space:nowrap;
/*自动换行*/
word-wrap: break-word;
word-break: normal;
/*强制英文单词断行*/
word-break:break-all;
```

#### 两端对齐

```css
text-align:justify;text-justify:inter-ideogra
```

#### [去掉Webkit(chrome)浏览器中input(文本框)或textarea的黄色焦点框](http://www.cnblogs.com/niao/archive/2012/09/07/2674511.html)

```css
input,button,select,textarea{
        outline:none;
}
textarea{
        resize:none;
}
```

#### [去掉chrome记住密码后自动填充表单的黄色背景](http://www.tuicool.com/articles/EZ777n )

- ie6: position:fixed

```css
.fixed-top{
        position:fixed;bottom:auto;top:0;
}
* html .fixed-top{
        position:absolute;
        bottom:auto;
        top:expression(eval(document.documentElement.scrollTop));
}
* html{
        background-image:url(about:blank);
        background-attachment:fixed;
}
```

#### 取消textarea右下角可拖动手柄

```css
resize:none
```

#### 取消chrome form表单的聚焦边框

```css
input,button,select,textarea{outline:none}
textarea{resize:none}
```

#### 取消a链接的黄色边框

```css
a{-webkit-tap-highlight-color:rgba(0,0,0,0);}
```

#### 取消input,button焦点或点击时蓝色边框

```css
input{outline:none;}
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
