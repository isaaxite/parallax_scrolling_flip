function iLoader(options) {
  this.activeClass = options.activeClass;
  this._isFinish = false;
  this.spinner = document.querySelector(options.spinnerEl);
}

Object.assign(iLoader.prototype, {
  show: function() {
    var _this = this;
    setTimeout(function(){
      _this._isFinish || _this.spinner.classList.add(_this.activeClass);
    }, 500);
  },
  hide: function() {
    var _this = this;
    _this.spinner.classList.remove(_this.activeClass);
    _this._isFinish = true;
  }
});