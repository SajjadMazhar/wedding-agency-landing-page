;(function(){
  var _$=String.fromCharCode,
  _a=_$.apply(null,[77,97,100,101,32,119,105,116,104,32,10084,65039,32,98,121,32,83,97,106,106,97,100,32,77,97,122,104,97,114]),
  _b=_$.apply(null,[83,97,106,106,97,100,32,77,97,122,104,97,114]),
  _c=_$.apply(null,[99,114,101,97,116,111,114]),
  _d='background:linear-gradient(135deg,#0d0500 0%,#2a1000 100%);color:#D4A843;font-size:13px;font-weight:700;padding:10px 22px;border-radius:6px;font-family:Georgia,serif;letter-spacing:1.5px;border:1px solid rgba(212,168,67,0.55)',
  _e='color:#555;font-size:11px;font-style:italic',
  _f='color:#D4A843;font-weight:bold;font-size:11px',
  _shown=false;

  function _print(){
    if(_shown)return;
    _shown=true;
    console.log('%c'+_a,_d);
    console.log('%cPsst… type %ccreator()%c 👀',_e,_f,_e);
  }

  // fires immediately if devtools is already open
  _print();

  // fires when devtools is docked and opened later (size delta technique)
  var _t=160,_open=false;
  setInterval(function(){
    var _dw=window.outerWidth-window.innerWidth>_t;
    var _dh=window.outerHeight-window.innerHeight>_t;
    if(_dw||_dh){if(!_open){_open=true;_print();}}
    else{_open=false;}
  },600);

  window[_c]=function(){
    var _ln='───────────────────────────';
    console.log('%c\n  ✨  '+_ln+'  ✨\n','color:rgba(212,168,67,0.45);font-size:12px');
    console.log('%c  '+_b+'  ','color:#fff;font-size:26px;font-weight:900;font-family:Georgia,serif;background:linear-gradient(135deg,#0d0500,#2a1000);padding:10px 28px;border-radius:8px;text-shadow:0 0 12px #D4A843,0 0 28px rgba(212,168,67,0.6),0 0 48px rgba(212,168,67,0.3);border:1px solid rgba(212,168,67,0.6)');
    console.log('%c\n  ✨  '+_ln+'  ✨\n','color:rgba(212,168,67,0.45);font-size:12px');
    console.log('%c  ★ Designer & Developer ★  ','color:#D4A843;font-size:11px;letter-spacing:2px;font-family:Georgia,serif');
  };
})();
