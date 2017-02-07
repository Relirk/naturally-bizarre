(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){var l=Date.now(),m=l,g=0,n=Infinity,o=0,h=0,p=Infinity,q=0,r=0,s=0,f=document.createElement("div");f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
"block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:12,domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
a+"px",m=b,r=0);return b},update:function(){l=this.end()}}};"object"===typeof module&&(module.exports=Stats);

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require('../data/colors.json');

var _colors2 = _interopRequireDefault(_colors);

var _statsJs = require('stats-js');

var _statsJs2 = _interopRequireDefault(_statsJs);

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Experiments = function () {
  function Experiments() {
    _classCallCheck(this, Experiments);

    this.colors = _colors2.default;

    this.stats = null;
    this.canvas = null;
    this.context = null;

    this.center = new _Vector2.default(window.innerWidth / 2, window.innerHeight / 2);
    this.mouse = new _Vector2.default(window.innerWidth / 2, window.innerHeight / 2);

    this.eventDown = this.mousedown.bind(this);
    this.eventMove = this.mousemove.bind(this);
    this.eventUp = this.mouseup.bind(this);

    this.eventClick = this.click.bind(this);
    this.eventClickDouble = this.dblclick.bind(this);

    this.eventResize = this.resize.bind(this);

    this.eventUpdate = this.update.bind(this);

    this.animationFrame = null;

    this.createStats();
    this.createCanvas();
    this.createContext();
    this.createEvents();
  }

  _createClass(Experiments, [{
    key: 'createStats',
    value: function createStats() {
      var _this = this;

      this.stats = new _statsJs2.default();

      this.stats.domElement.style.display = 'none';
      this.stats.domElement.style.left = 0;
      this.stats.domElement.style.position = 'absolute';
      this.stats.domElement.style.top = 0;
      this.stats.domElement.style.zIndex = 50;

      window.addEventListener('keydown', function (e) {
        if (e.keyCode === 68) {
          _this.stats.domElement.style.display = _this.stats.domElement.style.display === 'block' ? 'none' : 'block';
        }
      });

      document.body.appendChild(this.stats.domElement);
    }
  }, {
    key: 'createCanvas',
    value: function createCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvas.classList.add('canvas');

      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerWidth;

      document.body.appendChild(this.canvas);
    }
  }, {
    key: 'createContext',
    value: function createContext() {
      this.context = this.canvas.getContext('2d');

      this.context.fillStyle = '#050505';
      this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }, {
    key: 'createEvents',
    value: function createEvents() {
      this.canvas.addEventListener('mousedown', this.eventDown);
      this.canvas.addEventListener('mousemove', this.eventMove);
      this.canvas.addEventListener('mouseup', this.eventUp);

      this.canvas.addEventListener('touchstart', this.eventDown);
      this.canvas.addEventListener('touchmove', this.eventMove);
      this.canvas.addEventListener('touchend', this.eventUp);

      this.canvas.addEventListener('click', this.eventClick);
      this.canvas.addEventListener('dblclick', this.eventClickDouble);

      window.addEventListener('resize', this.eventResize);
    }
  }, {
    key: 'click',
    value: function click(e) {}
  }, {
    key: 'dblclick',
    value: function dblclick(e) {
      this.context.globalAlpha = 1;
      this.context.globalCompositeOperation = 'source-over';

      this.context.fillStyle = '#050505';
      this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }, {
    key: 'mousedown',
    value: function mousedown(e) {}
  }, {
    key: 'mousemove',
    value: function mousemove(e) {
      if (e.touches) {
        this.mouse.set(e.touches[0].pageX, e.touches[0].pageY);
      } else {
        this.mouse.set(e.pageX, e.pageY);
      }
    }
  }, {
    key: 'mouseup',
    value: function mouseup(e) {}
  }, {
    key: 'resize',
    value: function resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.center.set(window.innerWidth / 2, window.innerHeight / 2);
    }
  }, {
    key: 'update',
    value: function update() {
      this.animationFrame = window.requestAnimationFrame(this.update.bind(this));
    }
  }, {
    key: 'destroyStats',
    value: function destroyStats() {
      this.stats.domElement.parentNode.removeChild(this.stats.domElement);
    }
  }, {
    key: 'destroyCanvas',
    value: function destroyCanvas() {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }, {
    key: 'destroyContext',
    value: function destroyContext() {
      this.context = null;
    }
  }, {
    key: 'destroyEvents',
    value: function destroyEvents() {
      this.canvas.removeEventListener('mousedown', this.eventDown);
      this.canvas.removeEventListener('mousemove', this.eventMove);
      this.canvas.removeEventListener('mouseup', this.eventUp);

      this.canvas.removeEventListener('touchstart', this.eventDown);
      this.canvas.removeEventListener('touchmove', this.eventMove);
      this.canvas.removeEventListener('touchend', this.eventUp);

      this.canvas.removeEventListener('click', this.eventClick);
      this.canvas.removeEventListener('dblclick', this.eventClickDouble);

      window.removeEventListener('resize', this.eventResize);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      window.cancelAnimationFrame(this.animationFrame);

      this.destroyEvents();
      this.destroyCanvas();
      this.destroyContext();
      this.destroyStats();
    }
  }]);

  return Experiments;
}();

exports.default = Experiments;

},{"../data/colors.json":4,"./Vector":3,"stats-js":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
  function Vector() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
    this.z = z;
  }

  _createClass(Vector, [{
    key: "set",
    value: function set(x, y, z) {
      if (x instanceof Vector) {
        this.x = x.x || 0;
        this.y = x.y || 0;
        this.z = x.z || 0;

        return this;
      }

      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;

      return this;
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Vector(this.x, this.y, this.z);
    }
  }, {
    key: "add",
    value: function add(x, y, z) {
      if (x instanceof Vector) {
        this.x += x.x || 0;
        this.y += x.y || 0;
        this.z += x.z || 0;

        return this;
      }

      this.x += x || 0;
      this.y += y || 0;
      this.z += z || 0;

      return this;
    }
  }, {
    key: "sub",
    value: function sub(x, y, z) {
      if (x instanceof Vector) {
        this.x -= x.x || 0;
        this.y -= x.y || 0;
        this.z -= x.z || 0;

        return this;
      }

      this.x -= x || 0;
      this.y -= y || 0;
      this.z -= z || 0;

      return this;
    }
  }, {
    key: "mult",
    value: function mult() {
      var n = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      this.x *= n;
      this.y *= n;
      this.z *= n;

      return this;
    }
  }, {
    key: "div",
    value: function div(n) {
      this.x /= n;
      this.y /= n;
      this.z /= n;

      return this;
    }
  }, {
    key: "mag",
    value: function mag() {
      return Math.sqrt(this.magSq());
    }
  }, {
    key: "magSq",
    value: function magSq() {
      var x = this.x;
      var y = this.y;
      var z = this.z;

      return x * x + y * y + z * z;
    }
  }, {
    key: "dot",
    value: function dot() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      if (x instanceof Vector) {
        return this.dot(x.x, x.y, x.z);
      }

      return this.x * x + this.y * y + this.z * z;
    }
  }, {
    key: "cross",
    value: function cross(v) {
      var x = this.y * v.z - this.z * v.y;
      var y = this.z * v.x - this.x * v.z;
      var z = this.x * v.y - this.y * v.x;

      return new Vector(x, y, z);
    }
  }, {
    key: "dist",
    value: function dist(v) {
      var d = v.copy().sub(this);

      return d.mag();
    }
  }, {
    key: "normalize",
    value: function normalize() {
      return this.div(this.mag());
    }
  }, {
    key: "limit",
    value: function limit(l) {
      var mSq = this.magSq();

      if (mSq > l * l) {
        this.div(Math.sqrt(mSq));
        this.mult(l);
      }

      return this;
    }
  }, {
    key: "setMag",
    value: function setMag(n) {
      return this.normalize().mult(n);
    }
  }, {
    key: "heading",
    value: function heading() {
      return Math.atan2(this.y, this.x);
    }
  }, {
    key: "rotate",
    value: function rotate(a) {
      var newHeading = this.heading() + a;
      var mag = this.mag();

      this.x = Math.cos(newHeading) * mag;
      this.y = Math.sin(newHeading) * mag;

      return this;
    }
  }, {
    key: "lerp",
    value: function lerp(x, y, z, amt) {
      if (x instanceof Vector) {
        return this.lerp(x.x, x.y, x.z, y);
      }

      this.x += (x - this.x) * amt || 0;
      this.y += (y - this.y) * amt || 0;
      this.z += (z - this.z) * amt || 0;

      return this;
    }
  }, {
    key: "array",
    value: function array() {
      return [this.x || 0, this.y || 0, this.z || 0];
    }
  }, {
    key: "equals",
    value: function equals(x, y, z) {
      var a = void 0,
          b = void 0,
          c = void 0;

      if (x instanceof Vector) {
        a = x.x || 0;
        b = x.y || 0;
        c = x.z || 0;
      } else {
        a = x || 0;
        b = y || 0;
        c = z || 0;
      }

      return this.x === a && this.y === b && this.z === c;
    }
  }], [{
    key: "fromAngle",
    value: function fromAngle(angle) {
      return new Vector(Math.cos(angle), Math.sin(angle), 0);
    }
  }, {
    key: "random2D",
    value: function random2D() {
      return this.fromAngle(Math.random() * Math.PI * 2);
    }
  }, {
    key: "random3D",
    value: function random3D() {
      var angle = Math.random() * Math.PI * 2;
      var vz = Math.random() * 2 - 1;

      var vx = Math.sqrt(1 - vz * vz) * Math.cos(angle);
      var vy = Math.sqrt(1 - vz * vz) * Math.sin(angle);

      return new Vector(vx, vy, vz);
    }
  }, {
    key: "add",
    value: function add(v1, v2, target) {
      if (!target) {
        target = v1.copy();
      } else {
        target.set(v1);
      }

      target.add(v2);

      return target;
    }
  }, {
    key: "sub",
    value: function sub(v1, v2, target) {
      if (!target) {
        target = v1.copy();
      } else {
        target.set(v1);
      }

      target.sub(v2);

      return target;
    }
  }, {
    key: "mult",
    value: function mult(v, n, target) {
      if (!target) {
        target = v.copy();
      } else {
        target.set(v);
      }

      target.mult(n);

      return target;
    }
  }, {
    key: "div",
    value: function div(v, n, target) {
      if (!target) {
        target = v.copy();
      } else {
        target.set(v);
      }

      target.div(n);

      return target;
    }
  }, {
    key: "dot",
    value: function dot(v1, v2) {
      return v1.dot(v2);
    }
  }, {
    key: "cross",
    value: function cross(v1, v2) {
      return v1.cross(v2);
    }
  }, {
    key: "dist",
    value: function dist(v1, v2) {
      return v1.dist(v2);
    }
  }, {
    key: "lerp",
    value: function lerp(v1, v2, amt, target) {
      if (!target) {
        target = v1.copy();
      } else {
        target.set(v1);
      }

      target.lerp(v2, amt);

      return target;
    }
  }, {
    key: "angleBetween",
    value: function angleBetween(v1, v2) {
      return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
    }
  }]);

  return Vector;
}();

exports.default = Vector;

},{}],4:[function(require,module,exports){
module.exports=[
  ["#0ad7d7", "#232832", "#ff2d64", "#e6e6e6"],
  ["#ffdc00", "#f5508c", "#9f19a4", "#462d46"],
  ["#fa5555", "#f5fa78", "#8ceb8c", "#2d7d91"],
  ["#004182", "#0e8cf0", "#faffa4", "#ff4b69"],
  ["#3c1e69", "#5a3c87", "#e65a87", "#ffaaaa"]
]

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _random = require('../../lib/random');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Walker = function () {
  function Walker(color, x, y) {
    _classCallCheck(this, Walker);

    this.color = color;
    this.x = x;
    this.y = y;
  }

  _createClass(Walker, [{
    key: 'step',
    value: function step() {
      var random = (0, _random.randomInt)(0, 3);

      if (random === 0) {
        this.x++;
      } else if (random === 1) {
        this.x--;
      } else if (random === 2) {
        this.y++;
      } else {
        this.y--;
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.lineWidth = 1;
      context.strokeStyle = this.color;

      context.beginPath();
      context.moveTo(this.x, this.y);

      this.step();

      context.lineTo(this.x, this.y);
      context.stroke();
    }
  }]);

  return Walker;
}();

exports.default = Walker;

},{"../../lib/random":16}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _random = require('../../lib/random');

var _Experiments2 = require('../../classes/Experiments');

var _Experiments3 = _interopRequireDefault(_Experiments2);

var _Walker = require('./Walker');

var _Walker2 = _interopRequireDefault(_Walker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Root = function (_Experiments) {
  _inherits(Root, _Experiments);

  function Root() {
    _classCallCheck(this, Root);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Root).call(this));

    _this.walkers = null;
    _this.walkersLength = null;
    _this.walkersColor = null;

    _this.createWalkers();

    _this.update();
    return _this;
  }

  _createClass(Root, [{
    key: 'createWalker',
    value: function createWalker() {
      var color = this.colors[this.walkersColor][(0, _random.randomInt)(0, this.colors.length - 1)];
      var x = (0, _random.randomInt)(0, window.innerWidth);
      var y = (0, _random.randomInt)(0, window.innerHeight);

      var walker = new _Walker2.default(color, x, y);

      this.walkers.push(walker);
    }
  }, {
    key: 'createWalkers',
    value: function createWalkers() {
      this.walkers = [];
      this.walkersLength = 2500;
      this.walkersColor = (0, _random.randomInt)(0, this.colors.length - 1);

      for (var i = 0; i <= this.walkersLength; i++) {
        this.createWalker();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      _get(Object.getPrototypeOf(Root.prototype), 'update', this).call(this);

      this.stats.begin();

      this.walkers.forEach(function (walker) {
        return walker.draw(_this2.context);
      });

      this.context.globalAlpha = 0.1;
      this.context.globalCompositeOperation = 'lighter';

      this.stats.end();
    }
  }, {
    key: 'dblclick',
    value: function dblclick() {
      _get(Object.getPrototypeOf(Root.prototype), 'dblclick', this).call(this);

      this.createWalkers();
    }
  }, {
    key: 'resize',
    value: function resize() {
      _get(Object.getPrototypeOf(Root.prototype), 'resize', this).call(this);

      this.createWalkers();
    }
  }]);

  return Root;
}(_Experiments3.default);

exports.default = Root;

},{"../../classes/Experiments":2,"../../lib/random":16,"./Walker":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = require('../../lib/math');

var _random = require('../../lib/random');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
    function Circle(x, y, radius, color) {
        _classCallCheck(this, Circle);

        this.radius = radius;

        this.color = color;

        this.x = x;
        this.y = y;

        this.opacity = 0;

        this.lerp = (0, _random.randomArbitrary)(0.05, 0.1);
    }

    _createClass(Circle, [{
        key: 'move',
        value: function move(x, y) {
            this.opacity = (0, _math.constrain)(this.opacity + 0.1, 0, 1);

            this.radius = (0, _math.lerp)(this.radius, 0, this.lerp);

            this.x = (0, _math.lerp)(this.x, x, this.lerp);
            this.y = (0, _math.lerp)(this.y, y, this.lerp);

            this.alive = this.radius > 0.01;
        }
    }, {
        key: 'draw',
        value: function draw(context) {
            context.lineWidth = 2;

            context.globalAlpha = this.opacity;
            context.globalCompositeOperation = 'lighter';

            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            context.closePath();

            context.strokeStyle = this.color;
            context.stroke();
        }
    }]);

    return Circle;
}();

exports.default = Circle;

},{"../../lib/math":14,"../../lib/random":16}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _random = require('../../lib/random');

