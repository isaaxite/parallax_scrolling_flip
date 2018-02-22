function iTool() {}

Object.assign(iTool.prototype, {
  asyncRootPx: function() {
    var html = document.querySelector('html')
    html.style.fontSize = `${html.offsetWidth / 10}px`;
  },
  animate: function(callback) {
    var _animate = function(){
      var isValid = callback && callback();
      isValid && requestAnimationFrame(_animate);
    };
  
    requestAnimationFrame(_animate);
  },
  preLoadBgImage: function(images, callback, complete) {
    var len = images.length;
    var imgObj = [];

    (function _preLoad(index){
      var img = new Image();
      img.src = images[index];
      img.onload = function() {
        imgObj.push(img.src);
        callback && callback(img.src, index);
        if(++index < len) {
          _preLoad(index);
        }

        complete && complete(imgObj);
      }
    })(0);
  },
  forbidSpringback() {
    document.body.addEventListener('touchstart', function(e){
      e.preventDefault();
    });
  },
  inheritPrototype: function(subType, spuerType) {
    var _prototype = Object.create(spuerType.prototype);
    _prototype.constructor = subType;
    subType.prototype = _prototype;
  }
});