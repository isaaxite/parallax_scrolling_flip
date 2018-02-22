function iIndicator(options) {
  this.activeClass = options.activeClass;
  this.indicators = document.querySelectorAll(options.indicators);
}

Object.assign(iIndicator.prototype, {
  clear: function() {
    for (var index = 0; index < this.indicators.length; index++) {
      var element = this.indicators[index];
      if(element.className.indexOf(this.activeClass) > -1) {
        element.classList.remove(this.activeClass);
        break;
      }
    }
  },
  set: function(activeIndex) {
    this.indicators[activeIndex].classList.add(this.activeClass);
  },
  update: function(activeIndex) {
    var _indicator = this;
    _indicator.clear();
    _indicator.set(activeIndex);
  }
});