var _Experiments2 = require('../../classes/Experiments');

var _Experiments3 = _interopRequireDefault(_Experiments2);

var _Circle = require('./Circle');

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Neon = function (_Experiments) {
  _inherits(Neon, _Experiments);

  function Neon() {
    _classCallCheck(this, Neon);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Neon).call(this));

    _this.circles = null;
    _this.circlesLength = null;
    _this.circlesColor = null;

    _this.createCircles();

    _this.update();
    return _this;
  }

  _createClass(Neon, [{
    key: 'createCircle',
    value: function createCircle() {
      var x = this.mouse.x + (0, _random.randomNormalized)() * 200;
      var y = this.mouse.y + (0, _random.randomNormalized)() * 200;
      var radius = 10 + Math.abs((0, _random.randomNormalized)() * 10);
      var color = this.colors[this.circlesColor][(0, _random.randomInt)(0, this.colors.length - 1)];

      var circle = new _Circle2.default(x, y, radius, color);

      this.circles.push(circle);
    }
  }, {
    key: 'destroyCircle',
    value: function destroyCircle(index) {
      this.circles.splice(index, 1);
    }
  }, {
    key: 'createCircles',
    value: function createCircles() {
      this.circles = [];
      this.circlesLength = 500;
      this.circlesColor = (0, _random.randomInt)(0, this.colors.length - 1);

      for (var i = 0; i <= this.circlesLength; i++) {
        this.createCircle();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      _get(Object.getPrototypeOf(Neon.prototype), 'update', this).call(this);

      this.stats.begin();

      this.circles.forEach(function (circle, index) {
        circle.move(_this2.mouse.x, _this2.mouse.y);
        circle.draw(_this2.context);

        if (!circle.alive) {
          _this2.destroyCircle(index);
          _this2.createCircle();
        }
      });

      this.context.globalAlpha = 1;
      this.context.globalCompositeOperation = 'source-over';

      this.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      this.stats.end();
    }
  }, {
    key: 'dblclick',
    value: function dblclick() {
      _get(Object.getPrototypeOf(Neon.prototype), 'dblclick', this).call(this);

      this.createCircles();
    }
  }, {
    key: 'resize',
    value: function resize() {
      _get(Object.getPrototypeOf(Neon.prototype), 'resize', this).call(this);

      this.createCircles();
    }
  }]);

  return Neon;
}(_Experiments3.default);

exports.default = Neon;

},{"../../classes/Experiments":2,"../../lib/random":16,"./Circle":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _random = require('../../lib/random');

var _Vector = require('../../classes/Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mover = function () {
  function Mover(x, y, radius, color) {
    _classCallCheck(this, Mover);

    this.radius = radius;

    this.color = color;

    this.position = new _Vector2.default(x, y);
    this.velocity = new _Vector2.default(0, 0);
    this.acceleration = new _Vector2.default(0, 0);
    this.direction = new _Vector2.default(0, 0);

    this.multiplier = (0, _random.randomArbitrary)(0.5, 1);
  }

  _createClass(Mover, [{
    key: 'check',
    value: function check() {
      if (this.position.x > window.innerWidth) {
        this.position.x = 0;
      } else if (this.position.x < 0) {
        this.position.x = window.innerWidth;
      }

      if (this.position.y > window.innerHeight) {
        this.position.y = 0;
      } else if (this.position.y < 0) {
        this.position.y = window.innerHeight;
      }
    }
  }, {
    key: 'update',
    value: function update(mouse, multiplier) {
      this.direction = _Vector2.default.sub(mouse, this.position);
      this.direction.normalize();
      this.direction.mult(this.multiplier);
      this.direction.mult(multiplier);

      this.acceleration = this.direction;

      this.velocity.add(this.acceleration);
      this.velocity.limit(15);

      this.position.add(this.velocity);
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      this.check();

      context.globalCompositeOperation = 'lighter';

      context.beginPath();
      context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
      context.closePath();

      context.fillStyle = this.color;
      context.fill();
    }
  }]);

  return Mover;
}();

exports.default = Mover;

},{"../../classes/Vector":3,"../../lib/random":16}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _random = require('../../lib/random');

var _Experiments2 = require('../../classes/Experiments');

var _Experiments3 = _interopRequireDefault(_Experiments2);

var _Mover = require('./Mover');

var _Mover2 = _interopRequireDefault(_Mover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Atom = function (_Experiments) {
  _inherits(Atom, _Experiments);

  function Atom() {
    _classCallCheck(this, Atom);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Atom).call(this));

    _this.movers = null;
    _this.moversLength = null;
    _this.moversColor = null;
    _this.moversMultiply = null;

    _this.createMovers();

    _this.update();
    return _this;
  }

  _createClass(Atom, [{
    key: 'createMover',
    value: function createMover() {
      var x = (0, _random.randomInt)(0, window.innerWidth);
      var y = (0, _random.randomInt)(0, window.innerHeight);
      var radius = (0, _random.randomInt)(1, 5);
      var color = this.colors[this.moversColor][(0, _random.randomInt)(0, this.colors.length - 1)];

      var mover = new _Mover2.default(x, y, radius, color);

      this.movers.push(mover);
    }
  }, {
    key: 'createMovers',
    value: function createMovers() {
      this.movers = [];
      this.moversLength = 250;
      this.moversColor = (0, _random.randomInt)(0, this.colors.length - 1);
      this.moversMultiply = 1;

      for (var i = 0; i <= this.moversLength; i++) {
        this.createMover();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      _get(Object.getPrototypeOf(Atom.prototype), 'update', this).call(this);

      this.stats.begin();

      this.movers.forEach(function (mover, index) {
        mover.update(_this2.mouse, _this2.moversMultiply);
        mover.draw(_this2.context);
      });

      this.context.globalAlpha = 1;
      this.context.globalCompositeOperation = 'source-over';

      this.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      this.stats.end();
    }
  }, {
    key: 'dblclick',
    value: function dblclick() {
      _get(Object.getPrototypeOf(Atom.prototype), 'dblclick', this).call(this);

      this.createMovers();
    }
  }, {
    key: 'mousedown',
    value: function mousedown() {
      _get(Object.getPrototypeOf(Atom.prototype), 'mousedown', this).call(this);

      this.moversMultiply *= -1;
    }
  }, {
    key: 'mouseup',
    value: function mouseup() {
      _get(Object.getPrototypeOf(Atom.prototype), 'mouseup', this).call(this);

      this.moversMultiply *= -1;
    }
  }, {
    key: 'resize',
    value: function resize() {
      _get(Object.getPrototypeOf(Atom.prototype), 'resize', this).call(this);

      this.createMovers();
    }
  }]);

  return Atom;
}(_Experiments3.default);

exports.default = Atom;

},{"../../classes/Experiments":2,"../../lib/random":16,"./Mover":9}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// import Cell from './Cell'


var _math = require('../../lib/math');

var _perlin = require('../../lib/perlin');

var _Vector = require('../../classes/Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _perlin.noiseSeed)(Math.floor(Math.random() * 100));

var Field = function () {
  function Field() {
    _classCallCheck(this, Field);

    this.resolution = 10;

    this.columns = Math.ceil(window.innerWidth / this.resolution);
    this.rows = Math.ceil(window.innerHeight / this.resolution);

    this.field = [];

    for (var i = this.columns; i >= 0; i--) {
      this.field.push([]);
    }

    console.log(this.field);

    this.noise = 0;

    this.create();
  }

  _createClass(Field, [{
    key: 'create',
    value: function create() {
      for (var i = 0, x = 0; i < this.columns; i++) {
        for (var j = 0, y = 0; j < this.rows; j++) {
          var angle = (0, _math.map)((0, _perlin.noise)(x, y, this.noise), 0, 1, 0, Math.PI * 2);

          // this.cell[i][j] = new Cell(i, j, angle)
          this.field[i][j] = new _Vector2.default(Math.cos(angle), Math.sin(angle));

          y += 0.1;
        }

        x += 0.1;
      }
    }
  }, {
    key: 'update',
    value: function update() {
      for (var i = 0, x = 0; i < this.columns; i++) {
        for (var j = 0, y = 0; j < this.rows; j++) {
          var angle = (0, _math.map)((0, _perlin.noise)(x, y, this.noise), 0, 1, 0, Math.PI * 2);

          // this.cell[i][j].update(angle)
          this.field[i][j].set(Math.cos(angle), Math.sin(angle));

          y += 0.1;
        }

        x += 0.1;
      }

      this.noise += 0.01;
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      for (var i = 0; i < this.columns; i++) {
        for (var j = 0; j < this.rows; j++) {
          // this.cell[i][j].draw(context)
        }
      }
    }
  }, {
    key: 'lookup',
    value: function lookup(position) {
      var column = Math.floor((0, _math.constrain)(position.x / this.resolution, 0, this.columns - 1));
      var row = Math.floor((0, _math.constrain)(position.y / this.resolution, 0, this.rows - 1));

      return this.field[column][row].copy();
    }
  }]);

  return Field;
}();

exports.default = Field;

},{"../../classes/Vector":3,"../../lib/math":14,"../../lib/perlin":15}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require('../../classes/Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
  function Particle(x, y, color, radius, speed, force) {
    _classCallCheck(this, Particle);

    this.color = color;

    this.position = new _Vector2.default(x, y);
    this.acceleration = new _Vector2.default(0, 0);
    this.velocity = new _Vector2.default(0, 0);

    this.radius = radius;
    this.speed = speed;
    this.force = force;
  }

  _createClass(Particle, [{
    key: 'follow',
    value: function follow(flow) {
      var desired = flow.lookup(this.position);

      desired.mult(this.speed);

      var steer = _Vector2.default.sub(desired, this.velocity);

      steer.limit(this.force);

      this.apply(steer);
    }
  }, {
    key: 'apply',
    value: function apply(force) {
      this.acceleration.add(force);
    }
  }, {
    key: 'update',
    value: function update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.speed);

      this.position.add(this.velocity);

      this.acceleration.mult(0);
    }
  }, {
    key: 'check',
    value: function check() {
      if (this.position.x > window.innerWidth) {
        this.position.x = 0;
      } else if (this.position.x < 0) {
        this.position.x = window.innerWidth;
      }

      if (this.position.y > window.innerHeight) {
        this.position.y = 0;
      } else if (this.position.y < 0) {
        this.position.y = window.innerHeight;
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.lineWidth = 2;

      context.globalCompositeOperation = 'lighter';

      context.beginPath();
      context.arc(this.position.x, this.position.y, 1, 0, 2 * Math.PI);
      context.closePath();

      context.fillStyle = this.color;
      context.fill();
    }
  }]);

  return Particle;
}();

exports.default = Particle;

},{"../../classes/Vector":3}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _random = require('../../lib/random');

var _Experiments2 = require('../../classes/Experiments');

var _Experiments3 = _interopRequireDefault(_Experiments2);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Particle = require('./Particle');

var _Particle2 = _interopRequireDefault(_Particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flow = function (_Experiments) {
  _inherits(Flow, _Experiments);

  function Flow() {
    _classCallCheck(this, Flow);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Flow).call(this));

    _this.field = null;

    _this.particles = null;
    _this.particlesLength = null;
    _this.particlesColor = null;

    _this.createField();
    _this.createParticles();

    _this.update();
    return _this;
  }

  _createClass(Flow, [{
    key: 'createField',
    value: function createField() {
      this.field = new _Field2.default();
      this.field.draw(this.context);
    }
  }, {
    key: 'createParticle',
    value: function createParticle() {
      var x = (0, _random.randomInt)(0, window.innerWidth);
      var y = (0, _random.randomInt)(0, window.innerHeight);
      var color = this.colors[this.particlesColor][(0, _random.randomInt)(0, this.colors.length - 1)];
      var radius = (0, _random.randomArbitrary)(1, 6);
      var speed = (0, _random.randomInt)(4, 12);
      var force = (0, _random.randomArbitrary)(0.4, 1);

      var particle = new _Particle2.default(x, y, color, radius, speed, force);

      this.particles.push(particle);
    }
  }, {
    key: 'createParticles',
    value: function createParticles() {
      this.particles = [];
      this.particlesLength = 1000;
      this.particlesColor = (0, _random.randomInt)(0, this.colors.length - 1);

      for (var i = 0; i <= this.particlesLength; i++) {
        this.createParticle();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      _get(Object.getPrototypeOf(Flow.prototype), 'update', this).call(this);

      this.stats.begin();

      this.field.update();

      this.particles.forEach(function (particle, index) {
        particle.follow(_this2.field);
        particle.update();
        particle.check();
        particle.draw(_this2.context);
      });

      this.context.globalAlpha = 1;
      this.context.globalCompositeOperation = 'source-over';

      this.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      this.stats.end();
    }
  }, {
    key: 'dblclick',
    value: function dblclick() {
      _get(Object.getPrototypeOf(Flow.prototype), 'dblclick', this).call(this);

      this.createField();
      this.createParticles();
    }
  }, {
    key: 'resize',
    value: function resize() {
      _get(Object.getPrototypeOf(Flow.prototype), 'resize', this).call(this);

      this.createField();
      this.createParticles();
    }
  }]);

  return Flow;
}(_Experiments3.default);

