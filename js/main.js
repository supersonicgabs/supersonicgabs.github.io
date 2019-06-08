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

  var mascaras = {

    nome: function nome(campo) {
      if (/^[^a-zA-Z]+/.test(campo.value)) campo.value = '';
      var regra = /[-'a-zA-ZÀ-ÖØ-öø-ſ ]+/gi;
      var valores = campo.value.match(regra);
      if (valores) campo.value = valores.join('').replace(/ +/gi, ' ');
    },

    cep: function cep(campo) {
      var regras = [/\d+/gi, /^(\d{5})-?(\d{1,3})/];
      var valores = campo.value.match(regras[0]);
      if (!valores) return campo.value = '';
      campo.value = valores.join('');
      if (regras[1].test(campo.value)) campo.value = campo.value.replace(regras[1], '$1-$2');
      if (campo.value.length > 9) campo.value = campo.value.substr(0, 9);
    },

    telefone: function telefone(campo) {
      var regras = [/\d+/gi, /^(\d\d?)/, /^(\d\d)(\d{4})-?(\d{1,4})/, /^(\d\d)(\d{5})-?(\d{1,4})/];
      var valores = campo.value.match(regras[0]);
      if (!valores) return campo.value = '';
      var valor = campo.value = valores.join('');
      if (valor.length > 0) campo.value = valor.replace(regras[1], '($1');
      if (valor.length > 2) campo.value = valor.replace(regras[1], '($1) ');
      if (valor.length > 6) campo.value = valor.replace(regras[2], '($1) $2-$3');
      if (valor.length > 10) campo.value = valor.replace(regras[3], '($1) $2-$3');
      if (valor.length > 11) campo.value = campo.value.substr(0, 15);
    },

    rg: function rg(campo) {
      var regras = [/\d+/gi, /^(\d{1,2})/, /^(\d{1,2})\.?(\d{3})/, /^(\d{1,2})\.?(\d{3})\.?(\d{3})/, /^(\d{1,2})\.?(\d{3})\.?(\d{3})-?(\d)?/];
      var valores = campo.value.match(regras[0]);
      var letras = campo.value.match(/[a-zA-Z]+$/gi);
      var digito = letras ? letras[0][0] : '';
      if (!valores) return campo.value = '';
      var valor = campo.value = valores.join('');
      if (valor.length > 2) campo.value = valor.replace(regras[1], '$1.');
      if (valor.length > 5) campo.value = valor.replace(regras[2], '$1.$2.');
      if (valor.length > 7) campo.value = valor.replace(regras[3], '$1.$2.$3');
      if (valor.length === 8 && digito) campo.value += '-' + digito.toUpperCase();
      if (valor.length > 8) campo.value = valor.replace(regras[4], '$1.$2.$3-$4');
      if (valor.length > 9) campo.value = campo.value.substr(0, 12);
    },

    cpfcnpj: function cpfcnpj(campo) {
      var numeros = /\d+/gi;
      var valores = campo.value.match(numeros);
      if (!valores) return campo.value = '';
      var valor = valores.join('');
      var cpf = /^([0-9]{1,3})?\.?([0-9]{1,3})?\.?([0-9]{1,3})?\-?([0-9]{1,2})?$/;
      var cnpj = /^([0-9]{1,2})?\.?([0-9]{1,3})?\.?([0-9]{1,3})?\/?([0-9]{1,4})?\-?([0-9]{1,2})?$/;
      campo.value = campo.value.replace(/[^\d.\/-]/gi, '');
      if (cpf.test(valor)) campo.value = valor.replace(cpf, function (all, a, b, c, d) {
        return (a || '') + (b ? '.' + b : '') + (c ? '.' + c : '') + (d ? '-' + d : '');
      });else if (cnpj.test(valor)) campo.value = valor.replace(cnpj, function (all, a, b, c, d, e) {
        return (a || '') + (b ? '.' + b : '') + (c ? '.' + c : '') + (d ? '/' + d : '') + (e ? '-' + e : '');
      });
      if (campo.value.length > 18) campo.value = campo.value.substr(0, 18);
    },

    data: function data(campo) {
      if (campo.type === 'date') return;
      var numeros = campo.value.replace(/^0?\/|[^\d\/]/gi, '');
      if (numeros === '') {
        campo.value = numeros;
        campo.style.borderColor = null;
        return;
      }
      campo.value = numeros.replace(/(^|\/)00+\/?/g, '0').replace(/(^|\/)([1-9]\/)/, '0$2').replace(/(\d\d)(\/?)(\d{1,2})?(\/?)0*(\d{1,4})?.*/g, function (all, dd, s1, mm, s2, aaaa) {
        if (dd > 31 || mm > 12) campo.style.borderColor = 'red';else campo.style.borderColor = null;
        return dd + (mm ? '/' + mm : s1 || '') + (aaaa ? '/' + aaaa : s2 || '');
      });
    },

    email: function email(campo) {
      campo.value = campo.value.toLowerCase();
    },

    senha: function senha(campo) {
      if (campo.value.length > 0 && campo.value.length < 6) campo.style.borderColor = 'red';else campo.style.borderColor = null;
    }

  };

  function _createNode(element) {
    return document.createElement(element);
  }

  function _append(parent, el) {
    return parent.appendChild(el);
  }

  function _toggleItself(btn, content) {
    btn && btn.addEventListener('click', function () {

      if (content.hasAttribute('hidden')) {
        content.removeAttribute('hidden');
        btn.classList.add('active');
      } else {
        content.setAttribute('hidden', '');
        btn.classList.remove('active');
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
  // function createNode(element){
  //   return document.createElement(element); // Create the type of element you pass in the parameters
  // }

  // function append(parent, el){
  //   return parent.appendChild(el); // Append the second parameter(element) to the first one
  // }

  var grid = document.getElementById('authors'); // Get the list where we will place our authors
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
      var div = _createNode('div'),
          // Create the elements we need
      img = _createNode('img'),
          p = _createNode('p');
      img.src = author.picture.medium;
      div.setAttribute('data-cell', 'shrink');
      div.setAttribute('data-text', 'center');
      // Add the source of the image to be the src of the img element
      p.innerHTML = author.name.first + ' ' + author.name.last;
      // Make the HTML of our p to be the first and last name of our author
      _append(div, img); // Append all our elements
      _append(div, p);
      _append(grid, div);
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

  // ------ MASKS ------
  var each = function each(i, f) {
    return Array.prototype.forEach.call(i, f);
  };
  var form = document.querySelectorAll('form');

  if (form.length) each(form, FormMask);
  function FormMask(f) {
    Array.from(f.elements).filter(function (el) {
      return el.hasAttribute('data-mask');
    }).forEach(function (campo) {
      return campo.addEventListener('input', function () {
        var metodo = this.getAttribute('data-mask');
        if (!mascaras[metodo]) return console.log('A m\xE1scara do tipo "' + metodo + '" n\xE3o foi definida.');

        mascaras[metodo](this);
      });
    });
  }

  // ------ CRUD WITH JS ------
  var nome = document.querySelector('#nome');
  var pk = document.querySelector('#cpfcnpj');
  var email = document.querySelector('#email');

  function makeObj() {
    return {
      nome: nome.value,
      cpf: pk.value,
      email: email.value
    };
  }

  var array = [];
  var clearForm = document.querySelector('.contact-form');
  var btnEnviar = document.querySelector('.enviar');
  var btnDeletar = document.querySelector('.deletar');

  btnEnviar && btnEnviar.addEventListener('click', function () {
    if (nome.value != null, nome.value != "" && pk.value != null, pk.value != "" && email.value != null, email.value != "") {
      var indexArray = array.findIndex(function (elem) {
        return elem.cpf === pk.value;
      });
      if (indexArray > -1) {
        array[indexArray] = makeObj();
      } else {
        array.push(makeObj());
      }
      transformText(array);
      clearForm.reset();
    } else {
      alert('Preencha todos os campos!');
    }
  });

  function transformText(array) {
    // const objectText = JSON.stringify({array}, null, " ")
    // const dataContainer = document.querySelector('.results_display');
    // dataContainer.textContent = objectText;
    var objectText = array.reduce(function (acc, item, index) {
      acc += '<ul><li>' + item.nome + '</li><li>' + item.cpf + '</li><li>' + item.email + '</li></ul>';
      return acc;
    }, '');
    var dataContainer = document.querySelector('.results_display');
    dataContainer.innerHTML = objectText;
  }

  function arrayRemove(arr, value) {
    //retorna todos os elementos do array menos o que você passar
    return arr.filter(function (ele, index) {
      return index != value;
    });
  }

  btnDeletar && btnDeletar.addEventListener('click', function () {
    var indexArray = array.findIndex(function (elem) {
      return elem.cpf === pk.value;
    });

    if (indexArray > -1) {
      array = arrayRemove(array, indexArray);
    }
    transformText(array);
    clearForm.reset();
  });

  // ------TOGGLE BUTTON------
  // const toggleBtn = document.querySelector('[data-toggle]');
  // const toggleContent = document.querySelector('[data-content]');

  // toggleBtn && toggleBtn.addEventListener('click', ()=>{

  //   if(toggleContent.hasAttribute('hidden')){
  //     toggleContent.removeAttribute('hidden')
  //   }
  //   else{
  //     toggleContent.setAttribute('hidden', '')
  //   }
  // })
  _toggleItself(document.querySelector('[data-toggle]'), document.querySelector('[data-content]'));

  // ------ MAP AND FILTER ------
  var data = [{
    name: 'Butters',
    age: 3,
    type: 'dog'
  }, {
    name: 'Lizzy',
    age: 6,
    type: 'dog'
  }, {
    name: 'Red',
    age: 1,
    type: 'cat'
  }, {
    name: 'Joey',
    age: 3,
    type: 'dog'
  }];

  var dogs = data.filter(function (animal) {
    return animal.type === 'dog';
  });

  dogs.map(function (animal) {
    return animal.age *= 7;
  });

  var calcAge = dogs.reduce(function (sum, animal) {
    return sum + animal.age;
  }, 0);

  console.log(dogs);
  console.log(calcAge);

  // ------ FILTER FETCH RESULTS ------

  var dataGrid = document.querySelector('[data-characters]');
  var dataGridFilter = document.querySelector('[data-characters-filter]');
  var swapi = 'https://swapi.co/api/people/';

  fetch(swapi).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    console.log(data.results);
    var people = data.results;
    var peopleMap = people.map(function (item) {
      var div = _createNode('div'),
          p = _createNode('p');
      div.setAttribute('data-cell', 'shrink');
      div.setAttribute('data-text', 'center');
      p.innerHTML = '' + item.name;
      _append(div, p);
      _append(dataGrid, div);
    });

    var peopleFilter = people.filter(function (item) {
      return item.hair_color === 'blond';
    });

    var peopleFilterMap = peopleFilter.map(function (item) {
      var div = _createNode('div'),
          p = _createNode('p');
      div.setAttribute('data-cell', 'shrink');
      div.setAttribute('data-text', 'center');
      p.innerHTML = '' + item.name;
      _append(div, p);
      _append(dataGridFilter, div);
    });

    return { peopleMap: peopleMap, peopleFilterMap: peopleFilterMap };
  }).catch(function (error) {
    console.log(error);
  });

  // ------ AJAX REQUEST ------
  var Http = new XMLHttpRequest();
  var url1 = 'https://swapi.co/api/people/';
  Http.open('GET', url1);
  Http.send();

  Http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(Http.responseText));
      console.log(JSON.parse(Http.responseText).results);
    }
  };

  // ------ MENU HOVER ------
  // const allTargets2 = document.querySelectorAll('[data-to]');
  // const links2 = Array.prototype.slice.call(allTargets2);
  // const allTabs2 = document.querySelectorAll('[data-tab]')

  // links2.forEach(function (link){
  //   const linkTarget = link.getAttribute('data-to')

  //   link.addEventListener('mouseover', function(){
  //     const targets = Array.prototype.slice.call(allTabs2);      
  //     targets.forEach(function (target){
  //       target.setAttribute('hidden', '');

  //       if(linkTarget === target.getAttribute('data-tab')){
  //         target.removeAttribute('hidden');
  //         links2.forEach(btn =>{
  //           btn.classList.remove('active');
  //         })
  //         link.classList.add('active');
  //       }
  //     })
  //   });
  // });

  var menuPrincipal = document.querySelector('[data-menu]');
  menuPrincipal && menuPrincipal.addEventListener('mouseleave', function () {
    var targets = Array.prototype.slice.call(allTabs2);
    targets.forEach(function (target) {
      target.setAttribute('hidden', '');
    });
  });

  // ------ SEARCH ------
  var search = document.querySelector('[data-search]');

  search && search.addEventListener('input', function () {
    var filter = search.value;
    var ul = document.querySelector('[data-results]');
    var li = document.getElementsByTagName('li');
    ul.innerHTML = "";
    var arrayLi = Array.from(li);
    arrayLi.filter(function (item) {
      var itemLower = item.textContent.toLowerCase();
      var filterLower = filter.toLowerCase();
      if (filterLower && itemLower.match(filterLower)) {
        ul.innerHTML += '<li>' + item.textContent + '</li>';
      }
    });
  });

  // ------ COM LINK E APENAS TEXTO ------
  // const search = document.querySelector('[data-search]')

  // search && search.addEventListener('input', ()=>{
  //   const val = search.value
  //   const ul = document.querySelector('[data-results]')
  //   const li = document.querySelectorAll('[data-link]')
  //   const arrayLi = Array.from(li)
  //   ul.innerHTML="";
  //   arrayLi.filter((item)=>{
  //     const url = item.getAttribute('href')
  //     const text = item.querySelector('[data-text]')
  //     const itemLower = text.textContent.toLowerCase()
  //     const valLower = val.toLowerCase()
  //     if(valLower && itemLower.match(valLower)){
  //       ul.innerHTML += `<li><a href="${url}">${text.textContent}</a></li>`
  //     }
  //   }) 
  // })

  // ------ TABS ITSELF ------
  var allLinks = document.querySelectorAll('[data-link]');
  var allSections = document.querySelectorAll('[data-section]');
  var linksArr = Array.from(allLinks);
  var sectionsArr = Array.from(allSections);

  linksArr.map(function (link) {
    sectionsArr.map(function (section) {
      var attLink = link.getAttribute('data-link');
      var attSection = section.getAttribute('data-section');
      link.addEventListener('click', function () {
        if (attLink === attSection) {
          _toggleItself(link, section);
          linksArr.map(function (btn) {
            return btn.classList.remove('active');
          });
          link.classList.add('active');
          section.removeAttribute('hidden');
        } else {
          section.setAttribute('hidden', '');
        }
      });
    });
  });

  // linksArr.map((link)=>{
  //   link.addEventListener('click', function(){     
  //     sectionsArr.map((target)=>{
  //       const linkLink = link.getAttribute('data-link')
  //       const sectionTarget = target.getAttribute('data-section')

  //       target.setAttribute('hidden', '');

  //       if(linkLink === sectionTarget){
  //         target.removeAttribute('hidden');

  //         linksArr.map(btn => btn.classList.remove('active'))
  //         link.classList.add('active');
  //       }

  //       else if(linkLink === sectionTarget && !target.hasAttribute('hidden')){
  //         target.setAttribute('hidden', '')
  //       }
  //     })
  //   });
  // });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiU2xpZGVyIiwiY29uZmlnIiwidHlwZSIsInBhcmVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBhcmVudFNlbGVjdG9yIiwiY2hpbGRTZWxlY3RvciIsImNoaWxkcmVuIiwibGVuZ3RoIiwiaW5kZXgiLCJkdXJhdGlvbiIsImNsYXNzTGlzdCIsImFkZCIsImNvbXBvc2UiLCJmbiIsImZvckVhY2giLCJtYXAiLCJmaWx0ZXIiLCJmaW5kIiwibmV4dEluZGV4IiwicHJldkluZGV4IiwiZWwiLCJpIiwicmVtb3ZlIiwidGhhdCIsInBsYXlpbmdTdGF0ZUlEIiwic2V0SW50ZXJ2YWwiLCJuZXh0IiwiaXNQbGF5aW5nIiwiY2xlYXJJbnRlcnZhbCIsInBhdXNlIiwicGxheSIsInBsYXlpbmdTdGF0ZSIsImV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb2xsYXBzZWQiLCJjb25zb2xlIiwidGFibGUiLCJPYmplY3QiLCJrZXlzIiwicHJvcCIsImtleSIsInZhbHVlIiwibG9nIiwid2FybiIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsImdyb3VwRW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQ2Fyb3VzZWwiLCJzaXplIiwicG9zaXRpb24iLCJzbGlkZSIsIml0ZW1PcmRlciIsInNldEF0dHJpYnV0ZSIsImNsYXNzTmFtZSIsInN0eWxlIiwib3JkZXIiLCJkaXIiLCJhbmltQ2xhc3NOYW1lIiwicmVtb3ZlV2lsbFJlbmRlckNsYXNzIiwiX21hcCIsIndoYXQiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwidyIsImNyZWF0ZUVsZW1lbnQiLCJhdHRycyIsImVsZW1lbnQiLCJOb2RlIiwiZXh0ZW5kIiwib2JqIiwicHJvcHMiLCJleHRlbmRlcnMiLCJzdHlsZXMiLCJkYXRhc2V0IiwiZGF0YSIsIm5hbWUiLCJldmVudHMiLCJjYWxsYmFja3MiLCJraWRzIiwiayIsImFwcGVuZENoaWxkIiwidmFsIiwiTGlnaHRib3giLCJzZWxlY3RvciIsImNvbnRhaW5lciIsIm1vZGFsIiwiZ3JpZCIsInByZXYiLCJ3cmFwcGVyIiwicGFyZW50RWxlbWVudCIsImJvZHkiLCJjbG9zZUJ1dHRvbiIsImltZyIsIml0ZW1zIiwic2hvdyIsInNyYyIsImdldEF0dHJpYnV0ZSIsIm9wZW4iLCJjZWxsIiwiaW5uZXJIVE1MIiwiYnRuIiwiY2xpY2siLCJnb1ByZXYiLCJnb05leHQiLCJjbG9zZSIsImRvbU5vZGVzIiwic2xpZGVyT3B0aW9ucyIsImF1dG9wbGF5Iiwic2xpZGVyIiwib24iLCJjb25maWdTbGlkZXIiLCJmaXJzdCIsImdvVG8iLCJvcHRpb25zIiwiaGFzQXR0cmlidXRlIiwic3BsaXQiLCJvcHRpb24iLCJzbGlkZXJDYWxsYmFja3MiLCJvcGVuT25Nb2JpbGUiLCJzY3JlZW4iLCJ3aWR0aCIsInRhcmdldCIsImNvbnRyb2wiLCJ0YXJnZXRFbGVtZW50IiwiYWN0aW9uIiwiYWN0aW9uRGF0YSIsInBhcmFtcyIsImFwcGx5IiwibWFzY2FyYXMiLCJub21lIiwiY2FtcG8iLCJ0ZXN0IiwicmVncmEiLCJ2YWxvcmVzIiwibWF0Y2giLCJqb2luIiwicmVwbGFjZSIsImNlcCIsInJlZ3JhcyIsInN1YnN0ciIsInRlbGVmb25lIiwidmFsb3IiLCJyZyIsImxldHJhcyIsImRpZ2l0byIsInRvVXBwZXJDYXNlIiwiY3BmY25waiIsIm51bWVyb3MiLCJjcGYiLCJjbnBqIiwiYWxsIiwiYSIsImIiLCJjIiwiZCIsImUiLCJib3JkZXJDb2xvciIsImRkIiwiczEiLCJtbSIsInMyIiwiYWFhYSIsImVtYWlsIiwidG9Mb3dlckNhc2UiLCJzZW5oYSIsIl9jcmVhdGVOb2RlIiwiX2FwcGVuZCIsIl90b2dnbGVJdHNlbGYiLCJjb250ZW50IiwicmVtb3ZlQXR0cmlidXRlIiwiYWxsVGFyZ2V0cyIsImxpbmtzIiwibGluayIsImxpbmtUYXJnZXQiLCJhbGxUYWJzIiwidGFyZ2V0cyIsImJ0bkNyZWF0ZUVsIiwibmV3TGlzdCIsInN1bVJlZHVjZXIiLCJhcmdzIiwiYXJndW1lbnRzIiwiZmxhdEFyZ3MiLCJmbGF0IiwiSW5maW5pdHkiLCJudW1iZXJBcmdzIiwibiIsInJlZHVjZSIsInN1bSIsInJlc3VsdCIsInJlc3VsdFN1bSIsIm5ld0RpdiIsImdldEVsZW1lbnRCeUlkIiwidXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJhdXRob3JzIiwicmVzdWx0cyIsImF1dGhvciIsImRpdiIsInAiLCJwaWN0dXJlIiwibWVkaXVtIiwibGFzdCIsImNhdGNoIiwiZXJyb3IiLCJ3aW5kb3ciLCJzbGlkZXJzIiwiY2Fyb3VzZWxzIiwiY2Fyb3VzZWwiLCJsaWdodGJveCIsImVhY2giLCJmIiwiZm9ybSIsIkZvcm1NYXNrIiwiZnJvbSIsImVsZW1lbnRzIiwibWV0b2RvIiwicGsiLCJtYWtlT2JqIiwiYXJyYXkiLCJjbGVhckZvcm0iLCJidG5FbnZpYXIiLCJidG5EZWxldGFyIiwiaW5kZXhBcnJheSIsImZpbmRJbmRleCIsImVsZW0iLCJwdXNoIiwidHJhbnNmb3JtVGV4dCIsInJlc2V0IiwiYWxlcnQiLCJvYmplY3RUZXh0IiwiYWNjIiwiaXRlbSIsImRhdGFDb250YWluZXIiLCJhcnJheVJlbW92ZSIsImFyciIsImVsZSIsImFnZSIsImRvZ3MiLCJhbmltYWwiLCJjYWxjQWdlIiwiZGF0YUdyaWQiLCJkYXRhR3JpZEZpbHRlciIsInN3YXBpIiwicGVvcGxlIiwicGVvcGxlTWFwIiwicGVvcGxlRmlsdGVyIiwiaGFpcl9jb2xvciIsInBlb3BsZUZpbHRlck1hcCIsIkh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsInVybDEiLCJzZW5kIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsIm1lbnVQcmluY2lwYWwiLCJhbGxUYWJzMiIsInNlYXJjaCIsInVsIiwibGkiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFycmF5TGkiLCJpdGVtTG93ZXIiLCJ0ZXh0Q29udGVudCIsImZpbHRlckxvd2VyIiwiYWxsTGlua3MiLCJhbGxTZWN0aW9ucyIsImxpbmtzQXJyIiwic2VjdGlvbnNBcnIiLCJzZWN0aW9uIiwiYXR0TGluayIsImF0dFNlY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUMsYUFBWTtBQUNiOztBQURhLE1BR1BBLE1BSE87QUFLVCxvQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNsQixXQUFLQyxJQUFMLEdBQVksUUFBWjtBQUNBLFVBQUksRUFBRSxnQkFBZ0JGLE1BQWxCLENBQUosRUFBK0IsT0FBTyxJQUFJQSxNQUFKLENBQVdDLE1BQVgsQ0FBUDs7QUFFL0IsV0FBS0UsTUFBTCxHQUFjRixPQUFPRSxNQUFQLElBQWlCQyxTQUFTQyxhQUFULENBQXVCSixPQUFPSyxjQUFQLElBQXlCLFNBQWhELENBQS9CO0FBQ0EsVUFBSSxDQUFDLEtBQUtILE1BQVYsRUFBa0IsTUFBTSxxQ0FBTjs7QUFFbEIsV0FBS0ksYUFBTCxHQUFxQk4sT0FBT00sYUFBUCxJQUF3QixRQUE3QztBQUNBLFVBQUksQ0FBQyxLQUFLQyxRQUFMLENBQWNDLE1BQW5CLEVBQTJCLE1BQU0sbUNBQU47O0FBRTNCLFdBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQlYsT0FBT1UsUUFBUCxJQUFtQixJQUFuQztBQUNBLFdBQUtSLE1BQUwsQ0FBWVMsU0FBWixDQUFzQkMsR0FBdEIsQ0FBMEIsS0FBMUI7QUFDQSxXQUFLQyxPQUFMO0FBQ0Q7O0FBbkJRO0FBQUE7QUFBQSw4QkE2QkRDLEVBN0JDLEVBNkJHO0FBQ1YsZUFBTyxLQUFLUCxRQUFMLENBQWNRLE9BQWQsQ0FBc0JELEVBQXRCLENBQVA7QUFDRDtBQS9CUTtBQUFBO0FBQUEsMEJBaUNMQSxFQWpDSyxFQWlDRDtBQUNOLGVBQU8sS0FBS1AsUUFBTCxDQUFjUyxHQUFkLENBQWtCRixFQUFsQixDQUFQO0FBQ0Q7QUFuQ1E7QUFBQTtBQUFBLDZCQXFDRkEsRUFyQ0UsRUFxQ0U7QUFDVCxlQUFPLEtBQUtQLFFBQUwsQ0FBY1UsTUFBZCxDQUFxQkgsRUFBckIsQ0FBUDtBQUNEO0FBdkNRO0FBQUE7QUFBQSwyQkF5Q0pBLEVBekNJLEVBeUNBO0FBQ1AsZUFBTyxLQUFLUCxRQUFMLENBQWNXLElBQWQsQ0FBbUJKLEVBQW5CLENBQVA7QUFDRDtBQTNDUTtBQUFBO0FBQUEsZ0NBNkNDO0FBQUE7O0FBQ1IsWUFBSUssU0FBSixFQUFlQyxTQUFmO0FBQ0FBLG9CQUFZLEtBQUtYLEtBQUwsR0FBYSxDQUFiLEdBQWlCLEtBQUtBLEtBQUwsR0FBYSxDQUE5QixHQUFrQyxLQUFLRixRQUFMLENBQWNDLE1BQWQsR0FBdUIsQ0FBckU7QUFDQVcsb0JBQVksS0FBS1YsS0FBTCxHQUFhLEtBQUtGLFFBQUwsQ0FBY0MsTUFBZCxHQUF1QixDQUFwQyxHQUF3QyxLQUFLQyxLQUFMLEdBQWEsQ0FBckQsR0FBeUQsQ0FBckU7QUFDQSxhQUFLTSxPQUFMLENBQWEsVUFBQ00sRUFBRCxFQUFLQyxDQUFMLEVBQVc7QUFDdEJELGFBQUdWLFNBQUgsQ0FBYVksTUFBYixDQUFvQixNQUFwQjtBQUNBRixhQUFHVixTQUFILENBQWFZLE1BQWIsQ0FBb0IsU0FBcEI7QUFDQUYsYUFBR1YsU0FBSCxDQUFhWSxNQUFiLENBQW9CLE1BQXBCO0FBQ0EsY0FBSUQsTUFBTUYsU0FBVixFQUFxQkMsR0FBR1YsU0FBSCxDQUFhQyxHQUFiLENBQWlCLE1BQWpCO0FBQ3JCLGNBQUlVLE1BQU1ILFNBQVYsRUFBcUJFLEdBQUdWLFNBQUgsQ0FBYUMsR0FBYixDQUFpQixNQUFqQjtBQUNyQixjQUFJVSxNQUFNLE1BQUtiLEtBQWYsRUFBc0JZLEdBQUdWLFNBQUgsQ0FBYUMsR0FBYixDQUFpQixTQUFqQjtBQUN2QixTQVBEO0FBUUEsZUFBTyxJQUFQO0FBQ0Q7QUExRFE7QUFBQTtBQUFBLDZCQTRERjtBQUNMLFlBQUlZLElBQUo7QUFDQUEsZUFBTyxJQUFQO0FBQ0EsYUFBS0MsY0FBTCxHQUFzQkMsWUFBWSxZQUFZO0FBQzVDLGlCQUFPRixLQUFLRyxJQUFMLEVBQVA7QUFDRCxTQUZxQixFQUVuQixLQUFLakIsUUFGYyxDQUF0QjtBQUdBLGFBQUtrQixTQUFMLEdBQWlCLElBQWpCO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7QUFwRVE7QUFBQTtBQUFBLDhCQXNFRDtBQUNOQyxzQkFBYyxLQUFLSixjQUFuQjtBQUNBLGFBQUtHLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxlQUFPLElBQVA7QUFDRDtBQTFFUTtBQUFBO0FBQUEsa0NBNEVHO0FBQ1YsWUFBSSxLQUFLQSxTQUFULEVBQW9CO0FBQ2xCLGlCQUFPLEtBQUtFLEtBQUwsRUFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLEtBQUtDLElBQUwsRUFBUDtBQUNEO0FBQ0Y7QUFsRlE7QUFBQTtBQUFBLDZCQW9GRjtBQUNMLFlBQUlDLFlBQUo7QUFDQSxZQUFJLEtBQUt2QixLQUFMLEdBQWEsQ0FBakIsRUFBb0I7QUFDbEIsZUFBS0EsS0FBTDtBQUNELFNBRkQsTUFFTztBQUNMLGVBQUtBLEtBQUwsR0FBYSxLQUFLRixRQUFMLENBQWNDLE1BQWQsR0FBdUIsQ0FBcEM7QUFDRDtBQUNEd0IsdUJBQWUsS0FBS0osU0FBcEI7QUFDQSxZQUFJSSxZQUFKLEVBQWtCO0FBQ2hCLGVBQUtGLEtBQUw7QUFDRDtBQUNELGFBQUtqQixPQUFMO0FBQ0EsWUFBSW1CLFlBQUosRUFBa0I7QUFDaEIsaUJBQU8sS0FBS0QsSUFBTCxFQUFQO0FBQ0Q7QUFDRjtBQW5HUTtBQUFBO0FBQUEsNkJBcUdGO0FBQ0wsWUFBSUMsWUFBSjtBQUNBLFlBQUksS0FBS3ZCLEtBQUwsR0FBYSxLQUFLRixRQUFMLENBQWNDLE1BQWQsR0FBdUIsQ0FBeEMsRUFBMkM7QUFDekMsZUFBS0MsS0FBTDtBQUNELFNBRkQsTUFFTztBQUNMLGVBQUtBLEtBQUwsR0FBYSxDQUFiO0FBQ0Q7QUFDRHVCLHVCQUFlLEtBQUtKLFNBQXBCO0FBQ0EsWUFBSUksWUFBSixFQUFrQjtBQUNoQixlQUFLRixLQUFMO0FBQ0Q7QUFDRCxhQUFLakIsT0FBTDtBQUNBLFlBQUltQixZQUFKLEVBQWtCO0FBQ2hCLGlCQUFPLEtBQUtELElBQUwsRUFBUDtBQUNEO0FBQ0Y7QUFwSFE7QUFBQTtBQUFBLDJCQXNISnRCLEtBdEhJLEVBc0hHO0FBQ1YsYUFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsZUFBTyxLQUFLSSxPQUFMLEVBQVA7QUFDRDtBQXpIUTtBQUFBO0FBQUEseUJBMkhOb0IsS0EzSE0sRUEySENuQixFQTNIRCxFQTJISztBQUNaLGFBQUtaLE1BQUwsQ0FBWWdDLGdCQUFaLENBQTZCRCxLQUE3QixFQUFvQ25CLEVBQXBDO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7QUE5SFE7QUFBQTtBQUFBLDBCQWdJTG1CLEtBaElLLEVBZ0lFbkIsRUFoSUYsRUFnSU07QUFDYixhQUFLWixNQUFMLENBQVlpQyxtQkFBWixDQUFnQ0YsS0FBaEMsRUFBdUNuQixFQUF2QztBQUNBLGVBQU8sSUFBUDtBQUNEO0FBbklRO0FBQUE7QUFBQSw4QkFxSURzQixTQXJJQyxFQXFJVTtBQUFBOztBQUNqQkMsZ0JBQVFELGNBQWMsSUFBZCxHQUFxQixnQkFBckIsR0FBd0MsT0FBaEQsRUFBeUQsS0FBS25DLElBQTlEO0FBQ0FvQyxnQkFBUUMsS0FBUixDQUNFQyxPQUFPQyxJQUFQLENBQVksSUFBWixFQUFrQnhCLEdBQWxCLENBQXNCLGVBQU87QUFDM0IsaUJBQU87QUFDTHlCLGtCQUFNQyxHQUREO0FBRUxDLG1CQUFPLE9BQUtELEdBQUwsQ0FGRjtBQUdMekMsMEJBQWEsT0FBS3lDLEdBQUwsQ0FBYjtBQUhLLFdBQVA7QUFLRCxTQU5ELENBREY7QUFTQUwsZ0JBQVFPLEdBQVIsQ0FBWSxLQUFLMUMsTUFBakI7QUFDQW1DLGdCQUFRTyxHQUFSLENBQVksS0FBS3JDLFFBQWpCO0FBQ0E4QixnQkFBUVEsSUFBUixDQUFhQyxLQUFLQyxHQUFMLEdBQVdDLFFBQVgsRUFBYjtBQUNBWCxnQkFBUVksUUFBUixDQUFpQixLQUFLaEQsSUFBdEI7O0FBRUEsZUFBTyxJQUFQO0FBQ0Q7QUF0SlE7QUFBQTtBQUFBLDBCQXFCTTtBQUNiLGVBQU9pRCxNQUFNQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkIsS0FBS25ELE1BQUwsQ0FBWW9ELGdCQUFaLENBQTZCLEtBQUtoRCxhQUFsQyxDQUEzQixDQUFQO0FBQ0Q7QUF2QlE7QUFBQTtBQUFBLDBCQXlCSTtBQUNYLGVBQU8sS0FBS0MsUUFBTCxDQUFjQyxNQUFyQjtBQUNEO0FBM0JROztBQUFBO0FBQUE7O0FBQUEsTUEwSlArQyxRQTFKTztBQUFBOztBQTRKWCxzQkFBWXZELE1BQVosRUFBb0I7QUFBQTs7QUFDbEJBLGFBQU9LLGNBQVAsR0FBd0JMLE9BQU9LLGNBQVAsSUFBeUIsV0FBakQ7O0FBRGtCLHVIQUVaTCxNQUZZOztBQUdsQixhQUFLQyxJQUFMLEdBQVksVUFBWjtBQUNBLGFBQUt1RCxJQUFMLEdBQVl4RCxPQUFPd0QsSUFBUCxHQUFjLENBQTFCO0FBQ0EsYUFBSzNDLE9BQUw7QUFMa0I7QUFNbkI7O0FBbEtVO0FBQUE7QUFBQSxnQ0FvS0Q7QUFBQTs7QUFDUixZQUFNNEMsV0FBVyxLQUFLaEQsS0FBTCxHQUFhLENBQTlCO0FBQ0EsYUFBS00sT0FBTCxDQUFhLFVBQUMyQyxLQUFELEVBQVFwQyxDQUFSLEVBQWM7QUFDekIsY0FBSXFDLFlBQVlyQyxJQUFJbUMsUUFBSixHQUFlLENBQS9CO0FBQ0EsY0FBSUUsWUFBWSxDQUFoQixFQUFtQkEsWUFBWSxPQUFLbkQsTUFBTCxHQUFjaUQsUUFBZCxHQUF5Qm5DLENBQXpCLEdBQTZCLENBQXpDO0FBQ25Cb0MsZ0JBQU1FLFlBQU4sQ0FBbUIsWUFBbkIsRUFBaUNELFNBQWpDOztBQUVBRCxnQkFBTS9DLFNBQU4sQ0FBZ0JZLE1BQWhCLENBQXVCLE1BQXZCO0FBQ0FtQyxnQkFBTS9DLFNBQU4sQ0FBZ0JZLE1BQWhCLENBQXVCLFNBQXZCO0FBQ0FtQyxnQkFBTS9DLFNBQU4sQ0FBZ0JZLE1BQWhCLENBQXVCLE1BQXZCO0FBQ0FtQyxnQkFBTS9DLFNBQU4sQ0FBZ0JZLE1BQWhCLENBQXVCLGNBQXZCO0FBQ0FtQyxnQkFBTS9DLFNBQU4sQ0FBZ0JZLE1BQWhCLENBQXVCLGNBQXZCOztBQUVBLGNBQUksT0FBS2lDLElBQVQsRUFBZTtBQUNiLGdCQUFNSyxZQUNKLE9BQUtyRCxNQUFMLElBQWUsT0FBS2dELElBQXBCLEdBQTJCLFNBQTNCLEdBQ0FHLFlBQVksQ0FBQyxDQUFiLElBQWtCQSxZQUFZLE9BQUtILElBQW5DLEdBQTBDLFNBQTFDLEdBQ0FHLGNBQWMsQ0FBQyxDQUFmLElBQW9CQSxjQUFjLE9BQUtuRCxNQUFMLEdBQWMsQ0FBaEQsR0FBb0QsTUFBcEQsR0FDQW1ELGNBQWMsT0FBS0gsSUFBbkIsR0FBMEIsTUFBMUIsR0FDQSxFQUxGO0FBTUEsZ0JBQUksQ0FBQ0ssU0FBTCxFQUFnQixPQUFPLE1BQVA7QUFDaEJILGtCQUFNL0MsU0FBTixDQUFnQkMsR0FBaEIsQ0FBb0JpRCxTQUFwQjtBQUNBSCxrQkFBTUksS0FBTixDQUFZQyxLQUFaLEdBQW9CSixTQUFwQjtBQUNEOztBQUVELGNBQUksT0FBS0ssR0FBVCxFQUFjO0FBQ1osZ0JBQU1DLGdCQUFnQixhQUFhLE9BQUtELEdBQXhDO0FBQ0FOLGtCQUFNL0MsU0FBTixDQUFnQkMsR0FBaEIsQ0FBb0JxRCxhQUFwQjtBQUNBUCxrQkFBTXhCLGdCQUFOLENBQXVCLG9CQUF2QixFQUE2QyxZQUFXO0FBQ3REZ0Msb0NBQXNCUixLQUF0QixFQUE2Qk8sYUFBN0I7QUFDRCxhQUZEO0FBR0FQLGtCQUFNeEIsZ0JBQU4sQ0FBdUIsY0FBdkIsRUFBdUMsWUFBVztBQUNoRGdDLG9DQUFzQlIsS0FBdEIsRUFBNkJPLGFBQTdCO0FBQ0QsYUFGRDtBQUlEO0FBQ0YsU0FsQ0Q7O0FBb0NBLGlCQUFTQyxxQkFBVCxDQUErQlIsS0FBL0IsRUFBc0NHLFNBQXRDLEVBQWlEO0FBQy9DSCxnQkFBTS9DLFNBQU4sQ0FBZ0JZLE1BQWhCLENBQXVCc0MsU0FBdkI7QUFDRDs7QUFFRCxlQUFPLElBQVA7QUFDRDtBQS9NVTtBQUFBO0FBQUEsNkJBaU5KO0FBQ0wsYUFBS0csR0FBTCxHQUFXLE1BQVg7QUFDQTtBQUNEO0FBcE5VO0FBQUE7QUFBQSw2QkFzTko7QUFDTCxhQUFLQSxHQUFMLEdBQVcsTUFBWDtBQUNBO0FBQ0Q7QUF6TlU7QUFBQTtBQUFBLDJCQTJOTnZELEtBM05NLEVBMk5DO0FBQ1YsYUFBS3VELEdBQUwsR0FBV3ZELFFBQVEsS0FBS0EsS0FBYixHQUFxQixNQUFyQixHQUE4QixNQUF6QztBQUNBLHdIQUFrQkEsS0FBbEI7QUFDRDtBQTlOVTs7QUFBQTtBQUFBLElBMEpVVixNQTFKVjs7QUFrT2IsV0FBU29FLElBQVQsQ0FBY0MsSUFBZCxFQUFvQkMsUUFBcEIsRUFBOEI7QUFDMUIsUUFBSSxPQUFPRCxJQUFQLEtBQWdCLFFBQXBCLEVBQThCQSxPQUFPakUsU0FBU21ELGdCQUFULENBQTBCYyxJQUExQixDQUFQO0FBQzlCLFFBQUksRUFBRUEsZ0JBQWdCbEIsS0FBbEIsQ0FBSixFQUE4QmtCLE9BQU9sQixNQUFNQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJlLElBQTNCLENBQVA7QUFDOUIsUUFBSUMsb0JBQW9CQyxRQUF4QixFQUFrQ0YsT0FBT0EsS0FBS3BELEdBQUwsQ0FBUztBQUFBLGFBQUtxRCxTQUFTRSxDQUFULENBQUw7QUFBQSxLQUFULENBQVA7QUFDbEMsV0FBT0gsSUFBUDtBQUNEOztBQUVELFdBQVNJLGFBQVQsQ0FBdUJuRCxFQUF2QixFQUEyQm9ELEtBQTNCLEVBQWtDOztBQUVoQyxhQUFTQyxPQUFULENBQWlCckQsRUFBakIsRUFBcUJvRCxLQUFyQixFQUE0QjtBQUN4QixVQUFJLE9BQU9wRCxFQUFQLEtBQWMsUUFBbEIsRUFBNEJBLEtBQUtsQixTQUFTcUUsYUFBVCxDQUF1Qm5ELEVBQXZCLENBQUw7QUFDNUIsVUFBSSxFQUFFQSxjQUFjc0QsSUFBaEIsQ0FBSixFQUEyQixPQUFPLEtBQVA7QUFDM0IsVUFBSUYsS0FBSixFQUFXRyxPQUFPdkQsRUFBUCxFQUFXb0QsS0FBWDtBQUNYLGFBQU9wRCxFQUFQO0FBQ0g7O0FBRUQsYUFBU3VELE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCQyxLQUFyQixFQUE0QjtBQUN4QixVQUFNQyxZQUFZO0FBQ2RqQixlQUFPLGVBQVVrQixNQUFWLEVBQWtCO0FBQ3JCSixpQkFBT0MsSUFBSWYsS0FBWCxFQUFrQmtCLE1BQWxCO0FBQ0gsU0FIYTtBQUlkQyxpQkFBUyxpQkFBVUMsSUFBVixFQUFnQjtBQUNyQixlQUFLLElBQUlDLElBQVQsSUFBaUJELElBQWpCO0FBQXVCTCxnQkFBSWpCLFlBQUosQ0FBaUIsVUFBVXVCLElBQTNCLEVBQWlDRCxLQUFLQyxJQUFMLENBQWpDO0FBQXZCO0FBQ0gsU0FOYTtBQU9kQyxnQkFBUSxnQkFBVUMsU0FBVixFQUFxQjtBQUN6QixlQUFLLElBQUlGLElBQVQsSUFBaUJFLFNBQWpCO0FBQTRCUixnQkFBSTNDLGdCQUFKLENBQXFCaUQsSUFBckIsRUFBMkJFLFVBQVVGLElBQVYsQ0FBM0I7QUFBNUI7QUFDSCxTQVRhO0FBVWQ1RSxrQkFBVSxrQkFBVStFLElBQVYsRUFBZ0I7QUFDdEJwQyxnQkFBTUMsU0FBTixDQUFnQnBDLE9BQWhCLENBQXdCc0MsSUFBeEIsQ0FBNkJpQyxJQUE3QixFQUFtQyxVQUFVQyxDQUFWLEVBQWE7QUFDNUNWLGdCQUFJVyxXQUFKLENBQWdCRCxDQUFoQjtBQUNILFdBRkQ7QUFHSDtBQWRhLE9BQWxCO0FBZ0JBLFdBQUssSUFBSUosSUFBVCxJQUFpQkwsS0FBakIsRUFBd0I7QUFDcEIsU0FBQ0MsVUFBVUksSUFBVixLQUFtQixVQUFVTSxHQUFWLEVBQWU7QUFDL0JaLGNBQUlNLElBQUosSUFBWU0sR0FBWjtBQUNILFNBRkQsRUFFR1gsTUFBTUssSUFBTixDQUZIO0FBR0g7QUFDSjs7QUFFRCxXQUFPVCxRQUFRckQsRUFBUixFQUFZb0QsS0FBWixDQUFQO0FBQ0Q7O0FBM1FVLE1BNlFQaUIsUUE3UU87QUE4UVQsc0JBQVlDLFFBQVosRUFBc0I7QUFBQTs7QUFBQTs7QUFDbEIsV0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxXQUFLQyxTQUFMLEdBQWlCekYsU0FBU0MsYUFBVCxDQUF1QixxQkFBdkIsS0FBaURvRSxjQUFjLEtBQWQsRUFBcUI7QUFDbkZYLG1CQUFXLG9CQUR3RTtBQUVuRm9CLGlCQUFTO0FBQ0xZLGlCQUFPLEVBREY7QUFFTEMsZ0JBQU07QUFGRDtBQUYwRSxPQUFyQixDQUFsRTtBQU9BLFdBQUtGLFNBQUwsQ0FBZUosV0FBZixDQUEyQixLQUFLTyxJQUFoQztBQUNBLFdBQUtILFNBQUwsQ0FBZUosV0FBZixDQUEyQixLQUFLUSxPQUFoQztBQUNBLFdBQUtKLFNBQUwsQ0FBZUosV0FBZixDQUEyQixLQUFLN0QsSUFBaEM7QUFDQTs7QUFFQSxXQUFLaUUsU0FBTCxDQUFlSyxhQUFmLElBQWdDOUYsU0FBUytGLElBQVQsQ0FBY1YsV0FBZCxDQUEwQixLQUFLSSxTQUEvQixDQUFoQzs7QUFFQSxXQUFLbkYsS0FBTCxHQUFhLENBQWI7QUFDQSxXQUFLdUYsT0FBTCxDQUFhUixXQUFiLENBQXlCLEtBQUtXLFdBQTlCO0FBQ0EsV0FBS0gsT0FBTCxDQUFhUixXQUFiLENBQXlCLEtBQUtZLEdBQTlCO0FBQ0EsV0FBS0MsS0FBTCxDQUFXdEYsT0FBWCxDQUFtQixVQUFDcUYsR0FBRCxFQUFNOUUsQ0FBTixFQUFZO0FBQzNCOEUsWUFBSWxFLGdCQUFKLENBQXFCLE9BQXJCLEVBQThCLFlBQU07QUFDaEMsaUJBQUtvRSxJQUFMLENBQVVoRixDQUFWO0FBQ0gsU0FGRDtBQUdILE9BSkQ7QUFLSDs7QUF0U1E7QUFBQTtBQUFBLDZCQWlXRjtBQUNILGFBQUtzRSxTQUFMLENBQWVqRixTQUFmLENBQXlCQyxHQUF6QixDQUE2QixRQUE3QjtBQUNIO0FBbldRO0FBQUE7QUFBQSw4QkFvV0Q7QUFDSixhQUFLZ0YsU0FBTCxDQUFlakYsU0FBZixDQUF5QlksTUFBekIsQ0FBZ0MsUUFBaEM7QUFDSDtBQXRXUTtBQUFBO0FBQUEsMkJBd1dKZCxLQXhXSSxFQXdXRztBQUNSLGFBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFlBQU0yRixNQUFNLEtBQUtDLEtBQUwsQ0FBVzVGLEtBQVgsQ0FBWjtBQUNBLFlBQU04RixNQUFNSCxJQUFJSSxZQUFKLENBQWlCLGVBQWpCLElBQW9DSixJQUFJSSxZQUFKLENBQWlCLGVBQWpCLENBQXBDLEdBQXdFSixJQUFJRyxHQUF4RjtBQUNBLGFBQUtILEdBQUwsQ0FBU0csR0FBVCxHQUFlQSxHQUFmO0FBQ0EsYUFBS0UsSUFBTDtBQUNIO0FBOVdRO0FBQUE7QUFBQSwrQkFnWEE7QUFDTCxZQUFJaEcsUUFBUSxLQUFLQSxLQUFMLEdBQWEsQ0FBekI7QUFDQSxZQUFJQSxRQUFRLENBQVosRUFBZTtBQUNYQSxrQkFBUSxLQUFLNEYsS0FBTCxDQUFXN0YsTUFBWCxHQUFvQixDQUE1QjtBQUNIO0FBQ0QsYUFBSzhGLElBQUwsQ0FBVTdGLEtBQVY7QUFDSDtBQXRYUTtBQUFBO0FBQUEsK0JBdVhBO0FBQ0w0QixnQkFBUU8sR0FBUixDQUFZLElBQVo7QUFDQSxZQUFJbkMsUUFBUSxLQUFLQSxLQUFMLEdBQWEsQ0FBekI7QUFDQSxZQUFJQSxTQUFTLEtBQUs0RixLQUFMLENBQVc3RixNQUF4QixFQUFnQztBQUM1QkMsa0JBQVEsQ0FBUjtBQUNIO0FBQ0QsYUFBSzZGLElBQUwsQ0FBVTdGLEtBQVY7QUFDSDtBQTlYUTtBQUFBO0FBQUEsMEJBdVNLO0FBQ1YsZUFBTyxLQUFLbUYsU0FBTCxDQUFleEYsYUFBZixDQUE2QixtQkFBN0IsS0FBcURvRSxjQUFjLEtBQWQsRUFBcUI7QUFDN0VYLHFCQUFXLGtCQURrRTtBQUU3RW9CLG1CQUFTO0FBQ0x5QixrQkFBTSxRQUREO0FBRUxaLGtCQUFNO0FBRkQ7QUFGb0UsU0FBckIsQ0FBNUQ7QUFPSDtBQS9TUTtBQUFBO0FBQUEsMEJBZ1RFO0FBQUE7O0FBQ1AsZUFBTyxLQUFLRixTQUFMLENBQWV4RixhQUFmLENBQTZCLGdCQUE3QixLQUFrRG9FLGNBQWMsUUFBZCxFQUF3QjtBQUM3RVgscUJBQVcsZUFEa0U7QUFFN0U4QyxxQkFBVyxvUEFGa0U7QUFHN0UxQixtQkFBUztBQUNMMkIsaUJBQUs7QUFEQSxXQUhvRTtBQU03RXhCLGtCQUFRO0FBQ0p5QixtQkFBTztBQUFBLHFCQUFNLE9BQUtDLE1BQUwsRUFBTjtBQUFBO0FBREg7QUFOcUUsU0FBeEIsQ0FBekQ7QUFVSDtBQTNUUTtBQUFBO0FBQUEsMEJBNFRFO0FBQUE7O0FBQ1AsZUFBTyxLQUFLbEIsU0FBTCxDQUFleEYsYUFBZixDQUE2QixnQkFBN0IsS0FBa0RvRSxjQUFjLFFBQWQsRUFBd0I7QUFDN0VYLHFCQUFXLGVBRGtFO0FBRTdFOEMscUJBQVcsaVFBRmtFO0FBRzdFMUIsbUJBQVM7QUFDTDJCLGlCQUFLO0FBREEsV0FIb0U7QUFNN0V4QixrQkFBUTtBQUNKeUIsbUJBQU87QUFBQSxxQkFBTSxPQUFLRSxNQUFMLEVBQU47QUFBQTtBQURIO0FBTnFFLFNBQXhCLENBQXpEO0FBVUg7QUF2VVE7QUFBQTtBQUFBLDBCQXdVUztBQUFBOztBQUNkLGVBQU8sS0FBS25CLFNBQUwsQ0FBZXhGLGFBQWYsQ0FBNkIsaUJBQTdCLEtBQW1Eb0UsY0FBYyxRQUFkLEVBQXdCO0FBQzlFWCxxQkFBVyxnQkFEbUU7QUFFOUU4QyxxQkFBVyxvaUJBRm1FO0FBRzlFMUIsbUJBQVM7QUFDTDJCLGlCQUFLLE1BREE7QUFFTEYsa0JBQU07QUFGRCxXQUhxRTtBQU85RXRCLGtCQUFRO0FBQ0p5QixtQkFBTztBQUFBLHFCQUFNLE9BQUtHLEtBQUwsRUFBTjtBQUFBO0FBREg7QUFQc0UsU0FBeEIsQ0FBMUQ7QUFXSDtBQXBWUTtBQUFBO0FBQUEsMEJBc1ZHO0FBQ1IsWUFBSUMsV0FBVzlHLFNBQVNtRCxnQkFBVCxDQUEwQixLQUFLcUMsUUFBL0IsQ0FBZjtBQUNBLGVBQU96QyxNQUFNQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkI0RCxRQUEzQixDQUFQO0FBQ0g7QUF6VlE7QUFBQTtBQUFBLDBCQTJWQztBQUNOLGVBQU8sS0FBS2pCLE9BQUwsQ0FBYTVGLGFBQWIsQ0FBMkIsZUFBM0IsS0FBK0NvRSxjQUFjLEtBQWQsRUFBcUI7QUFDdkVYLHFCQUFXO0FBRDRELFNBQXJCLENBQXREO0FBR0g7QUEvVlE7O0FBQUE7QUFBQTs7QUFpWWIsTUFBTXFELGdCQUFnQjtBQUNsQkMsY0FBVSwwQkFBVTtBQUNsQkMsYUFDR3JGLElBREgsR0FFR3NGLEVBRkgsQ0FFTSxXQUZOLEVBRW1CO0FBQUEsZUFBTUQsT0FBT3RGLEtBQVAsRUFBTjtBQUFBLE9BRm5CLEVBR0d1RixFQUhILENBR00sVUFITixFQUdrQjtBQUFBLGVBQU1ELE9BQU9yRixJQUFQLEVBQU47QUFBQSxPQUhsQjtBQUlEO0FBTmlCLEdBQXRCO0FBUUEsV0FBU3VGLFlBQVQsQ0FBc0JGLE1BQXRCLEVBQThCbEgsTUFBOUIsRUFBc0M7QUFDbEMsUUFBTXFILFFBQVFySCxPQUFPc0csWUFBUCxDQUFvQixZQUFwQixJQUFvQyxDQUFsRDtBQUNBLFFBQUllLEtBQUosRUFBVztBQUNUSCxhQUFPSSxJQUFQLENBQVlELEtBQVo7QUFDRDtBQUNELFFBQU1FLFVBQVV2SCxPQUFPd0gsWUFBUCxDQUFvQixjQUFwQixJQUFzQ3hILE9BQU9zRyxZQUFQLENBQW9CLGNBQXBCLEVBQW9DbUIsS0FBcEMsQ0FBMEMsR0FBMUMsQ0FBdEMsR0FBdUYsRUFBdkc7QUFDQUYsWUFBUTFHLE9BQVIsQ0FBZ0I7QUFBQSxhQUFVbUcsY0FBY1UsTUFBZCxLQUF5QlYsY0FBY1UsTUFBZCxFQUFzQlIsTUFBdEIsQ0FBbkM7QUFBQSxLQUFoQjs7QUFFQSxRQUFNUyxrQkFBa0I7QUFDdEJDLG9CQUFjLHdCQUFNO0FBQ2xCLFlBQUlDLFNBQVNDLEtBQVQsR0FBaUIsR0FBckIsRUFBMEI7QUFDMUIsWUFBTVQsUUFBUUgsT0FBT2xHLElBQVAsQ0FBWTtBQUFBLGlCQUFTd0MsTUFBTThDLFlBQU4sQ0FBbUIsWUFBbkIsTUFBcUMsR0FBOUM7QUFBQSxTQUFaLENBQWQ7QUFDQSxZQUFJLENBQUNlLEtBQUwsRUFBWTtBQUNaLFlBQU1YLE1BQU1XLE1BQU1uSCxhQUFOLENBQW9CLGtDQUFwQixDQUFaO0FBQ0EsWUFBSSxDQUFDd0csR0FBTCxFQUFVO0FBQ1ZBLFlBQUlDLEtBQUo7QUFDRDtBQVJxQixLQUF4Qjs7QUFXQTFDLFNBQUssZ0JBQUwsRUFBdUIsbUJBQVc7QUFDaEMsVUFBTThELFNBQVNDLFFBQVExQixZQUFSLENBQXFCLGNBQXJCLENBQWY7QUFDQSxVQUFNMkIsZ0JBQWdCRixTQUFTOUgsU0FBU0MsYUFBVCxDQUF1QjZILE1BQXZCLENBQVQsR0FBMEMsSUFBaEU7O0FBRUEsVUFBSUUsaUJBQWlCQSxrQkFBa0JmLE9BQU9sSCxNQUE5QyxFQUFzRDtBQUNwRCxZQUFNa0ksU0FBU0YsUUFBUTFCLFlBQVIsQ0FBcUIsYUFBckIsQ0FBZjtBQUNBLFlBQUksQ0FBQzRCLFdBQVcsTUFBWCxJQUFxQkEsV0FBVyxNQUFqQyxLQUE2Q2hCLE9BQU81RCxJQUFQLElBQWU0RCxPQUFPNUcsTUFBdkUsRUFBZ0Y7QUFDOUUwSCxrQkFBUXRFLFlBQVIsQ0FBcUIsZUFBckIsRUFBc0MsSUFBdEM7QUFDRDtBQUNELFlBQU15RSxhQUFhSCxRQUFRMUIsWUFBUixDQUFxQixhQUFyQixDQUFuQjtBQUNBLFlBQU04QixTQUFTRCxhQUFhQSxXQUFXVixLQUFYLENBQWlCLEdBQWpCLENBQWIsR0FBcUMsSUFBcEQ7QUFDQSxZQUFNdEQsV0FBVzZELFFBQVExQixZQUFSLENBQXFCLGVBQXJCLENBQWpCO0FBQ0EsWUFBSTRCLFVBQVVoQixPQUFPZ0IsTUFBUCxhQUEwQjlELFFBQXhDLEVBQWtEO0FBQ2hENEQsa0JBQVFoRyxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxZQUFZO0FBQzVDa0YsbUJBQU9nQixNQUFQLEVBQWVHLEtBQWYsQ0FBcUJuQixNQUFyQixFQUE2QmtCLE1BQTdCO0FBQ0EsZ0JBQUlqRSxZQUFZd0QsZ0JBQWdCeEQsUUFBaEIsQ0FBaEIsRUFBMkN3RCxnQkFBZ0J4RCxRQUFoQjtBQUM1QyxXQUhEO0FBSUQ7QUFDRjtBQUNGLEtBbkJEO0FBb0JEOztBQUVILE1BQU1tRSxXQUFXOztBQUViQyxVQUFNLGNBQUNDLEtBQUQsRUFBVztBQUNiLFVBQUksY0FBY0MsSUFBZCxDQUFtQkQsTUFBTS9GLEtBQXpCLENBQUosRUFBcUMrRixNQUFNL0YsS0FBTixHQUFjLEVBQWQ7QUFDckMsVUFBTWlHLFFBQVEseUJBQWQ7QUFDQSxVQUFNQyxVQUFVSCxNQUFNL0YsS0FBTixDQUFZbUcsS0FBWixDQUFrQkYsS0FBbEIsQ0FBaEI7QUFDQSxVQUFJQyxPQUFKLEVBQWFILE1BQU0vRixLQUFOLEdBQWNrRyxRQUFRRSxJQUFSLENBQWEsRUFBYixFQUFpQkMsT0FBakIsQ0FBeUIsTUFBekIsRUFBaUMsR0FBakMsQ0FBZDtBQUNoQixLQVBZOztBQVNiQyxTQUFLLGFBQUNQLEtBQUQsRUFBVztBQUNaLFVBQU1RLFNBQVMsQ0FBQyxPQUFELEVBQVUscUJBQVYsQ0FBZjtBQUNBLFVBQU1MLFVBQVVILE1BQU0vRixLQUFOLENBQVltRyxLQUFaLENBQWtCSSxPQUFPLENBQVAsQ0FBbEIsQ0FBaEI7QUFDQSxVQUFJLENBQUNMLE9BQUwsRUFBYyxPQUFPSCxNQUFNL0YsS0FBTixHQUFjLEVBQXJCO0FBQ2QrRixZQUFNL0YsS0FBTixHQUFja0csUUFBUUUsSUFBUixDQUFhLEVBQWIsQ0FBZDtBQUNBLFVBQUlHLE9BQU8sQ0FBUCxFQUFVUCxJQUFWLENBQWVELE1BQU0vRixLQUFyQixDQUFKLEVBQWlDK0YsTUFBTS9GLEtBQU4sR0FBYytGLE1BQU0vRixLQUFOLENBQVlxRyxPQUFaLENBQW9CRSxPQUFPLENBQVAsQ0FBcEIsRUFBK0IsT0FBL0IsQ0FBZDtBQUNqQyxVQUFJUixNQUFNL0YsS0FBTixDQUFZbkMsTUFBWixHQUFxQixDQUF6QixFQUE0QmtJLE1BQU0vRixLQUFOLEdBQWMrRixNQUFNL0YsS0FBTixDQUFZd0csTUFBWixDQUFtQixDQUFuQixFQUFzQixDQUF0QixDQUFkO0FBQy9CLEtBaEJZOztBQWtCYkMsY0FBVSxrQkFBQ1YsS0FBRCxFQUFXO0FBQ2pCLFVBQU1RLFNBQVMsQ0FBQyxPQUFELEVBQVUsVUFBVixFQUFzQiwyQkFBdEIsRUFBbUQsMkJBQW5ELENBQWY7QUFDQSxVQUFNTCxVQUFVSCxNQUFNL0YsS0FBTixDQUFZbUcsS0FBWixDQUFrQkksT0FBTyxDQUFQLENBQWxCLENBQWhCO0FBQ0EsVUFBSSxDQUFDTCxPQUFMLEVBQWMsT0FBT0gsTUFBTS9GLEtBQU4sR0FBYyxFQUFyQjtBQUNkLFVBQU0wRyxRQUFRWCxNQUFNL0YsS0FBTixHQUFja0csUUFBUUUsSUFBUixDQUFhLEVBQWIsQ0FBNUI7QUFDQSxVQUFJTSxNQUFNN0ksTUFBTixHQUFlLENBQW5CLEVBQXNCa0ksTUFBTS9GLEtBQU4sR0FBYzBHLE1BQU1MLE9BQU4sQ0FBY0UsT0FBTyxDQUFQLENBQWQsRUFBeUIsS0FBekIsQ0FBZDtBQUN0QixVQUFJRyxNQUFNN0ksTUFBTixHQUFlLENBQW5CLEVBQXNCa0ksTUFBTS9GLEtBQU4sR0FBYzBHLE1BQU1MLE9BQU4sQ0FBY0UsT0FBTyxDQUFQLENBQWQsRUFBeUIsT0FBekIsQ0FBZDtBQUN0QixVQUFJRyxNQUFNN0ksTUFBTixHQUFlLENBQW5CLEVBQXNCa0ksTUFBTS9GLEtBQU4sR0FBYzBHLE1BQU1MLE9BQU4sQ0FBY0UsT0FBTyxDQUFQLENBQWQsRUFBeUIsWUFBekIsQ0FBZDtBQUN0QixVQUFJRyxNQUFNN0ksTUFBTixHQUFlLEVBQW5CLEVBQXVCa0ksTUFBTS9GLEtBQU4sR0FBYzBHLE1BQU1MLE9BQU4sQ0FBY0UsT0FBTyxDQUFQLENBQWQsRUFBeUIsWUFBekIsQ0FBZDtBQUN2QixVQUFJRyxNQUFNN0ksTUFBTixHQUFlLEVBQW5CLEVBQXVCa0ksTUFBTS9GLEtBQU4sR0FBYytGLE1BQU0vRixLQUFOLENBQVl3RyxNQUFaLENBQW1CLENBQW5CLEVBQXNCLEVBQXRCLENBQWQ7QUFDMUIsS0E1Qlk7O0FBOEJiRyxRQUFJLFlBQUNaLEtBQUQsRUFBVztBQUNYLFVBQU1RLFNBQVMsQ0FBQyxPQUFELEVBQVUsWUFBVixFQUF3QixzQkFBeEIsRUFBZ0QsZ0NBQWhELEVBQWtGLHVDQUFsRixDQUFmO0FBQ0EsVUFBTUwsVUFBVUgsTUFBTS9GLEtBQU4sQ0FBWW1HLEtBQVosQ0FBa0JJLE9BQU8sQ0FBUCxDQUFsQixDQUFoQjtBQUNBLFVBQU1LLFNBQVNiLE1BQU0vRixLQUFOLENBQVltRyxLQUFaLENBQWtCLGNBQWxCLENBQWY7QUFDQSxVQUFNVSxTQUFTRCxTQUFTQSxPQUFPLENBQVAsRUFBVSxDQUFWLENBQVQsR0FBd0IsRUFBdkM7QUFDQSxVQUFJLENBQUNWLE9BQUwsRUFBYyxPQUFPSCxNQUFNL0YsS0FBTixHQUFjLEVBQXJCO0FBQ2QsVUFBTTBHLFFBQVFYLE1BQU0vRixLQUFOLEdBQWNrRyxRQUFRRSxJQUFSLENBQWEsRUFBYixDQUE1QjtBQUNBLFVBQUlNLE1BQU03SSxNQUFOLEdBQWUsQ0FBbkIsRUFBc0JrSSxNQUFNL0YsS0FBTixHQUFjMEcsTUFBTUwsT0FBTixDQUFjRSxPQUFPLENBQVAsQ0FBZCxFQUF5QixLQUF6QixDQUFkO0FBQ3RCLFVBQUlHLE1BQU03SSxNQUFOLEdBQWUsQ0FBbkIsRUFBc0JrSSxNQUFNL0YsS0FBTixHQUFjMEcsTUFBTUwsT0FBTixDQUFjRSxPQUFPLENBQVAsQ0FBZCxFQUF5QixRQUF6QixDQUFkO0FBQ3RCLFVBQUlHLE1BQU03SSxNQUFOLEdBQWUsQ0FBbkIsRUFBc0JrSSxNQUFNL0YsS0FBTixHQUFjMEcsTUFBTUwsT0FBTixDQUFjRSxPQUFPLENBQVAsQ0FBZCxFQUF5QixVQUF6QixDQUFkO0FBQ3RCLFVBQUlHLE1BQU03SSxNQUFOLEtBQWlCLENBQWpCLElBQXNCZ0osTUFBMUIsRUFBa0NkLE1BQU0vRixLQUFOLElBQWUsTUFBTTZHLE9BQU9DLFdBQVAsRUFBckI7QUFDbEMsVUFBSUosTUFBTTdJLE1BQU4sR0FBZSxDQUFuQixFQUFzQmtJLE1BQU0vRixLQUFOLEdBQWMwRyxNQUFNTCxPQUFOLENBQWNFLE9BQU8sQ0FBUCxDQUFkLEVBQXlCLGFBQXpCLENBQWQ7QUFDdEIsVUFBSUcsTUFBTTdJLE1BQU4sR0FBZSxDQUFuQixFQUFzQmtJLE1BQU0vRixLQUFOLEdBQWMrRixNQUFNL0YsS0FBTixDQUFZd0csTUFBWixDQUFtQixDQUFuQixFQUFzQixFQUF0QixDQUFkO0FBQ3pCLEtBM0NZOztBQTZDYk8sYUFBUyxpQkFBQ2hCLEtBQUQsRUFBVztBQUNoQixVQUFNaUIsVUFBVSxPQUFoQjtBQUNBLFVBQU1kLFVBQVVILE1BQU0vRixLQUFOLENBQVltRyxLQUFaLENBQWtCYSxPQUFsQixDQUFoQjtBQUNBLFVBQUksQ0FBQ2QsT0FBTCxFQUFjLE9BQU9ILE1BQU0vRixLQUFOLEdBQWMsRUFBckI7QUFDZCxVQUFNMEcsUUFBUVIsUUFBUUUsSUFBUixDQUFhLEVBQWIsQ0FBZDtBQUNBLFVBQU1hLE1BQU0saUVBQVo7QUFDQSxVQUFNQyxPQUFPLGlGQUFiO0FBQ0FuQixZQUFNL0YsS0FBTixHQUFjK0YsTUFBTS9GLEtBQU4sQ0FBWXFHLE9BQVosQ0FBb0IsYUFBcEIsRUFBbUMsRUFBbkMsQ0FBZDtBQUNBLFVBQUlZLElBQUlqQixJQUFKLENBQVNVLEtBQVQsQ0FBSixFQUFxQlgsTUFBTS9GLEtBQU4sR0FBYzBHLE1BQU1MLE9BQU4sQ0FBY1ksR0FBZCxFQUFtQixVQUFDRSxHQUFELEVBQU1DLENBQU4sRUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBcUI7QUFDdkUsZUFBTyxDQUFDSCxLQUFLLEVBQU4sS0FBYUMsSUFBSSxNQUFNQSxDQUFWLEdBQWMsRUFBM0IsS0FBa0NDLElBQUksTUFBTUEsQ0FBVixHQUFjLEVBQWhELEtBQXVEQyxJQUFJLE1BQU1BLENBQVYsR0FBYyxFQUFyRSxDQUFQO0FBQ0gsT0FGa0MsQ0FBZCxDQUFyQixLQUdLLElBQUlMLEtBQUtsQixJQUFMLENBQVVVLEtBQVYsQ0FBSixFQUFzQlgsTUFBTS9GLEtBQU4sR0FBYzBHLE1BQU1MLE9BQU4sQ0FBY2EsSUFBZCxFQUFvQixVQUFDQyxHQUFELEVBQU1DLENBQU4sRUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JDLENBQWxCLEVBQXdCO0FBQ2pGLGVBQU8sQ0FBQ0osS0FBSyxFQUFOLEtBQWFDLElBQUksTUFBTUEsQ0FBVixHQUFjLEVBQTNCLEtBQWtDQyxJQUFJLE1BQU1BLENBQVYsR0FBYyxFQUFoRCxLQUF1REMsSUFBSSxNQUFNQSxDQUFWLEdBQWMsRUFBckUsS0FBNEVDLElBQUksTUFBTUEsQ0FBVixHQUFjLEVBQTFGLENBQVA7QUFDSCxPQUZ3QyxDQUFkO0FBRzNCLFVBQUl6QixNQUFNL0YsS0FBTixDQUFZbkMsTUFBWixHQUFxQixFQUF6QixFQUE2QmtJLE1BQU0vRixLQUFOLEdBQWMrRixNQUFNL0YsS0FBTixDQUFZd0csTUFBWixDQUFtQixDQUFuQixFQUFzQixFQUF0QixDQUFkO0FBQ2hDLEtBNURZOztBQThEYmpFLFVBQU0sY0FBQ3dELEtBQUQsRUFBVztBQUNiLFVBQUlBLE1BQU16SSxJQUFOLEtBQWUsTUFBbkIsRUFBMkI7QUFDM0IsVUFBTTBKLFVBQVVqQixNQUFNL0YsS0FBTixDQUFZcUcsT0FBWixDQUFvQixpQkFBcEIsRUFBdUMsRUFBdkMsQ0FBaEI7QUFDQSxVQUFJVyxZQUFZLEVBQWhCLEVBQW9CO0FBQ2hCakIsY0FBTS9GLEtBQU4sR0FBY2dILE9BQWQ7QUFDQWpCLGNBQU01RSxLQUFOLENBQVlzRyxXQUFaLEdBQTBCLElBQTFCO0FBQ0E7QUFDSDtBQUNEMUIsWUFBTS9GLEtBQU4sR0FBY2dILFFBQ2JYLE9BRGEsQ0FDTCxlQURLLEVBQ1ksR0FEWixFQUViQSxPQUZhLENBRUwsaUJBRkssRUFFYyxLQUZkLEVBR2JBLE9BSGEsQ0FJViwyQ0FKVSxFQUtWLFVBQVNjLEdBQVQsRUFBY08sRUFBZCxFQUFrQkMsRUFBbEIsRUFBc0JDLEVBQXRCLEVBQTBCQyxFQUExQixFQUE4QkMsSUFBOUIsRUFBb0M7QUFDaEMsWUFBSUosS0FBSyxFQUFMLElBQVdFLEtBQUssRUFBcEIsRUFBd0I3QixNQUFNNUUsS0FBTixDQUFZc0csV0FBWixHQUEwQixLQUExQixDQUF4QixLQUNLMUIsTUFBTTVFLEtBQU4sQ0FBWXNHLFdBQVosR0FBMEIsSUFBMUI7QUFDTCxlQUFPQyxNQUFNRSxLQUFLLE1BQU1BLEVBQVgsR0FBZ0JELE1BQU0sRUFBNUIsS0FBbUNHLE9BQU8sTUFBTUEsSUFBYixHQUFvQkQsTUFBTSxFQUE3RCxDQUFQO0FBQ0gsT0FUUyxDQUFkO0FBV0gsS0FqRlk7O0FBbUZiRSxXQUFPLGVBQUNoQyxLQUFELEVBQVc7QUFDZEEsWUFBTS9GLEtBQU4sR0FBYytGLE1BQU0vRixLQUFOLENBQVlnSSxXQUFaLEVBQWQ7QUFDSCxLQXJGWTs7QUF1RmJDLFdBQU8sZUFBQ2xDLEtBQUQsRUFBVztBQUNkLFVBQUlBLE1BQU0vRixLQUFOLENBQVluQyxNQUFaLEdBQXFCLENBQXJCLElBQTBCa0ksTUFBTS9GLEtBQU4sQ0FBWW5DLE1BQVosR0FBcUIsQ0FBbkQsRUFBc0RrSSxNQUFNNUUsS0FBTixDQUFZc0csV0FBWixHQUEwQixLQUExQixDQUF0RCxLQUNLMUIsTUFBTTVFLEtBQU4sQ0FBWXNHLFdBQVosR0FBMEIsSUFBMUI7QUFDUjs7QUExRlksR0FBakI7O0FBOEZBLFdBQVNTLFdBQVQsQ0FBcUJuRyxPQUFyQixFQUE2QjtBQUN6QixXQUFPdkUsU0FBU3FFLGFBQVQsQ0FBdUJFLE9BQXZCLENBQVA7QUFDSDs7QUFFRCxXQUFTb0csT0FBVCxDQUFpQjVLLE1BQWpCLEVBQXlCbUIsRUFBekIsRUFBNEI7QUFDeEIsV0FBT25CLE9BQU9zRixXQUFQLENBQW1CbkUsRUFBbkIsQ0FBUDtBQUNIOztBQUVELFdBQVMwSixhQUFULENBQXVCbkUsR0FBdkIsRUFBNEJvRSxPQUE1QixFQUFvQztBQUNoQ3BFLFdBQU9BLElBQUkxRSxnQkFBSixDQUFxQixPQUFyQixFQUE4QixZQUFJOztBQUV2QyxVQUFHOEksUUFBUXRELFlBQVIsQ0FBcUIsUUFBckIsQ0FBSCxFQUFrQztBQUNoQ3NELGdCQUFRQyxlQUFSLENBQXdCLFFBQXhCO0FBQ0FyRSxZQUFJakcsU0FBSixDQUFjQyxHQUFkLENBQWtCLFFBQWxCO0FBQ0QsT0FIRCxNQUlJO0FBQ0ZvSyxnQkFBUXBILFlBQVIsQ0FBcUIsUUFBckIsRUFBK0IsRUFBL0I7QUFDQWdELFlBQUlqRyxTQUFKLENBQWNZLE1BQWQsQ0FBcUIsUUFBckI7QUFDRDtBQUNGLEtBVk0sQ0FBUDtBQVdIOztBQUVEO0FBQ0EsTUFBTTJKLGFBQWEvSyxTQUFTbUQsZ0JBQVQsQ0FBMEIsZUFBMUIsQ0FBbkI7QUFDQSxNQUFNNkgsUUFBUWpJLE1BQU1DLFNBQU4sQ0FBZ0JDLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQjZILFVBQTNCLENBQWQ7O0FBRUFDLFFBQU1wSyxPQUFOLENBQWMsVUFBVXFLLElBQVYsRUFBZTtBQUMzQixRQUFNQyxhQUFhRCxLQUFLNUUsWUFBTCxDQUFrQixhQUFsQixDQUFuQjtBQUNBLFFBQU04RSxVQUFVbkwsU0FBU21ELGdCQUFULENBQTBCLFlBQTFCLENBQWhCOztBQUVBOEgsU0FBS2xKLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFlBQVU7QUFDdkMsVUFBTXFKLFVBQVVySSxNQUFNQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJpSSxPQUEzQixDQUFoQjtBQUNBQyxjQUFReEssT0FBUixDQUFnQixVQUFVa0gsTUFBVixFQUFpQjtBQUMvQkEsZUFBT3JFLFlBQVAsQ0FBb0IsUUFBcEIsRUFBOEIsRUFBOUI7O0FBRUEsWUFBR3lILGVBQWVwRCxPQUFPekIsWUFBUCxDQUFvQixVQUFwQixDQUFsQixFQUFrRDtBQUNoRHlCLGlCQUFPZ0QsZUFBUCxDQUF1QixRQUF2QjtBQUNBRSxnQkFBTXBLLE9BQU4sQ0FBYyxlQUFNO0FBQ2xCNkYsZ0JBQUlqRyxTQUFKLENBQWNZLE1BQWQsQ0FBcUIsUUFBckI7QUFDRCxXQUZEO0FBR0E2SixlQUFLekssU0FBTCxDQUFlQyxHQUFmLENBQW1CLFFBQW5CO0FBQ0Q7QUFDRixPQVZEO0FBV0QsS0FiRDtBQWNELEdBbEJEOztBQW9CQTtBQUNBLE1BQU00SyxjQUFjckwsU0FBU0MsYUFBVCxDQUF1QixlQUF2QixDQUFwQjtBQUNBb0wsaUJBQWVBLFlBQVl0SixnQkFBWixDQUE2QixPQUE3QixFQUFzQyxZQUFJO0FBQ3ZELFFBQU11SixVQUFVdEwsU0FBU3FFLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBaEI7QUFDQSxRQUFNd0csVUFBVTdLLFNBQVNDLGFBQVQsQ0FBdUIsd0JBQXZCLENBQWhCO0FBQ0E0SyxZQUFReEYsV0FBUixDQUFvQmlHLE9BQXBCO0FBQ0FBLFlBQVE5RSxTQUFSLEdBQW9CLGdDQUFwQjtBQUNELEdBTGMsQ0FBZjs7QUFPQTtBQUNBLFdBQVMrRSxVQUFULEdBQXNCO0FBQ3BCO0FBQ0EsUUFBTUMsT0FBT3pJLE1BQU1DLFNBQU4sQ0FBZ0JDLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQnVJLFNBQTNCLENBQWI7QUFDQTtBQUNBLFFBQU1DLFdBQVdGLEtBQUtHLElBQUwsQ0FBVUMsUUFBVixDQUFqQjtBQUNBO0FBQ0EsUUFBTUMsYUFBYUgsU0FBUzVLLE1BQVQsQ0FBZ0I7QUFBQSxhQUFLLE9BQU9nTCxDQUFQLEtBQWEsUUFBbEI7QUFBQSxLQUFoQixDQUFuQjtBQUNBO0FBQ0EsV0FBT0QsV0FBV0UsTUFBWCxDQUFrQixVQUFDQyxHQUFELEVBQU1GLENBQU47QUFBQSxhQUFZRSxNQUFNRixDQUFsQjtBQUFBLEtBQWxCLEVBQXVDLENBQXZDLENBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7O0FBRUEsTUFBTUcsU0FBU1YsV0FBVyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUFYLEVBQXNCLENBQUMsSUFBRCxFQUFPLFlBQVAsRUFBcUIsRUFBckIsQ0FBdEIsRUFBZ0QsQ0FBaEQsRUFBbUQsQ0FBQyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxDQUFDLENBQUQsQ0FBVCxFQUFjLElBQWQsQ0FBbkQsRUFBd0UsRUFBeEUsQ0FBZjs7QUFFQSxNQUFNVyxZQUFZbE0sU0FBU0MsYUFBVCxDQUF1QixZQUF2QixDQUFsQjtBQUNBaU0sZUFBYUEsVUFBVW5LLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFlBQUk7QUFDbkQsUUFBTW9LLFNBQVNuTSxTQUFTcUUsYUFBVCxDQUF1QixLQUF2QixDQUFmO0FBQ0EsUUFBTXdHLFVBQVU3SyxTQUFTQyxhQUFULENBQXVCLHdCQUF2QixDQUFoQjtBQUNBNEssWUFBUXhGLFdBQVIsQ0FBb0I4RyxNQUFwQjtBQUNBQSxXQUFPM0YsU0FBUCxRQUFzQnlGLE1BQXRCO0FBQ0QsR0FMWSxDQUFiOztBQU9BO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNdEcsT0FBTzNGLFNBQVNvTSxjQUFULENBQXdCLFNBQXhCLENBQWIsQ0ExbUJhLENBMG1Cb0M7QUFDakQsTUFBTUMsTUFBTSx1Q0FBWixDQTNtQmEsQ0EybUJ3Qzs7QUFFckRDLFFBQU1ELEdBQU4sRUFBVztBQUFYLEdBQ0NFLElBREQsQ0FDTSxVQUFDQyxJQUFEO0FBQUEsV0FBU0EsS0FBS0MsSUFBTCxFQUFUO0FBQUEsR0FETixFQUM0QjtBQUQ1QixHQUVDRixJQUZELENBRU0sVUFBU3hILElBQVQsRUFBYztBQUNsQjtBQUNBO0FBQ0EsUUFBSTJILFVBQVUzSCxLQUFLNEgsT0FBbkIsQ0FIa0IsQ0FHVTtBQUM1QixXQUFPRCxRQUFRN0wsR0FBUixDQUFZLFVBQVMrTCxNQUFULEVBQWdCO0FBQ2pDLFVBQUlDLE1BQU1uQyxZQUFZLEtBQVosQ0FBVjtBQUFBLFVBQThCO0FBQzFCekUsWUFBTXlFLFlBQVksS0FBWixDQURWO0FBQUEsVUFFSW9DLElBQUlwQyxZQUFZLEdBQVosQ0FGUjtBQUdBekUsVUFBSUcsR0FBSixHQUFVd0csT0FBT0csT0FBUCxDQUFlQyxNQUF6QjtBQUNBSCxVQUFJcEosWUFBSixDQUFpQixXQUFqQixFQUE4QixRQUE5QjtBQUNBb0osVUFBSXBKLFlBQUosQ0FBaUIsV0FBakIsRUFBOEIsUUFBOUI7QUFDQTtBQUNBcUosUUFBRXRHLFNBQUYsR0FBaUJvRyxPQUFPNUgsSUFBUCxDQUFZb0MsS0FBN0IsU0FBc0N3RixPQUFPNUgsSUFBUCxDQUFZaUksSUFBbEQ7QUFDQTtBQUNBdEMsY0FBUWtDLEdBQVIsRUFBYTVHLEdBQWIsRUFWaUMsQ0FVZDtBQUNuQjBFLGNBQVFrQyxHQUFSLEVBQWFDLENBQWI7QUFDQW5DLGNBQVFoRixJQUFSLEVBQWNrSCxHQUFkO0FBQ0QsS0FiTSxDQUFQO0FBY0QsR0FwQkQsRUFxQkNLLEtBckJELENBcUJPLFVBQVNDLEtBQVQsRUFBZTtBQUNwQmpMLFlBQVFPLEdBQVIsQ0FBWTBLLEtBQVo7QUFDRCxHQXZCRDs7QUF5QkE7QUFDQUMsU0FBT0MsT0FBUCxHQUFpQnJKLEtBQUssU0FBTCxFQUFnQixrQkFBVTtBQUN6QyxRQUFNaUQsU0FBUyxJQUFJckgsTUFBSixDQUFXO0FBQ3hCRztBQUR3QixLQUFYLENBQWY7QUFHQW9ILGlCQUFhRixNQUFiLEVBQXFCbEgsTUFBckI7QUFDRCxHQUxnQixDQUFqQjs7QUFPQXFOLFNBQU9FLFNBQVAsR0FBbUJ0SixLQUFLLFdBQUwsRUFBa0Isa0JBQVU7QUFDN0MsUUFBTVgsT0FBT3RELE9BQU9zRyxZQUFQLENBQW9CLFdBQXBCLElBQW1DLENBQWhEO0FBQ0EsUUFBTWtILFdBQVcsSUFBSW5LLFFBQUosQ0FBYTtBQUM1QnJELG9CQUQ0QjtBQUU1QnNEO0FBRjRCLEtBQWIsQ0FBakI7QUFJQThELGlCQUFhb0csUUFBYixFQUF1QnhOLE1BQXZCO0FBQ0EsV0FBT3dOLFFBQVA7QUFDRCxHQVJrQixDQUFuQjs7QUFVQSxNQUFJQyxXQUFXLElBQUlqSSxRQUFKLENBQWEsaUJBQWIsQ0FBZjs7QUFFQTtBQUNBLE1BQU1rSSxPQUFPLFNBQVBBLElBQU8sQ0FBQ3RNLENBQUQsRUFBSXVNLENBQUo7QUFBQSxXQUFVM0ssTUFBTUMsU0FBTixDQUFnQnBDLE9BQWhCLENBQXdCc0MsSUFBeEIsQ0FBNkIvQixDQUE3QixFQUFnQ3VNLENBQWhDLENBQVY7QUFBQSxHQUFiO0FBQ0EsTUFBTUMsT0FBTzNOLFNBQVNtRCxnQkFBVCxDQUEwQixNQUExQixDQUFiOztBQUVBLE1BQUl3SyxLQUFLdE4sTUFBVCxFQUFpQm9OLEtBQUtFLElBQUwsRUFBV0MsUUFBWDtBQUNqQixXQUFTQSxRQUFULENBQWtCRixDQUFsQixFQUFxQjtBQUNsQjNLLFVBQU04SyxJQUFOLENBQVdILEVBQUVJLFFBQWIsQ0FBRCxDQUNLaE4sTUFETCxDQUNZO0FBQUEsYUFBTUksR0FBR3FHLFlBQUgsQ0FBZ0IsV0FBaEIsQ0FBTjtBQUFBLEtBRFosRUFFSzNHLE9BRkwsQ0FFYTtBQUFBLGFBQVMySCxNQUFNeEcsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBWTtBQUM1RCxZQUFNZ00sU0FBUyxLQUFLMUgsWUFBTCxDQUFrQixXQUFsQixDQUFmO0FBQ0EsWUFBSSxDQUFDZ0MsU0FBUzBGLE1BQVQsQ0FBTCxFQUF1QixPQUFPN0wsUUFBUU8sR0FBUiw0QkFBa0NzTCxNQUFsQyw0QkFBUDs7QUFFdkIxRixpQkFBUzBGLE1BQVQsRUFBaUIsSUFBakI7QUFDTCxPQUxxQixDQUFUO0FBQUEsS0FGYjtBQVFEOztBQUVEO0FBQ0EsTUFBTXpGLE9BQU90SSxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQWI7QUFDQSxNQUFNK04sS0FBS2hPLFNBQVNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBWDtBQUNBLE1BQU1zSyxRQUFRdkssU0FBU0MsYUFBVCxDQUF1QixRQUF2QixDQUFkOztBQUVBLFdBQVNnTyxPQUFULEdBQWtCO0FBQ2hCLFdBQU87QUFDTDNGLFlBQU1BLEtBQUs5RixLQUROO0FBRUxpSCxXQUFLdUUsR0FBR3hMLEtBRkg7QUFHTCtILGFBQU9BLE1BQU0vSDtBQUhSLEtBQVA7QUFLRDs7QUFFRCxNQUFJMEwsUUFBUSxFQUFaO0FBQ0EsTUFBTUMsWUFBWW5PLFNBQVNDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBbEI7QUFDQSxNQUFNbU8sWUFBWXBPLFNBQVNDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBbEI7QUFDQSxNQUFNb08sYUFBYXJPLFNBQVNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBbkI7O0FBRUFtTyxlQUFhQSxVQUFVck0sZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0MsWUFBSTtBQUNuRCxRQUFHdUcsS0FBSzlGLEtBQUwsSUFBWSxJQUFaLEVBQWtCOEYsS0FBSzlGLEtBQUwsSUFBWSxFQUFaLElBQWtCd0wsR0FBR3hMLEtBQUgsSUFBVSxJQUE5QyxFQUFvRHdMLEdBQUd4TCxLQUFILElBQVUsRUFBVixJQUFnQitILE1BQU0vSCxLQUFOLElBQWEsSUFBakYsRUFBdUYrSCxNQUFNL0gsS0FBTixJQUFhLEVBQXZHLEVBQTBHO0FBQ3hHLFVBQUk4TCxhQUFhSixNQUFNSyxTQUFOLENBQWdCLGdCQUFRO0FBQ3ZDLGVBQU9DLEtBQUsvRSxHQUFMLEtBQVd1RSxHQUFHeEwsS0FBckI7QUFDRCxPQUZnQixDQUFqQjtBQUdBLFVBQUc4TCxhQUFhLENBQUMsQ0FBakIsRUFBbUI7QUFDakJKLGNBQU1JLFVBQU4sSUFBb0JMLFNBQXBCO0FBQ0QsT0FGRCxNQUdJO0FBQ0ZDLGNBQU1PLElBQU4sQ0FBV1IsU0FBWDtBQUNEO0FBQ0RTLG9CQUFjUixLQUFkO0FBQ0FDLGdCQUFVUSxLQUFWO0FBQ0QsS0FaRCxNQWFJO0FBQ0ZDLFlBQU0sMkJBQU47QUFDRDtBQUNGLEdBakJZLENBQWI7O0FBbUJBLFdBQVNGLGFBQVQsQ0FBdUJSLEtBQXZCLEVBQTZCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLFFBQU1XLGFBQWFYLE1BQU1uQyxNQUFOLENBQWEsVUFBQytDLEdBQUQsRUFBTUMsSUFBTixFQUFZek8sS0FBWixFQUFxQjtBQUNuRHdPLDBCQUFpQkMsS0FBS3pHLElBQXRCLGlCQUFzQ3lHLEtBQUt0RixHQUEzQyxpQkFBMERzRixLQUFLeEUsS0FBL0Q7QUFDQSxhQUFPdUUsR0FBUDtBQUNELEtBSGtCLEVBR2hCLEVBSGdCLENBQW5CO0FBSUEsUUFBTUUsZ0JBQWdCaFAsU0FBU0MsYUFBVCxDQUF1QixrQkFBdkIsQ0FBdEI7QUFDQStPLGtCQUFjeEksU0FBZCxHQUEwQnFJLFVBQTFCO0FBQ0Q7O0FBRUQsV0FBU0ksV0FBVCxDQUFxQkMsR0FBckIsRUFBMEIxTSxLQUExQixFQUFnQztBQUFFO0FBQ2hDLFdBQU8wTSxJQUFJcE8sTUFBSixDQUFXLFVBQUNxTyxHQUFELEVBQU03TyxLQUFOLEVBQWdCO0FBQUMsYUFBT0EsU0FBU2tDLEtBQWhCO0FBQXNCLEtBQWxELENBQVA7QUFDRDs7QUFFRDZMLGdCQUFjQSxXQUFXdE0sZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsWUFBSztBQUN0RCxRQUFJdU0sYUFBYUosTUFBTUssU0FBTixDQUFnQixnQkFBUTtBQUN2QyxhQUFPQyxLQUFLL0UsR0FBTCxLQUFhdUUsR0FBR3hMLEtBQXZCO0FBQ0QsS0FGZ0IsQ0FBakI7O0FBSUEsUUFBRzhMLGFBQWEsQ0FBQyxDQUFqQixFQUFtQjtBQUNqQkosY0FBUWUsWUFBWWYsS0FBWixFQUFtQkksVUFBbkIsQ0FBUjtBQUNEO0FBQ0RJLGtCQUFjUixLQUFkO0FBQ0FDLGNBQVVRLEtBQVY7QUFDRCxHQVZhLENBQWQ7O0FBWUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EvRCxnQkFBYzVLLFNBQVNDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBZCxFQUF1REQsU0FBU0MsYUFBVCxDQUF1QixnQkFBdkIsQ0FBdkQ7O0FBRUE7QUFDQSxNQUFJOEUsT0FBTyxDQUNUO0FBQ0VDLFVBQU0sU0FEUjtBQUVFb0ssU0FBSyxDQUZQO0FBR0V0UCxVQUFNO0FBSFIsR0FEUyxFQU1UO0FBQ0VrRixVQUFNLE9BRFI7QUFFRW9LLFNBQUssQ0FGUDtBQUdFdFAsVUFBTTtBQUhSLEdBTlMsRUFXVDtBQUNFa0YsVUFBTSxLQURSO0FBRUVvSyxTQUFLLENBRlA7QUFHRXRQLFVBQU07QUFIUixHQVhTLEVBZ0JUO0FBQ0VrRixVQUFNLE1BRFI7QUFFRW9LLFNBQUssQ0FGUDtBQUdFdFAsVUFBTTtBQUhSLEdBaEJTLENBQVg7O0FBdUJBLE1BQUl1UCxPQUFPdEssS0FBS2pFLE1BQUwsQ0FBWSxVQUFDd08sTUFBRCxFQUFVO0FBQy9CLFdBQU9BLE9BQU94UCxJQUFQLEtBQWdCLEtBQXZCO0FBQ0QsR0FGVSxDQUFYOztBQUlBdVAsT0FBS3hPLEdBQUwsQ0FBUyxVQUFDeU8sTUFBRCxFQUFVO0FBQ2pCLFdBQU9BLE9BQU9GLEdBQVAsSUFBYyxDQUFyQjtBQUNELEdBRkQ7O0FBSUEsTUFBTUcsVUFBVUYsS0FBS3RELE1BQUwsQ0FBWSxVQUFDQyxHQUFELEVBQU1zRCxNQUFOLEVBQWU7QUFDekMsV0FBT3RELE1BQU1zRCxPQUFPRixHQUFwQjtBQUNELEdBRmUsRUFFYixDQUZhLENBQWhCOztBQUlBbE4sVUFBUU8sR0FBUixDQUFZNE0sSUFBWjtBQUNBbk4sVUFBUU8sR0FBUixDQUFZOE0sT0FBWjs7QUFFQTs7QUFFQSxNQUFNQyxXQUFXeFAsU0FBU0MsYUFBVCxDQUF1QixtQkFBdkIsQ0FBakI7QUFDQSxNQUFNd1AsaUJBQWlCelAsU0FBU0MsYUFBVCxDQUF1QiwwQkFBdkIsQ0FBdkI7QUFDQSxNQUFNeVAsUUFBUSw4QkFBZDs7QUFFQXBELFFBQU1vRCxLQUFOLEVBQ0NuRCxJQURELENBQ00sVUFBQ0MsSUFBRDtBQUFBLFdBQVNBLEtBQUtDLElBQUwsRUFBVDtBQUFBLEdBRE4sRUFFQ0YsSUFGRCxDQUVNLFVBQVN4SCxJQUFULEVBQWM7QUFDbEI3QyxZQUFRTyxHQUFSLENBQVlzQyxLQUFLNEgsT0FBakI7QUFDQSxRQUFJZ0QsU0FBUzVLLEtBQUs0SCxPQUFsQjtBQUNBLFFBQU1pRCxZQUFZRCxPQUFPOU8sR0FBUCxDQUFXLFVBQUNrTyxJQUFELEVBQVE7QUFDbkMsVUFBSWxDLE1BQU1uQyxZQUFZLEtBQVosQ0FBVjtBQUFBLFVBQ0lvQyxJQUFJcEMsWUFBWSxHQUFaLENBRFI7QUFFQW1DLFVBQUlwSixZQUFKLENBQWlCLFdBQWpCLEVBQThCLFFBQTlCO0FBQ0FvSixVQUFJcEosWUFBSixDQUFpQixXQUFqQixFQUE4QixRQUE5QjtBQUNBcUosUUFBRXRHLFNBQUYsUUFBaUJ1SSxLQUFLL0osSUFBdEI7QUFDQTJGLGNBQVFrQyxHQUFSLEVBQWFDLENBQWI7QUFDQW5DLGNBQVE2RSxRQUFSLEVBQWtCM0MsR0FBbEI7QUFDRCxLQVJpQixDQUFsQjs7QUFVQSxRQUFNZ0QsZUFBZUYsT0FBTzdPLE1BQVAsQ0FBYyxVQUFDaU8sSUFBRCxFQUFRO0FBQ3pDLGFBQU9BLEtBQUtlLFVBQUwsS0FBb0IsT0FBM0I7QUFDRCxLQUZvQixDQUFyQjs7QUFJQSxRQUFNQyxrQkFBa0JGLGFBQWFoUCxHQUFiLENBQWlCLFVBQUNrTyxJQUFELEVBQVE7QUFDL0MsVUFBSWxDLE1BQU1uQyxZQUFZLEtBQVosQ0FBVjtBQUFBLFVBQ0lvQyxJQUFJcEMsWUFBWSxHQUFaLENBRFI7QUFFQW1DLFVBQUlwSixZQUFKLENBQWlCLFdBQWpCLEVBQThCLFFBQTlCO0FBQ0FvSixVQUFJcEosWUFBSixDQUFpQixXQUFqQixFQUE4QixRQUE5QjtBQUNBcUosUUFBRXRHLFNBQUYsUUFBaUJ1SSxLQUFLL0osSUFBdEI7QUFDQTJGLGNBQVFrQyxHQUFSLEVBQWFDLENBQWI7QUFDQW5DLGNBQVE4RSxjQUFSLEVBQXdCNUMsR0FBeEI7QUFDRCxLQVJ1QixDQUF4Qjs7QUFVQSxXQUFPLEVBQUMrQyxvQkFBRCxFQUFZRyxnQ0FBWixFQUFQO0FBQ0QsR0E5QkQsRUErQkM3QyxLQS9CRCxDQStCTyxVQUFDQyxLQUFELEVBQVM7QUFDZGpMLFlBQVFPLEdBQVIsQ0FBWTBLLEtBQVo7QUFDRCxHQWpDRDs7QUFtQ0E7QUFDQSxNQUFNNkMsT0FBTyxJQUFJQyxjQUFKLEVBQWI7QUFDQSxNQUFNQyxPQUFLLDhCQUFYO0FBQ0FGLE9BQUsxSixJQUFMLENBQVUsS0FBVixFQUFpQjRKLElBQWpCO0FBQ0FGLE9BQUtHLElBQUw7O0FBRUFILE9BQUtJLGtCQUFMLEdBQXdCLFlBQVU7QUFDaEMsUUFBRyxLQUFLQyxVQUFMLElBQWlCLENBQWpCLElBQXNCLEtBQUtDLE1BQUwsSUFBYSxHQUF0QyxFQUEwQztBQUN4Q3BPLGNBQVFPLEdBQVIsQ0FBWThOLEtBQUtDLEtBQUwsQ0FBV1IsS0FBS1MsWUFBaEIsQ0FBWjtBQUNBdk8sY0FBUU8sR0FBUixDQUFZOE4sS0FBS0MsS0FBTCxDQUFXUixLQUFLUyxZQUFoQixFQUE4QjlELE9BQTFDO0FBQ0Q7QUFDRixHQUxEOztBQU9BO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTStELGdCQUFnQjFRLFNBQVNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBdEI7QUFDQXlRLG1CQUFpQkEsY0FBYzNPLGdCQUFkLENBQStCLFlBQS9CLEVBQTZDLFlBQUk7QUFDOUQsUUFBTXFKLFVBQVVySSxNQUFNQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJ5TixRQUEzQixDQUFoQjtBQUNBdkYsWUFBUXhLLE9BQVIsQ0FBZ0IsVUFBVWtILE1BQVYsRUFBaUI7QUFDL0JBLGFBQU9yRSxZQUFQLENBQW9CLFFBQXBCLEVBQThCLEVBQTlCO0FBQ0QsS0FGRDtBQUdILEdBTGdCLENBQWpCOztBQU9BO0FBQ0EsTUFBTW1OLFNBQVM1USxTQUFTQyxhQUFULENBQXVCLGVBQXZCLENBQWY7O0FBRUEyUSxZQUFVQSxPQUFPN08sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBSTtBQUM3QyxRQUFNakIsU0FBUzhQLE9BQU9wTyxLQUF0QjtBQUNBLFFBQU1xTyxLQUFLN1EsU0FBU0MsYUFBVCxDQUF1QixnQkFBdkIsQ0FBWDtBQUNBLFFBQU02USxLQUFLOVEsU0FBUytRLG9CQUFULENBQThCLElBQTlCLENBQVg7QUFDQUYsT0FBR3JLLFNBQUgsR0FBYSxFQUFiO0FBQ0EsUUFBTXdLLFVBQVVqTyxNQUFNOEssSUFBTixDQUFXaUQsRUFBWCxDQUFoQjtBQUNBRSxZQUFRbFEsTUFBUixDQUFlLFVBQUNpTyxJQUFELEVBQVE7QUFDckIsVUFBTWtDLFlBQVlsQyxLQUFLbUMsV0FBTCxDQUFpQjFHLFdBQWpCLEVBQWxCO0FBQ0EsVUFBTTJHLGNBQWNyUSxPQUFPMEosV0FBUCxFQUFwQjtBQUNBLFVBQUcyRyxlQUFlRixVQUFVdEksS0FBVixDQUFnQndJLFdBQWhCLENBQWxCLEVBQStDO0FBQzdDTixXQUFHckssU0FBSCxhQUF1QnVJLEtBQUttQyxXQUE1QjtBQUNEO0FBQ0YsS0FORDtBQU9ELEdBYlMsQ0FBVjs7QUFlQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTUUsV0FBV3BSLFNBQVNtRCxnQkFBVCxDQUEwQixhQUExQixDQUFqQjtBQUNBLE1BQU1rTyxjQUFjclIsU0FBU21ELGdCQUFULENBQTBCLGdCQUExQixDQUFwQjtBQUNBLE1BQU1tTyxXQUFXdk8sTUFBTThLLElBQU4sQ0FBV3VELFFBQVgsQ0FBakI7QUFDQSxNQUFNRyxjQUFjeE8sTUFBTThLLElBQU4sQ0FBV3dELFdBQVgsQ0FBcEI7O0FBRUFDLFdBQVN6USxHQUFULENBQWEsVUFBQ29LLElBQUQsRUFBUTtBQUNuQnNHLGdCQUFZMVEsR0FBWixDQUFpQixVQUFDMlEsT0FBRCxFQUFXO0FBQzFCLFVBQU1DLFVBQVV4RyxLQUFLNUUsWUFBTCxDQUFrQixXQUFsQixDQUFoQjtBQUNBLFVBQU1xTCxhQUFhRixRQUFRbkwsWUFBUixDQUFxQixjQUFyQixDQUFuQjtBQUNBNEUsV0FBS2xKLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFlBQUk7QUFDakMsWUFBRzBQLFlBQVlDLFVBQWYsRUFBMEI7QUFDeEI5Ryx3QkFBY0ssSUFBZCxFQUFvQnVHLE9BQXBCO0FBQ0FGLG1CQUFTelEsR0FBVCxDQUFhO0FBQUEsbUJBQU00RixJQUFJakcsU0FBSixDQUFjWSxNQUFkLENBQXFCLFFBQXJCLENBQU47QUFBQSxXQUFiO0FBQ0E2SixlQUFLekssU0FBTCxDQUFlQyxHQUFmLENBQW1CLFFBQW5CO0FBQ0ErUSxrQkFBUTFHLGVBQVIsQ0FBd0IsUUFBeEI7QUFDRCxTQUxELE1BTUs7QUFDSDBHLGtCQUFRL04sWUFBUixDQUFxQixRQUFyQixFQUErQixFQUEvQjtBQUNEO0FBQ0YsT0FWRDtBQVdELEtBZEQ7QUFlRCxHQWhCRDs7QUFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQyxDQTM4QkEsR0FBRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbid1c2Ugc3RyaWN0JztcblxuY2xhc3MgU2xpZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgdGhpcy50eXBlID0gJ1NsaWRlcic7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU2xpZGVyKSkgcmV0dXJuIG5ldyBTbGlkZXIoY29uZmlnKTtcbiAgXG4gICAgICB0aGlzLnBhcmVudCA9IGNvbmZpZy5wYXJlbnQgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb25maWcucGFyZW50U2VsZWN0b3IgfHwgJy5zbGlkZXInKTtcbiAgICAgIGlmICghdGhpcy5wYXJlbnQpIHRocm93ICdbU0xJREVSXTogQ29udGFpbmVyIG7Do28gZW5jb250cmFkby4nO1xuICBcbiAgICAgIHRoaXMuY2hpbGRTZWxlY3RvciA9IGNvbmZpZy5jaGlsZFNlbGVjdG9yIHx8ICcuc2xpZGUnO1xuICAgICAgaWYgKCF0aGlzLmNoaWxkcmVuLmxlbmd0aCkgdGhyb3cgJ1tTTElERVJdOiBTbGlkZXMgbsOjbyBlbmNvbnRyYWRvcy4nO1xuICBcbiAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgdGhpcy5kdXJhdGlvbiA9IGNvbmZpZy5kdXJhdGlvbiB8fCAzMDAwO1xuICAgICAgdGhpcy5wYXJlbnQuY2xhc3NMaXN0LmFkZCgnc2V0Jyk7XG4gICAgICB0aGlzLmNvbXBvc2UoKTtcbiAgICB9XG4gIFxuICAgIGdldCBjaGlsZHJlbigpIHtcbiAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLnBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuY2hpbGRTZWxlY3RvcikpO1xuICAgIH1cbiAgXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICB9XG4gIFxuICAgIGZvckVhY2goZm4pIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZvckVhY2goZm4pO1xuICAgIH1cbiAgXG4gICAgbWFwKGZuKSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5tYXAoZm4pO1xuICAgIH1cbiAgXG4gICAgZmlsdGVyKGZuKSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maWx0ZXIoZm4pO1xuICAgIH1cbiAgXG4gICAgZmluZChmbikge1xuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmluZChmbik7XG4gICAgfVxuICBcbiAgICBjb21wb3NlKCkge1xuICAgICAgdmFyIG5leHRJbmRleCwgcHJldkluZGV4O1xuICAgICAgcHJldkluZGV4ID0gdGhpcy5pbmRleCA+IDAgPyB0aGlzLmluZGV4IC0gMSA6IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgIG5leHRJbmRleCA9IHRoaXMuaW5kZXggPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDEgPyB0aGlzLmluZGV4ICsgMSA6IDA7XG4gICAgICB0aGlzLmZvckVhY2goKGVsLCBpKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ByZXYnKTtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudCcpO1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCduZXh0Jyk7XG4gICAgICAgIGlmIChpID09PSBwcmV2SW5kZXgpIGVsLmNsYXNzTGlzdC5hZGQoJ3ByZXYnKTtcbiAgICAgICAgaWYgKGkgPT09IG5leHRJbmRleCkgZWwuY2xhc3NMaXN0LmFkZCgnbmV4dCcpO1xuICAgICAgICBpZiAoaSA9PT0gdGhpcy5pbmRleCkgZWwuY2xhc3NMaXN0LmFkZCgnY3VycmVudCcpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIFxuICAgIHBsYXkoKSB7XG4gICAgICB2YXIgdGhhdDtcbiAgICAgIHRoYXQgPSB0aGlzO1xuICAgICAgdGhpcy5wbGF5aW5nU3RhdGVJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoYXQubmV4dCgpO1xuICAgICAgfSwgdGhpcy5kdXJhdGlvbik7XG4gICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIFxuICAgIHBhdXNlKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnBsYXlpbmdTdGF0ZUlEKTtcbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIFxuICAgIHBsYXlwYXVzZSgpIHtcbiAgICAgIGlmICh0aGlzLmlzUGxheWluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXVzZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheSgpO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgcHJldigpIHtcbiAgICAgIHZhciBwbGF5aW5nU3RhdGU7XG4gICAgICBpZiAodGhpcy5pbmRleCA+IDApIHtcbiAgICAgICAgdGhpcy5pbmRleC0tO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICAgIHBsYXlpbmdTdGF0ZSA9IHRoaXMuaXNQbGF5aW5nO1xuICAgICAgaWYgKHBsYXlpbmdTdGF0ZSkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbXBvc2UoKTtcbiAgICAgIGlmIChwbGF5aW5nU3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheSgpO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgbmV4dCgpIHtcbiAgICAgIHZhciBwbGF5aW5nU3RhdGU7XG4gICAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMSkge1xuICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIHBsYXlpbmdTdGF0ZSA9IHRoaXMuaXNQbGF5aW5nO1xuICAgICAgaWYgKHBsYXlpbmdTdGF0ZSkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbXBvc2UoKTtcbiAgICAgIGlmIChwbGF5aW5nU3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheSgpO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgZ29UbyhpbmRleCkge1xuICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgcmV0dXJuIHRoaXMuY29tcG9zZSgpO1xuICAgIH1cbiAgXG4gICAgb24oZXZlbnQsIGZuKSB7XG4gICAgICB0aGlzLnBhcmVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmbik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIFxuICAgIG9mZihldmVudCwgZm4pIHtcbiAgICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgXG4gICAgaW5zcGVjdChjb2xsYXBzZWQpIHtcbiAgICAgIGNvbnNvbGVbY29sbGFwc2VkID09PSB0cnVlID8gJ2dyb3VwQ29sbGFwc2VkJyA6ICdncm91cCddKHRoaXMudHlwZSk7XG4gICAgICBjb25zb2xlLnRhYmxlKFxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzKS5tYXAoa2V5ID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJvcDoga2V5LFxuICAgICAgICAgICAgdmFsdWU6IHRoaXNba2V5XSxcbiAgICAgICAgICAgIHR5cGU6IHR5cGVvZiB0aGlzW2tleV1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgY29uc29sZS5sb2codGhpcy5wYXJlbnQpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5jaGlsZHJlbik7XG4gICAgICBjb25zb2xlLndhcm4oRGF0ZS5ub3coKS50b1N0cmluZygpKTtcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQodGhpcy50eXBlKTtcbiAgXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIFxuICB9XG5cbmNsYXNzIENhcm91c2VsIGV4dGVuZHMgU2xpZGVyIHtcblxuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBjb25maWcucGFyZW50U2VsZWN0b3IgPSBjb25maWcucGFyZW50U2VsZWN0b3IgfHwgJy5jYXJvdXNlbCc7XG4gICAgc3VwZXIoY29uZmlnKTtcbiAgICB0aGlzLnR5cGUgPSAnQ2Fyb3VzZWwnO1xuICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplIHwgMDtcbiAgICB0aGlzLmNvbXBvc2UoKTtcbiAgfVxuXG4gIGNvbXBvc2UoKSB7XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmluZGV4ICsgMTtcbiAgICB0aGlzLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XG4gICAgICBsZXQgaXRlbU9yZGVyID0gaSAtIHBvc2l0aW9uICsgMTtcbiAgICAgIGlmIChpdGVtT3JkZXIgPCAwKSBpdGVtT3JkZXIgPSB0aGlzLmxlbmd0aCAtIHBvc2l0aW9uICsgaSArIDE7XG4gICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3JkZXInLCBpdGVtT3JkZXIpO1xuXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdwcmV2Jyk7XG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50Jyk7XG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCduZXh0Jyk7XG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3aWxsLWdvLXByZXYnKTtcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dpbGwtZ28tbmV4dCcpO1xuXG4gICAgICBpZiAodGhpcy5zaXplKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9XG4gICAgICAgICAgdGhpcy5sZW5ndGggPD0gdGhpcy5zaXplID8gJ2N1cnJlbnQnIDpcbiAgICAgICAgICBpdGVtT3JkZXIgPiAtMSAmJiBpdGVtT3JkZXIgPCB0aGlzLnNpemUgPyAnY3VycmVudCcgOlxuICAgICAgICAgIGl0ZW1PcmRlciA9PT0gLTEgfHwgaXRlbU9yZGVyID09PSB0aGlzLmxlbmd0aCAtIDEgPyAncHJldicgOlxuICAgICAgICAgIGl0ZW1PcmRlciA9PT0gdGhpcy5zaXplID8gJ25leHQnIDpcbiAgICAgICAgICAnJztcbiAgICAgICAgaWYgKCFjbGFzc05hbWUpIHJldHVybiB0aGlzO1xuICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIHNsaWRlLnN0eWxlLm9yZGVyID0gaXRlbU9yZGVyO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kaXIpIHtcbiAgICAgICAgY29uc3QgYW5pbUNsYXNzTmFtZSA9ICd3aWxsLWdvLScgKyB0aGlzLmRpcjtcbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChhbmltQ2xhc3NOYW1lKTtcbiAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdEFuaW1hdGlvbkVuZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZW1vdmVXaWxsUmVuZGVyQ2xhc3Moc2xpZGUsIGFuaW1DbGFzc05hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZW1vdmVXaWxsUmVuZGVyQ2xhc3Moc2xpZGUsIGFuaW1DbGFzc05hbWUpO1xuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlV2lsbFJlbmRlckNsYXNzKHNsaWRlLCBjbGFzc05hbWUpIHtcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByZXYoKSB7XG4gICAgdGhpcy5kaXIgPSAncHJldic7XG4gICAgcmV0dXJuIHN1cGVyLnByZXYoKTtcbiAgfVxuXG4gIG5leHQoKSB7XG4gICAgdGhpcy5kaXIgPSAnbmV4dCc7XG4gICAgcmV0dXJuIHN1cGVyLm5leHQoKTtcbiAgfVxuXG4gIGdvVG8oaW5kZXgpIHtcbiAgICB0aGlzLmRpciA9IGluZGV4ID4gdGhpcy5pbmRleCA/ICduZXh0JyA6ICdwcmV2JztcbiAgICByZXR1cm4gc3VwZXIuZ29UbyhpbmRleCk7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBfbWFwKHdoYXQsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiB3aGF0ID09PSAnc3RyaW5nJykgd2hhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwod2hhdCk7XG4gICAgaWYgKCEod2hhdCBpbnN0YW5jZW9mIEFycmF5KSkgd2hhdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHdoYXQpO1xuICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB3aGF0ID0gd2hhdC5tYXAodyA9PiBjYWxsYmFjayh3KSk7XG4gICAgcmV0dXJuIHdoYXQ7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZWwsIGF0dHJzKSB7XG4gIFxuICAgIGZ1bmN0aW9uIGVsZW1lbnQoZWwsIGF0dHJzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpO1xuICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIE5vZGUpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChhdHRycykgZXh0ZW5kKGVsLCBhdHRycyk7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG4gIFxuICAgIGZ1bmN0aW9uIGV4dGVuZChvYmosIHByb3BzKSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZGVycyA9IHtcbiAgICAgICAgICAgIHN0eWxlOiBmdW5jdGlvbiAoc3R5bGVzKSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKG9iai5zdHlsZSwgc3R5bGVzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gZGF0YSkgb2JqLnNldEF0dHJpYnV0ZSgnZGF0YS0nICsgbmFtZSwgZGF0YVtuYW1lXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZlbnRzOiBmdW5jdGlvbiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBjYWxsYmFja3MpIG9iai5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGNhbGxiYWNrc1tuYW1lXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hpbGRyZW46IGZ1bmN0aW9uIChraWRzKSB7XG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChraWRzLCBmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgICAgICAgICBvYmouYXBwZW5kQ2hpbGQoayk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIChleHRlbmRlcnNbbmFtZV0gfHwgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICAgIG9ialtuYW1lXSA9IHZhbDtcbiAgICAgICAgICAgIH0pKHByb3BzW25hbWVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgXG4gICAgcmV0dXJuIGVsZW1lbnQoZWwsIGF0dHJzKTtcbiAgfVxuXG5jbGFzcyBMaWdodGJveCB7XG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1jb250YWluZXInKSB8fCBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1jb250YWluZXInLFxuICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICAgIG1vZGFsOiAnJyxcbiAgICAgICAgICAgICAgICBncmlkOiAnY2VudGVyJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucHJldik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMud3JhcHBlcik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XG4gICAgICAgIC8vdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUJ1dHRvbik7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIucGFyZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgdGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VCdXR0b24pO1xuICAgICAgICB0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy5pbWcpO1xuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGltZywgaSkgPT4ge1xuICAgICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IHdyYXBwZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtd3JhcHBlcicpIHx8IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LXdyYXBwZXInLFxuICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICAgIGNlbGw6ICdzaHJpbmsnLFxuICAgICAgICAgICAgICAgIGdyaWQ6ICdjb2x1bW4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGdldCBwcmV2KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LXByZXYnKSB8fCBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1wcmV2JyxcbiAgICAgICAgICAgIGlubmVySFRNTDogJzxzdmcgeG1sbnM9XCJodHRwczovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Ym94PVwiMCAwIDEyOSAxMjlcIj48cGF0aCBkPVwiTTg4LjYgMTIxLjNjLjguOCAxLjggMS4yIDIuOSAxLjJzMi4xLS40IDIuOS0xLjJjMS42LTEuNiAxLjYtNC4yIDAtNS44bC01MS01MSA1MS01MWMxLjYtMS42IDEuNi00LjIgMC01LjhzLTQuMi0xLjYtNS44IDBsLTU0IDUzLjljLTEuNiAxLjYtMS42IDQuMiAwIDUuOGw1NCA1My45elwiIC8+PC9zdmc+JyxcbiAgICAgICAgICAgIGRhdGFzZXQ6IHtcbiAgICAgICAgICAgICAgICBidG46ICdsaW5rJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLmdvUHJldigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1uZXh0JykgfHwgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtbmV4dCcsXG4gICAgICAgICAgICBpbm5lckhUTUw6ICc8c3ZnIHhtbG5zPVwiaHR0cHM6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld2JveD1cIjAgMCAxMjkgMTI5XCI+PHBhdGggZD1cIk00MC40IDEyMS4zYy0uOC44LTEuOCAxLjItMi45IDEuMnMtMi4xLS40LTIuOS0xLjJjLTEuNi0xLjYtMS42LTQuMiAwLTUuOGw1MS01MS01MS01MWMtMS42LTEuNi0xLjYtNC4yIDAtNS44IDEuNi0xLjYgNC4yLTEuNiA1LjggMGw1My45IDUzLjljMS42IDEuNiAxLjYgNC4yIDAgNS44bC01My45IDUzLjl6XCIgLz48L3N2Zz4nLFxuICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICAgIGJ0bjogJ2xpbmsnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMuZ29OZXh0KCksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgY2xvc2VCdXR0b24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtY2xvc2UnKSB8fCBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1jbG9zZScsXG4gICAgICAgICAgICBpbm5lckhUTUw6ICc8c3ZnIHhtbG5zPVwiaHR0cHM6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld2JveD1cIjAgMCA1MTIgNTEyXCI+PHBhdGggZmlsbD1cIiNmZmZcIiBkPVwiTTUwNS45NDMgNi4wNThjLTguMDc3LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDkgMEw2LjA1OCA0NzYuNjkzYy04LjA3NyA4LjA3Ny04LjA3NyAyMS4xNzIgMCAyOS4yNDlBMjAuNjEyIDIwLjYxMiAwIDAgMCAyMC42ODMgNTEyYTIwLjYxNCAyMC42MTQgMCAwIDAgMTQuNjI1LTYuMDU5TDUwNS45NDMgMzUuMzA2YzguMDc2LTguMDc2IDguMDc2LTIxLjE3MSAwLTI5LjI0OHpcIi8+PHBhdGggZmlsbD1cIiNmZmZcIiBkPVwiTTUwNS45NDIgNDc2LjY5NEwzNS4zMDYgNi4wNTljLTguMDc2LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDggMC04LjA3NyA4LjA3Ni04LjA3NyAyMS4xNzEgMCAyOS4yNDhsNDcwLjYzNiA0NzAuNjM2YTIwLjYxNiAyMC42MTYgMCAwIDAgMTQuNjI1IDYuMDU4IDIwLjYxNSAyMC42MTUgMCAwIDAgMTQuNjI0LTYuMDU3YzguMDc1LTguMDc4IDguMDc1LTIxLjE3My0uMDAxLTI5LjI1elwiLz48L3N2Zz4nLFxuICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICAgIGJ0bjogJ2xpbmsnLFxuICAgICAgICAgICAgICAgIGNlbGw6ICdzaHJpbmsgZW5kJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLmNsb3NlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXQgaXRlbXMoKSB7XG4gICAgICAgIHZhciBkb21Ob2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZWxlY3Rvcik7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb21Ob2Rlcyk7XG4gICAgfVxuXG4gICAgZ2V0IGltZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtaW1nJykgfHwgY3JlYXRlRWxlbWVudCgnaW1nJywge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtaW1nJyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb3BlbigpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFyZ2V0Jyk7XG4gICAgfVxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd0YXJnZXQnKTtcbiAgICB9XG5cbiAgICBzaG93KGluZGV4KSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgY29uc3QgaW1nID0gdGhpcy5pdGVtc1tpbmRleF07XG4gICAgICAgIGNvbnN0IHNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGlnaHRib3gnKSA/IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGlnaHRib3gnKSA6IGltZy5zcmM7XG4gICAgICAgIHRoaXMuaW1nLnNyYyA9IHNyYztcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuXG4gICAgZ29QcmV2KCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4IC0gMTtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93KGluZGV4KTtcbiAgICB9XG4gICAgZ29OZXh0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleCArIDE7XG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9ICAgICAgICBcbiAgICAgICAgdGhpcy5zaG93KGluZGV4KTtcbiAgICB9XG59XG5cbmNvbnN0IHNsaWRlck9wdGlvbnMgPSB7XG4gICAgYXV0b3BsYXk6IHNsaWRlciA9PiB7XG4gICAgICBzbGlkZXJcbiAgICAgICAgLnBsYXkoKVxuICAgICAgICAub24oJ21vdXNlb3ZlcicsICgpID0+IHNsaWRlci5wYXVzZSgpKVxuICAgICAgICAub24oJ21vdXNlb3V0JywgKCkgPT4gc2xpZGVyLnBsYXkoKSk7XG4gICAgfVxuICB9O1xuZnVuY3Rpb24gY29uZmlnU2xpZGVyKHNsaWRlciwgcGFyZW50KSB7XG4gICAgY29uc3QgZmlyc3QgPSBwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWZpcnN0JykgfCAwO1xuICAgIGlmIChmaXJzdCkge1xuICAgICAgc2xpZGVyLmdvVG8oZmlyc3QpO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zID0gcGFyZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1vcHRpb25zJykgPyBwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW9wdGlvbnMnKS5zcGxpdCgnICcpIDogW107XG4gICAgb3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiBzbGlkZXJPcHRpb25zW29wdGlvbl0gJiYgc2xpZGVyT3B0aW9uc1tvcHRpb25dKHNsaWRlcikpO1xuICBcbiAgICBjb25zdCBzbGlkZXJDYWxsYmFja3MgPSB7XG4gICAgICBvcGVuT25Nb2JpbGU6ICgpID0+IHtcbiAgICAgICAgaWYgKHNjcmVlbigpLndpZHRoID4gNjAwKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gc2xpZGVyLmZpbmQoc2xpZGUgPT4gc2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW9yZGVyJykgPT09ICcwJyk7XG4gICAgICAgIGlmICghZmlyc3QpIHJldHVybjtcbiAgICAgICAgY29uc3QgYnRuID0gZmlyc3QucXVlcnlTZWxlY3RvcignLmluZm8taW1nIGFbaHJlZl49XCJqYXZhc2NyaXB0OlwiXScpO1xuICAgICAgICBpZiAoIWJ0bikgcmV0dXJuO1xuICAgICAgICBidG4uY2xpY2soKTtcbiAgICAgIH1cbiAgICB9O1xuICBcbiAgICBfbWFwKCdbZGF0YS1jb250cm9sXScsIGNvbnRyb2wgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gY29udHJvbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29udHJvbCcpO1xuICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IHRhcmdldCA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KSA6IG51bGw7XG4gIFxuICAgICAgaWYgKHRhcmdldEVsZW1lbnQgJiYgdGFyZ2V0RWxlbWVudCA9PT0gc2xpZGVyLnBhcmVudCkge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBjb250cm9sLmdldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nKTtcbiAgICAgICAgaWYgKChhY3Rpb24gPT09ICdwcmV2JyB8fCBhY3Rpb24gPT09ICduZXh0JykgJiYgKHNsaWRlci5zaXplID49IHNsaWRlci5sZW5ndGgpKSB7XG4gICAgICAgICAgY29udHJvbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3ZlcnNpemUnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhY3Rpb25EYXRhID0gY29udHJvbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyYW1zJyk7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IGFjdGlvbkRhdGEgPyBhY3Rpb25EYXRhLnNwbGl0KCcsJykgOiBudWxsO1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9IGNvbnRyb2wuZ2V0QXR0cmlidXRlKCdkYXRhLWNhbGxiYWNrJyk7XG4gICAgICAgIGlmIChhY3Rpb24gJiYgc2xpZGVyW2FjdGlvbl0gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzbGlkZXJbYWN0aW9uXS5hcHBseShzbGlkZXIsIHBhcmFtcyk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgc2xpZGVyQ2FsbGJhY2tzW2NhbGxiYWNrXSkgc2xpZGVyQ2FsbGJhY2tzW2NhbGxiYWNrXSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuY29uc3QgbWFzY2FyYXMgPSB7XG5cbiAgICBub21lOiAoY2FtcG8pID0+IHtcbiAgICAgICAgaWYgKC9eW15hLXpBLVpdKy8udGVzdChjYW1wby52YWx1ZSkpIGNhbXBvLnZhbHVlID0gJyc7XG4gICAgICAgIGNvbnN0IHJlZ3JhID0gL1stJ2EtekEtWsOALcOWw5gtw7bDuC3FvyBdKy9naTtcbiAgICAgICAgY29uc3QgdmFsb3JlcyA9IGNhbXBvLnZhbHVlLm1hdGNoKHJlZ3JhKTtcbiAgICAgICAgaWYgKHZhbG9yZXMpIGNhbXBvLnZhbHVlID0gdmFsb3Jlcy5qb2luKCcnKS5yZXBsYWNlKC8gKy9naSwgJyAnKTtcbiAgICB9LFxuXG4gICAgY2VwOiAoY2FtcG8pID0+IHtcbiAgICAgICAgY29uc3QgcmVncmFzID0gWy9cXGQrL2dpLCAvXihcXGR7NX0pLT8oXFxkezEsM30pL107XG4gICAgICAgIGNvbnN0IHZhbG9yZXMgPSBjYW1wby52YWx1ZS5tYXRjaChyZWdyYXNbMF0pO1xuICAgICAgICBpZiAoIXZhbG9yZXMpIHJldHVybiBjYW1wby52YWx1ZSA9ICcnO1xuICAgICAgICBjYW1wby52YWx1ZSA9IHZhbG9yZXMuam9pbignJyk7XG4gICAgICAgIGlmIChyZWdyYXNbMV0udGVzdChjYW1wby52YWx1ZSkpIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUucmVwbGFjZShyZWdyYXNbMV0sICckMS0kMicpO1xuICAgICAgICBpZiAoY2FtcG8udmFsdWUubGVuZ3RoID4gOSkgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS5zdWJzdHIoMCwgOSk7XG4gICAgfSxcblxuICAgIHRlbGVmb25lOiAoY2FtcG8pID0+IHtcbiAgICAgICAgY29uc3QgcmVncmFzID0gWy9cXGQrL2dpLCAvXihcXGRcXGQ/KS8sIC9eKFxcZFxcZCkoXFxkezR9KS0/KFxcZHsxLDR9KS8sIC9eKFxcZFxcZCkoXFxkezV9KS0/KFxcZHsxLDR9KS9dO1xuICAgICAgICBjb25zdCB2YWxvcmVzID0gY2FtcG8udmFsdWUubWF0Y2gocmVncmFzWzBdKTtcbiAgICAgICAgaWYgKCF2YWxvcmVzKSByZXR1cm4gY2FtcG8udmFsdWUgPSAnJztcbiAgICAgICAgY29uc3QgdmFsb3IgPSBjYW1wby52YWx1ZSA9IHZhbG9yZXMuam9pbignJyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAwKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzFdLCAnKCQxJyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAyKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzFdLCAnKCQxKSAnKTtcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDYpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbMl0sICcoJDEpICQyLSQzJyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAxMCkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1szXSwgJygkMSkgJDItJDMnKTtcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDExKSBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnN1YnN0cigwLCAxNSk7XG4gICAgfSxcblxuICAgIHJnOiAoY2FtcG8pID0+IHtcbiAgICAgICAgY29uc3QgcmVncmFzID0gWy9cXGQrL2dpLCAvXihcXGR7MSwyfSkvLCAvXihcXGR7MSwyfSlcXC4/KFxcZHszfSkvLCAvXihcXGR7MSwyfSlcXC4/KFxcZHszfSlcXC4/KFxcZHszfSkvLCAvXihcXGR7MSwyfSlcXC4/KFxcZHszfSlcXC4/KFxcZHszfSktPyhcXGQpPy9dO1xuICAgICAgICBjb25zdCB2YWxvcmVzID0gY2FtcG8udmFsdWUubWF0Y2gocmVncmFzWzBdKTtcbiAgICAgICAgY29uc3QgbGV0cmFzID0gY2FtcG8udmFsdWUubWF0Y2goL1thLXpBLVpdKyQvZ2kpO1xuICAgICAgICBjb25zdCBkaWdpdG8gPSBsZXRyYXMgPyBsZXRyYXNbMF1bMF0gOiAnJztcbiAgICAgICAgaWYgKCF2YWxvcmVzKSByZXR1cm4gY2FtcG8udmFsdWUgPSAnJztcbiAgICAgICAgY29uc3QgdmFsb3IgPSBjYW1wby52YWx1ZSA9IHZhbG9yZXMuam9pbignJyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAyKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzFdLCAnJDEuJyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA1KSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzJdLCAnJDEuJDIuJyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA3KSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzNdLCAnJDEuJDIuJDMnKTtcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA9PT0gOCAmJiBkaWdpdG8pIGNhbXBvLnZhbHVlICs9ICctJyArIGRpZ2l0by50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gOCkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1s0XSwgJyQxLiQyLiQzLSQ0Jyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA5KSBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnN1YnN0cigwLCAxMik7XG4gICAgfSxcblxuICAgIGNwZmNucGo6IChjYW1wbykgPT4ge1xuICAgICAgICBjb25zdCBudW1lcm9zID0gL1xcZCsvZ2k7XG4gICAgICAgIGNvbnN0IHZhbG9yZXMgPSBjYW1wby52YWx1ZS5tYXRjaChudW1lcm9zKTtcbiAgICAgICAgaWYgKCF2YWxvcmVzKSByZXR1cm4gY2FtcG8udmFsdWUgPSAnJztcbiAgICAgICAgY29uc3QgdmFsb3IgPSB2YWxvcmVzLmpvaW4oJycpO1xuICAgICAgICBjb25zdCBjcGYgPSAvXihbMC05XXsxLDN9KT9cXC4/KFswLTldezEsM30pP1xcLj8oWzAtOV17MSwzfSk/XFwtPyhbMC05XXsxLDJ9KT8kLztcbiAgICAgICAgY29uc3QgY25waiA9IC9eKFswLTldezEsMn0pP1xcLj8oWzAtOV17MSwzfSk/XFwuPyhbMC05XXsxLDN9KT9cXC8/KFswLTldezEsNH0pP1xcLT8oWzAtOV17MSwyfSk/JC87XG4gICAgICAgIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUucmVwbGFjZSgvW15cXGQuXFwvLV0vZ2ksICcnKTtcbiAgICAgICAgaWYgKGNwZi50ZXN0KHZhbG9yKSkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKGNwZiwgKGFsbCwgYSwgYiwgYywgZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChhIHx8ICcnKSArIChiID8gJy4nICsgYiA6ICcnKSArIChjID8gJy4nICsgYyA6ICcnKSArIChkID8gJy0nICsgZCA6ICcnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVsc2UgaWYgKGNucGoudGVzdCh2YWxvcikpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShjbnBqLCAoYWxsLCBhLCBiLCBjLCBkLCBlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGEgfHwgJycpICsgKGIgPyAnLicgKyBiIDogJycpICsgKGMgPyAnLicgKyBjIDogJycpICsgKGQgPyAnLycgKyBkIDogJycpICsgKGUgPyAnLScgKyBlIDogJycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNhbXBvLnZhbHVlLmxlbmd0aCA+IDE4KSBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnN1YnN0cigwLCAxOCk7XG4gICAgfSxcblxuICAgIGRhdGE6IChjYW1wbykgPT4ge1xuICAgICAgICBpZiAoY2FtcG8udHlwZSA9PT0gJ2RhdGUnKSByZXR1cm47XG4gICAgICAgIGNvbnN0IG51bWVyb3MgPSBjYW1wby52YWx1ZS5yZXBsYWNlKC9eMD9cXC98W15cXGRcXC9dL2dpLCAnJyk7XG4gICAgICAgIGlmIChudW1lcm9zID09PSAnJykge1xuICAgICAgICAgICAgY2FtcG8udmFsdWUgPSBudW1lcm9zO1xuICAgICAgICAgICAgY2FtcG8uc3R5bGUuYm9yZGVyQ29sb3IgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNhbXBvLnZhbHVlID0gbnVtZXJvc1xuICAgICAgICAucmVwbGFjZSgvKF58XFwvKTAwK1xcLz8vZywgJzAnKVxuICAgICAgICAucmVwbGFjZSgvKF58XFwvKShbMS05XVxcLykvLCAnMCQyJylcbiAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICAvKFxcZFxcZCkoXFwvPykoXFxkezEsMn0pPyhcXC8/KTAqKFxcZHsxLDR9KT8uKi9nLFxuICAgICAgICAgICAgZnVuY3Rpb24oYWxsLCBkZCwgczEsIG1tLCBzMiwgYWFhYSkge1xuICAgICAgICAgICAgICAgIGlmIChkZCA+IDMxIHx8IG1tID4gMTIpIGNhbXBvLnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XG4gICAgICAgICAgICAgICAgZWxzZSBjYW1wby5zdHlsZS5ib3JkZXJDb2xvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRkICsgKG1tID8gJy8nICsgbW0gOiBzMSB8fCAnJykgKyAoYWFhYSA/ICcvJyArIGFhYWEgOiBzMiB8fCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIGVtYWlsOiAoY2FtcG8pID0+IHtcbiAgICAgICAgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIH0sXG5cbiAgICBzZW5oYTogKGNhbXBvKSA9PiB7XG4gICAgICAgIGlmIChjYW1wby52YWx1ZS5sZW5ndGggPiAwICYmIGNhbXBvLnZhbHVlLmxlbmd0aCA8IDYpIGNhbXBvLnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XG4gICAgICAgIGVsc2UgY2FtcG8uc3R5bGUuYm9yZGVyQ29sb3IgPSBudWxsO1xuICAgIH1cblxufTtcblxuZnVuY3Rpb24gX2NyZWF0ZU5vZGUoZWxlbWVudCl7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudClcbn1cblxuZnVuY3Rpb24gX2FwcGVuZChwYXJlbnQsIGVsKXtcbiAgICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGVsKVxufVxuXG5mdW5jdGlvbiBfdG9nZ2xlSXRzZWxmKGJ0biwgY29udGVudCl7ICAgIFxuICAgIGJ0biAmJiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuICAgICAgXG4gICAgICBpZihjb250ZW50Lmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpe1xuICAgICAgICBjb250ZW50LnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIGNvbnRlbnQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9KTsgICAgXG59XG5cbi8vIC0tLS0tLSBUQUJTIC0tLS0tLVxuY29uc3QgYWxsVGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhcmdldF0nKTtcbmNvbnN0IGxpbmtzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYWxsVGFyZ2V0cyk7XG5cbmxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspe1xuICBjb25zdCBsaW5rVGFyZ2V0ID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyk7XG4gIGNvbnN0IGFsbFRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJdJyk7XG5cbiAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGFyZ2V0cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFsbFRhYnMpOyAgICAgIFxuICAgIHRhcmdldHMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KXtcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcblxuICAgICAgaWYobGlua1RhcmdldCA9PT0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKSl7XG4gICAgICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgICAgICBsaW5rcy5mb3JFYWNoKGJ0biA9PntcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn0pO1xuXG4vLyAtLS0tLS0gQ1JFQVRFIEVMRU1FTlQgLS0tLS0tXG5jb25zdCBidG5DcmVhdGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNyZWF0ZV0nKTtcbmJ0bkNyZWF0ZUVsICYmIGJ0bkNyZWF0ZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgY29uc3QgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3M9XCJwb3N0LWNvbnRlbnRcIl0nKTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChuZXdMaXN0KTtcbiAgbmV3TGlzdC5pbm5lckhUTUwgPSAnPGxpPnRlc3RlMTwvbGk+PGxpPnRlc3RlMjwvbGk+Jztcbn0pO1xuXG4vLyAtLS0tLS0gU1VNUkVEVUNFUiBXSVRIIEZMQVQgLS0tLS0tXG5mdW5jdGlvbiBzdW1SZWR1Y2VyKCkge1xuICAvL2NvbnZlcnRlciBhcmd1bWVudHMgZW0gYXJyYXlcbiAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIC8vIGFjaGF0YXIgYXJnc1xuICBjb25zdCBmbGF0QXJncyA9IGFyZ3MuZmxhdChJbmZpbml0eSk7XG4gIC8vZmlsdGFyIG7Dum1lcm9zXG4gIGNvbnN0IG51bWJlckFyZ3MgPSBmbGF0QXJncy5maWx0ZXIobiA9PiB0eXBlb2YgbiA9PT0gJ251bWJlcicpO1xuICAvLyBzb21hclxuICByZXR1cm4gbnVtYmVyQXJncy5yZWR1Y2UoKHN1bSwgbikgPT4gc3VtICsgbiwgMCk7XG59XG5cbi8vIGZ1bmN0aW9uIGZsYXR0ZW5EZWVwKGFycjEpe1xuLy8gICByZXR1cm4gYXJyMS5yZWR1Y2UoKGFjYywgdmFsKSA9PiBBcnJheS5pc0FycmF5KHZhbCkgPyBhY2MuY29uY2F0KGZsYXR0ZW5EZWVwKHZhbCkpIDogYWNjLmNvbmNhdCh2YWwpLCBbXSk7XG4vLyB9XG5cbmNvbnN0IHJlc3VsdCA9IHN1bVJlZHVjZXIoWzAsIDMsIDddLCBbbnVsbCwgJ2VtYSB3YXRzb24nLCA4Ml0sIDUsIFtbMywgMF0sIFsxXSwgbnVsbF0sIFtdKTtcblxuY29uc3QgcmVzdWx0U3VtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc3VtXScpO1xucmVzdWx0U3VtICYmIHJlc3VsdFN1bS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG4gIGNvbnN0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzPVwicG9zdC1jb250ZW50XCJdJyk7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3RGl2KTtcbiAgbmV3RGl2LmlubmVySFRNTCA9IGAke3Jlc3VsdH1gO1xufSk7XG5cbi8vIC0tLS0tLSBGRVRDSCAtLS0tLS1cbi8vIGZ1bmN0aW9uIGNyZWF0ZU5vZGUoZWxlbWVudCl7XG4vLyAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpOyAvLyBDcmVhdGUgdGhlIHR5cGUgb2YgZWxlbWVudCB5b3UgcGFzcyBpbiB0aGUgcGFyYW1ldGVyc1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBhcHBlbmQocGFyZW50LCBlbCl7XG4vLyAgIHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpOyAvLyBBcHBlbmQgdGhlIHNlY29uZCBwYXJhbWV0ZXIoZWxlbWVudCkgdG8gdGhlIGZpcnN0IG9uZVxuLy8gfVxuXG5jb25zdCBncmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dGhvcnMnKTsgLy8gR2V0IHRoZSBsaXN0IHdoZXJlIHdlIHdpbGwgcGxhY2Ugb3VyIGF1dGhvcnNcbmNvbnN0IHVybCA9ICdodHRwczovL3JhbmRvbXVzZXIubWUvYXBpLz9yZXN1bHRzPTEwJzsgLy8gR2V0IDEwIHJhbmRvbSB1c2Vyc1xuXG5mZXRjaCh1cmwpIC8vIENhbGwgdGhlIGZldGNoIGZ1bmN0aW9uIHBhc3NpbmcgdGhlIHVybCBvZiB0aGUgQVBJIGFzIGEgcGFyYW1ldGVyXG4udGhlbigocmVzcCk9PiByZXNwLmpzb24oKSkgLy8gVHJhbnNmb3JtIHRoZSBkYXRhIGludG8gSlNPTlxuLnRoZW4oZnVuY3Rpb24oZGF0YSl7XG4gIC8vIFlvdXIgY29kZSBmb3IgaGFuZGxpbmcgdGhlIGRhdGEgeW91IGdldCBmcm9tIHRoZSBBUElcbiAgLy8gQ3JlYXRlIGFuZCBhcHBlbmQgdGhlIGxpJ3MgdG8gdGhlIHVsXG4gIGxldCBhdXRob3JzID0gZGF0YS5yZXN1bHRzOyAvLyBHZXQgdGhlIHJlc3VsdHNcbiAgcmV0dXJuIGF1dGhvcnMubWFwKGZ1bmN0aW9uKGF1dGhvcil7XG4gICAgbGV0IGRpdiA9IF9jcmVhdGVOb2RlKCdkaXYnKSwgLy8gQ3JlYXRlIHRoZSBlbGVtZW50cyB3ZSBuZWVkXG4gICAgICAgIGltZyA9IF9jcmVhdGVOb2RlKCdpbWcnKSxcbiAgICAgICAgcCA9IF9jcmVhdGVOb2RlKCdwJyk7XG4gICAgaW1nLnNyYyA9IGF1dGhvci5waWN0dXJlLm1lZGl1bTsgXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1jZWxsJywgJ3NocmluaycpO1xuICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcsICdjZW50ZXInKTtcbiAgICAvLyBBZGQgdGhlIHNvdXJjZSBvZiB0aGUgaW1hZ2UgdG8gYmUgdGhlIHNyYyBvZiB0aGUgaW1nIGVsZW1lbnRcbiAgICBwLmlubmVySFRNTCA9IGAke2F1dGhvci5uYW1lLmZpcnN0fSAke2F1dGhvci5uYW1lLmxhc3R9YDsgXG4gICAgLy8gTWFrZSB0aGUgSFRNTCBvZiBvdXIgcCB0byBiZSB0aGUgZmlyc3QgYW5kIGxhc3QgbmFtZSBvZiBvdXIgYXV0aG9yXG4gICAgX2FwcGVuZChkaXYsIGltZyk7IC8vIEFwcGVuZCBhbGwgb3VyIGVsZW1lbnRzXG4gICAgX2FwcGVuZChkaXYsIHApO1xuICAgIF9hcHBlbmQoZ3JpZCwgZGl2KTtcbiAgfSlcbn0pXG4uY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICBjb25zb2xlLmxvZyhlcnJvcik7XG59KTtcblxuLy8gLS0tLS0tIFNMSURFUiBXSVRIIExJR0hUQk9YIC0tLS0tLVxud2luZG93LnNsaWRlcnMgPSBfbWFwKCcuc2xpZGVyJywgcGFyZW50ID0+IHtcbiAgY29uc3Qgc2xpZGVyID0gbmV3IFNsaWRlcih7XG4gICAgcGFyZW50XG4gIH0pO1xuICBjb25maWdTbGlkZXIoc2xpZGVyLCBwYXJlbnQpO1xufSk7XG5cbndpbmRvdy5jYXJvdXNlbHMgPSBfbWFwKCcuY2Fyb3VzZWwnLCBwYXJlbnQgPT4ge1xuICBjb25zdCBzaXplID0gcGFyZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zaXplJykgfCAwO1xuICBjb25zdCBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbCh7XG4gICAgcGFyZW50LFxuICAgIHNpemVcbiAgfSk7XG4gIGNvbmZpZ1NsaWRlcihjYXJvdXNlbCwgcGFyZW50KTtcbiAgcmV0dXJuIGNhcm91c2VsO1xufSk7XG5cbnZhciBsaWdodGJveCA9IG5ldyBMaWdodGJveChcIltkYXRhLWxpZ2h0Ym94XVwiKTtcblxuLy8gLS0tLS0tIE1BU0tTIC0tLS0tLVxuY29uc3QgZWFjaCA9IChpLCBmKSA9PiBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGksIGYpO1xuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKTtcblxuaWYgKGZvcm0ubGVuZ3RoKSBlYWNoKGZvcm0sIEZvcm1NYXNrKTtcbmZ1bmN0aW9uIEZvcm1NYXNrKGYpIHtcbiAgKEFycmF5LmZyb20oZi5lbGVtZW50cykpXG4gICAgICAuZmlsdGVyKGVsID0+IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1tYXNrJykpXG4gICAgICAuZm9yRWFjaChjYW1wbyA9PiBjYW1wby5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgbWV0b2RvID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWFzaycpO1xuICAgICAgICBpZiAoIW1hc2NhcmFzW21ldG9kb10pIHJldHVybiBjb25zb2xlLmxvZyhgQSBtw6FzY2FyYSBkbyB0aXBvIFwiJHttZXRvZG99XCIgbsOjbyBmb2kgZGVmaW5pZGEuYCk7XG5cbiAgICAgICAgbWFzY2FyYXNbbWV0b2RvXSh0aGlzKTtcbiAgfSkpO1xufVxuXG4vLyAtLS0tLS0gQ1JVRCBXSVRIIEpTIC0tLS0tLVxuY29uc3Qgbm9tZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub21lJyk7XG5jb25zdCBwayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjcGZjbnBqJyk7XG5jb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpO1xuXG5mdW5jdGlvbiBtYWtlT2JqKCl7XG4gIHJldHVybiB7XG4gICAgbm9tZTogbm9tZS52YWx1ZSxcbiAgICBjcGY6IHBrLnZhbHVlLFxuICAgIGVtYWlsOiBlbWFpbC52YWx1ZVxuICB9XG59XG5cbmxldCBhcnJheSA9IFtdO1xuY29uc3QgY2xlYXJGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3QtZm9ybScpO1xuY29uc3QgYnRuRW52aWFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVudmlhcicpO1xuY29uc3QgYnRuRGVsZXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGFyJyk7XG5cbmJ0bkVudmlhciAmJiBidG5FbnZpYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuICBpZihub21lLnZhbHVlIT1udWxsLCBub21lLnZhbHVlIT1cIlwiICYmIHBrLnZhbHVlIT1udWxsLCBway52YWx1ZSE9XCJcIiAmJiBlbWFpbC52YWx1ZSE9bnVsbCwgZW1haWwudmFsdWUhPVwiXCIpe1xuICAgIGxldCBpbmRleEFycmF5ID0gYXJyYXkuZmluZEluZGV4KGVsZW0gPT4ge1xuICAgICAgcmV0dXJuIGVsZW0uY3BmPT09cGsudmFsdWVcbiAgICB9KTtcbiAgICBpZihpbmRleEFycmF5ID4gLTEpe1xuICAgICAgYXJyYXlbaW5kZXhBcnJheV0gPSBtYWtlT2JqKCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBhcnJheS5wdXNoKG1ha2VPYmooKSk7XG4gICAgfVxuICAgIHRyYW5zZm9ybVRleHQoYXJyYXkpO1xuICAgIGNsZWFyRm9ybS5yZXNldCgpO1xuICB9XG4gIGVsc2V7XG4gICAgYWxlcnQoJ1ByZWVuY2hhIHRvZG9zIG9zIGNhbXBvcyEnKTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybVRleHQoYXJyYXkpe1xuICAvLyBjb25zdCBvYmplY3RUZXh0ID0gSlNPTi5zdHJpbmdpZnkoe2FycmF5fSwgbnVsbCwgXCIgXCIpXG4gIC8vIGNvbnN0IGRhdGFDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0c19kaXNwbGF5Jyk7XG4gIC8vIGRhdGFDb250YWluZXIudGV4dENvbnRlbnQgPSBvYmplY3RUZXh0O1xuICBjb25zdCBvYmplY3RUZXh0ID0gYXJyYXkucmVkdWNlKChhY2MsIGl0ZW0sIGluZGV4KSA9PntcbiAgICBhY2MrPSBgPHVsPjxsaT4ke2l0ZW0ubm9tZX08L2xpPjxsaT4ke2l0ZW0uY3BmfTwvbGk+PGxpPiR7aXRlbS5lbWFpbH08L2xpPjwvdWw+YDtcbiAgICByZXR1cm4gYWNjXG4gIH0sICcnKTtcbiAgY29uc3QgZGF0YUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzX2Rpc3BsYXknKTtcbiAgZGF0YUNvbnRhaW5lci5pbm5lckhUTUwgPSBvYmplY3RUZXh0O1xufVxuXG5mdW5jdGlvbiBhcnJheVJlbW92ZShhcnIsIHZhbHVlKXsgLy9yZXRvcm5hIHRvZG9zIG9zIGVsZW1lbnRvcyBkbyBhcnJheSBtZW5vcyBvIHF1ZSB2b2PDqiBwYXNzYXJcbiAgcmV0dXJuIGFyci5maWx0ZXIoKGVsZSwgaW5kZXgpID0+IHtyZXR1cm4gaW5kZXggIT0gdmFsdWV9KVxufVxuXG5idG5EZWxldGFyICYmIGJ0bkRlbGV0YXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHtcbiAgbGV0IGluZGV4QXJyYXkgPSBhcnJheS5maW5kSW5kZXgoZWxlbSA9PiB7XG4gICAgcmV0dXJuIGVsZW0uY3BmID09PSBway52YWx1ZVxuICB9KTtcblxuICBpZihpbmRleEFycmF5ID4gLTEpe1xuICAgIGFycmF5ID0gYXJyYXlSZW1vdmUoYXJyYXksIGluZGV4QXJyYXkpO1xuICB9XG4gIHRyYW5zZm9ybVRleHQoYXJyYXkpO1xuICBjbGVhckZvcm0ucmVzZXQoKTtcbn0pO1xuXG4vLyAtLS0tLS1UT0dHTEUgQlVUVE9OLS0tLS0tXG4vLyBjb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b2dnbGVdJyk7XG4vLyBjb25zdCB0b2dnbGVDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udGVudF0nKTtcblxuLy8gdG9nZ2xlQnRuICYmIHRvZ2dsZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG5cbi8vICAgaWYodG9nZ2xlQ29udGVudC5oYXNBdHRyaWJ1dGUoJ2hpZGRlbicpKXtcbi8vICAgICB0b2dnbGVDb250ZW50LnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJylcbi8vICAgfVxuLy8gICBlbHNle1xuLy8gICAgIHRvZ2dsZUNvbnRlbnQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJylcbi8vICAgfVxuLy8gfSlcbl90b2dnbGVJdHNlbGYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdG9nZ2xlXScpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb250ZW50XScpKTtcblxuLy8gLS0tLS0tIE1BUCBBTkQgRklMVEVSIC0tLS0tLVxubGV0IGRhdGEgPSBbXG4gIHtcbiAgICBuYW1lOiAnQnV0dGVycycsXG4gICAgYWdlOiAzLFxuICAgIHR5cGU6ICdkb2cnXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnTGl6enknLFxuICAgIGFnZTogNixcbiAgICB0eXBlOiAnZG9nJ1xuICB9LFxuICB7XG4gICAgbmFtZTogJ1JlZCcsXG4gICAgYWdlOiAxLFxuICAgIHR5cGU6ICdjYXQnXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnSm9leScsXG4gICAgYWdlOiAzLFxuICAgIHR5cGU6ICdkb2cnXG4gIH1cbl07XG5cbmxldCBkb2dzID0gZGF0YS5maWx0ZXIoKGFuaW1hbCk9PntcbiAgcmV0dXJuIGFuaW1hbC50eXBlID09PSAnZG9nJ1xufSk7XG5cbmRvZ3MubWFwKChhbmltYWwpPT57XG4gIHJldHVybiBhbmltYWwuYWdlICo9IDdcbn0pO1xuXG5jb25zdCBjYWxjQWdlID0gZG9ncy5yZWR1Y2UoKHN1bSwgYW5pbWFsKT0+e1xuICByZXR1cm4gc3VtICsgYW5pbWFsLmFnZVxufSwgMCk7XG5cbmNvbnNvbGUubG9nKGRvZ3MpO1xuY29uc29sZS5sb2coY2FsY0FnZSk7XG5cbi8vIC0tLS0tLSBGSUxURVIgRkVUQ0ggUkVTVUxUUyAtLS0tLS1cblxuY29uc3QgZGF0YUdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jaGFyYWN0ZXJzXScpO1xuY29uc3QgZGF0YUdyaWRGaWx0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jaGFyYWN0ZXJzLWZpbHRlcl0nKTtcbmNvbnN0IHN3YXBpID0gJ2h0dHBzOi8vc3dhcGkuY28vYXBpL3Blb3BsZS8nO1xuXG5mZXRjaChzd2FwaSlcbi50aGVuKChyZXNwKT0+IHJlc3AuanNvbigpKVxuLnRoZW4oZnVuY3Rpb24oZGF0YSl7XG4gIGNvbnNvbGUubG9nKGRhdGEucmVzdWx0cyk7XG4gIGxldCBwZW9wbGUgPSBkYXRhLnJlc3VsdHM7XG4gIGNvbnN0IHBlb3BsZU1hcCA9IHBlb3BsZS5tYXAoKGl0ZW0pPT57XG4gICAgbGV0IGRpdiA9IF9jcmVhdGVOb2RlKCdkaXYnKSxcbiAgICAgICAgcCA9IF9jcmVhdGVOb2RlKCdwJyk7XG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1jZWxsJywgJ3NocmluaycpO1xuICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcsICdjZW50ZXInKTtcbiAgICBwLmlubmVySFRNTCA9IGAke2l0ZW0ubmFtZX1gO1xuICAgIF9hcHBlbmQoZGl2LCBwKTtcbiAgICBfYXBwZW5kKGRhdGFHcmlkLCBkaXYpO1xuICB9KTsgIFxuXG4gIGNvbnN0IHBlb3BsZUZpbHRlciA9IHBlb3BsZS5maWx0ZXIoKGl0ZW0pPT57XG4gICAgcmV0dXJuIGl0ZW0uaGFpcl9jb2xvciA9PT0gJ2Jsb25kJztcbiAgfSk7XG5cbiAgY29uc3QgcGVvcGxlRmlsdGVyTWFwID0gcGVvcGxlRmlsdGVyLm1hcCgoaXRlbSk9PntcbiAgICBsZXQgZGl2ID0gX2NyZWF0ZU5vZGUoJ2RpdicpLFxuICAgICAgICBwID0gX2NyZWF0ZU5vZGUoJ3AnKTtcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWNlbGwnLCAnc2hyaW5rJyk7XG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JywgJ2NlbnRlcicpO1xuICAgIHAuaW5uZXJIVE1MID0gYCR7aXRlbS5uYW1lfWA7XG4gICAgX2FwcGVuZChkaXYsIHApO1xuICAgIF9hcHBlbmQoZGF0YUdyaWRGaWx0ZXIsIGRpdik7XG4gIH0pO1xuXG4gIHJldHVybiB7cGVvcGxlTWFwLCBwZW9wbGVGaWx0ZXJNYXB9XG59KVxuLmNhdGNoKChlcnJvcik9PntcbiAgY29uc29sZS5sb2coZXJyb3IpOyAgXG59KTtcblxuLy8gLS0tLS0tIEFKQVggUkVRVUVTVCAtLS0tLS1cbmNvbnN0IEh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbmNvbnN0IHVybDE9J2h0dHBzOi8vc3dhcGkuY28vYXBpL3Blb3BsZS8nO1xuSHR0cC5vcGVuKCdHRVQnLCB1cmwxKTtcbkh0dHAuc2VuZCgpO1xuXG5IdHRwLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe1xuICBpZih0aGlzLnJlYWR5U3RhdGU9PTQgJiYgdGhpcy5zdGF0dXM9PTIwMCl7XG4gICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShIdHRwLnJlc3BvbnNlVGV4dCkpO1xuICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoSHR0cC5yZXNwb25zZVRleHQpLnJlc3VsdHMpO1xuICB9XG59O1xuXG4vLyAtLS0tLS0gTUVOVSBIT1ZFUiAtLS0tLS1cbi8vIGNvbnN0IGFsbFRhcmdldHMyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9dJyk7XG4vLyBjb25zdCBsaW5rczIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhbGxUYXJnZXRzMik7XG4vLyBjb25zdCBhbGxUYWJzMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYl0nKVxuXG4vLyBsaW5rczIuZm9yRWFjaChmdW5jdGlvbiAobGluayl7XG4vLyAgIGNvbnN0IGxpbmtUYXJnZXQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS10bycpXG5cbi8vICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpe1xuLy8gICAgIGNvbnN0IHRhcmdldHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhbGxUYWJzMik7ICAgICAgXG4vLyAgICAgdGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpe1xuLy8gICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuXG4vLyAgICAgICBpZihsaW5rVGFyZ2V0ID09PSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpKXtcbi8vICAgICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4vLyAgICAgICAgIGxpbmtzMi5mb3JFYWNoKGJ0biA9Pntcbi8vICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4vLyAgICAgICAgIH0pXG4vLyAgICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4vLyAgICAgICB9XG4vLyAgICAgfSlcbi8vICAgfSk7XG4vLyB9KTtcblxuY29uc3QgbWVudVByaW5jaXBhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW1lbnVdJyk7XG5tZW51UHJpbmNpcGFsICYmIG1lbnVQcmluY2lwYWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpPT57XG4gICAgY29uc3QgdGFyZ2V0cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFsbFRhYnMyKTtcbiAgICB0YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCl7XG4gICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgfSk7XG59KTtcblxuLy8gLS0tLS0tIFNFQVJDSCAtLS0tLS1cbmNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNlYXJjaF0nKTtcblxuc2VhcmNoICYmIHNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpPT57XG4gIGNvbnN0IGZpbHRlciA9IHNlYXJjaC52YWx1ZTtcbiAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXN1bHRzXScpO1xuICBjb25zdCBsaSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaScpO1xuICB1bC5pbm5lckhUTUw9XCJcIjtcbiAgY29uc3QgYXJyYXlMaSA9IEFycmF5LmZyb20obGkpO1xuICBhcnJheUxpLmZpbHRlcigoaXRlbSk9PntcbiAgICBjb25zdCBpdGVtTG93ZXIgPSBpdGVtLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7ICAgICBcbiAgICBjb25zdCBmaWx0ZXJMb3dlciA9IGZpbHRlci50b0xvd2VyQ2FzZSgpO1xuICAgIGlmKGZpbHRlckxvd2VyICYmIGl0ZW1Mb3dlci5tYXRjaChmaWx0ZXJMb3dlcikpe1xuICAgICAgdWwuaW5uZXJIVE1MICs9IGA8bGk+JHtpdGVtLnRleHRDb250ZW50fTwvbGk+YDtcbiAgICB9XG4gIH0pOyBcbn0pO1xuXG4vLyAtLS0tLS0gQ09NIExJTksgRSBBUEVOQVMgVEVYVE8gLS0tLS0tXG4vLyBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZWFyY2hdJylcblxuLy8gc2VhcmNoICYmIHNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpPT57XG4vLyAgIGNvbnN0IHZhbCA9IHNlYXJjaC52YWx1ZVxuLy8gICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlc3VsdHNdJylcbi8vICAgY29uc3QgbGkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1saW5rXScpXG4vLyAgIGNvbnN0IGFycmF5TGkgPSBBcnJheS5mcm9tKGxpKVxuLy8gICB1bC5pbm5lckhUTUw9XCJcIjtcbi8vICAgYXJyYXlMaS5maWx0ZXIoKGl0ZW0pPT57XG4vLyAgICAgY29uc3QgdXJsID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuLy8gICAgIGNvbnN0IHRleHQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRleHRdJylcbi8vICAgICBjb25zdCBpdGVtTG93ZXIgPSB0ZXh0LnRleHRDb250ZW50LnRvTG93ZXJDYXNlKClcbi8vICAgICBjb25zdCB2YWxMb3dlciA9IHZhbC50b0xvd2VyQ2FzZSgpXG4vLyAgICAgaWYodmFsTG93ZXIgJiYgaXRlbUxvd2VyLm1hdGNoKHZhbExvd2VyKSl7XG4vLyAgICAgICB1bC5pbm5lckhUTUwgKz0gYDxsaT48YSBocmVmPVwiJHt1cmx9XCI+JHt0ZXh0LnRleHRDb250ZW50fTwvYT48L2xpPmBcbi8vICAgICB9XG4vLyAgIH0pIFxuLy8gfSlcblxuLy8gLS0tLS0tIFRBQlMgSVRTRUxGIC0tLS0tLVxuY29uc3QgYWxsTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1saW5rXScpO1xuY29uc3QgYWxsU2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zZWN0aW9uXScpO1xuY29uc3QgbGlua3NBcnIgPSBBcnJheS5mcm9tKGFsbExpbmtzKTtcbmNvbnN0IHNlY3Rpb25zQXJyID0gQXJyYXkuZnJvbShhbGxTZWN0aW9ucyk7XG5cbmxpbmtzQXJyLm1hcCgobGluayk9PntcbiAgc2VjdGlvbnNBcnIubWFwKCgoc2VjdGlvbik9PntcbiAgICBjb25zdCBhdHRMaW5rID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycpO1xuICAgIGNvbnN0IGF0dFNlY3Rpb24gPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1zZWN0aW9uJyk7XG4gICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG4gICAgICBpZihhdHRMaW5rID09PSBhdHRTZWN0aW9uKXtcbiAgICAgICAgX3RvZ2dsZUl0c2VsZihsaW5rLCBzZWN0aW9uKTtcbiAgICAgICAgbGlua3NBcnIubWFwKGJ0biA9PmJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7ICAgICAgICBcbiAgICAgICAgc2VjdGlvbi5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNlY3Rpb24uc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pKTtcbn0pO1xuXG4vLyBsaW5rc0Fyci5tYXAoKGxpbmspPT57XG4vLyAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpeyAgICAgXG4vLyAgICAgc2VjdGlvbnNBcnIubWFwKCh0YXJnZXQpPT57XG4vLyAgICAgICBjb25zdCBsaW5rTGluayA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmsnKVxuLy8gICAgICAgY29uc3Qgc2VjdGlvblRhcmdldCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2VjdGlvbicpXG5cbi8vICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcblxuLy8gICAgICAgaWYobGlua0xpbmsgPT09IHNlY3Rpb25UYXJnZXQpe1xuLy8gICAgICAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcblxuLy8gICAgICAgICBsaW5rc0Fyci5tYXAoYnRuID0+IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSlcbi8vICAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbi8vICAgICAgIH1cblxuLy8gICAgICAgZWxzZSBpZihsaW5rTGluayA9PT0gc2VjdGlvblRhcmdldCAmJiAhdGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpe1xuLy8gICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJylcbi8vICAgICAgIH1cbi8vICAgICB9KVxuLy8gICB9KTtcbi8vIH0pO1xuXG59KCkpO1xuIl19
