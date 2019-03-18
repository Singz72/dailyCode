# CSS

## 实现一个半圆

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
