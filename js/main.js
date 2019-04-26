'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var Slider = function () {
    function Slider(config) {
      _classCallCheck(this, Slider);

      this.type = 'Slider';
      if (!(this instanceof Slider)) return new Slider(config);

      this.parent = config.parent || document.querySelector(config.parentSelector || '.slider');
      if (!this.parent) throw '[SLIDER]: Container não encontrado.';

      this.childSelector = config.childSelector || '.slide';
      if (!this.children.length) throw '[SLIDER]: Slides não encontrados.';

      this.index = 0;
      this.duration = config.duration || 3000;
      this.parent.classList.add('set');
      this.compose();
    }

    _createClass(Slider, [{
      key: 'forEach',
      value: function forEach(fn) {
        return this.children.forEach(fn);
      }
    }, {
      key: 'map',
      value: function map(fn) {
        return this.children.map(fn);
      }
    }, {
      key: 'filter',
      value: function filter(fn) {
        return this.children.filter(fn);
      }
    }, {
      key: 'find',
      value: function find(fn) {
        return this.children.find(fn);
      }
    }, {
      key: 'compose',
      value: function compose() {
        var _this = this;

        var nextIndex, prevIndex;
        prevIndex = this.index > 0 ? this.index - 1 : this.children.length - 1;
        nextIndex = this.index < this.children.length - 1 ? this.index + 1 : 0;
        this.forEach(function (el, i) {
          el.classList.remove('prev');
          el.classList.remove('current');
          el.classList.remove('next');
          if (i === prevIndex) el.classList.add('prev');
          if (i === nextIndex) el.classList.add('next');
          if (i === _this.index) el.classList.add('current');
        });
        return this;
      }
    }, {
      key: 'play',
      value: function play() {
        var that;
        that = this;
        this.playingStateID = setInterval(function () {
          return that.next();
        }, this.duration);
        this.isPlaying = true;
        return this;
      }
    }, {
      key: 'pause',
      value: function pause() {
        clearInterval(this.playingStateID);
        this.isPlaying = false;
        return this;
      }
    }, {
      key: 'playpause',
      value: function playpause() {
        if (this.isPlaying) {
          return this.pause();
        } else {
          return this.play();
        }
      }
    }, {
      key: 'prev',
      value: function prev() {
        var playingState;
        if (this.index > 0) {
          this.index--;
        } else {
          this.index = this.children.length - 1;
        }
        playingState = this.isPlaying;
        if (playingState) {
          this.pause();
        }
        this.compose();
        if (playingState) {
          return this.play();
        }
      }
    }, {
      key: 'next',
      value: function next() {
        var playingState;
        if (this.index < this.children.length - 1) {
          this.index++;
        } else {
          this.index = 0;
        }
        playingState = this.isPlaying;
        if (playingState) {
          this.pause();
        }
        this.compose();
        if (playingState) {
          return this.play();
        }
      }
    }, {
      key: 'goTo',
      value: function goTo(index) {
        this.index = index;
        return this.compose();
      }
    }, {
      key: 'on',
      value: function on(event, fn) {
        this.parent.addEventListener(event, fn);
        return this;
      }
    }, {
      key: 'off',
      value: function off(event, fn) {
        this.parent.removeEventListener(event, fn);
        return this;
      }
    }, {
      key: 'inspect',
      value: function inspect(collapsed) {
        var _this2 = this;

        console[collapsed === true ? 'groupCollapsed' : 'group'](this.type);
        console.table(Object.keys(this).map(function (key) {
          return {
            prop: key,
            value: _this2[key],
            type: _typeof(_this2[key])
          };
        }));
        console.log(this.parent);
        console.log(this.children);
        console.warn(Date.now().toString());
        console.groupEnd(this.type);

        return this;
      }
    }, {
      key: 'children',
      get: function get() {
        return Array.prototype.slice.call(this.parent.querySelectorAll(this.childSelector));
      }
    }, {
      key: 'length',
      get: function get() {
        return this.children.length;
      }
    }]);

    return Slider;
  }();

  var Carousel = function (_Slider) {
    _inherits(Carousel, _Slider);

    function Carousel(config) {
      _classCallCheck(this, Carousel);

      config.parentSelector = config.parentSelector || '.carousel';

      var _this3 = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, config));

      _this3.type = 'Carousel';
      _this3.size = config.size | 0;
      _this3.compose();
      return _this3;
    }

    _createClass(Carousel, [{
      key: 'compose',
      value: function compose() {
        var _this4 = this;

        var position = this.index + 1;
        this.forEach(function (slide, i) {
          var itemOrder = i - position + 1;
          if (itemOrder < 0) itemOrder = _this4.length - position + i + 1;
          slide.setAttribute('data-order', itemOrder);

          slide.classList.remove('prev');
          slide.classList.remove('current');
          slide.classList.remove('next');
          slide.classList.remove('will-go-prev');
          slide.classList.remove('will-go-next');

          if (_this4.size) {
            var className = _this4.length <= _this4.size ? 'current' : itemOrder > -1 && itemOrder < _this4.size ? 'current' : itemOrder === -1 || itemOrder === _this4.length - 1 ? 'prev' : itemOrder === _this4.size ? 'next' : '';
            if (!className) return _this4;
            slide.classList.add(className);
            slide.style.order = itemOrder;
          }

          if (_this4.dir) {
            var animClassName = 'will-go-' + _this4.dir;
            slide.classList.add(animClassName);
            slide.addEventListener("webkitAnimationEnd", function () {
              removeWillRenderClass(slide, animClassName);
            });
            slide.addEventListener("animationend", function () {
              removeWillRenderClass(slide, animClassName);
            });
          }
        });

        function removeWillRenderClass(slide, className) {
          slide.classList.remove(className);
        }

        return this;
      }
    }, {
      key: 'prev',
      value: function prev() {
        this.dir = 'prev';
        return _get(Carousel.prototype.__proto__ || Object.getPrototypeOf(Carousel.prototype), 'prev', this).call(this);
      }
    }, {
      key: 'next',
      value: function next() {
        this.dir = 'next';
        return _get(Carousel.prototype.__proto__ || Object.getPrototypeOf(Carousel.prototype), 'next', this).call(this);
      }
    }, {
      key: 'goTo',
      value: function goTo(index) {
        this.dir = index > this.index ? 'next' : 'prev';
        return _get(Carousel.prototype.__proto__ || Object.getPrototypeOf(Carousel.prototype), 'goTo', this).call(this, index);
      }
    }]);

    return Carousel;
  }(Slider);

  function _map(what, callback) {
    if (typeof what === 'string') what = document.querySelectorAll(what);
    if (!(what instanceof Array)) what = Array.prototype.slice.call(what);
    if (callback instanceof Function) what = what.map(function (w) {
      return callback(w);
    });
    return what;
  }

  function createElement(el, attrs) {

    function element(el, attrs) {
      if (typeof el === 'string') el = document.createElement(el);
      if (!(el instanceof Node)) return false;
      if (attrs) extend(el, attrs);
      return el;
    }

    function extend(obj, props) {
      var extenders = {
        style: function style(styles) {
          extend(obj.style, styles);
        },
        dataset: function dataset(data) {
          for (var name in data) {
            obj.setAttribute('data-' + name, data[name]);
          }
        },
        events: function events(callbacks) {
          for (var name in callbacks) {
            obj.addEventListener(name, callbacks[name]);
          }
        },
        children: function children(kids) {
          Array.prototype.forEach.call(kids, function (k) {
            obj.appendChild(k);
          });
        }
      };
      for (var name in props) {
        (extenders[name] || function (val) {
          obj[name] = val;
        })(props[name]);
      }
    }

    return element(el, attrs);
  }

  var Lightbox = function () {
    function Lightbox(selector) {
      var _this5 = this;

      _classCallCheck(this, Lightbox);

      this.selector = selector;
      this.container = document.querySelector('.lightbox-container') || createElement('div', {
        className: 'lightbox-container',
        dataset: {
          modal: '',
          grid: 'center'
        }
      });
      this.container.appendChild(this.prev);
      this.container.appendChild(this.wrapper);
      this.container.appendChild(this.next);
      //this.container.appendChild(this.closeButton);

      this.container.parentElement || document.body.appendChild(this.container);

      this.index = 0;
      this.wrapper.appendChild(this.closeButton);
      this.wrapper.appendChild(this.img);
      this.items.forEach(function (img, i) {
        img.addEventListener('click', function () {
          _this5.show(i);
        });
      });
    }

    _createClass(Lightbox, [{
      key: 'open',
      value: function open() {
        this.container.classList.add('target');
      }
    }, {
      key: 'close',
      value: function close() {
        this.container.classList.remove('target');
      }
    }, {
      key: 'show',
      value: function show(index) {
        this.index = index;
        var img = this.items[index];
        var src = img.getAttribute('data-lightbox') ? img.getAttribute('data-lightbox') : img.src;
        this.img.src = src;
        this.open();
      }
    }, {
      key: 'goPrev',
      value: function goPrev() {
        var index = this.index - 1;
        if (index < 0) {
          index = this.items.length - 1;
        }
        this.show(index);
      }
    }, {
      key: 'goNext',
      value: function goNext() {
        console.log(this);
        var index = this.index + 1;
        if (index >= this.items.length) {
          index = 0;
        }
        this.show(index);
      }
    }, {
      key: 'wrapper',
      get: function get() {
        return this.container.querySelector('.lightbox-wrapper') || createElement('div', {
          className: 'lightbox-wrapper',
          dataset: {
            cell: 'shrink',
            grid: 'column'
          }
        });
      }
    }, {
      key: 'prev',
      get: function get() {
        var _this6 = this;

        return this.container.querySelector('.lightbox-prev') || createElement('button', {
          className: 'lightbox-prev',
          innerHTML: '<svg xmlns="https://www.w3.org/2000/svg" viewbox="0 0 129 129"><path d="M88.6 121.3c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8 0l-54 53.9c-1.6 1.6-1.6 4.2 0 5.8l54 53.9z" /></svg>',
          dataset: {
            btn: 'link'
          },
          events: {
            click: function click() {
              return _this6.goPrev();
            }
          }
        });
      }
    }, {
      key: 'next',
      get: function get() {
        var _this7 = this;

        return this.container.querySelector('.lightbox-next') || createElement('button', {
          className: 'lightbox-next',
          innerHTML: '<svg xmlns="https://www.w3.org/2000/svg" viewbox="0 0 129 129"><path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z" /></svg>',
          dataset: {
            btn: 'link'
          },
          events: {
            click: function click() {
              return _this7.goNext();
            }
          }
        });
      }
    }, {
      key: 'closeButton',
      get: function get() {
        var _this8 = this;

        return this.container.querySelector('.lightbox-close') || createElement('button', {
          className: 'lightbox-close',
          innerHTML: '<svg xmlns="https://www.w3.org/2000/svg" viewbox="0 0 512 512"><path fill="#fff" d="M505.943 6.058c-8.077-8.077-21.172-8.077-29.249 0L6.058 476.693c-8.077 8.077-8.077 21.172 0 29.249A20.612 20.612 0 0 0 20.683 512a20.614 20.614 0 0 0 14.625-6.059L505.943 35.306c8.076-8.076 8.076-21.171 0-29.248z"/><path fill="#fff" d="M505.942 476.694L35.306 6.059c-8.076-8.077-21.172-8.077-29.248 0-8.077 8.076-8.077 21.171 0 29.248l470.636 470.636a20.616 20.616 0 0 0 14.625 6.058 20.615 20.615 0 0 0 14.624-6.057c8.075-8.078 8.075-21.173-.001-29.25z"/></svg>',
          dataset: {
            btn: 'link',
            cell: 'shrink end'
          },
          events: {
            click: function click() {
              return _this8.close();
            }
          }
        });
      }
    }, {
      key: 'items',
      get: function get() {
        var domNodes = document.querySelectorAll(this.selector);
        return Array.prototype.slice.call(domNodes);
      }
    }, {
      key: 'img',
      get: function get() {
        return this.wrapper.querySelector('.lightbox-img') || createElement('img', {
          className: 'lightbox-img'
        });
      }
    }]);

    return Lightbox;
  }();

  var sliderOptions = {
    autoplay: function autoplay(slider) {
      slider.play().on('mouseover', function () {
        return slider.pause();
      }).on('mouseout', function () {
        return slider.play();
      });
    }
  };
  function configSlider(slider, parent) {
    var first = parent.getAttribute('data-first') | 0;
    if (first) {
      slider.goTo(first);
    }
    var options = parent.hasAttribute('data-options') ? parent.getAttribute('data-options').split(' ') : [];
    options.forEach(function (option) {
      return sliderOptions[option] && sliderOptions[option](slider);
    });

    var sliderCallbacks = {
      openOnMobile: function openOnMobile() {
        if (screen().width > 600) return;
        var first = slider.find(function (slide) {
          return slide.getAttribute('data-order') === '0';
        });
        if (!first) return;
        var btn = first.querySelector('.info-img a[href^="javascript:"]');
        if (!btn) return;
        btn.click();
      }
    };

    _map('[data-control]', function (control) {
      var target = control.getAttribute('data-control');
      var targetElement = target ? document.querySelector(target) : null;

      if (targetElement && targetElement === slider.parent) {
        var action = control.getAttribute('data-action');
        if ((action === 'prev' || action === 'next') && slider.size >= slider.length) {
          control.setAttribute('data-oversize', true);
        }
        var actionData = control.getAttribute('data-params');
        var params = actionData ? actionData.split(',') : null;
        var callback = control.getAttribute('data-callback');
        if (action && slider[action] instanceof Function) {
          control.addEventListener('click', function () {
            slider[action].apply(slider, params);
            if (callback && sliderCallbacks[callback]) sliderCallbacks[callback]();
          });
        }
      }
    });
  }

  // ------ TABS ------

  var allTargets = document.querySelectorAll('[data-target]');
  var links = Array.prototype.slice.call(allTargets);

  links.forEach(function (link) {
    var linkTarget = link.getAttribute('data-target');
    var allTabs = document.querySelectorAll('[data-tab]');

    link.addEventListener('click', function () {
      var targets = Array.prototype.slice.call(allTabs);
      targets.forEach(function (target) {
        target.setAttribute('hidden', '');

        if (linkTarget === target.getAttribute('data-tab')) {
          target.removeAttribute('hidden');
          links.forEach(function (btn) {
            btn.classList.remove('active');
          });
          link.classList.add('active');
        }
      });
    });
  });

  // ------ CREATE ELEMENT ------

  var btnCreateEl = document.querySelector('[data-create]');
  btnCreateEl && btnCreateEl.addEventListener('click', function () {
    var newList = document.createElement('ul');
    var content = document.querySelector('[class="post-content"]');
    content.appendChild(newList);
    newList.innerHTML = '<li>teste1</li><li>teste2</li>';
  });

  // ------ SUMREDUCER WITH FLAT ------

  function sumReducer() {
    //converter arguments em array
    var args = Array.prototype.slice.call(arguments);
    // achatar args
    var flatArgs = args.flat(Infinity);
    //filtar números
    var numberArgs = flatArgs.filter(function (n) {
      return typeof n === 'number';
    });
    // somar
    return numberArgs.reduce(function (sum, n) {
      return sum + n;
    }, 0);
  }

  // function flattenDeep(arr1){
  //   return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
  // }

  var result = sumReducer([0, 3, 7], [null, 'ema watson', 82], 5, [[3, 0], [1], null], []);

  var resultSum = document.querySelector('[data-sum]');
  resultSum && resultSum.addEventListener('click', function () {
    var newDiv = document.createElement('div');
    var content = document.querySelector('[class="post-content"]');
    content.appendChild(newDiv);
    newDiv.innerHTML = '' + result;
  });

  // ------ FETCH ------
  function createNode(element) {
    return document.createElement(element); // Create the type of element you pass in the parameters
  }

  function append(parent, el) {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
  }

  var ul = document.getElementById('authors'); // Get the list where we will place our authors
  var url = 'https://randomuser.me/api/?results=10'; // Get 10 random users

  fetch(url) // Call the fetch function passing the url of the API as a parameter
  .then(function (resp) {
    return resp.json();
  }) // Transform the data into JSON
  .then(function (data) {
    // Your code for handling the data you get from the API
    // Create and append the li's to the ul
    var authors = data.results; // Get the results
    return authors.map(function (author) {
      var li = createNode('li'),
          // Create the elements we need
      img = createNode('img'),
          span = createNode('span');
      img.src = author.picture.medium;
      // Add the source of the image to be the src of the img element
      span.innerHTML = author.name.first + ' ' + author.name.last;
      // Make the HTML of our span to be the first and last name of our author
      append(li, img); // Append all our elements
      append(li, span);
      append(ul, li);
    });
  }).catch(function (error) {
    console.log(error);
  });

  // ------ SLIDER WITH LIGHTBOX ------
  window.sliders = _map('.slider', function (parent) {
    var slider = new Slider({
      parent: parent
    });
    configSlider(slider, parent);
  });

  window.carousels = _map('.carousel', function (parent) {
    var size = parent.getAttribute('data-size') | 0;
    var carousel = new Carousel({
      parent: parent,
      size: size
    });
    configSlider(carousel, parent);
    return carousel;
  });

  var lightbox = new Lightbox("[data-lightbox]");
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiU2xpZGVyIiwiY29uZmlnIiwidHlwZSIsInBhcmVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBhcmVudFNlbGVjdG9yIiwiY2hpbGRTZWxlY3RvciIsImNoaWxkcmVuIiwibGVuZ3RoIiwiaW5kZXgiLCJkdXJhdGlvbiIsImNsYXNzTGlzdCIsImFkZCIsImNvbXBvc2UiLCJmbiIsImZvckVhY2giLCJtYXAiLCJmaWx0ZXIiLCJmaW5kIiwibmV4dEluZGV4IiwicHJldkluZGV4IiwiZWwiLCJpIiwicmVtb3ZlIiwidGhhdCIsInBsYXlpbmdTdGF0ZUlEIiwic2V0SW50ZXJ2YWwiLCJuZXh0IiwiaXNQbGF5aW5nIiwiY2xlYXJJbnRlcnZhbCIsInBhdXNlIiwicGxheSIsInBsYXlpbmdTdGF0ZSIsImV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb2xsYXBzZWQiLCJjb25zb2xlIiwidGFibGUiLCJPYmplY3QiLCJrZXlzIiwicHJvcCIsImtleSIsInZhbHVlIiwibG9nIiwid2FybiIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsImdyb3VwRW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQ2Fyb3VzZWwiLCJzaXplIiwicG9zaXRpb24iLCJzbGlkZSIsIml0ZW1PcmRlciIsInNldEF0dHJpYnV0ZSIsImNsYXNzTmFtZSIsInN0eWxlIiwib3JkZXIiLCJkaXIiLCJhbmltQ2xhc3NOYW1lIiwicmVtb3ZlV2lsbFJlbmRlckNsYXNzIiwiX21hcCIsIndoYXQiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwidyIsImNyZWF0ZUVsZW1lbnQiLCJhdHRycyIsImVsZW1lbnQiLCJOb2RlIiwiZXh0ZW5kIiwib2JqIiwicHJvcHMiLCJleHRlbmRlcnMiLCJzdHlsZXMiLCJkYXRhc2V0IiwiZGF0YSIsIm5hbWUiLCJldmVudHMiLCJjYWxsYmFja3MiLCJraWRzIiwiayIsImFwcGVuZENoaWxkIiwidmFsIiwiTGlnaHRib3giLCJzZWxlY3RvciIsImNvbnRhaW5lciIsIm1vZGFsIiwiZ3JpZCIsInByZXYiLCJ3cmFwcGVyIiwicGFyZW50RWxlbWVudCIsImJvZHkiLCJjbG9zZUJ1dHRvbiIsImltZyIsIml0ZW1zIiwic2hvdyIsInNyYyIsImdldEF0dHJpYnV0ZSIsIm9wZW4iLCJjZWxsIiwiaW5uZXJIVE1MIiwiYnRuIiwiY2xpY2siLCJnb1ByZXYiLCJnb05leHQiLCJjbG9zZSIsImRvbU5vZGVzIiwic2xpZGVyT3B0aW9ucyIsImF1dG9wbGF5Iiwic2xpZGVyIiwib24iLCJjb25maWdTbGlkZXIiLCJmaXJzdCIsImdvVG8iLCJvcHRpb25zIiwiaGFzQXR0cmlidXRlIiwic3BsaXQiLCJvcHRpb24iLCJzbGlkZXJDYWxsYmFja3MiLCJvcGVuT25Nb2JpbGUiLCJzY3JlZW4iLCJ3aWR0aCIsInRhcmdldCIsImNvbnRyb2wiLCJ0YXJnZXRFbGVtZW50IiwiYWN0aW9uIiwiYWN0aW9uRGF0YSIsInBhcmFtcyIsImFwcGx5IiwiYWxsVGFyZ2V0cyIsImxpbmtzIiwibGluayIsImxpbmtUYXJnZXQiLCJhbGxUYWJzIiwidGFyZ2V0cyIsInJlbW92ZUF0dHJpYnV0ZSIsImJ0bkNyZWF0ZUVsIiwibmV3TGlzdCIsImNvbnRlbnQiLCJzdW1SZWR1Y2VyIiwiYXJncyIsImFyZ3VtZW50cyIsImZsYXRBcmdzIiwiZmxhdCIsIkluZmluaXR5IiwibnVtYmVyQXJncyIsIm4iLCJyZWR1Y2UiLCJzdW0iLCJyZXN1bHQiLCJyZXN1bHRTdW0iLCJuZXdEaXYiLCJjcmVhdGVOb2RlIiwiYXBwZW5kIiwidWwiLCJnZXRFbGVtZW50QnlJZCIsInVybCIsImZldGNoIiwidGhlbiIsInJlc3AiLCJqc29uIiwiYXV0aG9ycyIsInJlc3VsdHMiLCJhdXRob3IiLCJsaSIsInNwYW4iLCJwaWN0dXJlIiwibWVkaXVtIiwibGFzdCIsImNhdGNoIiwiZXJyb3Ii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U0MsS0FBVCxFQUFlO0FBQ3BCNUksWUFBUU8sR0FBUixDQUFZcUksS0FBWjtBQUNELEdBckJEOztBQXVCQTtBQUNBQyxTQUFPQyxPQUFQLEdBQWlCaEgsS0FBSyxTQUFMLEVBQWdCLGtCQUFVO0FBQ3pDLFFBQU1pRCxTQUFTLElBQUlySCxNQUFKLENBQVc7QUFDeEJHO0FBRHdCLEtBQVgsQ0FBZjtBQUdBb0gsaUJBQWFGLE1BQWIsRUFBcUJsSCxNQUFyQjtBQUNELEdBTGdCLENBQWpCOztBQU9BZ0wsU0FBT0UsU0FBUCxHQUFtQmpILEtBQUssV0FBTCxFQUFrQixrQkFBVTtBQUM3QyxRQUFNWCxPQUFPdEQsT0FBT3NHLFlBQVAsQ0FBb0IsV0FBcEIsSUFBbUMsQ0FBaEQ7QUFDQSxRQUFNNkUsV0FBVyxJQUFJOUgsUUFBSixDQUFhO0FBQzVCckQsb0JBRDRCO0FBRTVCc0Q7QUFGNEIsS0FBYixDQUFqQjtBQUlBOEQsaUJBQWErRCxRQUFiLEVBQXVCbkwsTUFBdkI7QUFDQSxXQUFPbUwsUUFBUDtBQUNELEdBUmtCLENBQW5COztBQVVBLE1BQUlDLFdBQVcsSUFBSTVGLFFBQUosQ0FBYSxpQkFBYixDQUFmO0FBRUMsQ0F4aUJBLEdBQUQiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4ndXNlIHN0cmljdCc7XG5cbmNsYXNzIFNsaWRlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgIHRoaXMudHlwZSA9ICdTbGlkZXInO1xyXG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU2xpZGVyKSkgcmV0dXJuIG5ldyBTbGlkZXIoY29uZmlnKTtcclxuICBcclxuICAgICAgdGhpcy5wYXJlbnQgPSBjb25maWcucGFyZW50IHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnBhcmVudFNlbGVjdG9yIHx8ICcuc2xpZGVyJyk7XHJcbiAgICAgIGlmICghdGhpcy5wYXJlbnQpIHRocm93ICdbU0xJREVSXTogQ29udGFpbmVyIG7Do28gZW5jb250cmFkby4nO1xyXG4gIFxyXG4gICAgICB0aGlzLmNoaWxkU2VsZWN0b3IgPSBjb25maWcuY2hpbGRTZWxlY3RvciB8fCAnLnNsaWRlJztcclxuICAgICAgaWYgKCF0aGlzLmNoaWxkcmVuLmxlbmd0aCkgdGhyb3cgJ1tTTElERVJdOiBTbGlkZXMgbsOjbyBlbmNvbnRyYWRvcy4nO1xyXG4gIFxyXG4gICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgICAgdGhpcy5kdXJhdGlvbiA9IGNvbmZpZy5kdXJhdGlvbiB8fCAzMDAwO1xyXG4gICAgICB0aGlzLnBhcmVudC5jbGFzc0xpc3QuYWRkKCdzZXQnKTtcclxuICAgICAgdGhpcy5jb21wb3NlKCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBnZXQgY2hpbGRyZW4oKSB7XHJcbiAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLnBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuY2hpbGRTZWxlY3RvcikpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZ2V0IGxlbmd0aCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZm9yRWFjaChmbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZuKTtcclxuICAgIH1cclxuICBcclxuICAgIG1hcChmbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5tYXAoZm4pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZmlsdGVyKGZuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZpbHRlcihmbik7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBmaW5kKGZuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZpbmQoZm4pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgY29tcG9zZSgpIHtcclxuICAgICAgdmFyIG5leHRJbmRleCwgcHJldkluZGV4O1xyXG4gICAgICBwcmV2SW5kZXggPSB0aGlzLmluZGV4ID4gMCA/IHRoaXMuaW5kZXggLSAxIDogdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxO1xyXG4gICAgICBuZXh0SW5kZXggPSB0aGlzLmluZGV4IDwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxID8gdGhpcy5pbmRleCArIDEgOiAwO1xyXG4gICAgICB0aGlzLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgncHJldicpO1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQnKTtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCduZXh0Jyk7XHJcbiAgICAgICAgaWYgKGkgPT09IHByZXZJbmRleCkgZWwuY2xhc3NMaXN0LmFkZCgncHJldicpO1xyXG4gICAgICAgIGlmIChpID09PSBuZXh0SW5kZXgpIGVsLmNsYXNzTGlzdC5hZGQoJ25leHQnKTtcclxuICAgICAgICBpZiAoaSA9PT0gdGhpcy5pbmRleCkgZWwuY2xhc3NMaXN0LmFkZCgnY3VycmVudCcpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBwbGF5KCkge1xyXG4gICAgICB2YXIgdGhhdDtcclxuICAgICAgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoaXMucGxheWluZ1N0YXRlSUQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQubmV4dCgpO1xyXG4gICAgICB9LCB0aGlzLmR1cmF0aW9uKTtcclxuICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICBcclxuICAgIHBhdXNlKCkge1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMucGxheWluZ1N0YXRlSUQpO1xyXG4gICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICBcclxuICAgIHBsYXlwYXVzZSgpIHtcclxuICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF1c2UoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIHByZXYoKSB7XHJcbiAgICAgIHZhciBwbGF5aW5nU3RhdGU7XHJcbiAgICAgIGlmICh0aGlzLmluZGV4ID4gMCkge1xyXG4gICAgICAgIHRoaXMuaW5kZXgtLTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHBsYXlpbmdTdGF0ZSA9IHRoaXMuaXNQbGF5aW5nO1xyXG4gICAgICBpZiAocGxheWluZ1N0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY29tcG9zZSgpO1xyXG4gICAgICBpZiAocGxheWluZ1N0YXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICBuZXh0KCkge1xyXG4gICAgICB2YXIgcGxheWluZ1N0YXRlO1xyXG4gICAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIHRoaXMuaW5kZXgrKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgICAgfVxyXG4gICAgICBwbGF5aW5nU3RhdGUgPSB0aGlzLmlzUGxheWluZztcclxuICAgICAgaWYgKHBsYXlpbmdTdGF0ZSkge1xyXG4gICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNvbXBvc2UoKTtcclxuICAgICAgaWYgKHBsYXlpbmdTdGF0ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgZ29UbyhpbmRleCkge1xyXG4gICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbXBvc2UoKTtcclxuICAgIH1cclxuICBcclxuICAgIG9uKGV2ZW50LCBmbikge1xyXG4gICAgICB0aGlzLnBhcmVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmbik7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgb2ZmKGV2ZW50LCBmbikge1xyXG4gICAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmbik7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgaW5zcGVjdChjb2xsYXBzZWQpIHtcclxuICAgICAgY29uc29sZVtjb2xsYXBzZWQgPT09IHRydWUgPyAnZ3JvdXBDb2xsYXBzZWQnIDogJ2dyb3VwJ10odGhpcy50eXBlKTtcclxuICAgICAgY29uc29sZS50YWJsZShcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzKS5tYXAoa2V5ID0+IHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHByb3A6IGtleSxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXNba2V5XSxcclxuICAgICAgICAgICAgdHlwZTogdHlwZW9mIHRoaXNba2V5XVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucGFyZW50KTtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5jaGlsZHJlbik7XHJcbiAgICAgIGNvbnNvbGUud2FybihEYXRlLm5vdygpLnRvU3RyaW5nKCkpO1xyXG4gICAgICBjb25zb2xlLmdyb3VwRW5kKHRoaXMudHlwZSk7XHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIFxyXG4gIH1cblxuY2xhc3MgQ2Fyb3VzZWwgZXh0ZW5kcyBTbGlkZXIge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgIGNvbmZpZy5wYXJlbnRTZWxlY3RvciA9IGNvbmZpZy5wYXJlbnRTZWxlY3RvciB8fCAnLmNhcm91c2VsJztcclxuICAgIHN1cGVyKGNvbmZpZyk7XHJcbiAgICB0aGlzLnR5cGUgPSAnQ2Fyb3VzZWwnO1xyXG4gICAgdGhpcy5zaXplID0gY29uZmlnLnNpemUgfCAwO1xyXG4gICAgdGhpcy5jb21wb3NlKCk7XHJcbiAgfVxyXG5cclxuICBjb21wb3NlKCkge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmluZGV4ICsgMTtcclxuICAgIHRoaXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcclxuICAgICAgbGV0IGl0ZW1PcmRlciA9IGkgLSBwb3NpdGlvbiArIDE7XHJcbiAgICAgIGlmIChpdGVtT3JkZXIgPCAwKSBpdGVtT3JkZXIgPSB0aGlzLmxlbmd0aCAtIHBvc2l0aW9uICsgaSArIDE7XHJcbiAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgnZGF0YS1vcmRlcicsIGl0ZW1PcmRlcik7XHJcblxyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdwcmV2Jyk7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQnKTtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnbmV4dCcpO1xyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3aWxsLWdvLXByZXYnKTtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd2lsbC1nby1uZXh0Jyk7XHJcblxyXG4gICAgICBpZiAodGhpcy5zaXplKSB7XHJcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID1cclxuICAgICAgICAgIHRoaXMubGVuZ3RoIDw9IHRoaXMuc2l6ZSA/ICdjdXJyZW50JyA6XHJcbiAgICAgICAgICBpdGVtT3JkZXIgPiAtMSAmJiBpdGVtT3JkZXIgPCB0aGlzLnNpemUgPyAnY3VycmVudCcgOlxyXG4gICAgICAgICAgaXRlbU9yZGVyID09PSAtMSB8fCBpdGVtT3JkZXIgPT09IHRoaXMubGVuZ3RoIC0gMSA/ICdwcmV2JyA6XHJcbiAgICAgICAgICBpdGVtT3JkZXIgPT09IHRoaXMuc2l6ZSA/ICduZXh0JyA6XHJcbiAgICAgICAgICAnJztcclxuICAgICAgICBpZiAoIWNsYXNzTmFtZSkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgIHNsaWRlLnN0eWxlLm9yZGVyID0gaXRlbU9yZGVyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5kaXIpIHtcclxuICAgICAgICBjb25zdCBhbmltQ2xhc3NOYW1lID0gJ3dpbGwtZ28tJyArIHRoaXMuZGlyO1xyXG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoYW5pbUNsYXNzTmFtZSk7XHJcbiAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdEFuaW1hdGlvbkVuZFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJlbW92ZVdpbGxSZW5kZXJDbGFzcyhzbGlkZSwgYW5pbUNsYXNzTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJlbW92ZVdpbGxSZW5kZXJDbGFzcyhzbGlkZSwgYW5pbUNsYXNzTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVXaWxsUmVuZGVyQ2xhc3Moc2xpZGUsIGNsYXNzTmFtZSkge1xyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwcmV2KCkge1xyXG4gICAgdGhpcy5kaXIgPSAncHJldic7XHJcbiAgICByZXR1cm4gc3VwZXIucHJldigpO1xyXG4gIH1cclxuXHJcbiAgbmV4dCgpIHtcclxuICAgIHRoaXMuZGlyID0gJ25leHQnO1xyXG4gICAgcmV0dXJuIHN1cGVyLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGdvVG8oaW5kZXgpIHtcclxuICAgIHRoaXMuZGlyID0gaW5kZXggPiB0aGlzLmluZGV4ID8gJ25leHQnIDogJ3ByZXYnO1xyXG4gICAgcmV0dXJuIHN1cGVyLmdvVG8oaW5kZXgpO1xyXG4gIH1cclxuXHJcbn1cblxuZnVuY3Rpb24gX21hcCh3aGF0LCBjYWxsYmFjaykge1xyXG4gICAgaWYgKHR5cGVvZiB3aGF0ID09PSAnc3RyaW5nJykgd2hhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwod2hhdCk7XHJcbiAgICBpZiAoISh3aGF0IGluc3RhbmNlb2YgQXJyYXkpKSB3aGF0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwod2hhdCk7XHJcbiAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikgd2hhdCA9IHdoYXQubWFwKHcgPT4gY2FsbGJhY2sodykpO1xyXG4gICAgcmV0dXJuIHdoYXQ7XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZWwsIGF0dHJzKSB7XHJcbiAgXHJcbiAgICBmdW5jdGlvbiBlbGVtZW50KGVsLCBhdHRycykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpO1xyXG4gICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgTm9kZSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoYXR0cnMpIGV4dGVuZChlbCwgYXR0cnMpO1xyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH1cclxuICBcclxuICAgIGZ1bmN0aW9uIGV4dGVuZChvYmosIHByb3BzKSB7XHJcbiAgICAgICAgY29uc3QgZXh0ZW5kZXJzID0ge1xyXG4gICAgICAgICAgICBzdHlsZTogZnVuY3Rpb24gKHN0eWxlcykge1xyXG4gICAgICAgICAgICAgICAgZXh0ZW5kKG9iai5zdHlsZSwgc3R5bGVzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YXNldDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gZGF0YSkgb2JqLnNldEF0dHJpYnV0ZSgnZGF0YS0nICsgbmFtZSwgZGF0YVtuYW1lXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV2ZW50czogZnVuY3Rpb24gKGNhbGxiYWNrcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBjYWxsYmFja3MpIG9iai5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGNhbGxiYWNrc1tuYW1lXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBmdW5jdGlvbiAoa2lkcykge1xyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChraWRzLCBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5hcHBlbmRDaGlsZChrKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIChleHRlbmRlcnNbbmFtZV0gfHwgZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgb2JqW25hbWVdID0gdmFsO1xyXG4gICAgICAgICAgICB9KShwcm9wc1tuYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgcmV0dXJuIGVsZW1lbnQoZWwsIGF0dHJzKTtcclxuICBcclxuICB9XG5cbmNsYXNzIExpZ2h0Ym94IHtcclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LWNvbnRhaW5lcicpIHx8IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtY29udGFpbmVyJyxcclxuICAgICAgICAgICAgZGF0YXNldDoge1xyXG4gICAgICAgICAgICAgICAgbW9kYWw6ICcnLFxyXG4gICAgICAgICAgICAgICAgZ3JpZDogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnByZXYpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMud3JhcHBlcik7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5uZXh0KTtcclxuICAgICAgICAvL3RoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VCdXR0b24pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5wYXJlbnRFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xyXG5cclxuICAgICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUJ1dHRvbik7XHJcbiAgICAgICAgdGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMuaW1nKTtcclxuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGltZywgaSkgPT4ge1xyXG4gICAgICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coaSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IHdyYXBwZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC13cmFwcGVyJykgfHwgY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC13cmFwcGVyJyxcclxuICAgICAgICAgICAgZGF0YXNldDoge1xyXG4gICAgICAgICAgICAgICAgY2VsbDogJ3NocmluaycsXHJcbiAgICAgICAgICAgICAgICBncmlkOiAnY29sdW1uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGdldCBwcmV2KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtcHJldicpIHx8IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtcHJldicsXHJcbiAgICAgICAgICAgIGlubmVySFRNTDogJzxzdmcgeG1sbnM9XCJodHRwczovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Ym94PVwiMCAwIDEyOSAxMjlcIj48cGF0aCBkPVwiTTg4LjYgMTIxLjNjLjguOCAxLjggMS4yIDIuOSAxLjJzMi4xLS40IDIuOS0xLjJjMS42LTEuNiAxLjYtNC4yIDAtNS44bC01MS01MSA1MS01MWMxLjYtMS42IDEuNi00LjIgMC01LjhzLTQuMi0xLjYtNS44IDBsLTU0IDUzLjljLTEuNiAxLjYtMS42IDQuMiAwIDUuOGw1NCA1My45elwiIC8+PC9zdmc+JyxcclxuICAgICAgICAgICAgZGF0YXNldDoge1xyXG4gICAgICAgICAgICAgICAgYnRuOiAnbGluaydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXZlbnRzOiB7XHJcbiAgICAgICAgICAgICAgICBjbGljazogKCkgPT4gdGhpcy5nb1ByZXYoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQgbmV4dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LW5leHQnKSB8fCBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LW5leHQnLFxyXG4gICAgICAgICAgICBpbm5lckhUTUw6ICc8c3ZnIHhtbG5zPVwiaHR0cHM6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld2JveD1cIjAgMCAxMjkgMTI5XCI+PHBhdGggZD1cIk00MC40IDEyMS4zYy0uOC44LTEuOCAxLjItMi45IDEuMnMtMi4xLS40LTIuOS0xLjJjLTEuNi0xLjYtMS42LTQuMiAwLTUuOGw1MS01MS01MS01MWMtMS42LTEuNi0xLjYtNC4yIDAtNS44IDEuNi0xLjYgNC4yLTEuNiA1LjggMGw1My45IDUzLjljMS42IDEuNiAxLjYgNC4yIDAgNS44bC01My45IDUzLjl6XCIgLz48L3N2Zz4nLFxyXG4gICAgICAgICAgICBkYXRhc2V0OiB7XHJcbiAgICAgICAgICAgICAgICBidG46ICdsaW5rJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLmdvTmV4dCgpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQgY2xvc2VCdXR0b24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1jbG9zZScpIHx8IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtY2xvc2UnLFxyXG4gICAgICAgICAgICBpbm5lckhUTUw6ICc8c3ZnIHhtbG5zPVwiaHR0cHM6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld2JveD1cIjAgMCA1MTIgNTEyXCI+PHBhdGggZmlsbD1cIiNmZmZcIiBkPVwiTTUwNS45NDMgNi4wNThjLTguMDc3LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDkgMEw2LjA1OCA0NzYuNjkzYy04LjA3NyA4LjA3Ny04LjA3NyAyMS4xNzIgMCAyOS4yNDlBMjAuNjEyIDIwLjYxMiAwIDAgMCAyMC42ODMgNTEyYTIwLjYxNCAyMC42MTQgMCAwIDAgMTQuNjI1LTYuMDU5TDUwNS45NDMgMzUuMzA2YzguMDc2LTguMDc2IDguMDc2LTIxLjE3MSAwLTI5LjI0OHpcIi8+PHBhdGggZmlsbD1cIiNmZmZcIiBkPVwiTTUwNS45NDIgNDc2LjY5NEwzNS4zMDYgNi4wNTljLTguMDc2LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDggMC04LjA3NyA4LjA3Ni04LjA3NyAyMS4xNzEgMCAyOS4yNDhsNDcwLjYzNiA0NzAuNjM2YTIwLjYxNiAyMC42MTYgMCAwIDAgMTQuNjI1IDYuMDU4IDIwLjYxNSAyMC42MTUgMCAwIDAgMTQuNjI0LTYuMDU3YzguMDc1LTguMDc4IDguMDc1LTIxLjE3My0uMDAxLTI5LjI1elwiLz48L3N2Zz4nLFxyXG4gICAgICAgICAgICBkYXRhc2V0OiB7XHJcbiAgICAgICAgICAgICAgICBidG46ICdsaW5rJyxcclxuICAgICAgICAgICAgICAgIGNlbGw6ICdzaHJpbmsgZW5kJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLmNsb3NlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGl0ZW1zKCkge1xyXG4gICAgICAgIHZhciBkb21Ob2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZWxlY3Rvcik7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvbU5vZGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaW1nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LWltZycpIHx8IGNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtaW1nJyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RhcmdldCcpO1xyXG4gICAgfVxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgndGFyZ2V0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdyhpbmRleCkge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgICAgICBjb25zdCBpbWcgPSB0aGlzLml0ZW1zW2luZGV4XTtcclxuICAgICAgICBjb25zdCBzcmMgPSBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLWxpZ2h0Ym94JykgPyBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLWxpZ2h0Ym94JykgOiBpbWcuc3JjO1xyXG4gICAgICAgIHRoaXMuaW1nLnNyYyA9IHNyYztcclxuICAgICAgICB0aGlzLm9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBnb1ByZXYoKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleCAtIDE7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93KGluZGV4KTtcclxuICAgIH1cclxuICAgIGdvTmV4dCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4ICsgMTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy5pdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2hvdyhpbmRleCk7XHJcbiAgICB9XHJcbn1cblxuY29uc3Qgc2xpZGVyT3B0aW9ucyA9IHtcclxuICAgIGF1dG9wbGF5OiBzbGlkZXIgPT4ge1xyXG4gICAgICBzbGlkZXJcclxuICAgICAgICAucGxheSgpXHJcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCAoKSA9PiBzbGlkZXIucGF1c2UoKSlcclxuICAgICAgICAub24oJ21vdXNlb3V0JywgKCkgPT4gc2xpZGVyLnBsYXkoKSk7XHJcbiAgICB9XHJcbiAgfTtcclxuZnVuY3Rpb24gY29uZmlnU2xpZGVyKHNsaWRlciwgcGFyZW50KSB7XHJcbiAgICBjb25zdCBmaXJzdCA9IHBhcmVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlyc3QnKSB8IDA7XHJcbiAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgc2xpZGVyLmdvVG8oZmlyc3QpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHBhcmVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtb3B0aW9ucycpID8gcGFyZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1vcHRpb25zJykuc3BsaXQoJyAnKSA6IFtdO1xyXG4gICAgb3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiBzbGlkZXJPcHRpb25zW29wdGlvbl0gJiYgc2xpZGVyT3B0aW9uc1tvcHRpb25dKHNsaWRlcikpO1xyXG4gIFxyXG4gICAgY29uc3Qgc2xpZGVyQ2FsbGJhY2tzID0ge1xyXG4gICAgICBvcGVuT25Nb2JpbGU6ICgpID0+IHtcclxuICAgICAgICBpZiAoc2NyZWVuKCkud2lkdGggPiA2MDApIHJldHVybjtcclxuICAgICAgICBjb25zdCBmaXJzdCA9IHNsaWRlci5maW5kKHNsaWRlID0+IHNsaWRlLmdldEF0dHJpYnV0ZSgnZGF0YS1vcmRlcicpID09PSAnMCcpO1xyXG4gICAgICAgIGlmICghZmlyc3QpIHJldHVybjtcclxuICAgICAgICBjb25zdCBidG4gPSBmaXJzdC5xdWVyeVNlbGVjdG9yKCcuaW5mby1pbWcgYVtocmVmXj1cImphdmFzY3JpcHQ6XCJdJyk7XHJcbiAgICAgICAgaWYgKCFidG4pIHJldHVybjtcclxuICAgICAgICBidG4uY2xpY2soKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICBcclxuICAgIF9tYXAoJ1tkYXRhLWNvbnRyb2xdJywgY29udHJvbCA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGNvbnRyb2wuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbnRyb2wnKTtcclxuICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IHRhcmdldCA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KSA6IG51bGw7XHJcbiAgXHJcbiAgICAgIGlmICh0YXJnZXRFbGVtZW50ICYmIHRhcmdldEVsZW1lbnQgPT09IHNsaWRlci5wYXJlbnQpIHtcclxuICAgICAgICBjb25zdCBhY3Rpb24gPSBjb250cm9sLmdldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nKTtcclxuICAgICAgICBpZiAoKGFjdGlvbiA9PT0gJ3ByZXYnIHx8IGFjdGlvbiA9PT0gJ25leHQnKSAmJiAoc2xpZGVyLnNpemUgPj0gc2xpZGVyLmxlbmd0aCkpIHtcclxuICAgICAgICAgIGNvbnRyb2wuc2V0QXR0cmlidXRlKCdkYXRhLW92ZXJzaXplJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFjdGlvbkRhdGEgPSBjb250cm9sLmdldEF0dHJpYnV0ZSgnZGF0YS1wYXJhbXMnKTtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBhY3Rpb25EYXRhID8gYWN0aW9uRGF0YS5zcGxpdCgnLCcpIDogbnVsbDtcclxuICAgICAgICBjb25zdCBjYWxsYmFjayA9IGNvbnRyb2wuZ2V0QXR0cmlidXRlKCdkYXRhLWNhbGxiYWNrJyk7XHJcbiAgICAgICAgaWYgKGFjdGlvbiAmJiBzbGlkZXJbYWN0aW9uXSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICBjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzbGlkZXJbYWN0aW9uXS5hcHBseShzbGlkZXIsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBzbGlkZXJDYWxsYmFja3NbY2FsbGJhY2tdKSBzbGlkZXJDYWxsYmFja3NbY2FsbGJhY2tdKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cblxuLy8gLS0tLS0tIFRBQlMgLS0tLS0tXHJcblxyXG5jb25zdCBhbGxUYXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFyZ2V0XScpO1xyXG5jb25zdCBsaW5rcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFsbFRhcmdldHMpO1xyXG5cclxubGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluayl7XHJcbiAgY29uc3QgbGlua1RhcmdldCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpO1xyXG4gIGNvbnN0IGFsbFRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJdJyk7XHJcblxyXG4gIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgdGFyZ2V0cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFsbFRhYnMpOyAgICAgIFxyXG4gICAgdGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpe1xyXG4gICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XHJcblxyXG4gICAgICBpZihsaW5rVGFyZ2V0ID09PSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpKXtcclxuICAgICAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuICAgICAgICBsaW5rcy5mb3JFYWNoKGJ0biA9PntcclxuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcblxyXG4vLyAtLS0tLS0gQ1JFQVRFIEVMRU1FTlQgLS0tLS0tXHJcblxyXG5jb25zdCBidG5DcmVhdGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNyZWF0ZV0nKTtcclxuYnRuQ3JlYXRlRWwgJiYgYnRuQ3JlYXRlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gIGNvbnN0IG5ld0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3M9XCJwb3N0LWNvbnRlbnRcIl0nKTtcclxuICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0xpc3QpO1xyXG4gIG5ld0xpc3QuaW5uZXJIVE1MID0gJzxsaT50ZXN0ZTE8L2xpPjxsaT50ZXN0ZTI8L2xpPic7XHJcbn0pO1xyXG5cclxuLy8gLS0tLS0tIFNVTVJFRFVDRVIgV0lUSCBGTEFUIC0tLS0tLVxyXG5cclxuZnVuY3Rpb24gc3VtUmVkdWNlcigpIHtcclxuICAvL2NvbnZlcnRlciBhcmd1bWVudHMgZW0gYXJyYXlcclxuICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAvLyBhY2hhdGFyIGFyZ3NcclxuICBjb25zdCBmbGF0QXJncyA9IGFyZ3MuZmxhdChJbmZpbml0eSk7XHJcbiAgLy9maWx0YXIgbsO6bWVyb3NcclxuICBjb25zdCBudW1iZXJBcmdzID0gZmxhdEFyZ3MuZmlsdGVyKG4gPT4gdHlwZW9mIG4gPT09ICdudW1iZXInKTtcclxuICAvLyBzb21hclxyXG4gIHJldHVybiBudW1iZXJBcmdzLnJlZHVjZSgoc3VtLCBuKSA9PiBzdW0gKyBuLCAwKTtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gZmxhdHRlbkRlZXAoYXJyMSl7XHJcbi8vICAgcmV0dXJuIGFycjEucmVkdWNlKChhY2MsIHZhbCkgPT4gQXJyYXkuaXNBcnJheSh2YWwpID8gYWNjLmNvbmNhdChmbGF0dGVuRGVlcCh2YWwpKSA6IGFjYy5jb25jYXQodmFsKSwgW10pO1xyXG4vLyB9XHJcblxyXG5jb25zdCByZXN1bHQgPSBzdW1SZWR1Y2VyKFswLCAzLCA3XSwgW251bGwsICdlbWEgd2F0c29uJywgODJdLCA1LCBbWzMsIDBdLCBbMV0sIG51bGxdLCBbXSk7XHJcblxyXG5jb25zdCByZXN1bHRTdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zdW1dJyk7XHJcbnJlc3VsdFN1bSAmJiByZXN1bHRTdW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gIGNvbnN0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3M9XCJwb3N0LWNvbnRlbnRcIl0nKTtcclxuICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0Rpdik7XHJcbiAgbmV3RGl2LmlubmVySFRNTCA9IGAke3Jlc3VsdH1gO1xyXG59KTtcclxuXHJcbi8vIC0tLS0tLSBGRVRDSCAtLS0tLS1cclxuZnVuY3Rpb24gY3JlYXRlTm9kZShlbGVtZW50KXtcclxuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTsgLy8gQ3JlYXRlIHRoZSB0eXBlIG9mIGVsZW1lbnQgeW91IHBhc3MgaW4gdGhlIHBhcmFtZXRlcnNcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kKHBhcmVudCwgZWwpe1xyXG4gIHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpOyAvLyBBcHBlbmQgdGhlIHNlY29uZCBwYXJhbWV0ZXIoZWxlbWVudCkgdG8gdGhlIGZpcnN0IG9uZVxyXG59XHJcblxyXG5jb25zdCB1bCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdXRob3JzJyk7IC8vIEdldCB0aGUgbGlzdCB3aGVyZSB3ZSB3aWxsIHBsYWNlIG91ciBhdXRob3JzXHJcbmNvbnN0IHVybCA9ICdodHRwczovL3JhbmRvbXVzZXIubWUvYXBpLz9yZXN1bHRzPTEwJzsgLy8gR2V0IDEwIHJhbmRvbSB1c2Vyc1xyXG5cclxuZmV0Y2godXJsKSAvLyBDYWxsIHRoZSBmZXRjaCBmdW5jdGlvbiBwYXNzaW5nIHRoZSB1cmwgb2YgdGhlIEFQSSBhcyBhIHBhcmFtZXRlclxyXG4udGhlbigocmVzcCk9PiByZXNwLmpzb24oKSkgLy8gVHJhbnNmb3JtIHRoZSBkYXRhIGludG8gSlNPTlxyXG4udGhlbihmdW5jdGlvbihkYXRhKXtcclxuICAvLyBZb3VyIGNvZGUgZm9yIGhhbmRsaW5nIHRoZSBkYXRhIHlvdSBnZXQgZnJvbSB0aGUgQVBJXHJcbiAgLy8gQ3JlYXRlIGFuZCBhcHBlbmQgdGhlIGxpJ3MgdG8gdGhlIHVsXHJcbiAgbGV0IGF1dGhvcnMgPSBkYXRhLnJlc3VsdHM7IC8vIEdldCB0aGUgcmVzdWx0c1xyXG4gIHJldHVybiBhdXRob3JzLm1hcChmdW5jdGlvbihhdXRob3Ipe1xyXG4gICAgbGV0IGxpID0gY3JlYXRlTm9kZSgnbGknKSwgLy8gQ3JlYXRlIHRoZSBlbGVtZW50cyB3ZSBuZWVkXHJcbiAgICAgICAgaW1nID0gY3JlYXRlTm9kZSgnaW1nJyksXHJcbiAgICAgICAgc3BhbiA9IGNyZWF0ZU5vZGUoJ3NwYW4nKTtcclxuICAgIGltZy5zcmMgPSBhdXRob3IucGljdHVyZS5tZWRpdW07IFxyXG4gICAgLy8gQWRkIHRoZSBzb3VyY2Ugb2YgdGhlIGltYWdlIHRvIGJlIHRoZSBzcmMgb2YgdGhlIGltZyBlbGVtZW50XHJcbiAgICBzcGFuLmlubmVySFRNTCA9IGAke2F1dGhvci5uYW1lLmZpcnN0fSAke2F1dGhvci5uYW1lLmxhc3R9YDsgXHJcbiAgICAvLyBNYWtlIHRoZSBIVE1MIG9mIG91ciBzcGFuIHRvIGJlIHRoZSBmaXJzdCBhbmQgbGFzdCBuYW1lIG9mIG91ciBhdXRob3JcclxuICAgIGFwcGVuZChsaSwgaW1nKTsgLy8gQXBwZW5kIGFsbCBvdXIgZWxlbWVudHNcclxuICAgIGFwcGVuZChsaSwgc3Bhbik7XHJcbiAgICBhcHBlbmQodWwsIGxpKTtcclxuICB9KVxyXG59KVxyXG4uY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gIGNvbnNvbGUubG9nKGVycm9yKTtcclxufSk7XHJcblxyXG4vLyAtLS0tLS0gU0xJREVSIFdJVEggTElHSFRCT1ggLS0tLS0tXHJcbndpbmRvdy5zbGlkZXJzID0gX21hcCgnLnNsaWRlcicsIHBhcmVudCA9PiB7XHJcbiAgY29uc3Qgc2xpZGVyID0gbmV3IFNsaWRlcih7XHJcbiAgICBwYXJlbnRcclxuICB9KTtcclxuICBjb25maWdTbGlkZXIoc2xpZGVyLCBwYXJlbnQpO1xyXG59KTtcclxuXHJcbndpbmRvdy5jYXJvdXNlbHMgPSBfbWFwKCcuY2Fyb3VzZWwnLCBwYXJlbnQgPT4ge1xyXG4gIGNvbnN0IHNpemUgPSBwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNpemUnKSB8IDA7XHJcbiAgY29uc3QgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWwoe1xyXG4gICAgcGFyZW50LFxyXG4gICAgc2l6ZVxyXG4gIH0pO1xyXG4gIGNvbmZpZ1NsaWRlcihjYXJvdXNlbCwgcGFyZW50KTtcclxuICByZXR1cm4gY2Fyb3VzZWw7XHJcbn0pO1xyXG5cclxudmFyIGxpZ2h0Ym94ID0gbmV3IExpZ2h0Ym94KFwiW2RhdGEtbGlnaHRib3hdXCIpO1xuXG59KCkpO1xuIl19