exports.default = Flow;

},{"../../classes/Experiments":2,"../../lib/random":16,"./Field":11,"./Particle":12}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constrain = constrain;
exports.dist = dist;
exports.lerp = lerp;
exports.mag = mag;
exports.map = map;
exports.max = max;
exports.min = min;
exports.norm = norm;
/**
 * Constrains a value between a minimum and maximum value.
 */
function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
}

/**
 * Calculates the distance between two points.
 */
function dist(x1, y1, z1, x2, y2, z2) {
  if (arguments.length === 4) {
    return Math.sqrt((z1 - x1) * (z1 - x1) + (x2 - y1) * (x2 - y1));
  } else if (arguments.length === 6) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
  }
}

/**
 * Calculates a number between two numbers at a specific increment. The amt
 * parameter is the amount to interpolate between the two values where 0.0
 * equal to the first point, 0.1 is very near the first point, 0.5 is
 * half-way in between, etc. The lerp function is convenient for creating
 * motion along a straight path and for drawing dotted lines.
 */
function lerp(start, stop, amt) {
  return amt * (stop - start) + start;
}

/**
 * Calculates the magnitude (or length) of a vector. A vector is a direction
 * in space commonly used in computer graphics and linear algebra. Because it
 * has no "start" position, the magnitude of a vector can be thought of as
 * the distance from the coordinate 0,0 to its x,y value. Therefore, mag() is
 * a shortcut for writing dist(0, 0, x, y).
 */
function mag(x, y) {
  return Math.sqrt(x * x + y * y);
}

/**
 * Re-maps a number from one range to another.
 *
 * In the first example above, the number 25 is converted from a value in the
 * range of 0 to 100 into a value that ranges from the left edge of the
 * window (0) to the right edge (width).
 */
function map(n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

/**
 * Determines the largest value in a sequence of numbers, and then returns
 * that value. max() accepts any number of Number parameters, or an Array
 * of any length.
 */
function max() {
  if (arguments[0] instanceof Array) {
    return Math.max.apply(null, arguments[0]);
  } else {
    return Math.max.apply(null, arguments);
  }
}

/**
 * Determines the smallest value in a sequence of numbers, and then returns
 * that value. min() accepts any number of Number parameters, or an Array
 * of any length.
 */
function min() {
  if (arguments[0] instanceof Array) {
    return Math.min.apply(null, arguments[0]);
  } else {
    return Math.min.apply(null, arguments);
  }
}

/**
 * Normalizes a number from another range into a value between 0 and 1.
 * Identical to map(value, low, high, 0, 1).
 *
 * Numbers outside of the range are not clamped to 0 and 1, because
 * out-of-range values are often intentional and useful. (See the second
 * example above.)
 */
function norm(n, start, stop) {
  return this.map(n, start, stop, 0, 1);
}

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noise = noise;
exports.noiseDetail = noiseDetail;
exports.noiseSeed = noiseSeed;
var PERLIN_YWRAPB = 4;
var PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
var PERLIN_ZWRAPB = 8;
var PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
var PERLIN_SIZE = 4095;

var perlin_octaves = 4; // default to medium smooth
var perlin_amp_falloff = 0.5; // 50% reduction/octave

var scaled_cosine = function scaled_cosine(i) {
  return 0.5 * (1.0 - Math.cos(i * Math.PI));
};

var perlin; // will be initialized lazily by noise() or noiseSeed()

function noise(x, y, z) {
  y = y || 0;
  z = z || 0;

  if (perlin == null) {
    perlin = new Array(PERLIN_SIZE + 1);
    for (var i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = Math.random();
    }
  }

  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }
  if (z < 0) {
    z = -z;
  }

  var xi = Math.floor(x),
      yi = Math.floor(y),
      zi = Math.floor(z);
  var xf = x - xi;
  var yf = y - yi;
  var zf = z - zi;
  var rxf, ryf;

  var r = 0;
  var ampl = 0.5;

  var n1, n2, n3;

  for (var o = 0; o < perlin_octaves; o++) {
    var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

    rxf = scaled_cosine(xf);
    ryf = scaled_cosine(yf);

    n1 = perlin[of & PERLIN_SIZE];
    n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
    n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
    n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);

    of += PERLIN_ZWRAP;
    n2 = perlin[of & PERLIN_SIZE];
    n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
    n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
    n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
    n2 += ryf * (n3 - n2);

    n1 += scaled_cosine(zf) * (n2 - n1);

    r += n1 * ampl;
    ampl *= perlin_amp_falloff;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;
    zi <<= 1;
    zf *= 2;

    if (xf >= 1.0) {
      xi++;xf--;
    }
    if (yf >= 1.0) {
      yi++;yf--;
    }
    if (zf >= 1.0) {
      zi++;zf--;
    }
  }
  return r;
};

function noiseDetail(lod, falloff) {
  // Adjusts the character and level of detail produced by the Perlin noise
  // By default, noise is computed over 4 octaves
  // https://p5js.org/reference/#/p5/noiseDetail
  if (lod > 0) {
    perlin_octaves = lod;
  }
  if (falloff > 0) {
    perlin_amp_falloff = falloff;
  }
};

