# parallax_scrolling_flip
视差翻页滚动

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
