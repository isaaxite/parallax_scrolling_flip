function Bgm(options) {
  this.bgm = document.querySelector(options.bgmEl);
}

Object.assign(Bgm.prototype, {
  init: function() {
    var _this = this;
    var isBind = document.body._isBindBgm;
    
    isBind || document.body.addEventListener('touchstart', function(e){
      var context = this;

      document.body._isBindBgm = true;

      if(!context._isPlayBgm) {
        _this.play();
        context._isPlayBgm = true;
      }
    });
  },
  play: function() {
    this.bgm.play();
  }
});