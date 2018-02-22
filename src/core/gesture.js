/** 
 * @params options.
 *
 *
 **/
function iGesture(options) {
  iTool.call(this);
  this.currentPage = 1;
  this.touchStartX = 0;
  this.screenWidth = document.body.scrollWidth;

  // 可配置-start
  this.mash = document.querySelector(options.mashEl);
  this.story = document.querySelector(options.storyEl);
  
  this.validFlipDistance = options.validFlipDistance || this.screenWidth / 10;
  this.frameDistance = options.frameDistance || 30;

  this.afterTouchstart = options.afterTouchstart;
  this.afterTouchend = options.afterTouchend;
  this.touchmoving = options.touchmoving;
  // 可配置-end

  this.init();
}

inheritPrototype(iGesture, iTool);

Object.assign(iGesture.prototype, {
  init: function() {
    this.eventBind();
  },
  eventBind: function() {
    var _this = this;
    var mash = _this.mash;

    mash && mash.addEventListener('touchstart', function(e){
      var touch = e.changedTouches[0];
      _this.touchStartX = touch.pageX;
      _this.afterTouchstart && _this.afterTouchstart(touch);
    }, false);

    mash && mash.addEventListener('touchmove', function(e){
      var story = _this.story;
      var touchStartX = _this.touchStartX;
      var touch = e.changedTouches[0];
      var moveingfPageX = touch.pageX;
      var distance = -(moveingfPageX - touchStartX);
      var currentPageScrollLeft = (_this.currentPage - 1) * _this.screenWidth;

      story.scrollLeft = currentPageScrollLeft + distance;

      _this.touchmoving && _this.touchmoving(touch, distance);
    }, false);

    mash && mash.addEventListener('touchend', function(e){
      var touchStartX = _this.touchStartX;
      var touch = e.changedTouches[0];
      var touchEndX = touch.pageX;
      var isNext = touchEndX - touchStartX < 0;
      var isValid = Math.abs(touchEndX - touchStartX) >= _this.validFlipDistance;
      var oldCurrentPage = _this.currentPage;
      var maxPage = _this.story.children.length;
      var minPage = 1;

      if(isValid) {
        _this.currentPage = isNext ? _this.currentPage + 1 : _this.currentPage - 1;
        _this.currentPage = _this.currentPage > maxPage ? maxPage : _this.currentPage;
        _this.currentPage = _this.currentPage < minPage ? minPage : _this.currentPage;
      } else {
        isNext = !isNext;
      }

      var targetScrollLeft = (_this.currentPage - 1) * _this.screenWidth;
      var step = _this.frameDistance;


      _this.animate(function() {
        var scrollLeft = _this.story.scrollLeft;

        scrollLeft = isNext ? scrollLeft + step : scrollLeft - step;
        
        if(isNext && scrollLeft > targetScrollLeft) {
          var isLastPage = _this.currentPage === maxPage;
          var isValidLast = oldCurrentPage != _this.currentPage;
          
          _this.story.scrollLeft = targetScrollLeft;

          _this.afterTouchend && _this.afterTouchend(_this.currentPage, isLastPage && isValidLast);
          return false;
        } else if(!isNext && scrollLeft < targetScrollLeft){
          var isLastPage = _this.currentPage === maxPage;
          var isValidLast = oldCurrentPage != _this.currentPage;

          _this.story.scrollLeft = targetScrollLeft;

          _this.afterTouchend && _this.afterTouchend(_this.currentPage, isLastPage && isValidLast);
          return false;
        } else {
        _this.story.scrollLeft = scrollLeft;
          return true;
        }
      });
    })
  }
});

function inheritPrototype(subType, spuerType) {
  var _prototype = Object.create(spuerType.prototype);
  _prototype.constructor = subType;
  subType.prototype = _prototype;
}