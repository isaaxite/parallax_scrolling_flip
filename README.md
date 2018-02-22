# parallax_scrolling_flip
纯js（ES5）实现的视差翻页滚动，核心代码在`/src/core/`目录下

- [polyfill.js](https://github.com/issaxite/parallax_scrolling_flip/blob/master/src/core/polyfill.js)
- [tool.js](https://github.com/issaxite/parallax_scrolling_flip/blob/master/src/core/tool.js)
- [gesture.js](https://github.com/issaxite/parallax_scrolling_flip/blob/master/src/core/gesture.js)

# 预览
![](http://ohi69gup6.bkt.clouddn.com/20180223010924.GIF)

### 例子
- [example-1](https://issaxite.github.io/parallax_scrolling_flip/example/)
- [example-2](https://issaxite.github.io/parallax_scrolling_flip/)

# 引入
```html
<script src="./src/core/iflip.min.js"></script>
```

# 使用
### 最简单
```html
<style>
  #app > .mash, #app > .story{ position: absolute;top: 0;right: 0;bottom: 0;left: 0; }
  #app > .mash{ z-index: 2000; }
  #app > .story{ z-index: 1000;overflow-x: auto;overflow-y: hidden; white-space: nowrap;font-size: 0;letter-spacing: 0; }
</style>

<body>
  <div id="app">
    <dl class="mash"></dl>
    <dl class="story">
      <dt></dt>
      <!-- ... -->
      <dt></dt>
    </dl>
  </div>
</body>

<script>
  var gesture = new iGesture({
    mashEl: "#app > .mash",	// 上层视图
    storyEl: "#app > .story"	// 下层元素
  });
</script>

```

### 全部功能
```js
var tool = new iTool();
var gesture = new iGesture({
  mashEl: "#app > .mash",	// 上层视图
  storyEl: "#app > .story",	// 下层元素
  validFlipDistance: 60,	// 最小有效偏移距离
  frameDistance: 20,		// 偏移距离(px)/帧
  afterTouchstart: function(touch) {	
    console.log("touchstart: ", touch);
  },
  touchmoving: function(touch, distance) {
    console.log("touchmoving");
  },
  afterTouchend: function(currentPage, isValidLastPage) {
    console.log("touchend");
  }
});

(function _init(){
  tool.forbidSpringback();
})();
```
