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
      } else {
        content.setAttribute('hidden', '');
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
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiU2xpZGVyIiwiY29uZmlnIiwidHlwZSIsInBhcmVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBhcmVudFNlbGVjdG9yIiwiY2hpbGRTZWxlY3RvciIsImNoaWxkcmVuIiwibGVuZ3RoIiwiaW5kZXgiLCJkdXJhdGlvbiIsImNsYXNzTGlzdCIsImFkZCIsImNvbXBvc2UiLCJmbiIsImZvckVhY2giLCJtYXAiLCJmaWx0ZXIiLCJmaW5kIiwibmV4dEluZGV4IiwicHJldkluZGV4IiwiZWwiLCJpIiwicmVtb3ZlIiwidGhhdCIsInBsYXlpbmdTdGF0ZUlEIiwic2V0SW50ZXJ2YWwiLCJuZXh0IiwiaXNQbGF5aW5nIiwiY2xlYXJJbnRlcnZhbCIsInBhdXNlIiwicGxheSIsInBsYXlpbmdTdGF0ZSIsImV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb2xsYXBzZWQiLCJjb25zb2xlIiwidGFibGUiLCJPYmplY3QiLCJrZXlzIiwicHJvcCIsImtleSIsInZhbHVlIiwibG9nIiwid2FybiIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsImdyb3VwRW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQ2Fyb3VzZWwiLCJzaXplIiwicG9zaXRpb24iLCJzbGlkZSIsIml0ZW1PcmRlciIsInNldEF0dHJpYnV0ZSIsImNsYXNzTmFtZSIsInN0eWxlIiwib3JkZXIiLCJkaXIiLCJhbmltQ2xhc3NOYW1lIiwicmVtb3ZlV2lsbFJlbmRlckNsYXNzIiwiX21hcCIsIndoYXQiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwidyIsImNyZWF0ZUVsZW1lbnQiLCJhdHRycyIsImVsZW1lbnQiLCJOb2RlIiwiZXh0ZW5kIiwib2JqIiwicHJvcHMiLCJleHRlbmRlcnMiLCJzdHlsZXMiLCJkYXRhc2V0IiwiZGF0YSIsIm5hbWUiLCJldmVudHMiLCJjYWxsYmFja3MiLCJraWRzIiwiayIsImFwcGVuZENoaWxkIiwidmFsIiwiTGlnaHRib3giLCJzZWxlY3RvciIsImNvbnRhaW5lciIsIm1vZGFsIiwiZ3JpZCIsInByZXYiLCJ3cmFwcGVyIiwicGFyZW50RWxlbWVudCIsImJvZHkiLCJjbG9zZUJ1dHRvbiIsImltZyIsIml0ZW1zIiwic2hvdyIsInNyYyIsImdldEF0dHJpYnV0ZSIsIm9wZW4iLCJjZWxsIiwiaW5uZXJIVE1MIiwiYnRuIiwiY2xpY2siLCJnb1ByZXYiLCJnb05leHQiLCJjbG9zZSIsImRvbU5vZGVzIiwic2xpZGVyT3B0aW9ucyIsImF1dG9wbGF5Iiwic2xpZGVyIiwib24iLCJjb25maWdTbGlkZXIiLCJmaXJzdCIsImdvVG8iLCJvcHRpb25zIiwiaGFzQXR0cmlidXRlIiwic3BsaXQiLCJvcHRpb24iLCJzbGlkZXJDYWxsYmFja3MiLCJvcGVuT25Nb2JpbGUiLCJzY3JlZW4iLCJ3aWR0aCIsInRhcmdldCIsImNvbnRyb2wiLCJ0YXJnZXRFbGVtZW50IiwiYWN0aW9uIiwiYWN0aW9uRGF0YSIsInBhcmFtcyIsImFwcGx5IiwibWFzY2FyYXMiLCJub21lIiwiY2FtcG8iLCJ0ZXN0IiwicmVncmEiLCJ2YWxvcmVzIiwibWF0Y2giLCJqb2luIiwicmVwbGFjZSIsImNlcCIsInJlZ3JhcyIsInN1YnN0ciIsInRlbGVmb25lIiwidmFsb3IiLCJyZyIsImxldHJhcyIsImRpZ2l0byIsInRvVXBwZXJDYXNlIiwiY3BmY25waiIsIm51bWVyb3MiLCJjcGYiLCJjbnBqIiwiYWxsIiwiYSIsImIiLCJjIiwiZCIsImUiLCJib3JkZXJDb2xvciIsImRkIiwiczEiLCJtbSIsInMyIiwiYWFhYSIsImVtYWlsIiwidG9Mb3dlckNhc2UiLCJzZW5oYSIsIl9jcmVhdGVOb2RlIiwiX2FwcGVuZCIsIl90b2dnbGVJdHNlbGYiLCJjb250ZW50IiwicmVtb3ZlQXR0cmlidXRlIiwiYWxsVGFyZ2V0cyIsImxpbmtzIiwibGluayIsImxpbmtUYXJnZXQiLCJhbGxUYWJzIiwidGFyZ2V0cyIsImJ0bkNyZWF0ZUVsIiwibmV3TGlzdCIsInN1bVJlZHVjZXIiLCJhcmdzIiwiYXJndW1lbnRzIiwiZmxhdEFyZ3MiLCJmbGF0IiwiSW5maW5pdHkiLCJudW1iZXJBcmdzIiwibiIsInJlZHVjZSIsInN1bSIsInJlc3VsdCIsInJlc3VsdFN1bSIsIm5ld0RpdiIsImdldEVsZW1lbnRCeUlkIiwidXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJhdXRob3JzIiwicmVzdWx0cyIsImF1dGhvciIsImRpdiIsInAiLCJwaWN0dXJlIiwibWVkaXVtIiwibGFzdCIsImNhdGNoIiwiZXJyb3IiLCJ3aW5kb3ciLCJzbGlkZXJzIiwiY2Fyb3VzZWxzIiwiY2Fyb3VzZWwiLCJsaWdodGJveCIsImVhY2giLCJmIiwiZm9ybSIsIkZvcm1NYXNrIiwiZnJvbSIsImVsZW1lbnRzIiwibWV0b2RvIiwicGsiLCJtYWtlT2JqIiwiYXJyYXkiLCJjbGVhckZvcm0iLCJidG5FbnZpYXIiLCJidG5EZWxldGFyIiwiaW5kZXhBcnJheSIsImZpbmRJbmRleCIsImVsZW0iLCJwdXNoIiwidHJhbnNmb3JtVGV4dCIsInJlc2V0IiwiYWxlcnQiLCJvYmplY3RUZXh0IiwiYWNjIiwiaXRlbSIsImRhdGFDb250YWluZXIiLCJhcnJheVJlbW92ZSIsImFyciIsImVsZSIsImFnZSIsImRvZ3MiLCJhbmltYWwiLCJjYWxjQWdlIiwiZGF0YUdyaWQiLCJkYXRhR3JpZEZpbHRlciIsInN3YXBpIiwicGVvcGxlIiwicGVvcGxlTWFwIiwicGVvcGxlRmlsdGVyIiwiaGFpcl9jb2xvciIsInBlb3BsZUZpbHRlck1hcCIsIkh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsInVybDEiLCJzZW5kIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQyxhQUFZO0FBQ2I7O0FBRGEs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akIsRUFBOEIsUUFBOUI7QUFDQXFKLFFBQUV0RyxTQUFGLFFBQWlCdUksS0FBSy9KLElBQXRCO0FBQ0EyRixjQUFRa0MsR0FBUixFQUFhQyxDQUFiO0FBQ0FuQyxjQUFROEUsY0FBUixFQUF3QjVDLEdBQXhCO0FBQ0QsS0FSdUIsQ0FBeEI7O0FBVUEsV0FBTyxFQUFDK0Msb0JBQUQsRUFBWUcsZ0NBQVosRUFBUDtBQUNELEdBOUJELEVBK0JDN0MsS0EvQkQsQ0ErQk8sVUFBQ0MsS0FBRCxFQUFTO0FBQ2RqTCxZQUFRTyxHQUFSLENBQVkwSyxLQUFaO0FBQ0QsR0FqQ0Q7O0FBbUNBO0FBQ0EsTUFBTTZDLE9BQU8sSUFBSUMsY0FBSixFQUFiO0FBQ0EsTUFBTUMsT0FBSyw4QkFBWDtBQUNBRixPQUFLMUosSUFBTCxDQUFVLEtBQVYsRUFBaUI0SixJQUFqQjtBQUNBRixPQUFLRyxJQUFMOztBQUVBSCxPQUFLSSxrQkFBTCxHQUF3QixZQUFVO0FBQ2hDLFFBQUcsS0FBS0MsVUFBTCxJQUFpQixDQUFqQixJQUFzQixLQUFLQyxNQUFMLElBQWEsR0FBdEMsRUFBMEM7QUFDeENwTyxjQUFRTyxHQUFSLENBQVk4TixLQUFLQyxLQUFMLENBQVdSLEtBQUtTLFlBQWhCLENBQVo7QUFDQXZPLGNBQVFPLEdBQVIsQ0FBWThOLEtBQUtDLEtBQUwsQ0FBV1IsS0FBS1MsWUFBaEIsRUFBOEI5RCxPQUExQztBQUNEO0FBQ0YsR0FMRDtBQU9DLENBcjFCQSxHQUFEIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBTbGlkZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG4gICAgICB0aGlzLnR5cGUgPSAnU2xpZGVyJztcclxuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNsaWRlcikpIHJldHVybiBuZXcgU2xpZGVyKGNvbmZpZyk7XHJcbiAgXHJcbiAgICAgIHRoaXMucGFyZW50ID0gY29uZmlnLnBhcmVudCB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5wYXJlbnRTZWxlY3RvciB8fCAnLnNsaWRlcicpO1xyXG4gICAgICBpZiAoIXRoaXMucGFyZW50KSB0aHJvdyAnW1NMSURFUl06IENvbnRhaW5lciBuw6NvIGVuY29udHJhZG8uJztcclxuICBcclxuICAgICAgdGhpcy5jaGlsZFNlbGVjdG9yID0gY29uZmlnLmNoaWxkU2VsZWN0b3IgfHwgJy5zbGlkZSc7XHJcbiAgICAgIGlmICghdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHRocm93ICdbU0xJREVSXTogU2xpZGVzIG7Do28gZW5jb250cmFkb3MuJztcclxuICBcclxuICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgIHRoaXMuZHVyYXRpb24gPSBjb25maWcuZHVyYXRpb24gfHwgMzAwMDtcclxuICAgICAgdGhpcy5wYXJlbnQuY2xhc3NMaXN0LmFkZCgnc2V0Jyk7XHJcbiAgICAgIHRoaXMuY29tcG9zZSgpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZ2V0IGNoaWxkcmVuKCkge1xyXG4gICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5wYXJlbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmNoaWxkU2VsZWN0b3IpKTtcclxuICAgIH1cclxuICBcclxuICAgIGdldCBsZW5ndGgoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcclxuICAgIH1cclxuICBcclxuICAgIGZvckVhY2goZm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmbik7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBtYXAoZm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubWFwKGZuKTtcclxuICAgIH1cclxuICBcclxuICAgIGZpbHRlcihmbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maWx0ZXIoZm4pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZmluZChmbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maW5kKGZuKTtcclxuICAgIH1cclxuICBcclxuICAgIGNvbXBvc2UoKSB7XHJcbiAgICAgIHZhciBuZXh0SW5kZXgsIHByZXZJbmRleDtcclxuICAgICAgcHJldkluZGV4ID0gdGhpcy5pbmRleCA+IDAgPyB0aGlzLmluZGV4IC0gMSA6IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcclxuICAgICAgbmV4dEluZGV4ID0gdGhpcy5pbmRleCA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMSA/IHRoaXMuaW5kZXggKyAxIDogMDtcclxuICAgICAgdGhpcy5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ByZXYnKTtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50Jyk7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnbmV4dCcpO1xyXG4gICAgICAgIGlmIChpID09PSBwcmV2SW5kZXgpIGVsLmNsYXNzTGlzdC5hZGQoJ3ByZXYnKTtcclxuICAgICAgICBpZiAoaSA9PT0gbmV4dEluZGV4KSBlbC5jbGFzc0xpc3QuYWRkKCduZXh0Jyk7XHJcbiAgICAgICAgaWYgKGkgPT09IHRoaXMuaW5kZXgpIGVsLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQnKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgcGxheSgpIHtcclxuICAgICAgdmFyIHRoYXQ7XHJcbiAgICAgIHRoYXQgPSB0aGlzO1xyXG4gICAgICB0aGlzLnBsYXlpbmdTdGF0ZUlEID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGF0Lm5leHQoKTtcclxuICAgICAgfSwgdGhpcy5kdXJhdGlvbik7XHJcbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnBsYXlpbmdTdGF0ZUlEKTtcclxuICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBwbGF5cGF1c2UoKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzUGxheWluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdXNlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICBwcmV2KCkge1xyXG4gICAgICB2YXIgcGxheWluZ1N0YXRlO1xyXG4gICAgICBpZiAodGhpcy5pbmRleCA+IDApIHtcclxuICAgICAgICB0aGlzLmluZGV4LS07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcclxuICAgICAgfVxyXG4gICAgICBwbGF5aW5nU3RhdGUgPSB0aGlzLmlzUGxheWluZztcclxuICAgICAgaWYgKHBsYXlpbmdTdGF0ZSkge1xyXG4gICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNvbXBvc2UoKTtcclxuICAgICAgaWYgKHBsYXlpbmdTdGF0ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgbmV4dCgpIHtcclxuICAgICAgdmFyIHBsYXlpbmdTdGF0ZTtcclxuICAgICAgaWYgKHRoaXMuaW5kZXggPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICB0aGlzLmluZGV4Kys7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgcGxheWluZ1N0YXRlID0gdGhpcy5pc1BsYXlpbmc7XHJcbiAgICAgIGlmIChwbGF5aW5nU3RhdGUpIHtcclxuICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb21wb3NlKCk7XHJcbiAgICAgIGlmIChwbGF5aW5nU3RhdGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIGdvVG8oaW5kZXgpIHtcclxuICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICByZXR1cm4gdGhpcy5jb21wb3NlKCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBvbihldmVudCwgZm4pIHtcclxuICAgICAgdGhpcy5wYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZm4pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICBcclxuICAgIG9mZihldmVudCwgZm4pIHtcclxuICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZm4pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICBcclxuICAgIGluc3BlY3QoY29sbGFwc2VkKSB7XHJcbiAgICAgIGNvbnNvbGVbY29sbGFwc2VkID09PSB0cnVlID8gJ2dyb3VwQ29sbGFwc2VkJyA6ICdncm91cCddKHRoaXMudHlwZSk7XHJcbiAgICAgIGNvbnNvbGUudGFibGUoXHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcykubWFwKGtleSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwcm9wOiBrZXksXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzW2tleV0sXHJcbiAgICAgICAgICAgIHR5cGU6IHR5cGVvZiB0aGlzW2tleV1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnBhcmVudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgICBjb25zb2xlLndhcm4oRGF0ZS5ub3coKS50b1N0cmluZygpKTtcclxuICAgICAgY29uc29sZS5ncm91cEVuZCh0aGlzLnR5cGUpO1xyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICBcclxuICB9XG5cbmNsYXNzIENhcm91c2VsIGV4dGVuZHMgU2xpZGVyIHtcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICBjb25maWcucGFyZW50U2VsZWN0b3IgPSBjb25maWcucGFyZW50U2VsZWN0b3IgfHwgJy5jYXJvdXNlbCc7XHJcbiAgICBzdXBlcihjb25maWcpO1xyXG4gICAgdGhpcy50eXBlID0gJ0Nhcm91c2VsJztcclxuICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplIHwgMDtcclxuICAgIHRoaXMuY29tcG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9zZSgpIHtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5pbmRleCArIDE7XHJcbiAgICB0aGlzLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XHJcbiAgICAgIGxldCBpdGVtT3JkZXIgPSBpIC0gcG9zaXRpb24gKyAxO1xyXG4gICAgICBpZiAoaXRlbU9yZGVyIDwgMCkgaXRlbU9yZGVyID0gdGhpcy5sZW5ndGggLSBwb3NpdGlvbiArIGkgKyAxO1xyXG4gICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3JkZXInLCBpdGVtT3JkZXIpO1xyXG5cclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgncHJldicpO1xyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50Jyk7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ25leHQnKTtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd2lsbC1nby1wcmV2Jyk7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dpbGwtZ28tbmV4dCcpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuc2l6ZSkge1xyXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9XHJcbiAgICAgICAgICB0aGlzLmxlbmd0aCA8PSB0aGlzLnNpemUgPyAnY3VycmVudCcgOlxyXG4gICAgICAgICAgaXRlbU9yZGVyID4gLTEgJiYgaXRlbU9yZGVyIDwgdGhpcy5zaXplID8gJ2N1cnJlbnQnIDpcclxuICAgICAgICAgIGl0ZW1PcmRlciA9PT0gLTEgfHwgaXRlbU9yZGVyID09PSB0aGlzLmxlbmd0aCAtIDEgPyAncHJldicgOlxyXG4gICAgICAgICAgaXRlbU9yZGVyID09PSB0aGlzLnNpemUgPyAnbmV4dCcgOlxyXG4gICAgICAgICAgJyc7XHJcbiAgICAgICAgaWYgKCFjbGFzc05hbWUpIHJldHVybiB0aGlzO1xyXG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICBzbGlkZS5zdHlsZS5vcmRlciA9IGl0ZW1PcmRlcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuZGlyKSB7XHJcbiAgICAgICAgY29uc3QgYW5pbUNsYXNzTmFtZSA9ICd3aWxsLWdvLScgKyB0aGlzLmRpcjtcclxuICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGFuaW1DbGFzc05hbWUpO1xyXG4gICAgICAgIHNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRBbmltYXRpb25FbmRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZW1vdmVXaWxsUmVuZGVyQ2xhc3Moc2xpZGUsIGFuaW1DbGFzc05hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZW1vdmVXaWxsUmVuZGVyQ2xhc3Moc2xpZGUsIGFuaW1DbGFzc05hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlV2lsbFJlbmRlckNsYXNzKHNsaWRlLCBjbGFzc05hbWUpIHtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHJldigpIHtcclxuICAgIHRoaXMuZGlyID0gJ3ByZXYnO1xyXG4gICAgcmV0dXJuIHN1cGVyLnByZXYoKTtcclxuICB9XHJcblxyXG4gIG5leHQoKSB7XHJcbiAgICB0aGlzLmRpciA9ICduZXh0JztcclxuICAgIHJldHVybiBzdXBlci5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBnb1RvKGluZGV4KSB7XHJcbiAgICB0aGlzLmRpciA9IGluZGV4ID4gdGhpcy5pbmRleCA/ICduZXh0JyA6ICdwcmV2JztcclxuICAgIHJldHVybiBzdXBlci5nb1RvKGluZGV4KTtcclxuICB9XHJcblxyXG59XG5cbmZ1bmN0aW9uIF9tYXAod2hhdCwgY2FsbGJhY2spIHtcclxuICAgIGlmICh0eXBlb2Ygd2hhdCA9PT0gJ3N0cmluZycpIHdoYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHdoYXQpO1xyXG4gICAgaWYgKCEod2hhdCBpbnN0YW5jZW9mIEFycmF5KSkgd2hhdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHdoYXQpO1xyXG4gICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHdoYXQgPSB3aGF0Lm1hcCh3ID0+IGNhbGxiYWNrKHcpKTtcclxuICAgIHJldHVybiB3aGF0O1xyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGVsLCBhdHRycykge1xyXG4gIFxyXG4gICAgZnVuY3Rpb24gZWxlbWVudChlbCwgYXR0cnMpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKTtcclxuICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIE5vZGUpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKGF0dHJzKSBleHRlbmQoZWwsIGF0dHJzKTtcclxuICAgICAgICByZXR1cm4gZWw7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBmdW5jdGlvbiBleHRlbmQob2JqLCBwcm9wcykge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuZGVycyA9IHtcclxuICAgICAgICAgICAgc3R5bGU6IGZ1bmN0aW9uIChzdHlsZXMpIHtcclxuICAgICAgICAgICAgICAgIGV4dGVuZChvYmouc3R5bGUsIHN0eWxlcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGFzZXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIGRhdGEpIG9iai5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIG5hbWUsIGRhdGFbbmFtZV0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBldmVudHM6IGZ1bmN0aW9uIChjYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gY2FsbGJhY2tzKSBvYmouYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBjYWxsYmFja3NbbmFtZV0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogZnVuY3Rpb24gKGtpZHMpIHtcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoa2lkcywgZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouYXBwZW5kQ2hpbGQoayk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBwcm9wcykge1xyXG4gICAgICAgICAgICAoZXh0ZW5kZXJzW25hbWVdIHx8IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgICAgIG9ialtuYW1lXSA9IHZhbDtcclxuICAgICAgICAgICAgfSkocHJvcHNbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIHJldHVybiBlbGVtZW50KGVsLCBhdHRycyk7XHJcbiAgfVxuXG5jbGFzcyBMaWdodGJveCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1jb250YWluZXInKSB8fCBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LWNvbnRhaW5lcicsXHJcbiAgICAgICAgICAgIGRhdGFzZXQ6IHtcclxuICAgICAgICAgICAgICAgIG1vZGFsOiAnJyxcclxuICAgICAgICAgICAgICAgIGdyaWQ6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5wcmV2KTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XHJcbiAgICAgICAgLy90aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlQnV0dG9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucGFyZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VCdXR0b24pO1xyXG4gICAgICAgIHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLmltZyk7XHJcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpbWcsIGkpID0+IHtcclxuICAgICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KGkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldCB3cmFwcGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtd3JhcHBlcicpIHx8IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtd3JhcHBlcicsXHJcbiAgICAgICAgICAgIGRhdGFzZXQ6IHtcclxuICAgICAgICAgICAgICAgIGNlbGw6ICdzaHJpbmsnLFxyXG4gICAgICAgICAgICAgICAgZ3JpZDogJ2NvbHVtbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXQgcHJldigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LXByZXYnKSB8fCBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LXByZXYnLFxyXG4gICAgICAgICAgICBpbm5lckhUTUw6ICc8c3ZnIHhtbG5zPVwiaHR0cHM6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld2JveD1cIjAgMCAxMjkgMTI5XCI+PHBhdGggZD1cIk04OC42IDEyMS4zYy44LjggMS44IDEuMiAyLjkgMS4yczIuMS0uNCAyLjktMS4yYzEuNi0xLjYgMS42LTQuMiAwLTUuOGwtNTEtNTEgNTEtNTFjMS42LTEuNiAxLjYtNC4yIDAtNS44cy00LjItMS42LTUuOCAwbC01NCA1My45Yy0xLjYgMS42LTEuNiA0LjIgMCA1LjhsNTQgNTMuOXpcIiAvPjwvc3ZnPicsXHJcbiAgICAgICAgICAgIGRhdGFzZXQ6IHtcclxuICAgICAgICAgICAgICAgIGJ0bjogJ2xpbmsnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMuZ29QcmV2KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IG5leHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1uZXh0JykgfHwgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1uZXh0JyxcclxuICAgICAgICAgICAgaW5uZXJIVE1MOiAnPHN2ZyB4bWxucz1cImh0dHBzOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdib3g9XCIwIDAgMTI5IDEyOVwiPjxwYXRoIGQ9XCJNNDAuNCAxMjEuM2MtLjguOC0xLjggMS4yLTIuOSAxLjJzLTIuMS0uNC0yLjktMS4yYy0xLjYtMS42LTEuNi00LjIgMC01LjhsNTEtNTEtNTEtNTFjLTEuNi0xLjYtMS42LTQuMiAwLTUuOCAxLjYtMS42IDQuMi0xLjYgNS44IDBsNTMuOSA1My45YzEuNiAxLjYgMS42IDQuMiAwIDUuOGwtNTMuOSA1My45elwiIC8+PC9zdmc+JyxcclxuICAgICAgICAgICAgZGF0YXNldDoge1xyXG4gICAgICAgICAgICAgICAgYnRuOiAnbGluaydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXZlbnRzOiB7XHJcbiAgICAgICAgICAgICAgICBjbGljazogKCkgPT4gdGhpcy5nb05leHQoKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IGNsb3NlQnV0dG9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtY2xvc2UnKSB8fCBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LWNsb3NlJyxcclxuICAgICAgICAgICAgaW5uZXJIVE1MOiAnPHN2ZyB4bWxucz1cImh0dHBzOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdib3g9XCIwIDAgNTEyIDUxMlwiPjxwYXRoIGZpbGw9XCIjZmZmXCIgZD1cIk01MDUuOTQzIDYuMDU4Yy04LjA3Ny04LjA3Ny0yMS4xNzItOC4wNzctMjkuMjQ5IDBMNi4wNTggNDc2LjY5M2MtOC4wNzcgOC4wNzctOC4wNzcgMjEuMTcyIDAgMjkuMjQ5QTIwLjYxMiAyMC42MTIgMCAwIDAgMjAuNjgzIDUxMmEyMC42MTQgMjAuNjE0IDAgMCAwIDE0LjYyNS02LjA1OUw1MDUuOTQzIDM1LjMwNmM4LjA3Ni04LjA3NiA4LjA3Ni0yMS4xNzEgMC0yOS4yNDh6XCIvPjxwYXRoIGZpbGw9XCIjZmZmXCIgZD1cIk01MDUuOTQyIDQ3Ni42OTRMMzUuMzA2IDYuMDU5Yy04LjA3Ni04LjA3Ny0yMS4xNzItOC4wNzctMjkuMjQ4IDAtOC4wNzcgOC4wNzYtOC4wNzcgMjEuMTcxIDAgMjkuMjQ4bDQ3MC42MzYgNDcwLjYzNmEyMC42MTYgMjAuNjE2IDAgMCAwIDE0LjYyNSA2LjA1OCAyMC42MTUgMjAuNjE1IDAgMCAwIDE0LjYyNC02LjA1N2M4LjA3NS04LjA3OCA4LjA3NS0yMS4xNzMtLjAwMS0yOS4yNXpcIi8+PC9zdmc+JyxcclxuICAgICAgICAgICAgZGF0YXNldDoge1xyXG4gICAgICAgICAgICAgICAgYnRuOiAnbGluaycsXHJcbiAgICAgICAgICAgICAgICBjZWxsOiAnc2hyaW5rIGVuZCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXZlbnRzOiB7XHJcbiAgICAgICAgICAgICAgICBjbGljazogKCkgPT4gdGhpcy5jbG9zZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBpdGVtcygpIHtcclxuICAgICAgICB2YXIgZG9tTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2VsZWN0b3IpO1xyXG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb21Ob2Rlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGltZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1pbWcnKSB8fCBjcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LWltZycsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbigpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXJnZXQnKTtcclxuICAgIH1cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3RhcmdldCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgY29uc3QgaW1nID0gdGhpcy5pdGVtc1tpbmRleF07XHJcbiAgICAgICAgY29uc3Qgc3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1saWdodGJveCcpID8gaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1saWdodGJveCcpIDogaW1nLnNyYztcclxuICAgICAgICB0aGlzLmltZy5zcmMgPSBzcmM7XHJcbiAgICAgICAgdGhpcy5vcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29QcmV2KCkge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXggLSAxO1xyXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvdyhpbmRleCk7XHJcbiAgICB9XHJcbiAgICBnb05leHQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleCArIDE7XHJcbiAgICAgICAgaWYgKGluZGV4ID49IHRoaXMuaXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB0aGlzLnNob3coaW5kZXgpO1xyXG4gICAgfVxyXG59XG5cbmNvbnN0IHNsaWRlck9wdGlvbnMgPSB7XHJcbiAgICBhdXRvcGxheTogc2xpZGVyID0+IHtcclxuICAgICAgc2xpZGVyXHJcbiAgICAgICAgLnBsYXkoKVxyXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgKCkgPT4gc2xpZGVyLnBhdXNlKCkpXHJcbiAgICAgICAgLm9uKCdtb3VzZW91dCcsICgpID0+IHNsaWRlci5wbGF5KCkpO1xyXG4gICAgfVxyXG4gIH07XHJcbmZ1bmN0aW9uIGNvbmZpZ1NsaWRlcihzbGlkZXIsIHBhcmVudCkge1xyXG4gICAgY29uc3QgZmlyc3QgPSBwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWZpcnN0JykgfCAwO1xyXG4gICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgIHNsaWRlci5nb1RvKGZpcnN0KTtcclxuICAgIH1cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBwYXJlbnQuaGFzQXR0cmlidXRlKCdkYXRhLW9wdGlvbnMnKSA/IHBhcmVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3B0aW9ucycpLnNwbGl0KCcgJykgOiBbXTtcclxuICAgIG9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4gc2xpZGVyT3B0aW9uc1tvcHRpb25dICYmIHNsaWRlck9wdGlvbnNbb3B0aW9uXShzbGlkZXIpKTtcclxuICBcclxuICAgIGNvbnN0IHNsaWRlckNhbGxiYWNrcyA9IHtcclxuICAgICAgb3Blbk9uTW9iaWxlOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHNjcmVlbigpLndpZHRoID4gNjAwKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgZmlyc3QgPSBzbGlkZXIuZmluZChzbGlkZSA9PiBzbGlkZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3JkZXInKSA9PT0gJzAnKTtcclxuICAgICAgICBpZiAoIWZpcnN0KSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgYnRuID0gZmlyc3QucXVlcnlTZWxlY3RvcignLmluZm8taW1nIGFbaHJlZl49XCJqYXZhc2NyaXB0OlwiXScpO1xyXG4gICAgICAgIGlmICghYnRuKSByZXR1cm47XHJcbiAgICAgICAgYnRuLmNsaWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgXHJcbiAgICBfbWFwKCdbZGF0YS1jb250cm9sXScsIGNvbnRyb2wgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBjb250cm9sLmdldEF0dHJpYnV0ZSgnZGF0YS1jb250cm9sJyk7XHJcbiAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSB0YXJnZXQgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCkgOiBudWxsO1xyXG4gIFxyXG4gICAgICBpZiAodGFyZ2V0RWxlbWVudCAmJiB0YXJnZXRFbGVtZW50ID09PSBzbGlkZXIucGFyZW50KSB7XHJcbiAgICAgICAgY29uc3QgYWN0aW9uID0gY29udHJvbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJyk7XHJcbiAgICAgICAgaWYgKChhY3Rpb24gPT09ICdwcmV2JyB8fCBhY3Rpb24gPT09ICduZXh0JykgJiYgKHNsaWRlci5zaXplID49IHNsaWRlci5sZW5ndGgpKSB7XHJcbiAgICAgICAgICBjb250cm9sLnNldEF0dHJpYnV0ZSgnZGF0YS1vdmVyc2l6ZScsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhY3Rpb25EYXRhID0gY29udHJvbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyYW1zJyk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gYWN0aW9uRGF0YSA/IGFjdGlvbkRhdGEuc3BsaXQoJywnKSA6IG51bGw7XHJcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBjb250cm9sLmdldEF0dHJpYnV0ZSgnZGF0YS1jYWxsYmFjaycpO1xyXG4gICAgICAgIGlmIChhY3Rpb24gJiYgc2xpZGVyW2FjdGlvbl0gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgICAgY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2xpZGVyW2FjdGlvbl0uYXBwbHkoc2xpZGVyLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgc2xpZGVyQ2FsbGJhY2tzW2NhbGxiYWNrXSkgc2xpZGVyQ2FsbGJhY2tzW2NhbGxiYWNrXSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XG5cbmNvbnN0IG1hc2NhcmFzID0ge1xyXG5cclxuICAgIG5vbWU6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGlmICgvXlteYS16QS1aXSsvLnRlc3QoY2FtcG8udmFsdWUpKSBjYW1wby52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGNvbnN0IHJlZ3JhID0gL1stJ2EtekEtWsOALcOWw5gtw7bDuC3FvyBdKy9naTtcclxuICAgICAgICBjb25zdCB2YWxvcmVzID0gY2FtcG8udmFsdWUubWF0Y2gocmVncmEpO1xyXG4gICAgICAgIGlmICh2YWxvcmVzKSBjYW1wby52YWx1ZSA9IHZhbG9yZXMuam9pbignJykucmVwbGFjZSgvICsvZ2ksICcgJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNlcDogKGNhbXBvKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVncmFzID0gWy9cXGQrL2dpLCAvXihcXGR7NX0pLT8oXFxkezEsM30pL107XHJcbiAgICAgICAgY29uc3QgdmFsb3JlcyA9IGNhbXBvLnZhbHVlLm1hdGNoKHJlZ3Jhc1swXSk7XHJcbiAgICAgICAgaWYgKCF2YWxvcmVzKSByZXR1cm4gY2FtcG8udmFsdWUgPSAnJztcclxuICAgICAgICBjYW1wby52YWx1ZSA9IHZhbG9yZXMuam9pbignJyk7XHJcbiAgICAgICAgaWYgKHJlZ3Jhc1sxXS50ZXN0KGNhbXBvLnZhbHVlKSkgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS5yZXBsYWNlKHJlZ3Jhc1sxXSwgJyQxLSQyJyk7XHJcbiAgICAgICAgaWYgKGNhbXBvLnZhbHVlLmxlbmd0aCA+IDkpIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUuc3Vic3RyKDAsIDkpO1xyXG4gICAgfSxcclxuXHJcbiAgICB0ZWxlZm9uZTogKGNhbXBvKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVncmFzID0gWy9cXGQrL2dpLCAvXihcXGRcXGQ/KS8sIC9eKFxcZFxcZCkoXFxkezR9KS0/KFxcZHsxLDR9KS8sIC9eKFxcZFxcZCkoXFxkezV9KS0/KFxcZHsxLDR9KS9dO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yZXMgPSBjYW1wby52YWx1ZS5tYXRjaChyZWdyYXNbMF0pO1xyXG4gICAgICAgIGlmICghdmFsb3JlcykgcmV0dXJuIGNhbXBvLnZhbHVlID0gJyc7XHJcbiAgICAgICAgY29uc3QgdmFsb3IgPSBjYW1wby52YWx1ZSA9IHZhbG9yZXMuam9pbignJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDApIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbMV0sICcoJDEnKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gMikgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1sxXSwgJygkMSkgJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDYpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbMl0sICcoJDEpICQyLSQzJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDEwKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzNdLCAnKCQxKSAkMi0kMycpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAxMSkgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS5zdWJzdHIoMCwgMTUpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZzogKGNhbXBvKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVncmFzID0gWy9cXGQrL2dpLCAvXihcXGR7MSwyfSkvLCAvXihcXGR7MSwyfSlcXC4/KFxcZHszfSkvLCAvXihcXGR7MSwyfSlcXC4/KFxcZHszfSlcXC4/KFxcZHszfSkvLCAvXihcXGR7MSwyfSlcXC4/KFxcZHszfSlcXC4/KFxcZHszfSktPyhcXGQpPy9dO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yZXMgPSBjYW1wby52YWx1ZS5tYXRjaChyZWdyYXNbMF0pO1xyXG4gICAgICAgIGNvbnN0IGxldHJhcyA9IGNhbXBvLnZhbHVlLm1hdGNoKC9bYS16QS1aXSskL2dpKTtcclxuICAgICAgICBjb25zdCBkaWdpdG8gPSBsZXRyYXMgPyBsZXRyYXNbMF1bMF0gOiAnJztcclxuICAgICAgICBpZiAoIXZhbG9yZXMpIHJldHVybiBjYW1wby52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yID0gY2FtcG8udmFsdWUgPSB2YWxvcmVzLmpvaW4oJycpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAyKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzFdLCAnJDEuJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDUpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbMl0sICckMS4kMi4nKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gNykgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1szXSwgJyQxLiQyLiQzJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA9PT0gOCAmJiBkaWdpdG8pIGNhbXBvLnZhbHVlICs9ICctJyArIGRpZ2l0by50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA4KSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzRdLCAnJDEuJDIuJDMtJDQnKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gOSkgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS5zdWJzdHIoMCwgMTIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjcGZjbnBqOiAoY2FtcG8pID0+IHtcclxuICAgICAgICBjb25zdCBudW1lcm9zID0gL1xcZCsvZ2k7XHJcbiAgICAgICAgY29uc3QgdmFsb3JlcyA9IGNhbXBvLnZhbHVlLm1hdGNoKG51bWVyb3MpO1xyXG4gICAgICAgIGlmICghdmFsb3JlcykgcmV0dXJuIGNhbXBvLnZhbHVlID0gJyc7XHJcbiAgICAgICAgY29uc3QgdmFsb3IgPSB2YWxvcmVzLmpvaW4oJycpO1xyXG4gICAgICAgIGNvbnN0IGNwZiA9IC9eKFswLTldezEsM30pP1xcLj8oWzAtOV17MSwzfSk/XFwuPyhbMC05XXsxLDN9KT9cXC0/KFswLTldezEsMn0pPyQvO1xyXG4gICAgICAgIGNvbnN0IGNucGogPSAvXihbMC05XXsxLDJ9KT9cXC4/KFswLTldezEsM30pP1xcLj8oWzAtOV17MSwzfSk/XFwvPyhbMC05XXsxLDR9KT9cXC0/KFswLTldezEsMn0pPyQvO1xyXG4gICAgICAgIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUucmVwbGFjZSgvW15cXGQuXFwvLV0vZ2ksICcnKTtcclxuICAgICAgICBpZiAoY3BmLnRlc3QodmFsb3IpKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UoY3BmLCAoYWxsLCBhLCBiLCBjLCBkKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoYSB8fCAnJykgKyAoYiA/ICcuJyArIGIgOiAnJykgKyAoYyA/ICcuJyArIGMgOiAnJykgKyAoZCA/ICctJyArIGQgOiAnJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZWxzZSBpZiAoY25wai50ZXN0KHZhbG9yKSkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKGNucGosIChhbGwsIGEsIGIsIGMsIGQsIGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChhIHx8ICcnKSArIChiID8gJy4nICsgYiA6ICcnKSArIChjID8gJy4nICsgYyA6ICcnKSArIChkID8gJy8nICsgZCA6ICcnKSArIChlID8gJy0nICsgZSA6ICcnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoY2FtcG8udmFsdWUubGVuZ3RoID4gMTgpIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUuc3Vic3RyKDAsIDE4KTtcclxuICAgIH0sXHJcblxyXG4gICAgZGF0YTogKGNhbXBvKSA9PiB7XHJcbiAgICAgICAgaWYgKGNhbXBvLnR5cGUgPT09ICdkYXRlJykgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IG51bWVyb3MgPSBjYW1wby52YWx1ZS5yZXBsYWNlKC9eMD9cXC98W15cXGRcXC9dL2dpLCAnJyk7XHJcbiAgICAgICAgaWYgKG51bWVyb3MgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIGNhbXBvLnZhbHVlID0gbnVtZXJvcztcclxuICAgICAgICAgICAgY2FtcG8uc3R5bGUuYm9yZGVyQ29sb3IgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbXBvLnZhbHVlID0gbnVtZXJvc1xyXG4gICAgICAgIC5yZXBsYWNlKC8oXnxcXC8pMDArXFwvPy9nLCAnMCcpXHJcbiAgICAgICAgLnJlcGxhY2UoLyhefFxcLykoWzEtOV1cXC8pLywgJzAkMicpXHJcbiAgICAgICAgLnJlcGxhY2UoXHJcbiAgICAgICAgICAgIC8oXFxkXFxkKShcXC8/KShcXGR7MSwyfSk/KFxcLz8pMCooXFxkezEsNH0pPy4qL2csXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGFsbCwgZGQsIHMxLCBtbSwgczIsIGFhYWEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkZCA+IDMxIHx8IG1tID4gMTIpIGNhbXBvLnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGNhbXBvLnN0eWxlLmJvcmRlckNvbG9yID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZCArIChtbSA/ICcvJyArIG1tIDogczEgfHwgJycpICsgKGFhYWEgPyAnLycgKyBhYWFhIDogczIgfHwgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgZW1haWw6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2VuaGE6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGlmIChjYW1wby52YWx1ZS5sZW5ndGggPiAwICYmIGNhbXBvLnZhbHVlLmxlbmd0aCA8IDYpIGNhbXBvLnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XHJcbiAgICAgICAgZWxzZSBjYW1wby5zdHlsZS5ib3JkZXJDb2xvciA9IG51bGw7XHJcbiAgICB9XHJcblxyXG59O1xuXG5mdW5jdGlvbiBfY3JlYXRlTm9kZShlbGVtZW50KXtcclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9hcHBlbmQocGFyZW50LCBlbCl7XHJcbiAgICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGVsKVxyXG59XHJcblxyXG5mdW5jdGlvbiBfdG9nZ2xlSXRzZWxmKGJ0biwgY29udGVudCl7ICAgIFxyXG4gICAgYnRuICYmIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIFxyXG4gICAgICBpZihjb250ZW50Lmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpe1xyXG4gICAgICAgIGNvbnRlbnQucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIGNvbnRlbnQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XHJcbiAgICAgIH1cclxuICAgIH0pOyAgICBcclxufVxuXG4vLyAtLS0tLS0gVEFCUyAtLS0tLS1cclxuY29uc3QgYWxsVGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhcmdldF0nKTtcclxuY29uc3QgbGlua3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhbGxUYXJnZXRzKTtcclxuXHJcbmxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspe1xyXG4gIGNvbnN0IGxpbmtUYXJnZXQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKTtcclxuICBjb25zdCBhbGxUYWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpO1xyXG5cclxuICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRhcmdldHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhbGxUYWJzKTsgICAgICBcclxuICAgIHRhcmdldHMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KXtcclxuICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xyXG5cclxuICAgICAgaWYobGlua1RhcmdldCA9PT0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKSl7XHJcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgbGlua3MuZm9yRWFjaChidG4gPT57XHJcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuLy8gLS0tLS0tIENSRUFURSBFTEVNRU5UIC0tLS0tLVxyXG5jb25zdCBidG5DcmVhdGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNyZWF0ZV0nKTtcclxuYnRuQ3JlYXRlRWwgJiYgYnRuQ3JlYXRlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gIGNvbnN0IG5ld0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3M9XCJwb3N0LWNvbnRlbnRcIl0nKTtcclxuICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0xpc3QpO1xyXG4gIG5ld0xpc3QuaW5uZXJIVE1MID0gJzxsaT50ZXN0ZTE8L2xpPjxsaT50ZXN0ZTI8L2xpPic7XHJcbn0pO1xyXG5cclxuLy8gLS0tLS0tIFNVTVJFRFVDRVIgV0lUSCBGTEFUIC0tLS0tLVxyXG5mdW5jdGlvbiBzdW1SZWR1Y2VyKCkge1xyXG4gIC8vY29udmVydGVyIGFyZ3VtZW50cyBlbSBhcnJheVxyXG4gIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gIC8vIGFjaGF0YXIgYXJnc1xyXG4gIGNvbnN0IGZsYXRBcmdzID0gYXJncy5mbGF0KEluZmluaXR5KTtcclxuICAvL2ZpbHRhciBuw7ptZXJvc1xyXG4gIGNvbnN0IG51bWJlckFyZ3MgPSBmbGF0QXJncy5maWx0ZXIobiA9PiB0eXBlb2YgbiA9PT0gJ251bWJlcicpO1xyXG4gIC8vIHNvbWFyXHJcbiAgcmV0dXJuIG51bWJlckFyZ3MucmVkdWNlKChzdW0sIG4pID0+IHN1bSArIG4sIDApO1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBmbGF0dGVuRGVlcChhcnIxKXtcclxuLy8gICByZXR1cm4gYXJyMS5yZWR1Y2UoKGFjYywgdmFsKSA9PiBBcnJheS5pc0FycmF5KHZhbCkgPyBhY2MuY29uY2F0KGZsYXR0ZW5EZWVwKHZhbCkpIDogYWNjLmNvbmNhdCh2YWwpLCBbXSk7XHJcbi8vIH1cclxuXHJcbmNvbnN0IHJlc3VsdCA9IHN1bVJlZHVjZXIoWzAsIDMsIDddLCBbbnVsbCwgJ2VtYSB3YXRzb24nLCA4Ml0sIDUsIFtbMywgMF0sIFsxXSwgbnVsbF0sIFtdKTtcclxuXHJcbmNvbnN0IHJlc3VsdFN1bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXN1bV0nKTtcclxucmVzdWx0U3VtICYmIHJlc3VsdFN1bS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgY29uc3QgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcz1cInBvc3QtY29udGVudFwiXScpO1xyXG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3RGl2KTtcclxuICBuZXdEaXYuaW5uZXJIVE1MID0gYCR7cmVzdWx0fWA7XHJcbn0pO1xyXG5cclxuLy8gLS0tLS0tIEZFVENIIC0tLS0tLVxyXG4vLyBmdW5jdGlvbiBjcmVhdGVOb2RlKGVsZW1lbnQpe1xyXG4vLyAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpOyAvLyBDcmVhdGUgdGhlIHR5cGUgb2YgZWxlbWVudCB5b3UgcGFzcyBpbiB0aGUgcGFyYW1ldGVyc1xyXG4vLyB9XHJcblxyXG4vLyBmdW5jdGlvbiBhcHBlbmQocGFyZW50LCBlbCl7XHJcbi8vICAgcmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChlbCk7IC8vIEFwcGVuZCB0aGUgc2Vjb25kIHBhcmFtZXRlcihlbGVtZW50KSB0byB0aGUgZmlyc3Qgb25lXHJcbi8vIH1cclxuXHJcbmNvbnN0IGdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0aG9ycycpOyAvLyBHZXQgdGhlIGxpc3Qgd2hlcmUgd2Ugd2lsbCBwbGFjZSBvdXIgYXV0aG9yc1xyXG5jb25zdCB1cmwgPSAnaHR0cHM6Ly9yYW5kb211c2VyLm1lL2FwaS8/cmVzdWx0cz0xMCc7IC8vIEdldCAxMCByYW5kb20gdXNlcnNcclxuXHJcbmZldGNoKHVybCkgLy8gQ2FsbCB0aGUgZmV0Y2ggZnVuY3Rpb24gcGFzc2luZyB0aGUgdXJsIG9mIHRoZSBBUEkgYXMgYSBwYXJhbWV0ZXJcclxuLnRoZW4oKHJlc3ApPT4gcmVzcC5qc29uKCkpIC8vIFRyYW5zZm9ybSB0aGUgZGF0YSBpbnRvIEpTT05cclxuLnRoZW4oZnVuY3Rpb24oZGF0YSl7XHJcbiAgLy8gWW91ciBjb2RlIGZvciBoYW5kbGluZyB0aGUgZGF0YSB5b3UgZ2V0IGZyb20gdGhlIEFQSVxyXG4gIC8vIENyZWF0ZSBhbmQgYXBwZW5kIHRoZSBsaSdzIHRvIHRoZSB1bFxyXG4gIGxldCBhdXRob3JzID0gZGF0YS5yZXN1bHRzOyAvLyBHZXQgdGhlIHJlc3VsdHNcclxuICByZXR1cm4gYXV0aG9ycy5tYXAoZnVuY3Rpb24oYXV0aG9yKXtcclxuICAgIGxldCBkaXYgPSBfY3JlYXRlTm9kZSgnZGl2JyksIC8vIENyZWF0ZSB0aGUgZWxlbWVudHMgd2UgbmVlZFxyXG4gICAgICAgIGltZyA9IF9jcmVhdGVOb2RlKCdpbWcnKSxcclxuICAgICAgICBwID0gX2NyZWF0ZU5vZGUoJ3AnKTtcclxuICAgIGltZy5zcmMgPSBhdXRob3IucGljdHVyZS5tZWRpdW07IFxyXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1jZWxsJywgJ3NocmluaycpO1xyXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JywgJ2NlbnRlcicpO1xyXG4gICAgLy8gQWRkIHRoZSBzb3VyY2Ugb2YgdGhlIGltYWdlIHRvIGJlIHRoZSBzcmMgb2YgdGhlIGltZyBlbGVtZW50XHJcbiAgICBwLmlubmVySFRNTCA9IGAke2F1dGhvci5uYW1lLmZpcnN0fSAke2F1dGhvci5uYW1lLmxhc3R9YDsgXHJcbiAgICAvLyBNYWtlIHRoZSBIVE1MIG9mIG91ciBwIHRvIGJlIHRoZSBmaXJzdCBhbmQgbGFzdCBuYW1lIG9mIG91ciBhdXRob3JcclxuICAgIF9hcHBlbmQoZGl2LCBpbWcpOyAvLyBBcHBlbmQgYWxsIG91ciBlbGVtZW50c1xyXG4gICAgX2FwcGVuZChkaXYsIHApO1xyXG4gICAgX2FwcGVuZChncmlkLCBkaXYpO1xyXG4gIH0pXHJcbn0pXHJcbi5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgY29uc29sZS5sb2coZXJyb3IpO1xyXG59KTtcclxuXHJcbi8vIC0tLS0tLSBTTElERVIgV0lUSCBMSUdIVEJPWCAtLS0tLS1cclxud2luZG93LnNsaWRlcnMgPSBfbWFwKCcuc2xpZGVyJywgcGFyZW50ID0+IHtcclxuICBjb25zdCBzbGlkZXIgPSBuZXcgU2xpZGVyKHtcclxuICAgIHBhcmVudFxyXG4gIH0pO1xyXG4gIGNvbmZpZ1NsaWRlcihzbGlkZXIsIHBhcmVudCk7XHJcbn0pO1xyXG5cclxud2luZG93LmNhcm91c2VscyA9IF9tYXAoJy5jYXJvdXNlbCcsIHBhcmVudCA9PiB7XHJcbiAgY29uc3Qgc2l6ZSA9IHBhcmVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2l6ZScpIHwgMDtcclxuICBjb25zdCBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbCh7XHJcbiAgICBwYXJlbnQsXHJcbiAgICBzaXplXHJcbiAgfSk7XHJcbiAgY29uZmlnU2xpZGVyKGNhcm91c2VsLCBwYXJlbnQpO1xyXG4gIHJldHVybiBjYXJvdXNlbDtcclxufSk7XHJcblxyXG52YXIgbGlnaHRib3ggPSBuZXcgTGlnaHRib3goXCJbZGF0YS1saWdodGJveF1cIik7XHJcblxyXG4vLyAtLS0tLS0gTUFTS1MgLS0tLS0tXHJcbmNvbnN0IGVhY2ggPSAoaSwgZikgPT4gQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChpLCBmKTtcclxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKTtcclxuXHJcbmlmIChmb3JtLmxlbmd0aCkgZWFjaChmb3JtLCBGb3JtTWFzayk7XHJcbmZ1bmN0aW9uIEZvcm1NYXNrKGYpIHtcclxuICAoQXJyYXkuZnJvbShmLmVsZW1lbnRzKSlcclxuICAgICAgLmZpbHRlcihlbCA9PiBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbWFzaycpKVxyXG4gICAgICAuZm9yRWFjaChjYW1wbyA9PiBjYW1wby5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBtZXRvZG8gPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1tYXNrJyk7XHJcbiAgICAgICAgaWYgKCFtYXNjYXJhc1ttZXRvZG9dKSByZXR1cm4gY29uc29sZS5sb2coYEEgbcOhc2NhcmEgZG8gdGlwbyBcIiR7bWV0b2RvfVwiIG7Do28gZm9pIGRlZmluaWRhLmApO1xyXG5cclxuICAgICAgICBtYXNjYXJhc1ttZXRvZG9dKHRoaXMpO1xyXG4gIH0pKTtcclxufVxyXG5cclxuLy8gLS0tLS0tIENSVUQgV0lUSCBKUyAtLS0tLS1cclxuY29uc3Qgbm9tZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub21lJyk7XHJcbmNvbnN0IHBrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NwZmNucGonKTtcclxuY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW1haWwnKTtcclxuXHJcbmZ1bmN0aW9uIG1ha2VPYmooKXtcclxuICByZXR1cm4ge1xyXG4gICAgbm9tZTogbm9tZS52YWx1ZSxcclxuICAgIGNwZjogcGsudmFsdWUsXHJcbiAgICBlbWFpbDogZW1haWwudmFsdWVcclxuICB9XHJcbn1cclxuXHJcbmxldCBhcnJheSA9IFtdO1xyXG5jb25zdCBjbGVhckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdC1mb3JtJyk7XHJcbmNvbnN0IGJ0bkVudmlhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbnZpYXInKTtcclxuY29uc3QgYnRuRGVsZXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGFyJyk7XHJcblxyXG5idG5FbnZpYXIgJiYgYnRuRW52aWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICBpZihub21lLnZhbHVlIT1udWxsLCBub21lLnZhbHVlIT1cIlwiICYmIHBrLnZhbHVlIT1udWxsLCBway52YWx1ZSE9XCJcIiAmJiBlbWFpbC52YWx1ZSE9bnVsbCwgZW1haWwudmFsdWUhPVwiXCIpe1xyXG4gICAgbGV0IGluZGV4QXJyYXkgPSBhcnJheS5maW5kSW5kZXgoZWxlbSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmNwZj09PXBrLnZhbHVlXHJcbiAgICB9KTtcclxuICAgIGlmKGluZGV4QXJyYXkgPiAtMSl7XHJcbiAgICAgIGFycmF5W2luZGV4QXJyYXldID0gbWFrZU9iaigpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgYXJyYXkucHVzaChtYWtlT2JqKCkpO1xyXG4gICAgfVxyXG4gICAgdHJhbnNmb3JtVGV4dChhcnJheSk7XHJcbiAgICBjbGVhckZvcm0ucmVzZXQoKTtcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIGFsZXJ0KCdQcmVlbmNoYSB0b2RvcyBvcyBjYW1wb3MhJyk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybVRleHQoYXJyYXkpe1xyXG4gIC8vIGNvbnN0IG9iamVjdFRleHQgPSBKU09OLnN0cmluZ2lmeSh7YXJyYXl9LCBudWxsLCBcIiBcIilcclxuICAvLyBjb25zdCBkYXRhQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdHNfZGlzcGxheScpO1xyXG4gIC8vIGRhdGFDb250YWluZXIudGV4dENvbnRlbnQgPSBvYmplY3RUZXh0O1xyXG4gIGNvbnN0IG9iamVjdFRleHQgPSBhcnJheS5yZWR1Y2UoKGFjYywgaXRlbSwgaW5kZXgpID0+e1xyXG4gICAgYWNjKz0gYDx1bD48bGk+JHtpdGVtLm5vbWV9PC9saT48bGk+JHtpdGVtLmNwZn08L2xpPjxsaT4ke2l0ZW0uZW1haWx9PC9saT48L3VsPmA7XHJcbiAgICByZXR1cm4gYWNjXHJcbiAgfSwgJycpO1xyXG4gIGNvbnN0IGRhdGFDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0c19kaXNwbGF5Jyk7XHJcbiAgZGF0YUNvbnRhaW5lci5pbm5lckhUTUwgPSBvYmplY3RUZXh0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcnJheVJlbW92ZShhcnIsIHZhbHVlKXsgLy9yZXRvcm5hIHRvZG9zIG9zIGVsZW1lbnRvcyBkbyBhcnJheSBtZW5vcyBvIHF1ZSB2b2PDqiBwYXNzYXJcclxuICByZXR1cm4gYXJyLmZpbHRlcigoZWxlLCBpbmRleCkgPT4ge3JldHVybiBpbmRleCAhPSB2YWx1ZX0pXHJcbn1cclxuXHJcbmJ0bkRlbGV0YXIgJiYgYnRuRGVsZXRhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4ge1xyXG4gIGxldCBpbmRleEFycmF5ID0gYXJyYXkuZmluZEluZGV4KGVsZW0gPT4ge1xyXG4gICAgcmV0dXJuIGVsZW0uY3BmID09PSBway52YWx1ZVxyXG4gIH0pO1xyXG5cclxuICBpZihpbmRleEFycmF5ID4gLTEpe1xyXG4gICAgYXJyYXkgPSBhcnJheVJlbW92ZShhcnJheSwgaW5kZXhBcnJheSk7XHJcbiAgfVxyXG4gIHRyYW5zZm9ybVRleHQoYXJyYXkpO1xyXG4gIGNsZWFyRm9ybS5yZXNldCgpO1xyXG59KTtcclxuXHJcbi8vIC0tLS0tLVRPR0dMRSBCVVRUT04tLS0tLS1cclxuLy8gY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdG9nZ2xlXScpO1xyXG4vLyBjb25zdCB0b2dnbGVDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udGVudF0nKTtcclxuXHJcbi8vIHRvZ2dsZUJ0biAmJiB0b2dnbGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG5cclxuLy8gICBpZih0b2dnbGVDb250ZW50Lmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpe1xyXG4vLyAgICAgdG9nZ2xlQ29udGVudC5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpXHJcbi8vICAgfVxyXG4vLyAgIGVsc2V7XHJcbi8vICAgICB0b2dnbGVDb250ZW50LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpXHJcbi8vICAgfVxyXG4vLyB9KVxyXG5fdG9nZ2xlSXRzZWxmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRvZ2dsZV0nKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udGVudF0nKSk7XHJcblxyXG4vLyAtLS0tLS0gTUFQIEFORCBGSUxURVIgLS0tLS0tXHJcbmxldCBkYXRhID0gW1xyXG4gIHtcclxuICAgIG5hbWU6ICdCdXR0ZXJzJyxcclxuICAgIGFnZTogMyxcclxuICAgIHR5cGU6ICdkb2cnXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTGl6enknLFxyXG4gICAgYWdlOiA2LFxyXG4gICAgdHlwZTogJ2RvZydcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdSZWQnLFxyXG4gICAgYWdlOiAxLFxyXG4gICAgdHlwZTogJ2NhdCdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdKb2V5JyxcclxuICAgIGFnZTogMyxcclxuICAgIHR5cGU6ICdkb2cnXHJcbiAgfVxyXG5dO1xyXG5cclxubGV0IGRvZ3MgPSBkYXRhLmZpbHRlcigoYW5pbWFsKT0+e1xyXG4gIHJldHVybiBhbmltYWwudHlwZSA9PT0gJ2RvZydcclxufSk7XHJcblxyXG5kb2dzLm1hcCgoYW5pbWFsKT0+e1xyXG4gIHJldHVybiBhbmltYWwuYWdlICo9IDdcclxufSk7XHJcblxyXG5jb25zdCBjYWxjQWdlID0gZG9ncy5yZWR1Y2UoKHN1bSwgYW5pbWFsKT0+e1xyXG4gIHJldHVybiBzdW0gKyBhbmltYWwuYWdlXHJcbn0sIDApO1xyXG5cclxuY29uc29sZS5sb2coZG9ncyk7XHJcbmNvbnNvbGUubG9nKGNhbGNBZ2UpO1xyXG5cclxuLy8gLS0tLS0tIEZJTFRFUiBGRVRDSCBSRVNVTFRTIC0tLS0tLVxyXG5cclxuY29uc3QgZGF0YUdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jaGFyYWN0ZXJzXScpO1xyXG5jb25zdCBkYXRhR3JpZEZpbHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNoYXJhY3RlcnMtZmlsdGVyXScpO1xyXG5jb25zdCBzd2FwaSA9ICdodHRwczovL3N3YXBpLmNvL2FwaS9wZW9wbGUvJztcclxuXHJcbmZldGNoKHN3YXBpKVxyXG4udGhlbigocmVzcCk9PiByZXNwLmpzb24oKSlcclxuLnRoZW4oZnVuY3Rpb24oZGF0YSl7XHJcbiAgY29uc29sZS5sb2coZGF0YS5yZXN1bHRzKTtcclxuICBsZXQgcGVvcGxlID0gZGF0YS5yZXN1bHRzO1xyXG4gIGNvbnN0IHBlb3BsZU1hcCA9IHBlb3BsZS5tYXAoKGl0ZW0pPT57XHJcbiAgICBsZXQgZGl2ID0gX2NyZWF0ZU5vZGUoJ2RpdicpLFxyXG4gICAgICAgIHAgPSBfY3JlYXRlTm9kZSgncCcpO1xyXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1jZWxsJywgJ3NocmluaycpO1xyXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JywgJ2NlbnRlcicpO1xyXG4gICAgcC5pbm5lckhUTUwgPSBgJHtpdGVtLm5hbWV9YDtcclxuICAgIF9hcHBlbmQoZGl2LCBwKTtcclxuICAgIF9hcHBlbmQoZGF0YUdyaWQsIGRpdik7XHJcbiAgfSk7ICBcclxuXHJcbiAgY29uc3QgcGVvcGxlRmlsdGVyID0gcGVvcGxlLmZpbHRlcigoaXRlbSk9PntcclxuICAgIHJldHVybiBpdGVtLmhhaXJfY29sb3IgPT09ICdibG9uZCc7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHBlb3BsZUZpbHRlck1hcCA9IHBlb3BsZUZpbHRlci5tYXAoKGl0ZW0pPT57XHJcbiAgICBsZXQgZGl2ID0gX2NyZWF0ZU5vZGUoJ2RpdicpLFxyXG4gICAgICAgIHAgPSBfY3JlYXRlTm9kZSgncCcpO1xyXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1jZWxsJywgJ3NocmluaycpO1xyXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JywgJ2NlbnRlcicpO1xyXG4gICAgcC5pbm5lckhUTUwgPSBgJHtpdGVtLm5hbWV9YDtcclxuICAgIF9hcHBlbmQoZGl2LCBwKTtcclxuICAgIF9hcHBlbmQoZGF0YUdyaWRGaWx0ZXIsIGRpdik7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7cGVvcGxlTWFwLCBwZW9wbGVGaWx0ZXJNYXB9XHJcbn0pXHJcbi5jYXRjaCgoZXJyb3IpPT57XHJcbiAgY29uc29sZS5sb2coZXJyb3IpOyAgXHJcbn0pO1xyXG5cclxuLy8gLS0tLS0tIEFKQVggUkVRVUVTVCAtLS0tLS1cclxuY29uc3QgSHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5jb25zdCB1cmwxPSdodHRwczovL3N3YXBpLmNvL2FwaS9wZW9wbGUvJztcclxuSHR0cC5vcGVuKCdHRVQnLCB1cmwxKTtcclxuSHR0cC5zZW5kKCk7XHJcblxyXG5IdHRwLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe1xyXG4gIGlmKHRoaXMucmVhZHlTdGF0ZT09NCAmJiB0aGlzLnN0YXR1cz09MjAwKXtcclxuICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoSHR0cC5yZXNwb25zZVRleHQpKTtcclxuICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoSHR0cC5yZXNwb25zZVRleHQpLnJlc3VsdHMpO1xyXG4gIH1cclxufTtcblxufSgpKTtcbiJdfQ==