function noiseSeed(seed) {
  // Linear Congruential Generator
  // Variant of a Lehman Generator
  var lcg = function () {
    // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
    // m is basically chosen to be large (as it is the max period)
    // and for its relationships to a and c
    var m = 4294967296,

    // a - 1 should be divisible by m's prime factors
    a = 1664525,

    // c and m should be co-prime
    c = 1013904223,
        seed,
        z;
    return {
      setSeed: function setSeed(val) {
        // pick a random seed if val is undefined or null
        // the >>> 0 casts the seed to an unsigned 32-bit integer
        z = seed = (val == null ? Math.random() * m : val) >>> 0;
      },
      getSeed: function getSeed() {
        return seed;
      },
      rand: function rand() {
        // define the recurrence relationship
        z = (a * z + c) % m;
        // return a float in [0, 1)
        // if z = m then z / m = 0 therefore (z % m) / m < 1 always
        return z / m;
      }
    };
  }();

  lcg.setSeed(seed);

  perlin = new Array(PERLIN_SIZE + 1);

  for (var i = 0; i < PERLIN_SIZE + 1; i++) {
    perlin[i] = lcg.rand();
  }
};

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomArbitrary = randomArbitrary;
exports.randomInt = randomInt;
exports.randomNormalized = randomNormalized;
function randomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomNormalized() {
  var x1 = void 0,
      x2 = void 0,
      rad = void 0;

  do {
    x1 = 2 * Math.random() - 1;
    x2 = 2 * Math.random() - 1;

    rad = x1 * x1 + x2 * x2;
  } while (rad >= 1 || rad === 0);

  var c = Math.sqrt(-2 * Math.log(rad) / rad);

  return x1 * c;
}

},{}],17:[function(require,module,exports){
'use strict';

var _index = require('./experiments/1/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./experiments/2/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./experiments/3/index');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./experiments/4/index');

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var experiments = {
  'root': _index2.default,
  'neon': _index4.default,
  'atom': _index6.default,
  'flow': _index8.default
};

var experimentsNames = Object.getOwnPropertyNames(experiments);
var experimentsSelected = window.location.hash ? window.location.hash.replace('#', '') : experimentsNames[0];

var experimentsActive = void 0;

if (experiments[experimentsSelected]) {
  experimentsActive = new experiments[experimentsSelected]();
} else {
  experimentsActive = new experiments['root']();
}

window.addEventListener('hashchange', function (e) {
  var hash = window.location.hash.replace('#', '');

  if (experimentsNames.indexOf(hash) > -1) {
    experimentsActive.destroy();

    experimentsActive = new experiments[hash]();
  }
});

},{"./experiments/1/index":6,"./experiments/2/index":8,"./experiments/3/index":10,"./experiments/4/index":13}]},{},[17])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvc3RhdHMtanMvYnVpbGQvc3RhdHMubWluLmpzIiwic3JjXFxqc1xcY2xhc3Nlc1xcRXhwZXJpbWVudHMuanMiLCJzcmNcXGpzXFxjbGFzc2VzXFxWZWN0b3IuanMiLCJzcmMvanMvZGF0YS9jb2xvcnMuanNvbiIsInNyY1xcanNcXGV4cGVyaW1lbnRzXFwxXFxXYWxrZXIuanMiLCJzcmNcXGpzXFxleHBlcmltZW50c1xcMVxcaW5kZXguanMiLCJzcmNcXGpzXFxleHBlcmltZW50c1xcMlxcQ2lyY2xlLmpzIiwic3JjXFxqc1xcZXhwZXJpbWVudHNcXDJcXGluZGV4LmpzIiwic3JjXFxqc1xcZXhwZXJpbWVudHNcXDNcXE1vdmVyLmpzIiwic3JjXFxqc1xcZXhwZXJpbWVudHNcXDNcXGluZGV4LmpzIiwic3JjXFxqc1xcZXhwZXJpbWVudHNcXDRcXEZpZWxkLmpzIiwic3JjXFxqc1xcZXhwZXJpbWVudHNcXDRcXFBhcnRpY2xlLmpzIiwic3JjXFxqc1xcZXhwZXJpbWVudHNcXDRcXGluZGV4LmpzIiwic3JjXFxqc1xcbGliXFxtYXRoLmpzIiwic3JjXFxqc1xcbGliXFxwZXJsaW4uanMiLCJzcmNcXGpzXFxsaWJcXHJhbmRvbS5qcyIsInNyY1xcanNcXG1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ05BOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUIsVztBQUNuQix5QkFBZTtBQUFBOztBQUNiLFNBQUssTUFBTDs7QUFFQSxTQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0EsU0FBSyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUssT0FBTCxHQUFlLElBQWY7O0FBRUEsU0FBSyxNQUFMLEdBQWMscUJBQVcsT0FBTyxVQUFQLEdBQW9CLENBQS9CLEVBQWtDLE9BQU8s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akQsTUFBTSxPQUFPLE9BQU8sUUFBUCxDQUFnQixJQUFoQixDQUFxQixPQUFyQixDQUE2QixHQUE3QixFQUFrQyxFQUFsQyxDQUFiOztBQUVBLE1BQUksaUJBQWlCLE9BQWpCLENBQXlCLElBQXpCLElBQWlDLENBQUMsQ0FBdEMsRUFBeUM7QUFDdkMsc0JBQWtCLE9BQWxCOztBQUVBLHdCQUFvQixJQUFJLFlBQVksSUFBWixDQUFKLEVBQXBCO0FBQ0Q7QUFDRixDQVJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIHN0YXRzLmpzIC0gaHR0cDovL2dpdGh1Yi5jb20vbXJkb29iL3N0YXRzLmpzXG52YXIgU3RhdHM9ZnVuY3Rpb24oKXt2YXIgbD1EYXRlLm5vdygpLG09bCxnPTAsbj1JbmZpbml0eSxvPTAsaD0wLHA9SW5maW5pdHkscT0wLHI9MCxzPTAsZj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2YuaWQ9XCJzdGF0c1wiO2YuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLGZ1bmN0aW9uKGIpe2IucHJldmVudERlZmF1bHQoKTt0KCsrcyUyKX0sITEpO2Yuc3R5bGUuY3NzVGV4dD1cIndpZHRoOjgwcHg7b3BhY2l0eTowLjk7Y3Vyc29yOnBvaW50ZXJcIjt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2EuaWQ9XCJmcHNcIjthLnN0eWxlLmNzc1RleHQ9XCJwYWRkaW5nOjAgMCAzcHggM3B4O3RleHQtYWxpZ246bGVmdDtiYWNrZ3JvdW5kLWNvbG9yOiMwMDJcIjtmLmFwcGVuZENoaWxkKGEpO3ZhciBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aS5pZD1cImZwc1RleHRcIjtpLnN0eWxlLmNzc1RleHQ9XCJjb2xvcjojMGZmO2ZvbnQtZmFtaWx5OkhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO2ZvbnQtc2l6ZTo5cHg7Zm9udC13ZWlnaHQ6Ym9sZDtsaW5lLWhlaWdodDoxNXB4XCI7XG5pLmlubmVySFRNTD1cIkZQU1wiO2EuYXBwZW5kQ2hpbGQoaSk7dmFyIGM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtjLmlkPVwiZnBzR3JhcGhcIjtjLnN0eWxlLmNzc1RleHQ9XCJwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo3NHB4O2hlaWdodDozMHB4O2JhY2tncm91bmQtY29sb3I6IzBmZlwiO2ZvcihhLmFwcGVuZENoaWxkKGMpOzc0PmMuY2hpbGRyZW4ubGVuZ3RoOyl7dmFyIGo9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7ai5zdHlsZS5jc3NUZXh0PVwid2lkdGg6MXB4O2hlaWdodDozMHB4O2Zsb2F0OmxlZnQ7YmFja2dyb3VuZC1jb2xvcjojMTEzXCI7Yy5hcHBlbmRDaGlsZChqKX12YXIgZD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2QuaWQ9XCJtc1wiO2Quc3R5bGUuY3NzVGV4dD1cInBhZGRpbmc6MCAwIDNweCAzcHg7dGV4dC1hbGlnbjpsZWZ0O2JhY2tncm91bmQtY29sb3I6IzAyMDtkaXNwbGF5Om5vbmVcIjtmLmFwcGVuZENoaWxkKGQpO3ZhciBrPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5rLmlkPVwibXNUZXh0XCI7ay5zdHlsZS5jc3NUZXh0PVwiY29sb3I6IzBmMDtmb250LWZhbWlseTpIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtmb250LXNpemU6OXB4O2ZvbnQtd2VpZ2h0OmJvbGQ7bGluZS1oZWlnaHQ6MTVweFwiO2suaW5uZXJIVE1MPVwiTVNcIjtkLmFwcGVuZENoaWxkKGspO3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5pZD1cIm1zR3JhcGhcIjtlLnN0eWxlLmNzc1RleHQ9XCJwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo3NHB4O2hlaWdodDozMHB4O2JhY2tncm91bmQtY29sb3I6IzBmMFwiO2ZvcihkLmFwcGVuZENoaWxkKGUpOzc0PmUuY2hpbGRyZW4ubGVuZ3RoOylqPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLGouc3R5bGUuY3NzVGV4dD1cIndpZHRoOjFweDtoZWlnaHQ6MzBweDtmbG9hdDpsZWZ0O2JhY2tncm91bmQtY29sb3I6IzEzMVwiLGUuYXBwZW5kQ2hpbGQoaik7dmFyIHQ9ZnVuY3Rpb24oYil7cz1iO3N3aXRjaChzKXtjYXNlIDA6YS5zdHlsZS5kaXNwbGF5PVxuXCJibG9ja1wiO2Quc3R5bGUuZGlzcGxheT1cIm5vbmVcIjticmVhaztjYXNlIDE6YS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGQuc3R5bGUuZGlzcGxheT1cImJsb2NrXCJ9fTtyZXR1cm57UkVWSVNJT046MTIsZG9tRWxlbWVudDpmLHNldE1vZGU6dCxiZWdpbjpmdW5jdGlvbigpe2w9RGF0ZS5ub3coKX0sZW5kOmZ1bmN0aW9uKCl7dmFyIGI9RGF0ZS5ub3coKTtnPWItbDtuPU1hdGgubWluKG4sZyk7bz1NYXRoLm1heChvLGcpO2sudGV4dENvbnRlbnQ9ZytcIiBNUyAoXCIrbitcIi1cIitvK1wiKVwiO3ZhciBhPU1hdGgubWluKDMwLDMwLTMwKihnLzIwMCkpO2UuYXBwZW5kQ2hpbGQoZS5maXJzdENoaWxkKS5zdHlsZS5oZWlnaHQ9YStcInB4XCI7cisrO2I+bSsxRTMmJihoPU1hdGgucm91bmQoMUUzKnIvKGItbSkpLHA9TWF0aC5taW4ocCxoKSxxPU1hdGgubWF4KHEsaCksaS50ZXh0Q29udGVudD1oK1wiIEZQUyAoXCIrcCtcIi1cIitxK1wiKVwiLGE9TWF0aC5taW4oMzAsMzAtMzAqKGgvMTAwKSksYy5hcHBlbmRDaGlsZChjLmZpcnN0Q2hpbGQpLnN0eWxlLmhlaWdodD1cbmErXCJweFwiLG09YixyPTApO3JldHVybiBifSx1cGRhdGU6ZnVuY3Rpb24oKXtsPXRoaXMuZW5kKCl9fX07XCJvYmplY3RcIj09PXR5cGVvZiBtb2R1bGUmJihtb2R1bGUuZXhwb3J0cz1TdGF0cyk7XG4iLCJpbXBvcnQgQ29sb3JzIGZyb20gJy4uL2RhdGEvY29sb3JzLmpzb24nXHJcbmltcG9ydCBTdGF0cyBmcm9tICdzdGF0cy1qcydcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3RvcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cGVyaW1lbnRzIHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICB0aGlzLmNvbG9ycyA9IENvbG9yc1xyXG5cclxuICAgIHRoaXMuc3RhdHMgPSBudWxsXHJcbiAgICB0aGlzLmNhbnZhcyA9IG51bGxcclxuICAgIHRoaXMuY29udGV4dCA9IG51bGxcclxuXHJcbiAgICB0aGlzLmNlbnRlciA9IG5ldyBWZWN0b3Iod2luZG93LmlubmVyV2lkdGggLyAyLCB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKVxyXG4gICAgdGhpcy5tb3VzZSA9IG5ldyBWZWN0b3Iod2luZG93LmlubmVyV2lkdGggLyAyLCB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKVxyXG5cclxuICAgIHRoaXMuZXZlbnREb3duID0gdGhpcy5tb3VzZWRvd24uYmluZCh0aGlzKVxyXG4gICAgdGhpcy5ldmVudE1vdmUgPSB0aGlzLm1vdXNlbW92ZS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmV2ZW50VXAgPSB0aGlzLm1vdXNldXAuYmluZCh0aGlzKVxyXG5cclxuICAgIHRoaXMuZXZlbnRDbGljayA9IHRoaXMuY2xpY2suYmluZCh0aGlzKVxyXG4gICAgdGhpcy5ldmVudENsaWNrRG91YmxlID0gdGhpcy5kYmxjbGljay5iaW5kKHRoaXMpXHJcblxyXG4gICAgdGhpcy5ldmVudFJlc2l6ZSA9IHRoaXMucmVzaXplLmJpbmQodGhpcylcclxuXHJcbiAgICB0aGlzLmV2ZW50VXBkYXRlID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKVxyXG5cclxuICAgIHRoaXMuYW5pbWF0aW9uRnJhbWUgPSBudWxsXHJcblxyXG4gICAgdGhpcy5jcmVhdGVTdGF0cygpXHJcbiAgICB0aGlzLmNyZWF0ZUNhbnZhcygpXHJcbiAgICB0aGlzLmNyZWF0ZUNvbnRleHQoKVxyXG4gICAgdGhpcy5jcmVhdGVFdmVudHMoKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlU3RhdHMgKCkge1xyXG4gICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0cygpXHJcblxyXG4gICAgdGhpcy5zdGF0cy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIHRoaXMuc3RhdHMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gMFxyXG4gICAgdGhpcy5zdGF0cy5kb21FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xyXG4gICAgdGhpcy5zdGF0cy5kb21FbGVtZW50LnN0eWxlLnRvcCA9IDBcclxuICAgIHRoaXMuc3RhdHMuZG9tRWxlbWVudC5zdHlsZS56SW5kZXggPSA1MFxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gNjgpIHtcclxuICAgICAgICB0aGlzLnN0YXRzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICh0aGlzLnN0YXRzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykgPyAnbm9uZScgOiAnYmxvY2snXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzLmRvbUVsZW1lbnQpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVDYW52YXMgKCkge1xyXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxyXG4gICAgdGhpcy5jYW52YXMuY2xhc3NMaXN0LmFkZCgnY2FudmFzJylcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcclxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlQ29udGV4dCAoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjMDUwNTA1J1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVFdmVudHMgKCkge1xyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5ldmVudERvd24pXHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmV2ZW50TW92ZSlcclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmV2ZW50VXApXHJcblxyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuZXZlbnREb3duKVxyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5ldmVudE1vdmUpXHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuZXZlbnRVcClcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZXZlbnRDbGljaylcclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5ldmVudENsaWNrRG91YmxlKVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmV2ZW50UmVzaXplKVxyXG4gIH1cclxuXHJcbiAgY2xpY2sgKGUpIHtcclxuXHJcbiAgfVxyXG5cclxuICBkYmxjbGljayAoZSkge1xyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMVxyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3ZlcidcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyMwNTA1MDUnXHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcclxuICB9XHJcblxyXG4gIG1vdXNlZG93biAoZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG1vdXNlbW92ZSAoZSkge1xyXG4gICAgaWYgKGUudG91Y2hlcykge1xyXG4gICAgICB0aGlzLm1vdXNlLnNldChlLnRvdWNoZXNbMF0ucGFnZVgsIGUudG91Y2hlc1swXS5wYWdlWSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW91c2Uuc2V0KGUucGFnZVgsIGUucGFnZVkpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3VzZXVwIChlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgcmVzaXplICgpIHtcclxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxyXG5cclxuICAgIHRoaXMuY2VudGVyLnNldCh3aW5kb3cuaW5uZXJXaWR0aCAvIDIsIHdpbmRvdy5pbm5lckhlaWdodCAvIDIpXHJcbiAgfVxyXG5cclxuICB1cGRhdGUgKCkge1xyXG4gICAgdGhpcy5hbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSlcclxuICB9XHJcblxyXG4gIGRlc3Ryb3lTdGF0cyAoKSB7XHJcbiAgICB0aGlzLnN0YXRzLmRvbUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnN0YXRzLmRvbUVsZW1lbnQpXHJcbiAgfVxyXG5cclxuICBkZXN0cm95Q2FudmFzICgpIHtcclxuICAgIHRoaXMuY2FudmFzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5jYW52YXMpXHJcbiAgfVxyXG5cclxuICBkZXN0cm95Q29udGV4dCAoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsXHJcbiAgfVxyXG5cclxuICBkZXN0cm95RXZlbnRzICgpIHtcclxuICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuZXZlbnREb3duKVxyXG4gICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ldmVudE1vdmUpXHJcbiAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5ldmVudFVwKVxyXG5cclxuICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmV2ZW50RG93bilcclxuICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuZXZlbnRNb3ZlKVxyXG4gICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmV2ZW50VXApXHJcblxyXG4gICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmV2ZW50Q2xpY2spXHJcbiAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuZXZlbnRDbGlja0RvdWJsZSlcclxuXHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5ldmVudFJlc2l6ZSlcclxuICB9XHJcblxyXG4gIGRlc3Ryb3kgKCkge1xyXG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uRnJhbWUpXHJcblxyXG4gICAgdGhpcy5kZXN0cm95RXZlbnRzKClcclxuICAgIHRoaXMuZGVzdHJveUNhbnZhcygpXHJcbiAgICB0aGlzLmRlc3Ryb3lDb250ZXh0KClcclxuICAgIHRoaXMuZGVzdHJveVN0YXRzKClcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcclxuICBjb25zdHJ1Y3RvciAoeCA9IDAsIHkgPSAwLCB6ID0gMCkge1xyXG4gICAgdGhpcy54ID0geFxyXG4gICAgdGhpcy55ID0geVxyXG4gICAgdGhpcy56ID0gelxyXG4gIH1cclxuXHJcbiAgc2V0ICh4LCB5LCB6KSB7XHJcbiAgICBpZiAoeCBpbnN0YW5jZW9mIFZlY3Rvcikge1xyXG4gICAgICB0aGlzLnggPSB4LnggfHwgMFxyXG4gICAgICB0aGlzLnkgPSB4LnkgfHwgMFxyXG4gICAgICB0aGlzLnogPSB4LnogfHwgMFxyXG5cclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnggPSB4IHx8IDBcclxuICAgIHRoaXMueSA9IHkgfHwgMFxyXG4gICAgdGhpcy56ID0geiB8fCAwXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIGNvcHkgKCkge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54LCB0aGlzLnksIHRoaXMueilcclxuICB9XHJcblxyXG4gIGFkZCAoeCwgeSwgeikge1xyXG4gICAgaWYgKHggaW5zdGFuY2VvZiBWZWN0b3IpIHtcclxuICAgICAgdGhpcy54ICs9IHgueCB8fCAwXHJcbiAgICAgIHRoaXMueSArPSB4LnkgfHwgMFxyXG4gICAgICB0aGlzLnogKz0geC56IHx8IDBcclxuXHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy54ICs9IHggfHwgMFxyXG4gICAgdGhpcy55ICs9IHkgfHwgMFxyXG4gICAgdGhpcy56ICs9IHogfHwgMFxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICBzdWIgKHgsIHksIHopIHtcclxuICAgIGlmICh4IGluc3RhbmNlb2YgVmVjdG9yKSB7XHJcbiAgICAgIHRoaXMueCAtPSB4LnggfHwgMFxyXG4gICAgICB0aGlzLnkgLT0geC55IHx8IDBcclxuICAgICAgdGhpcy56IC09IHgueiB8fCAwXHJcblxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMueCAtPSB4IHx8IDBcclxuICAgIHRoaXMueSAtPSB5IHx8IDBcclxuICAgIHRoaXMueiAtPSB6IHx8IDBcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgbXVsdCAobiA9IDApIHtcclxuICAgIHRoaXMueCAqPSBuXHJcbiAgICB0aGlzLnkgKj0gblxyXG4gICAgdGhpcy56ICo9IG5cclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgZGl2IChuKSB7XHJcbiAgICB0aGlzLnggLz0gblxyXG4gICAgdGhpcy55IC89IG5cclxuICAgIHRoaXMueiAvPSBuXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIG1hZyAoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubWFnU3EoKSlcclxuICB9XHJcblxyXG4gIG1hZ1NxICgpIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLnhcclxuICAgIGNvbnN0IHkgPSB0aGlzLnlcclxuICAgIGNvbnN0IHogPSB0aGlzLnpcclxuXHJcbiAgICByZXR1cm4gKHggKiB4ICsgeSAqIHkgKyB6ICogeilcclxuICB9XHJcblxyXG4gIGRvdCAoeCA9IDAsIHkgPSAwLCB6ID0gMCkge1xyXG4gICAgaWYgKHggaW5zdGFuY2VvZiBWZWN0b3IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZG90KHgueCwgeC55LCB4LnopXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMueCAqIHggKyB0aGlzLnkgKiB5ICsgdGhpcy56ICogelxyXG4gIH1cclxuXHJcbiAgY3Jvc3MgKHYpIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLnkgKiB2LnogLSB0aGlzLnogKiB2LnlcclxuICAgIGNvbnN0IHkgPSB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2LnpcclxuICAgIGNvbnN0IHogPSB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2LnhcclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih4LCB5LCB6KVxyXG4gIH1cclxuXHJcbiAgZGlzdCAodikge1xyXG4gICAgY29uc3QgZCA9IHYuY29weSgpLnN1Yih0aGlzKVxyXG5cclxuICAgIHJldHVybiBkLm1hZygpXHJcbiAgfVxyXG5cclxuICBub3JtYWxpemUgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGl2KHRoaXMubWFnKCkpXHJcbiAgfVxyXG5cclxuICBsaW1pdCAobCkge1xyXG4gICAgdmFyIG1TcSA9IHRoaXMubWFnU3EoKVxyXG5cclxuICAgIGlmIChtU3EgPiBsICogbCkge1xyXG4gICAgICB0aGlzLmRpdihNYXRoLnNxcnQobVNxKSlcclxuICAgICAgdGhpcy5tdWx0KGwpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIHNldE1hZyAobikge1xyXG4gICAgcmV0dXJuIHRoaXMubm9ybWFsaXplKCkubXVsdChuKVxyXG4gIH1cclxuXHJcbiAgaGVhZGluZyAoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueClcclxuICB9XHJcblxyXG4gIHJvdGF0ZSAoYSkge1xyXG4gICAgY29uc3QgbmV3SGVhZGluZyA9IHRoaXMuaGVhZGluZygpICsgYVxyXG4gICAgY29uc3QgbWFnID0gdGhpcy5tYWcoKVxyXG5cclxuICAgIHRoaXMueCA9IE1hdGguY29zKG5ld0hlYWRpbmcpICogbWFnXHJcbiAgICB0aGlzLnkgPSBNYXRoLnNpbihuZXdIZWFkaW5nKSAqIG1hZ1xyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICBsZXJwICh4LCB5LCB6LCBhbXQpIHtcclxuICAgIGlmICh4IGluc3RhbmNlb2YgVmVjdG9yKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxlcnAoeC54LCB4LnksIHgueiwgeSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnggKz0gKHggLSB0aGlzLngpICogYW10IHx8IDBcclxuICAgIHRoaXMueSArPSAoeSAtIHRoaXMueSkgKiBhbXQgfHwgMFxyXG4gICAgdGhpcy56ICs9ICh6IC0gdGhpcy56KSAqIGFtdCB8fCAwXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIGFycmF5ICgpIHtcclxuICAgIHJldHVybiBbdGhpcy54IHx8IDAsIHRoaXMueSB8fCAwLCB0aGlzLnogfHwgMF1cclxuICB9XHJcblxyXG4gIGVxdWFscyAoeCwgeSwgeikge1xyXG4gICAgbGV0IGEsIGIsIGNcclxuXHJcbiAgICBpZiAoeCBpbnN0YW5jZW9mIFZlY3Rvcikge1xyXG4gICAgICBhID0geC54IHx8IDBcclxuICAgICAgYiA9IHgueSB8fCAwXHJcbiAgICAgIGMgPSB4LnogfHwgMFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYSA9IHggfHwgMFxyXG4gICAgICBiID0geSB8fCAwXHJcbiAgICAgIGMgPSB6IHx8IDBcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy54ID09PSBhICYmIHRoaXMueSA9PT0gYiAmJiB0aGlzLnogPT09IGNcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tQW5nbGUgKGFuZ2xlKSB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcihNYXRoLmNvcyhhbmdsZSksIE1hdGguc2luKGFuZ2xlKSwgMClcclxuICB9XHJcblxyXG4gIHN0YXRpYyByYW5kb20yRCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5mcm9tQW5nbGUoTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJhbmRvbTNEICgpIHtcclxuICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyXHJcbiAgICBjb25zdCB2eiA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMVxyXG5cclxuICAgIHZhciB2eCA9IE1hdGguc3FydCgxIC0gdnogKiB2eikgKiBNYXRoLmNvcyhhbmdsZSlcclxuICAgIHZhciB2eSA9IE1hdGguc3FydCgxIC0gdnogKiB2eikgKiBNYXRoLnNpbihhbmdsZSlcclxuXHJcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih2eCwgdnksIHZ6KVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFkZCAodjEsIHYyLCB0YXJnZXQpIHtcclxuICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgIHRhcmdldCA9IHYxLmNvcHkoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGFyZ2V0LnNldCh2MSlcclxuICAgIH1cclxuXHJcbiAgICB0YXJnZXQuYWRkKHYyKVxyXG5cclxuICAgIHJldHVybiB0YXJnZXRcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzdWIgKHYxLCB2MiwgdGFyZ2V0KSB7XHJcbiAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICB0YXJnZXQgPSB2MS5jb3B5KClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRhcmdldC5zZXQodjEpXHJcbiAgICB9XHJcblxyXG4gICAgdGFyZ2V0LnN1Yih2MilcclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbXVsdCAodiwgbiwgdGFyZ2V0KSB7XHJcbiAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICB0YXJnZXQgPSB2LmNvcHkoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGFyZ2V0LnNldCh2KVxyXG4gICAgfVxyXG5cclxuICAgIHRhcmdldC5tdWx0KG4pXHJcblxyXG4gICAgcmV0dXJuIHRhcmdldFxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpdiAodiwgbiwgdGFyZ2V0KSB7XHJcbiAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICB0YXJnZXQgPSB2LmNvcHkoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGFyZ2V0LnNldCh2KVxyXG4gICAgfVxyXG5cclxuICAgIHRhcmdldC5kaXYobilcclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZG90ICh2MSwgdjIpIHtcclxuICAgIHJldHVybiB2MS5kb3QodjIpXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3Jvc3MgKHYxLCB2Mikge1xyXG4gICAgcmV0dXJuIHYxLmNyb3NzKHYyKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpc3QgKHYxLCB2Mikge1xyXG4gICAgcmV0dXJuIHYxLmRpc3QodjIpXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbGVycCAodjEsIHYyLCBhbXQsIHRhcmdldCkge1xyXG4gICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgdGFyZ2V0ID0gdjEuY29weSgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0YXJnZXQuc2V0KHYxKVxyXG4gICAgfVxyXG5cclxuICAgIHRhcmdldC5sZXJwKHYyLCBhbXQpXHJcblxyXG4gICAgcmV0dXJuIHRhcmdldFxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFuZ2xlQmV0d2VlbiAodjEsIHYyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5hY29zKHYxLmRvdCh2MikgLyAodjEubWFnKCkgKiB2Mi5tYWcoKSkpXHJcbiAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzPVtcclxuICBbXCIjMGFkN2Q3XCIsIFwiIzIzMjgzMlwiLCBcIiNmZjJkNjRcIiwgXCIjZTZlNmU2XCJdLFxyXG4gIFtcIiNmZmRjMDBcIiwgXCIjZjU1MDhjXCIsIFwiIzlmMTlhNFwiLCBcIiM0NjJkNDZcIl0sXHJcbiAgW1wiI2ZhNTU1NVwiLCBcIiNmNWZhNzhcIiwgXCIjOGNlYjhjXCIsIFwiIzJkN2Q5MVwiXSxcclxuICBbXCIjMDA0MTgyXCIsIFwiIzBlOGNmMFwiLCBcIiNmYWZmYTRcIiwgXCIjZmY0YjY5XCJdLFxyXG4gIFtcIiMzYzFlNjlcIiwgXCIjNWEzYzg3XCIsIFwiI2U2NWE4N1wiLCBcIiNmZmFhYWFcIl1cclxuXVxyXG4iLCJpbXBvcnQgeyByYW5kb21JbnQgfSBmcm9tICcuLi8uLi9saWIvcmFuZG9tJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2Fsa2VyIHtcclxuICBjb25zdHJ1Y3RvciAoY29sb3IsIHgsIHkpIHtcclxuICAgIHRoaXMuY29sb3IgPSBjb2xvclxyXG4gICAgdGhpcy54ID0geFxyXG4gICAgdGhpcy55ID0geVxyXG4gIH1cclxuXHJcbiAgc3RlcCAoKSB7XHJcbiAgICBjb25zdCByYW5kb20gPSByYW5kb21JbnQoMCwgMylcclxuXHJcbiAgICBpZiAocmFuZG9tID09PSAwKSB7XHJcbiAgICAgIHRoaXMueCsrXHJcbiAgICB9IGVsc2UgaWYgKHJhbmRvbSA9PT0gMSkge1xyXG4gICAgICB0aGlzLngtLVxyXG4gICAgfSBlbHNlIGlmIChyYW5kb20gPT09IDIpIHtcclxuICAgICAgdGhpcy55KytcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMueS0tXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkcmF3IChjb250ZXh0KSB7XHJcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDFcclxuICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yXHJcblxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKVxyXG4gICAgY29udGV4dC5tb3ZlVG8odGhpcy54LCB0aGlzLnkpXHJcblxyXG4gICAgdGhpcy5zdGVwKClcclxuXHJcbiAgICBjb250ZXh0LmxpbmVUbyh0aGlzLngsIHRoaXMueSlcclxuICAgIGNvbnRleHQuc3Ryb2tlKClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcmFuZG9tSW50IH0gZnJvbSAnLi4vLi4vbGliL3JhbmRvbSdcclxuXHJcbmltcG9ydCBFeHBlcmltZW50cyBmcm9tICcuLi8uLi9jbGFzc2VzL0V4cGVyaW1lbnRzJ1xyXG5pbXBvcnQgV2Fsa2VyIGZyb20gJy4vV2Fsa2VyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vdCBleHRlbmRzIEV4cGVyaW1lbnRzIHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcblxyXG4gICAgdGhpcy53YWxrZXJzID0gbnVsbFxyXG4gICAgdGhpcy53YWxrZXJzTGVuZ3RoID0gbnVsbFxyXG4gICAgdGhpcy53YWxrZXJzQ29sb3IgPSBudWxsXHJcblxyXG4gICAgdGhpcy5jcmVhdGVXYWxrZXJzKClcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVXYWxrZXIgKCkge1xyXG4gICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9yc1t0aGlzLndhbGtlcnNDb2xvcl1bcmFuZG9tSW50KDAsIHRoaXMuY29sb3JzLmxlbmd0aCAtIDEpXVxyXG4gICAgY29uc3QgeCA9IHJhbmRvbUludCgwLCB3aW5kb3cuaW5uZXJXaWR0aClcclxuICAgIGNvbnN0IHkgPSByYW5kb21JbnQoMCwgd2luZG93LmlubmVySGVpZ2h0KVxyXG5cclxuICAgIGNvbnN0IHdhbGtlciA9IG5ldyBXYWxrZXIoY29sb3IsIHgsIHkpXHJcblxyXG4gICAgdGhpcy53YWxrZXJzLnB1c2god2Fsa2VyKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlV2Fsa2VycyAoKSB7XHJcbiAgICB0aGlzLndhbGtlcnMgPSBbXVxyXG4gICAgdGhpcy53YWxrZXJzTGVuZ3RoID0gMjUwMFxyXG4gICAgdGhpcy53YWxrZXJzQ29sb3IgPSByYW5kb21JbnQoMCwgdGhpcy5jb2xvcnMubGVuZ3RoIC0gMSlcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLndhbGtlcnNMZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLmNyZWF0ZVdhbGtlcigpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUgKCkge1xyXG4gICAgc3VwZXIudXBkYXRlKClcclxuXHJcbiAgICB0aGlzLnN0YXRzLmJlZ2luKClcclxuXHJcbiAgICB0aGlzLndhbGtlcnMuZm9yRWFjaCh3YWxrZXIgPT4gd2Fsa2VyLmRyYXcodGhpcy5jb250ZXh0KSlcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjFcclxuICAgIHRoaXMuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnbGlnaHRlcidcclxuXHJcbiAgICB0aGlzLnN0YXRzLmVuZCgpXHJcbiAgfVxyXG5cclxuICBkYmxjbGljayAoKSB7XHJcbiAgICBzdXBlci5kYmxjbGljaygpXHJcblxyXG4gICAgdGhpcy5jcmVhdGVXYWxrZXJzKClcclxuICB9XHJcblxyXG4gIHJlc2l6ZSAoKSB7XHJcbiAgICBzdXBlci5yZXNpemUoKVxyXG5cclxuICAgIHRoaXMuY3JlYXRlV2Fsa2VycygpXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IGNvbnN0cmFpbiwgbGVycCB9IGZyb20gJy4uLy4uL2xpYi9tYXRoJ1xyXG5pbXBvcnQgeyByYW5kb21BcmJpdHJhcnkgfSBmcm9tICcuLi8uLi9saWIvcmFuZG9tJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2lyY2xlIHtcclxuICBjb25zdHJ1Y3RvciAoeCwgeSwgcmFkaXVzLCBjb2xvcikge1xyXG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXNcclxuXHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3JcclxuXHJcbiAgICB0aGlzLnggPSB4XHJcbiAgICB0aGlzLnkgPSB5XHJcblxyXG4gICAgdGhpcy5vcGFjaXR5ID0gMFxyXG5cclxuICAgIHRoaXMubGVycCA9IHJhbmRvbUFyYml0cmFyeSgwLjA1LCAwLjEpXHJcbiAgfVxyXG5cclxuICBtb3ZlICh4LCB5KSB7XHJcbiAgICB0aGlzLm9wYWNpdHkgPSBjb25zdHJhaW4odGhpcy5vcGFjaXR5ICsgMC4xLCAwLCAxKVxyXG5cclxuICAgIHRoaXMucmFkaXVzID0gbGVycCh0aGlzLnJhZGl1cywgMCwgdGhpcy5sZXJwKVxyXG5cclxuICAgIHRoaXMueCA9IGxlcnAodGhpcy54LCB4LCB0aGlzLmxlcnApXHJcbiAgICB0aGlzLnkgPSBsZXJwKHRoaXMueSwgeSwgdGhpcy5sZXJwKVxyXG5cclxuICAgIHRoaXMuYWxpdmUgPSB0aGlzLnJhZGl1cyA+IDAuMDFcclxuICB9XHJcblxyXG4gIGRyYXcgKGNvbnRleHQpIHtcclxuICAgIGNvbnRleHQubGluZVdpZHRoID0gMlxyXG5cclxuICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLm9wYWNpdHlcclxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2xpZ2h0ZXInXHJcblxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKVxyXG4gICAgY29udGV4dC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSlcclxuICAgIGNvbnRleHQuY2xvc2VQYXRoKClcclxuXHJcbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvclxyXG4gICAgY29udGV4dC5zdHJva2UoKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyByYW5kb21JbnQsIHJhbmRvbU5vcm1hbGl6ZWQgfSBmcm9tICcuLi8uLi9saWIvcmFuZG9tJ1xyXG5cclxuaW1wb3J0IEV4cGVyaW1lbnRzIGZyb20gJy4uLy4uL2NsYXNzZXMvRXhwZXJpbWVudHMnXHJcbmltcG9ydCBDaXJjbGUgZnJvbSAnLi9DaXJjbGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZW9uIGV4dGVuZHMgRXhwZXJpbWVudHMge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKClcclxuXHJcbiAgICB0aGlzLmNpcmNsZXMgPSBudWxsXHJcbiAgICB0aGlzLmNpcmNsZXNMZW5ndGggPSBudWxsXHJcbiAgICB0aGlzLmNpcmNsZXNDb2xvciA9IG51bGxcclxuXHJcbiAgICB0aGlzLmNyZWF0ZUNpcmNsZXMoKVxyXG5cclxuICAgIHRoaXMudXBkYXRlKClcclxuICB9XHJcblxyXG4gIGNyZWF0ZUNpcmNsZSAoKSB7XHJcbiAgICBjb25zdCB4ID0gdGhpcy5tb3VzZS54ICsgKHJhbmRvbU5vcm1hbGl6ZWQoKSAqIDIwMClcclxuICAgIGNvbnN0IHkgPSB0aGlzLm1vdXNlLnkgKyAocmFuZG9tTm9ybWFsaXplZCgpICogMjAwKVxyXG4gICAgY29uc3QgcmFkaXVzID0gMTAgKyBNYXRoLmFicyhyYW5kb21Ob3JtYWxpemVkKCkgKiAxMClcclxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcnNbdGhpcy5jaXJjbGVzQ29sb3JdW3JhbmRvbUludCgwLCB0aGlzLmNvbG9ycy5sZW5ndGggLSAxKV1cclxuXHJcbiAgICBjb25zdCBjaXJjbGUgPSBuZXcgQ2lyY2xlKHgsIHksIHJhZGl1cywgY29sb3IpXHJcblxyXG4gICAgdGhpcy5jaXJjbGVzLnB1c2goY2lyY2xlKVxyXG4gIH1cclxuXHJcbiAgZGVzdHJveUNpcmNsZSAoaW5kZXgpIHtcclxuICAgIHRoaXMuY2lyY2xlcy5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVDaXJjbGVzICgpIHtcclxuICAgIHRoaXMuY2lyY2xlcyA9IFtdXHJcbiAgICB0aGlzLmNpcmNsZXNMZW5ndGggPSA1MDBcclxuICAgIHRoaXMuY2lyY2xlc0NvbG9yID0gcmFuZG9tSW50KDAsIHRoaXMuY29sb3JzLmxlbmd0aCAtIDEpXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5jaXJjbGVzTGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5jcmVhdGVDaXJjbGUoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlICgpIHtcclxuICAgIHN1cGVyLnVwZGF0ZSgpXHJcblxyXG4gICAgdGhpcy5zdGF0cy5iZWdpbigpXHJcblxyXG4gICAgdGhpcy5jaXJjbGVzLmZvckVhY2goKGNpcmNsZSwgaW5kZXgpID0+IHtcclxuICAgICAgY2lyY2xlLm1vdmUodGhpcy5tb3VzZS54LCB0aGlzLm1vdXNlLnkpXHJcbiAgICAgIGNpcmNsZS5kcmF3KHRoaXMuY29udGV4dClcclxuXHJcbiAgICAgIGlmICghY2lyY2xlLmFsaXZlKSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95Q2lyY2xlKGluZGV4KVxyXG4gICAgICAgIHRoaXMuY3JlYXRlQ2lyY2xlKClcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxXHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJ1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgwLCAwLCAwLCAwLjEpJ1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXHJcblxyXG4gICAgdGhpcy5zdGF0cy5lbmQoKVxyXG4gIH1cclxuXHJcbiAgZGJsY2xpY2sgKCkge1xyXG4gICAgc3VwZXIuZGJsY2xpY2soKVxyXG5cclxuICAgIHRoaXMuY3JlYXRlQ2lyY2xlcygpXHJcbiAgfVxyXG5cclxuICByZXNpemUgKCkge1xyXG4gICAgc3VwZXIucmVzaXplKClcclxuXHJcbiAgICB0aGlzLmNyZWF0ZUNpcmNsZXMoKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyByYW5kb21BcmJpdHJhcnkgfSBmcm9tICcuLi8uLi9saWIvcmFuZG9tJ1xyXG5cclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9jbGFzc2VzL1ZlY3RvcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmVyIHtcclxuICBjb25zdHJ1Y3RvciAoeCwgeSwgcmFkaXVzLCBjb2xvcikge1xyXG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXNcclxuXHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3JcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IFZlY3Rvcih4LCB5KVxyXG4gICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWN0b3IoMCwgMClcclxuICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gbmV3IFZlY3RvcigwLCAwKVxyXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBuZXcgVmVjdG9yKDAsIDApXHJcblxyXG4gICAgdGhpcy5tdWx0aXBsaWVyID0gcmFuZG9tQXJiaXRyYXJ5KDAuNSwgMSlcclxuICB9XHJcblxyXG4gIGNoZWNrICgpIHtcclxuICAgIGlmICh0aGlzLnBvc2l0aW9uLnggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnggPSAwXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9zaXRpb24ueCA8IDApIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi54ID0gd2luZG93LmlubmVyV2lkdGhcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbi55ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24ueSA9IDBcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbi55IDwgMCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHRcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZSAobW91c2UsIG11bHRpcGxpZXIpIHtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gVmVjdG9yLnN1Yihtb3VzZSwgdGhpcy5wb3NpdGlvbilcclxuICAgIHRoaXMuZGlyZWN0aW9uLm5vcm1hbGl6ZSgpXHJcbiAgICB0aGlzLmRpcmVjdGlvbi5tdWx0KHRoaXMubXVsdGlwbGllcilcclxuICAgIHRoaXMuZGlyZWN0aW9uLm11bHQobXVsdGlwbGllcilcclxuXHJcbiAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IHRoaXMuZGlyZWN0aW9uXHJcblxyXG4gICAgdGhpcy52ZWxvY2l0eS5hZGQodGhpcy5hY2NlbGVyYXRpb24pXHJcbiAgICB0aGlzLnZlbG9jaXR5LmxpbWl0KDE1KVxyXG5cclxuICAgIHRoaXMucG9zaXRpb24uYWRkKHRoaXMudmVsb2NpdHkpXHJcbiAgfVxyXG5cclxuICBkcmF3IChjb250ZXh0KSB7XHJcbiAgICB0aGlzLmNoZWNrKClcclxuXHJcbiAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdsaWdodGVyJ1xyXG5cclxuICAgIGNvbnRleHQuYmVnaW5QYXRoKClcclxuICAgIGNvbnRleHQuYXJjKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEkpXHJcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpXHJcblxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yXHJcbiAgICBjb250ZXh0LmZpbGwoKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyByYW5kb21JbnQgfSBmcm9tICcuLi8uLi9saWIvcmFuZG9tJ1xyXG5cclxuaW1wb3J0IEV4cGVyaW1lbnRzIGZyb20gJy4uLy4uL2NsYXNzZXMvRXhwZXJpbWVudHMnXHJcbmltcG9ydCBNb3ZlciBmcm9tICcuL01vdmVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXRvbSBleHRlbmRzIEV4cGVyaW1lbnRzIHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcblxyXG4gICAgdGhpcy5tb3ZlcnMgPSBudWxsXHJcbiAgICB0aGlzLm1vdmVyc0xlbmd0aCA9IG51bGxcclxuICAgIHRoaXMubW92ZXJzQ29sb3IgPSBudWxsXHJcbiAgICB0aGlzLm1vdmVyc011bHRpcGx5ID0gbnVsbFxyXG5cclxuICAgIHRoaXMuY3JlYXRlTW92ZXJzKClcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVNb3ZlciAoKSB7XHJcbiAgICBjb25zdCB4ID0gcmFuZG9tSW50KDAsIHdpbmRvdy5pbm5lcldpZHRoKVxyXG4gICAgY29uc3QgeSA9IHJhbmRvbUludCgwLCB3aW5kb3cuaW5uZXJIZWlnaHQpXHJcbiAgICBjb25zdCByYWRpdXMgPSByYW5kb21JbnQoMSwgNSlcclxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcnNbdGhpcy5tb3ZlcnNDb2xvcl1bcmFuZG9tSW50KDAsIHRoaXMuY29sb3JzLmxlbmd0aCAtIDEpXVxyXG5cclxuICAgIGNvbnN0IG1vdmVyID0gbmV3IE1vdmVyKHgsIHksIHJhZGl1cywgY29sb3IpXHJcblxyXG4gICAgdGhpcy5tb3ZlcnMucHVzaChtb3ZlcilcclxuICB9XHJcblxyXG4gIGNyZWF0ZU1vdmVycyAoKSB7XHJcbiAgICB0aGlzLm1vdmVycyA9IFtdXHJcbiAgICB0aGlzLm1vdmVyc0xlbmd0aCA9IDI1MFxyXG4gICAgdGhpcy5tb3ZlcnNDb2xvciA9IHJhbmRvbUludCgwLCB0aGlzLmNvbG9ycy5sZW5ndGggLSAxKVxyXG4gICAgdGhpcy5tb3ZlcnNNdWx0aXBseSA9IDFcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLm1vdmVyc0xlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuY3JlYXRlTW92ZXIoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlICgpIHtcclxuICAgIHN1cGVyLnVwZGF0ZSgpXHJcblxyXG4gICAgdGhpcy5zdGF0cy5iZWdpbigpXHJcblxyXG4gICAgdGhpcy5tb3ZlcnMuZm9yRWFjaCgobW92ZXIsIGluZGV4KSA9PiB7XHJcbiAgICAgIG1vdmVyLnVwZGF0ZSh0aGlzLm1vdXNlLCB0aGlzLm1vdmVyc011bHRpcGx5KVxyXG4gICAgICBtb3Zlci5kcmF3KHRoaXMuY29udGV4dClcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMVxyXG4gICAgdGhpcy5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3ZlcidcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgMC4xKSdcclxuICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxyXG5cclxuICAgIHRoaXMuc3RhdHMuZW5kKClcclxuICB9XHJcblxyXG4gIGRibGNsaWNrICgpIHtcclxuICAgIHN1cGVyLmRibGNsaWNrKClcclxuXHJcbiAgICB0aGlzLmNyZWF0ZU1vdmVycygpXHJcbiAgfVxyXG5cclxuICBtb3VzZWRvd24gKCkge1xyXG4gICAgc3VwZXIubW91c2Vkb3duKClcclxuXHJcbiAgICB0aGlzLm1vdmVyc011bHRpcGx5ICo9IC0xXHJcbiAgfVxyXG5cclxuICBtb3VzZXVwICgpIHtcclxuICAgIHN1cGVyLm1vdXNldXAoKVxyXG5cclxuICAgIHRoaXMubW92ZXJzTXVsdGlwbHkgKj0gLTFcclxuICB9XHJcblxyXG4gIHJlc2l6ZSAoKSB7XHJcbiAgICBzdXBlci5yZXNpemUoKVxyXG5cclxuICAgIHRoaXMuY3JlYXRlTW92ZXJzKClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgY29uc3RyYWluLCBtYXAgfSBmcm9tICcuLi8uLi9saWIvbWF0aCdcclxuaW1wb3J0IHsgbm9pc2UsIG5vaXNlU2VlZCB9IGZyb20gJy4uLy4uL2xpYi9wZXJsaW4nXHJcblxyXG4vLyBpbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnXHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vLi4vY2xhc3Nlcy9WZWN0b3InXHJcblxyXG5ub2lzZVNlZWQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpZWxkIHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSAxMFxyXG5cclxuICAgIHRoaXMuY29sdW1ucyA9IE1hdGguY2VpbCh3aW5kb3cuaW5uZXJXaWR0aCAvIHRoaXMucmVzb2x1dGlvbilcclxuICAgIHRoaXMucm93cyA9IE1hdGguY2VpbCh3aW5kb3cuaW5uZXJIZWlnaHQgLyB0aGlzLnJlc29sdXRpb24pXHJcblxyXG4gICAgdGhpcy5maWVsZCA9IFtdXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuY29sdW1uczsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgdGhpcy5maWVsZC5wdXNoKFtdKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZmllbGQpXHJcblxyXG4gICAgdGhpcy5ub2lzZSA9IDBcclxuXHJcbiAgICB0aGlzLmNyZWF0ZSgpXHJcbiAgfVxyXG5cclxuICBjcmVhdGUgKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIHggPSAwOyBpIDwgdGhpcy5jb2x1bW5zOyBpKyspIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDAsIHkgPSAwOyBqIDwgdGhpcy5yb3dzOyBqKyspIHtcclxuICAgICAgICBjb25zdCBhbmdsZSA9IG1hcChub2lzZSh4LCB5LCB0aGlzLm5vaXNlKSwgMCwgMSwgMCwgTWF0aC5QSSAqIDIpXHJcblxyXG4gICAgICAgIC8vIHRoaXMuY2VsbFtpXVtqXSA9IG5ldyBDZWxsKGksIGosIGFuZ2xlKVxyXG4gICAgICAgIHRoaXMuZmllbGRbaV1bal0gPSBuZXcgVmVjdG9yKE1hdGguY29zKGFuZ2xlKSwgTWF0aC5zaW4oYW5nbGUpKVxyXG5cclxuICAgICAgICB5ICs9IDAuMVxyXG4gICAgICB9XHJcblxyXG4gICAgICB4ICs9IDAuMVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlICgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwLCB4ID0gMDsgaSA8IHRoaXMuY29sdW1uczsgaSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwLCB5ID0gMDsgaiA8IHRoaXMucm93czsgaisrKSB7XHJcbiAgICAgICAgY29uc3QgYW5nbGUgPSBtYXAobm9pc2UoeCwgeSwgdGhpcy5ub2lzZSksIDAsIDEsIDAsIE1hdGguUEkgKiAyKVxyXG5cclxuICAgICAgICAvLyB0aGlzLmNlbGxbaV1bal0udXBkYXRlKGFuZ2xlKVxyXG4gICAgICAgIHRoaXMuZmllbGRbaV1bal0uc2V0KE1hdGguY29zKGFuZ2xlKSwgTWF0aC5zaW4oYW5nbGUpKVxyXG5cclxuICAgICAgICB5ICs9IDAuMVxyXG4gICAgICB9XHJcblxyXG4gICAgICB4ICs9IDAuMVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubm9pc2UgKz0gMC4wMVxyXG4gIH1cclxuXHJcbiAgZHJhdyAoY29udGV4dCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnM7IGkrKykge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMucm93czsgaisrKSB7XHJcbiAgICAgICAgLy8gdGhpcy5jZWxsW2ldW2pdLmRyYXcoY29udGV4dClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9va3VwIChwb3NpdGlvbikge1xyXG4gICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihjb25zdHJhaW4ocG9zaXRpb24ueCAvIHRoaXMucmVzb2x1dGlvbiwgMCwgdGhpcy5jb2x1bW5zIC0gMSkpXHJcbiAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKGNvbnN0cmFpbihwb3NpdGlvbi55IC8gdGhpcy5yZXNvbHV0aW9uLCAwLCB0aGlzLnJvd3MgLSAxKSlcclxuXHJcbiAgICByZXR1cm4gdGhpcy5maWVsZFtjb2x1bW5dW3Jvd10uY29weSgpXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi4vLi4vY2xhc3Nlcy9WZWN0b3InXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNsZSB7XHJcbiAgY29uc3RydWN0b3IgKHgsIHksIGNvbG9yLCByYWRpdXMsIHNwZWVkLCBmb3JjZSkge1xyXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yXHJcblxyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IoeCwgeSlcclxuICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gbmV3IFZlY3RvcigwLCAwKVxyXG4gICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWN0b3IoMCwgMClcclxuXHJcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1c1xyXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkXHJcbiAgICB0aGlzLmZvcmNlID0gZm9yY2VcclxuICB9XHJcblxyXG4gIGZvbGxvdyAoZmxvdykge1xyXG4gICAgY29uc3QgZGVzaXJlZCA9IGZsb3cubG9va3VwKHRoaXMucG9zaXRpb24pXHJcblxuICAgIGRlc2lyZWQubXVsdCh0aGlzLnNwZWVkKVxyXG5cclxuICAgIGNvbnN0IHN0ZWVyID0gVmVjdG9yLnN1YihkZXNpcmVkLCB0aGlzLnZlbG9jaXR5KVxyXG5cbiAgICBzdGVlci5saW1pdCh0aGlzLmZvcmNlKVxyXG5cclxuICAgIHRoaXMuYXBwbHkoc3RlZXIpXHJcbiAgfVxyXG5cclxuICBhcHBseSAoZm9yY2UpIHtcclxuICAgIHRoaXMuYWNjZWxlcmF0aW9uLmFkZChmb3JjZSlcclxuICB9XHJcblxyXG4gIHVwZGF0ZSAoKSB7XHJcbiAgICB0aGlzLnZlbG9jaXR5LmFkZCh0aGlzLmFjY2VsZXJhdGlvbilcclxuICAgIHRoaXMudmVsb2NpdHkubGltaXQodGhpcy5zcGVlZClcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLnZlbG9jaXR5KVxyXG5cclxuICAgIHRoaXMuYWNjZWxlcmF0aW9uLm11bHQoMClcclxuICB9XHJcblxyXG4gIGNoZWNrICgpIHtcclxuICAgIGlmICh0aGlzLnBvc2l0aW9uLnggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnggPSAwXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9zaXRpb24ueCA8IDApIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbi54ID0gd2luZG93LmlubmVyV2lkdGhcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbi55ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XHJcbiAgICAgIHRoaXMucG9zaXRpb24ueSA9IDBcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbi55IDwgMCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHRcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRyYXcgKGNvbnRleHQpIHtcclxuICAgIGNvbnRleHQubGluZVdpZHRoID0gMlxyXG5cclxuICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2xpZ2h0ZXInXHJcblxyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKVxyXG4gICAgY29udGV4dC5hcmModGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIDEsIDAsIDIgKiBNYXRoLlBJKVxyXG4gICAgY29udGV4dC5jbG9zZVBhdGgoKVxyXG5cclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvclxyXG4gICAgY29udGV4dC5maWxsKClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcmFuZG9tQXJiaXRyYXJ5LCByYW5kb21JbnQgfSBmcm9tICcuLi8uLi9saWIvcmFuZG9tJ1xyXG5cclxuaW1wb3J0IEV4cGVyaW1lbnRzIGZyb20gJy4uLy4uL2NsYXNzZXMvRXhwZXJpbWVudHMnXHJcbmltcG9ydCBGaWVsZCBmcm9tICcuL0ZpZWxkJ1xyXG5pbXBvcnQgUGFydGljbGUgZnJvbSAnLi9QYXJ0aWNsZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsb3cgZXh0ZW5kcyBFeHBlcmltZW50cyB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG5cclxuICAgIHRoaXMuZmllbGQgPSBudWxsXHJcblxyXG4gICAgdGhpcy5wYXJ0aWNsZXMgPSBudWxsXHJcbiAgICB0aGlzLnBhcnRpY2xlc0xlbmd0aCA9IG51bGxcclxuICAgIHRoaXMucGFydGljbGVzQ29sb3IgPSBudWxsXHJcblxyXG4gICAgdGhpcy5jcmVhdGVGaWVsZCgpXHJcbiAgICB0aGlzLmNyZWF0ZVBhcnRpY2xlcygpXHJcblxyXG4gICAgdGhpcy51cGRhdGUoKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlRmllbGQgKCkge1xyXG4gICAgdGhpcy5maWVsZCA9IG5ldyBGaWVsZCgpXHJcbiAgICB0aGlzLmZpZWxkLmRyYXcodGhpcy5jb250ZXh0KVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlUGFydGljbGUgKCkge1xyXG4gICAgY29uc3QgeCA9IHJhbmRvbUludCgwLCB3aW5kb3cuaW5uZXJXaWR0aClcclxuICAgIGNvbnN0IHkgPSByYW5kb21JbnQoMCwgd2luZG93LmlubmVySGVpZ2h0KVxyXG4gICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9yc1t0aGlzLnBhcnRpY2xlc0NvbG9yXVtyYW5kb21JbnQoMCwgdGhpcy5jb2xvcnMubGVuZ3RoIC0gMSldXHJcbiAgICBjb25zdCByYWRpdXMgPSByYW5kb21BcmJpdHJhcnkoMSwgNilcclxuICAgIGNvbnN0IHNwZWVkID0gcmFuZG9tSW50KDQsIDEyKVxyXG4gICAgY29uc3QgZm9yY2UgPSByYW5kb21BcmJpdHJhcnkoMC40LCAxKVxyXG5cclxuICAgIGNvbnN0IHBhcnRpY2xlID0gbmV3IFBhcnRpY2xlKHgsIHksIGNvbG9yLCByYWRpdXMsIHNwZWVkLCBmb3JjZSlcclxuXHJcbiAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKHBhcnRpY2xlKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlUGFydGljbGVzICgpIHtcclxuICAgIHRoaXMucGFydGljbGVzID0gW11cclxuICAgIHRoaXMucGFydGljbGVzTGVuZ3RoID0gMTAwMFxyXG4gICAgdGhpcy5wYXJ0aWNsZXNDb2xvciA9IHJhbmRvbUludCgwLCB0aGlzLmNvbG9ycy5sZW5ndGggLSAxKVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMucGFydGljbGVzTGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUgKCkge1xyXG4gICAgc3VwZXIudXBkYXRlKClcclxuXHJcbiAgICB0aGlzLnN0YXRzLmJlZ2luKClcclxuXHJcbiAgICB0aGlzLmZpZWxkLnVwZGF0ZSgpXHJcblxyXG4gICAgdGhpcy5wYXJ0aWNsZXMuZm9yRWFjaCgocGFydGljbGUsIGluZGV4KSA9PiB7XHJcbiAgICAgIHBhcnRpY2xlLmZvbGxvdyh0aGlzLmZpZWxkKVxyXG4gICAgICBwYXJ0aWNsZS51cGRhdGUoKVxyXG4gICAgICBwYXJ0aWNsZS5jaGVjaygpXHJcbiAgICAgIHBhcnRpY2xlLmRyYXcodGhpcy5jb250ZXh0KVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxXHJcbiAgICB0aGlzLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJ1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgwLCAwLCAwLCAwLjEpJ1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXHJcblxyXG4gICAgdGhpcy5zdGF0cy5lbmQoKVxyXG4gIH1cclxuXHJcbiAgZGJsY2xpY2sgKCkge1xyXG4gICAgc3VwZXIuZGJsY2xpY2soKVxyXG5cclxuICAgIHRoaXMuY3JlYXRlRmllbGQoKVxyXG4gICAgdGhpcy5jcmVhdGVQYXJ0aWNsZXMoKVxyXG4gIH1cclxuXHJcbiAgcmVzaXplICgpIHtcclxuICAgIHN1cGVyLnJlc2l6ZSgpXHJcblxyXG4gICAgdGhpcy5jcmVhdGVGaWVsZCgpXHJcbiAgICB0aGlzLmNyZWF0ZVBhcnRpY2xlcygpXHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb25zdHJhaW5zIGEgdmFsdWUgYmV0d2VlbiBhIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29uc3RyYWluIChuLCBsb3csIGhpZ2gpIHtcclxuICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4obiwgaGlnaCksIGxvdylcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50cy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXN0ICh4MSwgeTEsIHoxLCB4MiwgeTIsIHoyKSB7XHJcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQpIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoKHoxIC0geDEpICogKHoxIC0geDEpICsgKHgyIC0geTEpICogKHgyIC0geTEpKVxyXG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNikge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCgoeDIgLSB4MSkgKiAoeDIgLSB4MSkgKyAoeTIgLSB5MSkgKiAoeTIgLSB5MSkgKyAoejIgLSB6MSkgKiAoejIgLSB6MSkpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBhIG51bWJlciBiZXR3ZWVuIHR3byBudW1iZXJzIGF0IGEgc3BlY2lmaWMgaW5jcmVtZW50LiBUaGUgYW10XHJcbiAqIHBhcmFtZXRlciBpcyB0aGUgYW1vdW50IHRvIGludGVycG9sYXRlIGJldHdlZW4gdGhlIHR3byB2YWx1ZXMgd2hlcmUgMC4wXHJcbiAqIGVxdWFsIHRvIHRoZSBmaXJzdCBwb2ludCwgMC4xIGlzIHZlcnkgbmVhciB0aGUgZmlyc3QgcG9pbnQsIDAuNSBpc1xyXG4gKiBoYWxmLXdheSBpbiBiZXR3ZWVuLCBldGMuIFRoZSBsZXJwIGZ1bmN0aW9uIGlzIGNvbnZlbmllbnQgZm9yIGNyZWF0aW5nXHJcbiAqIG1vdGlvbiBhbG9uZyBhIHN0cmFpZ2h0IHBhdGggYW5kIGZvciBkcmF3aW5nIGRvdHRlZCBsaW5lcy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsZXJwIChzdGFydCwgc3RvcCwgYW10KSB7XHJcbiAgcmV0dXJuIGFtdCAqIChzdG9wIC0gc3RhcnQpICsgc3RhcnRcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIG1hZ25pdHVkZSAob3IgbGVuZ3RoKSBvZiBhIHZlY3Rvci4gQSB2ZWN0b3IgaXMgYSBkaXJlY3Rpb25cclxuICogaW4gc3BhY2UgY29tbW9ubHkgdXNlZCBpbiBjb21wdXRlciBncmFwaGljcyBhbmQgbGluZWFyIGFsZ2VicmEuIEJlY2F1c2UgaXRcclxuICogaGFzIG5vIFwic3RhcnRcIiBwb3NpdGlvbiwgdGhlIG1hZ25pdHVkZSBvZiBhIHZlY3RvciBjYW4gYmUgdGhvdWdodCBvZiBhc1xyXG4gKiB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgY29vcmRpbmF0ZSAwLDAgdG8gaXRzIHgseSB2YWx1ZS4gVGhlcmVmb3JlLCBtYWcoKSBpc1xyXG4gKiBhIHNob3J0Y3V0IGZvciB3cml0aW5nIGRpc3QoMCwgMCwgeCwgeSkuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWFnICh4LCB5KSB7XHJcbiAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KVxyXG59XHJcblxyXG4vKipcclxuICogUmUtbWFwcyBhIG51bWJlciBmcm9tIG9uZSByYW5nZSB0byBhbm90aGVyLlxyXG4gKlxyXG4gKiBJbiB0aGUgZmlyc3QgZXhhbXBsZSBhYm92ZSwgdGhlIG51bWJlciAyNSBpcyBjb252ZXJ0ZWQgZnJvbSBhIHZhbHVlIGluIHRoZVxyXG4gKiByYW5nZSBvZiAwIHRvIDEwMCBpbnRvIGEgdmFsdWUgdGhhdCByYW5nZXMgZnJvbSB0aGUgbGVmdCBlZGdlIG9mIHRoZVxyXG4gKiB3aW5kb3cgKDApIHRvIHRoZSByaWdodCBlZGdlICh3aWR0aCkuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWFwIChuLCBzdGFydDEsIHN0b3AxLCBzdGFydDIsIHN0b3AyKSB7XHJcbiAgcmV0dXJuICgobiAtIHN0YXJ0MSkgLyAoc3RvcDEgLSBzdGFydDEpKSAqIChzdG9wMiAtIHN0YXJ0MikgKyBzdGFydDJcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZXMgdGhlIGxhcmdlc3QgdmFsdWUgaW4gYSBzZXF1ZW5jZSBvZiBudW1iZXJzLCBhbmQgdGhlbiByZXR1cm5zXHJcbiAqIHRoYXQgdmFsdWUuIG1heCgpIGFjY2VwdHMgYW55IG51bWJlciBvZiBOdW1iZXIgcGFyYW1ldGVycywgb3IgYW4gQXJyYXlcclxuICogb2YgYW55IGxlbmd0aC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXggKCkge1xyXG4gIGlmIChhcmd1bWVudHNbMF0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIGFyZ3VtZW50c1swXSlcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIGFyZ3VtZW50cylcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHRoZSBzbWFsbGVzdCB2YWx1ZSBpbiBhIHNlcXVlbmNlIG9mIG51bWJlcnMsIGFuZCB0aGVuIHJldHVybnNcclxuICogdGhhdCB2YWx1ZS4gbWluKCkgYWNjZXB0cyBhbnkgbnVtYmVyIG9mIE51bWJlciBwYXJhbWV0ZXJzLCBvciBhbiBBcnJheVxyXG4gKiBvZiBhbnkgbGVuZ3RoLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1pbiAoKSB7XHJcbiAgaWYgKGFyZ3VtZW50c1swXSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICByZXR1cm4gTWF0aC5taW4uYXBwbHkobnVsbCwgYXJndW1lbnRzWzBdKVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gTWF0aC5taW4uYXBwbHkobnVsbCwgYXJndW1lbnRzKVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZXMgYSBudW1iZXIgZnJvbSBhbm90aGVyIHJhbmdlIGludG8gYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEuXHJcbiAqIElkZW50aWNhbCB0byBtYXAodmFsdWUsIGxvdywgaGlnaCwgMCwgMSkuXHJcbiAqXHJcbiAqIE51bWJlcnMgb3V0c2lkZSBvZiB0aGUgcmFuZ2UgYXJlIG5vdCBjbGFtcGVkIHRvIDAgYW5kIDEsIGJlY2F1c2VcclxuICogb3V0LW9mLXJhbmdlIHZhbHVlcyBhcmUgb2Z0ZW4gaW50ZW50aW9uYWwgYW5kIHVzZWZ1bC4gKFNlZSB0aGUgc2Vjb25kXHJcbiAqIGV4YW1wbGUgYWJvdmUuKVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5vcm0gKG4sIHN0YXJ0LCBzdG9wKSB7XHJcbiAgcmV0dXJuIHRoaXMubWFwKG4sIHN0YXJ0LCBzdG9wLCAwLCAxKVxyXG59XHJcbiIsInZhciBQRVJMSU5fWVdSQVBCID0gNDtcclxudmFyIFBFUkxJTl9ZV1JBUCA9IDE8PFBFUkxJTl9ZV1JBUEI7XHJcbnZhciBQRVJMSU5fWldSQVBCID0gODtcclxudmFyIFBFUkxJTl9aV1JBUCA9IDE8PFBFUkxJTl9aV1JBUEI7XHJcbnZhciBQRVJMSU5fU0laRSA9IDQwOTU7XHJcblxyXG52YXIgcGVybGluX29jdGF2ZXMgPSA0OyAvLyBkZWZhdWx0IHRvIG1lZGl1bSBzbW9vdGhcclxudmFyIHBlcmxpbl9hbXBfZmFsbG9mZiA9IDAuNTsgLy8gNTAlIHJlZHVjdGlvbi9vY3RhdmVcclxuXHJcbnZhciBzY2FsZWRfY29zaW5lID0gZnVuY3Rpb24oaSkge1xyXG4gIHJldHVybiAwLjUqKDEuMC1NYXRoLmNvcyhpKk1hdGguUEkpKTtcclxufTtcclxuXHJcbnZhciBwZXJsaW47IC8vIHdpbGwgYmUgaW5pdGlhbGl6ZWQgbGF6aWx5IGJ5IG5vaXNlKCkgb3Igbm9pc2VTZWVkKClcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBub2lzZSh4LHkseikge1xyXG4gIHkgPSB5IHx8IDA7XHJcbiAgeiA9IHogfHwgMDtcclxuXHJcbiAgaWYgKHBlcmxpbiA9PSBudWxsKSB7XHJcbiAgICBwZXJsaW4gPSBuZXcgQXJyYXkoUEVSTElOX1NJWkUgKyAxKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgUEVSTElOX1NJWkUgKyAxOyBpKyspIHtcclxuICAgICAgcGVybGluW2ldID0gTWF0aC5yYW5kb20oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICh4PDApIHsgeD0teDsgfVxyXG4gIGlmICh5PDApIHsgeT0teTsgfVxyXG4gIGlmICh6PDApIHsgej0tejsgfVxyXG5cclxuICB2YXIgeGk9TWF0aC5mbG9vcih4KSwgeWk9TWF0aC5mbG9vcih5KSwgemk9TWF0aC5mbG9vcih6KTtcclxuICB2YXIgeGYgPSB4IC0geGk7XHJcbiAgdmFyIHlmID0geSAtIHlpO1xyXG4gIHZhciB6ZiA9IHogLSB6aTtcclxuICB2YXIgcnhmLCByeWY7XHJcblxyXG4gIHZhciByPTA7XHJcbiAgdmFyIGFtcGw9MC41O1xyXG5cclxuICB2YXIgbjEsbjIsbjM7XHJcblxyXG4gIGZvciAodmFyIG89MDsgbzxwZXJsaW5fb2N0YXZlczsgbysrKSB7XHJcbiAgICB2YXIgb2Y9eGkrKHlpPDxQRVJMSU5fWVdSQVBCKSsoemk8PFBFUkxJTl9aV1JBUEIpO1xyXG5cclxuICAgIHJ4ZiA9IHNjYWxlZF9jb3NpbmUoeGYpO1xyXG4gICAgcnlmID0gc2NhbGVkX2Nvc2luZSh5Zik7XHJcblxyXG4gICAgbjEgID0gcGVybGluW29mJlBFUkxJTl9TSVpFXTtcclxuICAgIG4xICs9IHJ4ZioocGVybGluWyhvZisxKSZQRVJMSU5fU0laRV0tbjEpO1xyXG4gICAgbjIgID0gcGVybGluWyhvZitQRVJMSU5fWVdSQVApJlBFUkxJTl9TSVpFXTtcclxuICAgIG4yICs9IHJ4ZioocGVybGluWyhvZitQRVJMSU5fWVdSQVArMSkmUEVSTElOX1NJWkVdLW4yKTtcclxuICAgIG4xICs9IHJ5ZioobjItbjEpO1xyXG5cclxuICAgIG9mICs9IFBFUkxJTl9aV1JBUDtcclxuICAgIG4yICA9IHBlcmxpbltvZiZQRVJMSU5fU0laRV07XHJcbiAgICBuMiArPSByeGYqKHBlcmxpblsob2YrMSkmUEVSTElOX1NJWkVdLW4yKTtcclxuICAgIG4zICA9IHBlcmxpblsob2YrUEVSTElOX1lXUkFQKSZQRVJMSU5fU0laRV07XHJcbiAgICBuMyArPSByeGYqKHBlcmxpblsob2YrUEVSTElOX1lXUkFQKzEpJlBFUkxJTl9TSVpFXS1uMyk7XHJcbiAgICBuMiArPSByeWYqKG4zLW4yKTtcclxuXHJcbiAgICBuMSArPSBzY2FsZWRfY29zaW5lKHpmKSoobjItbjEpO1xyXG5cclxuICAgIHIgKz0gbjEqYW1wbDtcclxuICAgIGFtcGwgKj0gcGVybGluX2FtcF9mYWxsb2ZmO1xyXG4gICAgeGk8PD0xO1xyXG4gICAgeGYqPTI7XHJcbiAgICB5aTw8PTE7XHJcbiAgICB5Zio9MjtcclxuICAgIHppPDw9MTtcclxuICAgIHpmKj0yO1xyXG5cclxuICAgIGlmICh4Zj49MS4wKSB7IHhpKys7IHhmLS07IH1cclxuICAgIGlmICh5Zj49MS4wKSB7IHlpKys7IHlmLS07IH1cclxuICAgIGlmICh6Zj49MS4wKSB7IHppKys7IHpmLS07IH1cclxuICB9XHJcbiAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbm9pc2VEZXRhaWwobG9kLCBmYWxsb2ZmKSB7XHJcbiAgLy8gQWRqdXN0cyB0aGUgY2hhcmFjdGVyIGFuZCBsZXZlbCBvZiBkZXRhaWwgcHJvZHVjZWQgYnkgdGhlIFBlcmxpbiBub2lzZVxyXG4gIC8vIEJ5IGRlZmF1bHQsIG5vaXNlIGlzIGNvbXB1dGVkIG92ZXIgNCBvY3RhdmVzXHJcbiAgLy8gaHR0cHM6Ly9wNWpzLm9yZy9yZWZlcmVuY2UvIy9wNS9ub2lzZURldGFpbFxyXG4gIGlmIChsb2Q+MCkgICAgIHsgcGVybGluX29jdGF2ZXM9bG9kOyB9XHJcbiAgaWYgKGZhbGxvZmY+MCkgeyBwZXJsaW5fYW1wX2ZhbGxvZmY9ZmFsbG9mZjsgfVxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5vaXNlU2VlZChzZWVkKSB7XHJcbiAgLy8gTGluZWFyIENvbmdydWVudGlhbCBHZW5lcmF0b3JcclxuICAvLyBWYXJpYW50IG9mIGEgTGVobWFuIEdlbmVyYXRvclxyXG4gIHZhciBsY2cgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBTZXQgdG8gdmFsdWVzIGZyb20gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9OdW1lcmljYWxfUmVjaXBlc1xyXG4gICAgLy8gbSBpcyBiYXNpY2FsbHkgY2hvc2VuIHRvIGJlIGxhcmdlIChhcyBpdCBpcyB0aGUgbWF4IHBlcmlvZClcclxuICAgIC8vIGFuZCBmb3IgaXRzIHJlbGF0aW9uc2hpcHMgdG8gYSBhbmQgY1xyXG4gICAgdmFyIG0gPSA0Mjk0OTY3Mjk2LFxyXG4gICAgLy8gYSAtIDEgc2hvdWxkIGJlIGRpdmlzaWJsZSBieSBtJ3MgcHJpbWUgZmFjdG9yc1xyXG4gICAgYSA9IDE2NjQ1MjUsXHJcbiAgICAgLy8gYyBhbmQgbSBzaG91bGQgYmUgY28tcHJpbWVcclxuICAgIGMgPSAxMDEzOTA0MjIzLFxyXG4gICAgc2VlZCwgejtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNldFNlZWQgOiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICAvLyBwaWNrIGEgcmFuZG9tIHNlZWQgaWYgdmFsIGlzIHVuZGVmaW5lZCBvciBudWxsXHJcbiAgICAgICAgLy8gdGhlID4+PiAwIGNhc3RzIHRoZSBzZWVkIHRvIGFuIHVuc2lnbmVkIDMyLWJpdCBpbnRlZ2VyXHJcbiAgICAgICAgeiA9IHNlZWQgPSAodmFsID09IG51bGwgPyBNYXRoLnJhbmRvbSgpICogbSA6IHZhbCkgPj4+IDA7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldFNlZWQgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gc2VlZDtcclxuICAgICAgfSxcclxuICAgICAgcmFuZCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIGRlZmluZSB0aGUgcmVjdXJyZW5jZSByZWxhdGlvbnNoaXBcclxuICAgICAgICB6ID0gKGEgKiB6ICsgYykgJSBtO1xyXG4gICAgICAgIC8vIHJldHVybiBhIGZsb2F0IGluIFswLCAxKVxyXG4gICAgICAgIC8vIGlmIHogPSBtIHRoZW4geiAvIG0gPSAwIHRoZXJlZm9yZSAoeiAlIG0pIC8gbSA8IDEgYWx3YXlzXHJcbiAgICAgICAgcmV0dXJuIHogLyBtO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0oKSk7XHJcblxyXG4gIGxjZy5zZXRTZWVkKHNlZWQpO1xyXG5cclxuICBwZXJsaW4gPSBuZXcgQXJyYXkoUEVSTElOX1NJWkUgKyAxKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBQRVJMSU5fU0laRSArIDE7IGkrKykge1xyXG4gICAgcGVybGluW2ldID0gbGNnLnJhbmQoKTtcclxuICB9XHJcbn07XHJcbiIsImV4cG9ydCBmdW5jdGlvbiByYW5kb21BcmJpdHJhcnkgKG1pbiwgbWF4KSB7XHJcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tSW50IChtaW4sIG1heCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5kb21Ob3JtYWxpemVkICgpIHtcclxuICBsZXQgeDEsIHgyLCByYWRcclxuXHJcbiAgZG8ge1xyXG4gICAgeDEgPSAyICogTWF0aC5yYW5kb20oKSAtIDFcclxuICAgIHgyID0gMiAqIE1hdGgucmFuZG9tKCkgLSAxXHJcblxyXG4gICAgcmFkID0gKHgxICogeDEpICsgKHgyICogeDIpXHJcbiAgfSB3aGlsZSAocmFkID49IDEgfHwgcmFkID09PSAwKVxyXG5cclxuICBjb25zdCBjID0gTWF0aC5zcXJ0KC0yICogTWF0aC5sb2cocmFkKSAvIHJhZClcclxuXHJcbiAgcmV0dXJuIHgxICogY1xyXG59XHJcbiIsImltcG9ydCBSb290IGZyb20gJy4vZXhwZXJpbWVudHMvMS9pbmRleCdcclxuaW1wb3J0IE5lb24gZnJvbSAnLi9leHBlcmltZW50cy8yL2luZGV4J1xyXG5pbXBvcnQgQXRvbSBmcm9tICcuL2V4cGVyaW1lbnRzLzMvaW5kZXgnXHJcbmltcG9ydCBGbG93IGZyb20gJy4vZXhwZXJpbWVudHMvNC9pbmRleCdcclxuXHJcbmNvbnN0IGV4cGVyaW1lbnRzID0ge1xyXG4gICdyb290JzogUm9vdCxcclxuICAnbmVvbic6IE5lb24sXHJcbiAgJ2F0b20nOiBBdG9tLFxyXG4gICdmbG93JzogRmxvd1xyXG59XHJcblxyXG5jb25zdCBleHBlcmltZW50c05hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXhwZXJpbWVudHMpXHJcbmNvbnN0IGV4cGVyaW1lbnRzU2VsZWN0ZWQgPSAod2luZG93LmxvY2F0aW9uLmhhc2gpID8gd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKSA6IGV4cGVyaW1lbnRzTmFtZXNbMF1cclxuXHJcbmxldCBleHBlcmltZW50c0FjdGl2ZVxyXG5cclxuaWYgKGV4cGVyaW1lbnRzW2V4cGVyaW1lbnRzU2VsZWN0ZWRdKSB7XHJcbiAgZXhwZXJpbWVudHNBY3RpdmUgPSBuZXcgZXhwZXJpbWVudHNbZXhwZXJpbWVudHNTZWxlY3RlZF0oKVxyXG59IGVsc2Uge1xyXG4gIGV4cGVyaW1lbnRzQWN0aXZlID0gbmV3IGV4cGVyaW1lbnRzWydyb290J10oKVxyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJylcclxuXHJcbiAgaWYgKGV4cGVyaW1lbnRzTmFtZXMuaW5kZXhPZihoYXNoKSA+IC0xKSB7XHJcbiAgICBleHBlcmltZW50c0FjdGl2ZS5kZXN0cm95KClcclxuXHJcbiAgICBleHBlcmltZW50c0FjdGl2ZSA9IG5ldyBleHBlcmltZW50c1toYXNoXSgpXHJcbiAgfVxyXG59KVxyXG4iXX0=
