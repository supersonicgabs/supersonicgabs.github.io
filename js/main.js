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
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiU2xpZGVyIiwiY29uZmlnIiwidHlwZSIsInBhcmVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBhcmVudFNlbGVjdG9yIiwiY2hpbGRTZWxlY3RvciIsImNoaWxkcmVuIiwibGVuZ3RoIiwiaW5kZXgiLCJkdXJhdGlvbiIsImNsYXNzTGlzdCIsImFkZCIsImNvbXBvc2UiLCJmbiIsImZvckVhY2giLCJtYXAiLCJmaWx0ZXIiLCJmaW5kIiwibmV4dEluZGV4IiwicHJldkluZGV4IiwiZWwiLCJpIiwicmVtb3ZlIiwidGhhdCIsInBsYXlpbmdTdGF0ZUlEIiwic2V0SW50ZXJ2YWwiLCJuZXh0IiwiaXNQbGF5aW5nIiwiY2xlYXJJbnRlcnZhbCIsInBhdXNlIiwicGxheSIsInBsYXlpbmdTdGF0ZSIsImV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb2xsYXBzZWQiLCJjb25zb2xlIiwidGFibGUiLCJPYmplY3QiLCJrZXlzIiwicHJvcCIsImtleSIsInZhbHVlIiwibG9nIiwid2FybiIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsImdyb3VwRW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQ2Fyb3VzZWwiLCJzaXplIiwicG9zaXRpb24iLCJzbGlkZSIsIml0ZW1PcmRlciIsInNldEF0dHJpYnV0ZSIsImNsYXNzTmFtZSIsInN0eWxlIiwib3JkZXIiLCJkaXIiLCJhbmltQ2xhc3NOYW1lIiwicmVtb3ZlV2lsbFJlbmRlckNsYXNzIiwiX21hcCIsIndoYXQiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwidyIsImNyZWF0ZUVsZW1lbnQiLCJhdHRycyIsImVsZW1lbnQiLCJOb2RlIiwiZXh0ZW5kIiwib2JqIiwicHJvcHMiLCJleHRlbmRlcnMiLCJzdHlsZXMiLCJkYXRhc2V0IiwiZGF0YSIsIm5hbWUiLCJldmVudHMiLCJjYWxsYmFja3MiLCJraWRzIiwiayIsImFwcGVuZENoaWxkIiwidmFsIiwiTGlnaHRib3giLCJzZWxlY3RvciIsImNvbnRhaW5lciIsIm1vZGFsIiwiZ3JpZCIsInByZXYiLCJ3cmFwcGVyIiwicGFyZW50RWxlbWVudCIsImJvZHkiLCJjbG9zZUJ1dHRvbiIsImltZyIsIml0ZW1zIiwic2hvdyIsInNyYyIsImdldEF0dHJpYnV0ZSIsIm9wZW4iLCJjZWxsIiwiaW5uZXJIVE1MIiwiYnRuIiwiY2xpY2siLCJnb1ByZXYiLCJnb05leHQiLCJjbG9zZSIsImRvbU5vZGVzIiwic2xpZGVyT3B0aW9ucyIsImF1dG9wbGF5Iiwic2xpZGVyIiwib24iLCJjb25maWdTbGlkZXIiLCJmaXJzdCIsImdvVG8iLCJvcHRpb25zIiwiaGFzQXR0cmlidXRlIiwic3BsaXQiLCJvcHRpb24iLCJzbGlkZXJDYWxsYmFja3MiLCJvcGVuT25Nb2JpbGUiLCJzY3JlZW4iLCJ3aWR0aCIsInRhcmdldCIsImNvbnRyb2wiLCJ0YXJnZXRFbGVtZW50IiwiYWN0aW9uIiwiYWN0aW9uRGF0YSIsInBhcmFtcyIsImFwcGx5IiwibWFzY2FyYXMiLCJub21lIiwiY2FtcG8iLCJ0ZXN0IiwicmVncmEiLCJ2YWxvcmVzIiwibWF0Y2giLCJqb2luIiwicmVwbGFjZSIsImNlcCIsInJlZ3JhcyIsInN1YnN0ciIsInRlbGVmb25lIiwidmFsb3IiLCJyZyIsImxldHJhcyIsImRpZ2l0byIsInRvVXBwZXJDYXNlIiwiY3BmY25waiIsIm51bWVyb3MiLCJjcGYiLCJjbnBqIiwiYWxsIiwiYSIsImIiLCJjIiwiZCIsImUiLCJib3JkZXJDb2xvciIsImRkIiwiczEiLCJtbSIsInMyIiwiYWFhYSIsImVtYWlsIiwidG9Mb3dlckNhc2UiLCJzZW5oYSIsIl9jcmVhdGVOb2RlIiwiX2FwcGVuZCIsIl90b2dnbGVJdHNlbGYiLCJjb250ZW50IiwicmVtb3ZlQXR0cmlidXRlIiwiYWxsVGFyZ2V0cyIsImxpbmtzIiwibGluayIsImxpbmtUYXJnZXQiLCJhbGxUYWJzIiwidGFyZ2V0cyIsImJ0bkNyZWF0ZUVsIiwibmV3TGlzdCIsInN1bVJlZHVjZXIiLCJhcmdzIiwiYXJndW1lbnRzIiwiZmxhdEFyZ3MiLCJmbGF0IiwiSW5maW5pdHkiLCJudW1iZXJBcmdzIiwibiIsInJlZHVjZSIsInN1bSIsInJlc3VsdCIsInJlc3VsdFN1bSIsIm5ld0RpdiIsImdldEVsZW1lbnRCeUlkIiwidXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJhdXRob3JzIiwicmVzdWx0cyIsImF1dGhvciIsImRpdiIsInAiLCJwaWN0dXJlIiwibWVkaXVtIiwibGFzdCIsImNhdGNoIiwiZXJyb3IiLCJ3aW5kb3ciLCJzbGlkZXJzIiwiY2Fyb3VzZWxzIiwiY2Fyb3VzZWwiLCJsaWdodGJveCIsImVhY2giLCJmIiwiZm9ybSIsIkZvcm1NYXNrIiwiZnJvbSIsImVsZW1lbnRzIiwibWV0b2RvIiwicGsiLCJtYWtlT2JqIiwiYXJyYXkiLCJjbGVhckZvcm0iLCJidG5FbnZpYXIiLCJidG5EZWxldGFyIiwiaW5kZXhBcnJheSIsImZpbmRJbmRleCIsImVsZW0iLCJwdXNoIiwidHJhbnNmb3JtVGV4dCIsInJlc2V0IiwiYWxlcnQiLCJvYmplY3RUZXh0IiwiYWNjIiwiaXRlbSIsImRhdGFDb250YWluZXIiLCJhcnJheVJlbW92ZSIsImFyciIsImVsZSIsImFnZSIsImRvZ3MiLCJhbmltYWwiLCJjYWxjQWdlIiwiZGF0YUdyaWQiLCJkYXRhR3JpZEZpbHRlciIsInN3YXBpIiwicGVvcGxlIiwicGVvcGxlTWFwIiwicGVvcGxlRmlsdGVyIiwiaGFpcl9jb2xvciIsInBlb3BsZUZpbHRlck1hcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQyxhQUFZO0FBQ2I7O0FBRGEsTUFHUEEsTUFITztBQUtULG9CQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2xCLFdBQUtDLElBQUwsR0FBWSxRQUFaO0FBQ0EsVUFBSSxFQUFFLGdCQUFnQkYsTUFBbEIsQ0FBSixFQUErQixPQUFP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LEdBQXhCO0FBQ0QsS0FSdUIsQ0FBeEI7O0FBVUEsV0FBTyxFQUFDK0Msb0JBQUQsRUFBWUcsZ0NBQVosRUFBUDtBQUNELEdBOUJELEVBK0JDN0MsS0EvQkQsQ0ErQk8sVUFBQ0MsS0FBRCxFQUFTO0FBQ2RqTCxZQUFRTyxHQUFSLENBQVkwSyxLQUFaO0FBQ0QsR0FqQ0Q7QUFtQ0MsQ0F6MEJBLEdBQUQiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4ndXNlIHN0cmljdCc7XG5cbmNsYXNzIFNsaWRlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgIHRoaXMudHlwZSA9ICdTbGlkZXInO1xyXG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU2xpZGVyKSkgcmV0dXJuIG5ldyBTbGlkZXIoY29uZmlnKTtcclxuICBcclxuICAgICAgdGhpcy5wYXJlbnQgPSBjb25maWcucGFyZW50IHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnBhcmVudFNlbGVjdG9yIHx8ICcuc2xpZGVyJyk7XHJcbiAgICAgIGlmICghdGhpcy5wYXJlbnQpIHRocm93ICdbU0xJREVSXTogQ29udGFpbmVyIG7Do28gZW5jb250cmFkby4nO1xyXG4gIFxyXG4gICAgICB0aGlzLmNoaWxkU2VsZWN0b3IgPSBjb25maWcuY2hpbGRTZWxlY3RvciB8fCAnLnNsaWRlJztcclxuICAgICAgaWYgKCF0aGlzLmNoaWxkcmVuLmxlbmd0aCkgdGhyb3cgJ1tTTElERVJdOiBTbGlkZXMgbsOjbyBlbmNvbnRyYWRvcy4nO1xyXG4gIFxyXG4gICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgICAgdGhpcy5kdXJhdGlvbiA9IGNvbmZpZy5kdXJhdGlvbiB8fCAzMDAwO1xyXG4gICAgICB0aGlzLnBhcmVudC5jbGFzc0xpc3QuYWRkKCdzZXQnKTtcclxuICAgICAgdGhpcy5jb21wb3NlKCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBnZXQgY2hpbGRyZW4oKSB7XHJcbiAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLnBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuY2hpbGRTZWxlY3RvcikpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZ2V0IGxlbmd0aCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZm9yRWFjaChmbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZuKTtcclxuICAgIH1cclxuICBcclxuICAgIG1hcChmbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5tYXAoZm4pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZmlsdGVyKGZuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZpbHRlcihmbik7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBmaW5kKGZuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZpbmQoZm4pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgY29tcG9zZSgpIHtcclxuICAgICAgdmFyIG5leHRJbmRleCwgcHJldkluZGV4O1xyXG4gICAgICBwcmV2SW5kZXggPSB0aGlzLmluZGV4ID4gMCA/IHRoaXMuaW5kZXggLSAxIDogdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxO1xyXG4gICAgICBuZXh0SW5kZXggPSB0aGlzLmluZGV4IDwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxID8gdGhpcy5pbmRleCArIDEgOiAwO1xyXG4gICAgICB0aGlzLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgncHJldicpO1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQnKTtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCduZXh0Jyk7XHJcbiAgICAgICAgaWYgKGkgPT09IHByZXZJbmRleCkgZWwuY2xhc3NMaXN0LmFkZCgncHJldicpO1xyXG4gICAgICAgIGlmIChpID09PSBuZXh0SW5kZXgpIGVsLmNsYXNzTGlzdC5hZGQoJ25leHQnKTtcclxuICAgICAgICBpZiAoaSA9PT0gdGhpcy5pbmRleCkgZWwuY2xhc3NMaXN0LmFkZCgnY3VycmVudCcpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBwbGF5KCkge1xyXG4gICAgICB2YXIgdGhhdDtcclxuICAgICAgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoaXMucGxheWluZ1N0YXRlSUQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQubmV4dCgpO1xyXG4gICAgICB9LCB0aGlzLmR1cmF0aW9uKTtcclxuICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICBcclxuICAgIHBhdXNlKCkge1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMucGxheWluZ1N0YXRlSUQpO1xyXG4gICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICBcclxuICAgIHBsYXlwYXVzZSgpIHtcclxuICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF1c2UoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIHByZXYoKSB7XHJcbiAgICAgIHZhciBwbGF5aW5nU3RhdGU7XHJcbiAgICAgIGlmICh0aGlzLmluZGV4ID4gMCkge1xyXG4gICAgICAgIHRoaXMuaW5kZXgtLTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHBsYXlpbmdTdGF0ZSA9IHRoaXMuaXNQbGF5aW5nO1xyXG4gICAgICBpZiAocGxheWluZ1N0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY29tcG9zZSgpO1xyXG4gICAgICBpZiAocGxheWluZ1N0YXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICBuZXh0KCkge1xyXG4gICAgICB2YXIgcGxheWluZ1N0YXRlO1xyXG4gICAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIHRoaXMuaW5kZXgrKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgICAgfVxyXG4gICAgICBwbGF5aW5nU3RhdGUgPSB0aGlzLmlzUGxheWluZztcclxuICAgICAgaWYgKHBsYXlpbmdTdGF0ZSkge1xyXG4gICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNvbXBvc2UoKTtcclxuICAgICAgaWYgKHBsYXlpbmdTdGF0ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgZ29UbyhpbmRleCkge1xyXG4gICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbXBvc2UoKTtcclxuICAgIH1cclxuICBcclxuICAgIG9uKGV2ZW50LCBmbikge1xyXG4gICAgICB0aGlzLnBhcmVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmbik7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgb2ZmKGV2ZW50LCBmbikge1xyXG4gICAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmbik7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgaW5zcGVjdChjb2xsYXBzZWQpIHtcclxuICAgICAgY29uc29sZVtjb2xsYXBzZWQgPT09IHRydWUgPyAnZ3JvdXBDb2xsYXBzZWQnIDogJ2dyb3VwJ10odGhpcy50eXBlKTtcclxuICAgICAgY29uc29sZS50YWJsZShcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzKS5tYXAoa2V5ID0+IHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHByb3A6IGtleSxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXNba2V5XSxcclxuICAgICAgICAgICAgdHlwZTogdHlwZW9mIHRoaXNba2V5XVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucGFyZW50KTtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5jaGlsZHJlbik7XHJcbiAgICAgIGNvbnNvbGUud2FybihEYXRlLm5vdygpLnRvU3RyaW5nKCkpO1xyXG4gICAgICBjb25zb2xlLmdyb3VwRW5kKHRoaXMudHlwZSk7XHJcbiAgXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIFxyXG4gIH1cblxuY2xhc3MgQ2Fyb3VzZWwgZXh0ZW5kcyBTbGlkZXIge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgIGNvbmZpZy5wYXJlbnRTZWxlY3RvciA9IGNvbmZpZy5wYXJlbnRTZWxlY3RvciB8fCAnLmNhcm91c2VsJztcclxuICAgIHN1cGVyKGNvbmZpZyk7XHJcbiAgICB0aGlzLnR5cGUgPSAnQ2Fyb3VzZWwnO1xyXG4gICAgdGhpcy5zaXplID0gY29uZmlnLnNpemUgfCAwO1xyXG4gICAgdGhpcy5jb21wb3NlKCk7XHJcbiAgfVxyXG5cclxuICBjb21wb3NlKCkge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmluZGV4ICsgMTtcclxuICAgIHRoaXMuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcclxuICAgICAgbGV0IGl0ZW1PcmRlciA9IGkgLSBwb3NpdGlvbiArIDE7XHJcbiAgICAgIGlmIChpdGVtT3JkZXIgPCAwKSBpdGVtT3JkZXIgPSB0aGlzLmxlbmd0aCAtIHBvc2l0aW9uICsgaSArIDE7XHJcbiAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgnZGF0YS1vcmRlcicsIGl0ZW1PcmRlcik7XHJcblxyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdwcmV2Jyk7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQnKTtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnbmV4dCcpO1xyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3aWxsLWdvLXByZXYnKTtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd2lsbC1nby1uZXh0Jyk7XHJcblxyXG4gICAgICBpZiAodGhpcy5zaXplKSB7XHJcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID1cclxuICAgICAgICAgIHRoaXMubGVuZ3RoIDw9IHRoaXMuc2l6ZSA/ICdjdXJyZW50JyA6XHJcbiAgICAgICAgICBpdGVtT3JkZXIgPiAtMSAmJiBpdGVtT3JkZXIgPCB0aGlzLnNpemUgPyAnY3VycmVudCcgOlxyXG4gICAgICAgICAgaXRlbU9yZGVyID09PSAtMSB8fCBpdGVtT3JkZXIgPT09IHRoaXMubGVuZ3RoIC0gMSA/ICdwcmV2JyA6XHJcbiAgICAgICAgICBpdGVtT3JkZXIgPT09IHRoaXMuc2l6ZSA/ICduZXh0JyA6XHJcbiAgICAgICAgICAnJztcclxuICAgICAgICBpZiAoIWNsYXNzTmFtZSkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgIHNsaWRlLnN0eWxlLm9yZGVyID0gaXRlbU9yZGVyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5kaXIpIHtcclxuICAgICAgICBjb25zdCBhbmltQ2xhc3NOYW1lID0gJ3dpbGwtZ28tJyArIHRoaXMuZGlyO1xyXG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoYW5pbUNsYXNzTmFtZSk7XHJcbiAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdEFuaW1hdGlvbkVuZFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJlbW92ZVdpbGxSZW5kZXJDbGFzcyhzbGlkZSwgYW5pbUNsYXNzTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJlbW92ZVdpbGxSZW5kZXJDbGFzcyhzbGlkZSwgYW5pbUNsYXNzTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVXaWxsUmVuZGVyQ2xhc3Moc2xpZGUsIGNsYXNzTmFtZSkge1xyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwcmV2KCkge1xyXG4gICAgdGhpcy5kaXIgPSAncHJldic7XHJcbiAgICByZXR1cm4gc3VwZXIucHJldigpO1xyXG4gIH1cclxuXHJcbiAgbmV4dCgpIHtcclxuICAgIHRoaXMuZGlyID0gJ25leHQnO1xyXG4gICAgcmV0dXJuIHN1cGVyLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGdvVG8oaW5kZXgpIHtcclxuICAgIHRoaXMuZGlyID0gaW5kZXggPiB0aGlzLmluZGV4ID8gJ25leHQnIDogJ3ByZXYnO1xyXG4gICAgcmV0dXJuIHN1cGVyLmdvVG8oaW5kZXgpO1xyXG4gIH1cclxuXHJcbn1cblxuZnVuY3Rpb24gX21hcCh3aGF0LCBjYWxsYmFjaykge1xyXG4gICAgaWYgKHR5cGVvZiB3aGF0ID09PSAnc3RyaW5nJykgd2hhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwod2hhdCk7XHJcbiAgICBpZiAoISh3aGF0IGluc3RhbmNlb2YgQXJyYXkpKSB3aGF0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwod2hhdCk7XHJcbiAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikgd2hhdCA9IHdoYXQubWFwKHcgPT4gY2FsbGJhY2sodykpO1xyXG4gICAgcmV0dXJuIHdoYXQ7XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZWwsIGF0dHJzKSB7XHJcbiAgXHJcbiAgICBmdW5jdGlvbiBlbGVtZW50KGVsLCBhdHRycykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpO1xyXG4gICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgTm9kZSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoYXR0cnMpIGV4dGVuZChlbCwgYXR0cnMpO1xyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH1cclxuICBcclxuICAgIGZ1bmN0aW9uIGV4dGVuZChvYmosIHByb3BzKSB7XHJcbiAgICAgICAgY29uc3QgZXh0ZW5kZXJzID0ge1xyXG4gICAgICAgICAgICBzdHlsZTogZnVuY3Rpb24gKHN0eWxlcykge1xyXG4gICAgICAgICAgICAgICAgZXh0ZW5kKG9iai5zdHlsZSwgc3R5bGVzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YXNldDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gZGF0YSkgb2JqLnNldEF0dHJpYnV0ZSgnZGF0YS0nICsgbmFtZSwgZGF0YVtuYW1lXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV2ZW50czogZnVuY3Rpb24gKGNhbGxiYWNrcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBjYWxsYmFja3MpIG9iai5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGNhbGxiYWNrc1tuYW1lXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBmdW5jdGlvbiAoa2lkcykge1xyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChraWRzLCBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5hcHBlbmRDaGlsZChrKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIChleHRlbmRlcnNbbmFtZV0gfHwgZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgb2JqW25hbWVdID0gdmFsO1xyXG4gICAgICAgICAgICB9KShwcm9wc1tuYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgcmV0dXJuIGVsZW1lbnQoZWwsIGF0dHJzKTtcclxuICBcclxuICB9XG5cbmNsYXNzIExpZ2h0Ym94IHtcclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LWNvbnRhaW5lcicpIHx8IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtY29udGFpbmVyJyxcclxuICAgICAgICAgICAgZGF0YXNldDoge1xyXG4gICAgICAgICAgICAgICAgbW9kYWw6ICcnLFxyXG4gICAgICAgICAgICAgICAgZ3JpZDogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnByZXYpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMud3JhcHBlcik7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5uZXh0KTtcclxuICAgICAgICAvL3RoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VCdXR0b24pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5wYXJlbnRFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xyXG5cclxuICAgICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUJ1dHRvbik7XHJcbiAgICAgICAgdGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMuaW1nKTtcclxuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGltZywgaSkgPT4ge1xyXG4gICAgICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coaSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IHdyYXBwZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC13cmFwcGVyJykgfHwgY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC13cmFwcGVyJyxcclxuICAgICAgICAgICAgZGF0YXNldDoge1xyXG4gICAgICAgICAgICAgICAgY2VsbDogJ3NocmluaycsXHJcbiAgICAgICAgICAgICAgICBncmlkOiAnY29sdW1uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGdldCBwcmV2KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtcHJldicpIHx8IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtcHJldicsXHJcbiAgICAgICAgICAgIGlubmVySFRNTDogJzxzdmcgeG1sbnM9XCJodHRwczovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Ym94PVwiMCAwIDEyOSAxMjlcIj48cGF0aCBkPVwiTTg4LjYgMTIxLjNjLjguOCAxLjggMS4yIDIuOSAxLjJzMi4xLS40IDIuOS0xLjJjMS42LTEuNiAxLjYtNC4yIDAtNS44bC01MS01MSA1MS01MWMxLjYtMS42IDEuNi00LjIgMC01LjhzLTQuMi0xLjYtNS44IDBsLTU0IDUzLjljLTEuNiAxLjYtMS42IDQuMiAwIDUuOGw1NCA1My45elwiIC8+PC9zdmc+JyxcclxuICAgICAgICAgICAgZGF0YXNldDoge1xyXG4gICAgICAgICAgICAgICAgYnRuOiAnbGluaydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXZlbnRzOiB7XHJcbiAgICAgICAgICAgICAgICBjbGljazogKCkgPT4gdGhpcy5nb1ByZXYoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQgbmV4dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LW5leHQnKSB8fCBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LW5leHQnLFxyXG4gICAgICAgICAgICBpbm5lckhUTUw6ICc8c3ZnIHhtbG5zPVwiaHR0cHM6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld2JveD1cIjAgMCAxMjkgMTI5XCI+PHBhdGggZD1cIk00MC40IDEyMS4zYy0uOC44LTEuOCAxLjItMi45IDEuMnMtMi4xLS40LTIuOS0xLjJjLTEuNi0xLjYtMS42LTQuMiAwLTUuOGw1MS01MS01MS01MWMtMS42LTEuNi0xLjYtNC4yIDAtNS44IDEuNi0xLjYgNC4yLTEuNiA1LjggMGw1My45IDUzLjljMS42IDEuNiAxLjYgNC4yIDAgNS44bC01My45IDUzLjl6XCIgLz48L3N2Zz4nLFxyXG4gICAgICAgICAgICBkYXRhc2V0OiB7XHJcbiAgICAgICAgICAgICAgICBidG46ICdsaW5rJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLmdvTmV4dCgpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQgY2xvc2VCdXR0b24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1jbG9zZScpIHx8IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtY2xvc2UnLFxyXG4gICAgICAgICAgICBpbm5lckhUTUw6ICc8c3ZnIHhtbG5zPVwiaHR0cHM6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld2JveD1cIjAgMCA1MTIgNTEyXCI+PHBhdGggZmlsbD1cIiNmZmZcIiBkPVwiTTUwNS45NDMgNi4wNThjLTguMDc3LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDkgMEw2LjA1OCA0NzYuNjkzYy04LjA3NyA4LjA3Ny04LjA3NyAyMS4xNzIgMCAyOS4yNDlBMjAuNjEyIDIwLjYxMiAwIDAgMCAyMC42ODMgNTEyYTIwLjYxNCAyMC42MTQgMCAwIDAgMTQuNjI1LTYuMDU5TDUwNS45NDMgMzUuMzA2YzguMDc2LTguMDc2IDguMDc2LTIxLjE3MSAwLTI5LjI0OHpcIi8+PHBhdGggZmlsbD1cIiNmZmZcIiBkPVwiTTUwNS45NDIgNDc2LjY5NEwzNS4zMDYgNi4wNTljLTguMDc2LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDggMC04LjA3NyA4LjA3Ni04LjA3NyAyMS4xNzEgMCAyOS4yNDhsNDcwLjYzNiA0NzAuNjM2YTIwLjYxNiAyMC42MTYgMCAwIDAgMTQuNjI1IDYuMDU4IDIwLjYxNSAyMC42MTUgMCAwIDAgMTQuNjI0LTYuMDU3YzguMDc1LTguMDc4IDguMDc1LTIxLjE3My0uMDAxLTI5LjI1elwiLz48L3N2Zz4nLFxyXG4gICAgICAgICAgICBkYXRhc2V0OiB7XHJcbiAgICAgICAgICAgICAgICBidG46ICdsaW5rJyxcclxuICAgICAgICAgICAgICAgIGNlbGw6ICdzaHJpbmsgZW5kJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLmNsb3NlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGl0ZW1zKCkge1xyXG4gICAgICAgIHZhciBkb21Ob2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZWxlY3Rvcik7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvbU5vZGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaW1nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LWltZycpIHx8IGNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtaW1nJyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RhcmdldCcpO1xyXG4gICAgfVxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgndGFyZ2V0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdyhpbmRleCkge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgICAgICBjb25zdCBpbWcgPSB0aGlzLml0ZW1zW2luZGV4XTtcclxuICAgICAgICBjb25zdCBzcmMgPSBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLWxpZ2h0Ym94JykgPyBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLWxpZ2h0Ym94JykgOiBpbWcuc3JjO1xyXG4gICAgICAgIHRoaXMuaW1nLnNyYyA9IHNyYztcclxuICAgICAgICB0aGlzLm9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBnb1ByZXYoKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleCAtIDE7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93KGluZGV4KTtcclxuICAgIH1cclxuICAgIGdvTmV4dCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4ICsgMTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy5pdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2hvdyhpbmRleCk7XHJcbiAgICB9XHJcbn1cblxuY29uc3Qgc2xpZGVyT3B0aW9ucyA9IHtcclxuICAgIGF1dG9wbGF5OiBzbGlkZXIgPT4ge1xyXG4gICAgICBzbGlkZXJcclxuICAgICAgICAucGxheSgpXHJcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCAoKSA9PiBzbGlkZXIucGF1c2UoKSlcclxuICAgICAgICAub24oJ21vdXNlb3V0JywgKCkgPT4gc2xpZGVyLnBsYXkoKSk7XHJcbiAgICB9XHJcbiAgfTtcclxuZnVuY3Rpb24gY29uZmlnU2xpZGVyKHNsaWRlciwgcGFyZW50KSB7XHJcbiAgICBjb25zdCBmaXJzdCA9IHBhcmVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlyc3QnKSB8IDA7XHJcbiAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgc2xpZGVyLmdvVG8oZmlyc3QpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHBhcmVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtb3B0aW9ucycpID8gcGFyZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1vcHRpb25zJykuc3BsaXQoJyAnKSA6IFtdO1xyXG4gICAgb3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiBzbGlkZXJPcHRpb25zW29wdGlvbl0gJiYgc2xpZGVyT3B0aW9uc1tvcHRpb25dKHNsaWRlcikpO1xyXG4gIFxyXG4gICAgY29uc3Qgc2xpZGVyQ2FsbGJhY2tzID0ge1xyXG4gICAgICBvcGVuT25Nb2JpbGU6ICgpID0+IHtcclxuICAgICAgICBpZiAoc2NyZWVuKCkud2lkdGggPiA2MDApIHJldHVybjtcclxuICAgICAgICBjb25zdCBmaXJzdCA9IHNsaWRlci5maW5kKHNsaWRlID0+IHNsaWRlLmdldEF0dHJpYnV0ZSgnZGF0YS1vcmRlcicpID09PSAnMCcpO1xyXG4gICAgICAgIGlmICghZmlyc3QpIHJldHVybjtcclxuICAgICAgICBjb25zdCBidG4gPSBmaXJzdC5xdWVyeVNlbGVjdG9yKCcuaW5mby1pbWcgYVtocmVmXj1cImphdmFzY3JpcHQ6XCJdJyk7XHJcbiAgICAgICAgaWYgKCFidG4pIHJldHVybjtcclxuICAgICAgICBidG4uY2xpY2soKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICBcclxuICAgIF9tYXAoJ1tkYXRhLWNvbnRyb2xdJywgY29udHJvbCA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGNvbnRyb2wuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbnRyb2wnKTtcclxuICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IHRhcmdldCA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KSA6IG51bGw7XHJcbiAgXHJcbiAgICAgIGlmICh0YXJnZXRFbGVtZW50ICYmIHRhcmdldEVsZW1lbnQgPT09IHNsaWRlci5wYXJlbnQpIHtcclxuICAgICAgICBjb25zdCBhY3Rpb24gPSBjb250cm9sLmdldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nKTtcclxuICAgICAgICBpZiAoKGFjdGlvbiA9PT0gJ3ByZXYnIHx8IGFjdGlvbiA9PT0gJ25leHQnKSAmJiAoc2xpZGVyLnNpemUgPj0gc2xpZGVyLmxlbmd0aCkpIHtcclxuICAgICAgICAgIGNvbnRyb2wuc2V0QXR0cmlidXRlKCdkYXRhLW92ZXJzaXplJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFjdGlvbkRhdGEgPSBjb250cm9sLmdldEF0dHJpYnV0ZSgnZGF0YS1wYXJhbXMnKTtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBhY3Rpb25EYXRhID8gYWN0aW9uRGF0YS5zcGxpdCgnLCcpIDogbnVsbDtcclxuICAgICAgICBjb25zdCBjYWxsYmFjayA9IGNvbnRyb2wuZ2V0QXR0cmlidXRlKCdkYXRhLWNhbGxiYWNrJyk7XHJcbiAgICAgICAgaWYgKGFjdGlvbiAmJiBzbGlkZXJbYWN0aW9uXSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICBjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzbGlkZXJbYWN0aW9uXS5hcHBseShzbGlkZXIsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBzbGlkZXJDYWxsYmFja3NbY2FsbGJhY2tdKSBzbGlkZXJDYWxsYmFja3NbY2FsbGJhY2tdKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cblxuY29uc3QgbWFzY2FyYXMgPSB7XHJcblxyXG4gICAgbm9tZTogKGNhbXBvKSA9PiB7XHJcbiAgICAgICAgaWYgKC9eW15hLXpBLVpdKy8udGVzdChjYW1wby52YWx1ZSkpIGNhbXBvLnZhbHVlID0gJyc7XHJcbiAgICAgICAgY29uc3QgcmVncmEgPSAvWy0nYS16QS1aw4Atw5bDmC3DtsO4LcW/IF0rL2dpO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yZXMgPSBjYW1wby52YWx1ZS5tYXRjaChyZWdyYSk7XHJcbiAgICAgICAgaWYgKHZhbG9yZXMpIGNhbXBvLnZhbHVlID0gdmFsb3Jlcy5qb2luKCcnKS5yZXBsYWNlKC8gKy9naSwgJyAnKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2VwOiAoY2FtcG8pID0+IHtcclxuICAgICAgICBjb25zdCByZWdyYXMgPSBbL1xcZCsvZ2ksIC9eKFxcZHs1fSktPyhcXGR7MSwzfSkvXTtcclxuICAgICAgICBjb25zdCB2YWxvcmVzID0gY2FtcG8udmFsdWUubWF0Y2gocmVncmFzWzBdKTtcclxuICAgICAgICBpZiAoIXZhbG9yZXMpIHJldHVybiBjYW1wby52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGNhbXBvLnZhbHVlID0gdmFsb3Jlcy5qb2luKCcnKTtcclxuICAgICAgICBpZiAocmVncmFzWzFdLnRlc3QoY2FtcG8udmFsdWUpKSBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnJlcGxhY2UocmVncmFzWzFdLCAnJDEtJDInKTtcclxuICAgICAgICBpZiAoY2FtcG8udmFsdWUubGVuZ3RoID4gOSkgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS5zdWJzdHIoMCwgOSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRlbGVmb25lOiAoY2FtcG8pID0+IHtcclxuICAgICAgICBjb25zdCByZWdyYXMgPSBbL1xcZCsvZ2ksIC9eKFxcZFxcZD8pLywgL14oXFxkXFxkKShcXGR7NH0pLT8oXFxkezEsNH0pLywgL14oXFxkXFxkKShcXGR7NX0pLT8oXFxkezEsNH0pL107XHJcbiAgICAgICAgY29uc3QgdmFsb3JlcyA9IGNhbXBvLnZhbHVlLm1hdGNoKHJlZ3Jhc1swXSk7XHJcbiAgICAgICAgaWYgKCF2YWxvcmVzKSByZXR1cm4gY2FtcG8udmFsdWUgPSAnJztcclxuICAgICAgICBjb25zdCB2YWxvciA9IGNhbXBvLnZhbHVlID0gdmFsb3Jlcy5qb2luKCcnKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gMCkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1sxXSwgJygkMScpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAyKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzFdLCAnKCQxKSAnKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gNikgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1syXSwgJygkMSkgJDItJDMnKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gMTApIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbM10sICcoJDEpICQyLSQzJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDExKSBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnN1YnN0cigwLCAxNSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJnOiAoY2FtcG8pID0+IHtcclxuICAgICAgICBjb25zdCByZWdyYXMgPSBbL1xcZCsvZ2ksIC9eKFxcZHsxLDJ9KS8sIC9eKFxcZHsxLDJ9KVxcLj8oXFxkezN9KS8sIC9eKFxcZHsxLDJ9KVxcLj8oXFxkezN9KVxcLj8oXFxkezN9KS8sIC9eKFxcZHsxLDJ9KVxcLj8oXFxkezN9KVxcLj8oXFxkezN9KS0/KFxcZCk/L107XHJcbiAgICAgICAgY29uc3QgdmFsb3JlcyA9IGNhbXBvLnZhbHVlLm1hdGNoKHJlZ3Jhc1swXSk7XHJcbiAgICAgICAgY29uc3QgbGV0cmFzID0gY2FtcG8udmFsdWUubWF0Y2goL1thLXpBLVpdKyQvZ2kpO1xyXG4gICAgICAgIGNvbnN0IGRpZ2l0byA9IGxldHJhcyA/IGxldHJhc1swXVswXSA6ICcnO1xyXG4gICAgICAgIGlmICghdmFsb3JlcykgcmV0dXJuIGNhbXBvLnZhbHVlID0gJyc7XHJcbiAgICAgICAgY29uc3QgdmFsb3IgPSBjYW1wby52YWx1ZSA9IHZhbG9yZXMuam9pbignJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDIpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbMV0sICckMS4nKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gNSkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1syXSwgJyQxLiQyLicpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA3KSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzNdLCAnJDEuJDIuJDMnKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID09PSA4ICYmIGRpZ2l0bykgY2FtcG8udmFsdWUgKz0gJy0nICsgZGlnaXRvLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDgpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbNF0sICckMS4kMi4kMy0kNCcpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA5KSBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnN1YnN0cigwLCAxMik7XHJcbiAgICB9LFxyXG5cclxuICAgIGNwZmNucGo6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bWVyb3MgPSAvXFxkKy9naTtcclxuICAgICAgICBjb25zdCB2YWxvcmVzID0gY2FtcG8udmFsdWUubWF0Y2gobnVtZXJvcyk7XHJcbiAgICAgICAgaWYgKCF2YWxvcmVzKSByZXR1cm4gY2FtcG8udmFsdWUgPSAnJztcclxuICAgICAgICBjb25zdCB2YWxvciA9IHZhbG9yZXMuam9pbignJyk7XHJcbiAgICAgICAgY29uc3QgY3BmID0gL14oWzAtOV17MSwzfSk/XFwuPyhbMC05XXsxLDN9KT9cXC4/KFswLTldezEsM30pP1xcLT8oWzAtOV17MSwyfSk/JC87XHJcbiAgICAgICAgY29uc3QgY25waiA9IC9eKFswLTldezEsMn0pP1xcLj8oWzAtOV17MSwzfSk/XFwuPyhbMC05XXsxLDN9KT9cXC8/KFswLTldezEsNH0pP1xcLT8oWzAtOV17MSwyfSk/JC87XHJcbiAgICAgICAgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS5yZXBsYWNlKC9bXlxcZC5cXC8tXS9naSwgJycpO1xyXG4gICAgICAgIGlmIChjcGYudGVzdCh2YWxvcikpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShjcGYsIChhbGwsIGEsIGIsIGMsIGQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChhIHx8ICcnKSArIChiID8gJy4nICsgYiA6ICcnKSArIChjID8gJy4nICsgYyA6ICcnKSArIChkID8gJy0nICsgZCA6ICcnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBlbHNlIGlmIChjbnBqLnRlc3QodmFsb3IpKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UoY25waiwgKGFsbCwgYSwgYiwgYywgZCwgZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKGEgfHwgJycpICsgKGIgPyAnLicgKyBiIDogJycpICsgKGMgPyAnLicgKyBjIDogJycpICsgKGQgPyAnLycgKyBkIDogJycpICsgKGUgPyAnLScgKyBlIDogJycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjYW1wby52YWx1ZS5sZW5ndGggPiAxOCkgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS5zdWJzdHIoMCwgMTgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBkYXRhOiAoY2FtcG8pID0+IHtcclxuICAgICAgICBpZiAoY2FtcG8udHlwZSA9PT0gJ2RhdGUnKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgbnVtZXJvcyA9IGNhbXBvLnZhbHVlLnJlcGxhY2UoL14wP1xcL3xbXlxcZFxcL10vZ2ksICcnKTtcclxuICAgICAgICBpZiAobnVtZXJvcyA9PT0gJycpIHtcclxuICAgICAgICAgICAgY2FtcG8udmFsdWUgPSBudW1lcm9zO1xyXG4gICAgICAgICAgICBjYW1wby5zdHlsZS5ib3JkZXJDb2xvciA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FtcG8udmFsdWUgPSBudW1lcm9zXHJcbiAgICAgICAgLnJlcGxhY2UoLyhefFxcLykwMCtcXC8/L2csICcwJylcclxuICAgICAgICAucmVwbGFjZSgvKF58XFwvKShbMS05XVxcLykvLCAnMCQyJylcclxuICAgICAgICAucmVwbGFjZShcclxuICAgICAgICAgICAgLyhcXGRcXGQpKFxcLz8pKFxcZHsxLDJ9KT8oXFwvPykwKihcXGR7MSw0fSk/LiovZyxcclxuICAgICAgICAgICAgZnVuY3Rpb24oYWxsLCBkZCwgczEsIG1tLCBzMiwgYWFhYSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRkID4gMzEgfHwgbW0gPiAxMikgY2FtcG8uc3R5bGUuYm9yZGVyQ29sb3IgPSAncmVkJztcclxuICAgICAgICAgICAgICAgIGVsc2UgY2FtcG8uc3R5bGUuYm9yZGVyQ29sb3IgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRkICsgKG1tID8gJy8nICsgbW0gOiBzMSB8fCAnJykgKyAoYWFhYSA/ICcvJyArIGFhYWEgOiBzMiB8fCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICBlbWFpbDogKGNhbXBvKSA9PiB7XHJcbiAgICAgICAgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZW5oYTogKGNhbXBvKSA9PiB7XHJcbiAgICAgICAgaWYgKGNhbXBvLnZhbHVlLmxlbmd0aCA+IDAgJiYgY2FtcG8udmFsdWUubGVuZ3RoIDwgNikgY2FtcG8uc3R5bGUuYm9yZGVyQ29sb3IgPSAncmVkJztcclxuICAgICAgICBlbHNlIGNhbXBvLnN0eWxlLmJvcmRlckNvbG9yID0gbnVsbDtcclxuICAgIH1cclxuXHJcbn07XG5cbmZ1bmN0aW9uIF9jcmVhdGVOb2RlKGVsZW1lbnQpe1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudClcclxufVxyXG5cclxuZnVuY3Rpb24gX2FwcGVuZChwYXJlbnQsIGVsKXtcclxuICAgIHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIF90b2dnbGVJdHNlbGYoYnRuLCBjb250ZW50KXsgICAgXHJcbiAgICBidG4gJiYgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgXHJcbiAgICAgIGlmKGNvbnRlbnQuaGFzQXR0cmlidXRlKCdoaWRkZW4nKSl7XHJcbiAgICAgICAgY29udGVudC5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2V7XHJcbiAgICAgICAgY29udGVudC5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcclxuICAgICAgfVxyXG4gICAgfSk7ICAgIFxyXG59XG5cbi8vIC0tLS0tLSBUQUJTIC0tLS0tLVxyXG5jb25zdCBhbGxUYXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFyZ2V0XScpO1xyXG5jb25zdCBsaW5rcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFsbFRhcmdldHMpO1xyXG5cclxubGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluayl7XHJcbiAgY29uc3QgbGlua1RhcmdldCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpO1xyXG4gIGNvbnN0IGFsbFRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJdJyk7XHJcblxyXG4gIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgdGFyZ2V0cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFsbFRhYnMpOyAgICAgIFxyXG4gICAgdGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpe1xyXG4gICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XHJcblxyXG4gICAgICBpZihsaW5rVGFyZ2V0ID09PSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpKXtcclxuICAgICAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuICAgICAgICBsaW5rcy5mb3JFYWNoKGJ0biA9PntcclxuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcblxyXG4vLyAtLS0tLS0gQ1JFQVRFIEVMRU1FTlQgLS0tLS0tXHJcbmNvbnN0IGJ0bkNyZWF0ZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3JlYXRlXScpO1xyXG5idG5DcmVhdGVFbCAmJiBidG5DcmVhdGVFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgY29uc3QgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcz1cInBvc3QtY29udGVudFwiXScpO1xyXG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3TGlzdCk7XHJcbiAgbmV3TGlzdC5pbm5lckhUTUwgPSAnPGxpPnRlc3RlMTwvbGk+PGxpPnRlc3RlMjwvbGk+JztcclxufSk7XHJcblxyXG4vLyAtLS0tLS0gU1VNUkVEVUNFUiBXSVRIIEZMQVQgLS0tLS0tXHJcbmZ1bmN0aW9uIHN1bVJlZHVjZXIoKSB7XHJcbiAgLy9jb252ZXJ0ZXIgYXJndW1lbnRzIGVtIGFycmF5XHJcbiAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgLy8gYWNoYXRhciBhcmdzXHJcbiAgY29uc3QgZmxhdEFyZ3MgPSBhcmdzLmZsYXQoSW5maW5pdHkpO1xyXG4gIC8vZmlsdGFyIG7Dum1lcm9zXHJcbiAgY29uc3QgbnVtYmVyQXJncyA9IGZsYXRBcmdzLmZpbHRlcihuID0+IHR5cGVvZiBuID09PSAnbnVtYmVyJyk7XHJcbiAgLy8gc29tYXJcclxuICByZXR1cm4gbnVtYmVyQXJncy5yZWR1Y2UoKHN1bSwgbikgPT4gc3VtICsgbiwgMCk7XHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uIGZsYXR0ZW5EZWVwKGFycjEpe1xyXG4vLyAgIHJldHVybiBhcnIxLnJlZHVjZSgoYWNjLCB2YWwpID0+IEFycmF5LmlzQXJyYXkodmFsKSA/IGFjYy5jb25jYXQoZmxhdHRlbkRlZXAodmFsKSkgOiBhY2MuY29uY2F0KHZhbCksIFtdKTtcclxuLy8gfVxyXG5cclxuY29uc3QgcmVzdWx0ID0gc3VtUmVkdWNlcihbMCwgMywgN10sIFtudWxsLCAnZW1hIHdhdHNvbicsIDgyXSwgNSwgW1szLCAwXSwgWzFdLCBudWxsXSwgW10pO1xyXG5cclxuY29uc3QgcmVzdWx0U3VtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc3VtXScpO1xyXG5yZXN1bHRTdW0gJiYgcmVzdWx0U3VtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICBjb25zdCBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzPVwicG9zdC1jb250ZW50XCJdJyk7XHJcbiAgY29udGVudC5hcHBlbmRDaGlsZChuZXdEaXYpO1xyXG4gIG5ld0Rpdi5pbm5lckhUTUwgPSBgJHtyZXN1bHR9YDtcclxufSk7XHJcblxyXG4vLyAtLS0tLS0gRkVUQ0ggLS0tLS0tXHJcbi8vIGZ1bmN0aW9uIGNyZWF0ZU5vZGUoZWxlbWVudCl7XHJcbi8vICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7IC8vIENyZWF0ZSB0aGUgdHlwZSBvZiBlbGVtZW50IHlvdSBwYXNzIGluIHRoZSBwYXJhbWV0ZXJzXHJcbi8vIH1cclxuXHJcbi8vIGZ1bmN0aW9uIGFwcGVuZChwYXJlbnQsIGVsKXtcclxuLy8gICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGVsKTsgLy8gQXBwZW5kIHRoZSBzZWNvbmQgcGFyYW1ldGVyKGVsZW1lbnQpIHRvIHRoZSBmaXJzdCBvbmVcclxuLy8gfVxyXG5cclxuY29uc3QgZ3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdXRob3JzJyk7IC8vIEdldCB0aGUgbGlzdCB3aGVyZSB3ZSB3aWxsIHBsYWNlIG91ciBhdXRob3JzXHJcbmNvbnN0IHVybCA9ICdodHRwczovL3JhbmRvbXVzZXIubWUvYXBpLz9yZXN1bHRzPTEwJzsgLy8gR2V0IDEwIHJhbmRvbSB1c2Vyc1xyXG5cclxuZmV0Y2godXJsKSAvLyBDYWxsIHRoZSBmZXRjaCBmdW5jdGlvbiBwYXNzaW5nIHRoZSB1cmwgb2YgdGhlIEFQSSBhcyBhIHBhcmFtZXRlclxyXG4udGhlbigocmVzcCk9PiByZXNwLmpzb24oKSkgLy8gVHJhbnNmb3JtIHRoZSBkYXRhIGludG8gSlNPTlxyXG4udGhlbihmdW5jdGlvbihkYXRhKXtcclxuICAvLyBZb3VyIGNvZGUgZm9yIGhhbmRsaW5nIHRoZSBkYXRhIHlvdSBnZXQgZnJvbSB0aGUgQVBJXHJcbiAgLy8gQ3JlYXRlIGFuZCBhcHBlbmQgdGhlIGxpJ3MgdG8gdGhlIHVsXHJcbiAgbGV0IGF1dGhvcnMgPSBkYXRhLnJlc3VsdHM7IC8vIEdldCB0aGUgcmVzdWx0c1xyXG4gIHJldHVybiBhdXRob3JzLm1hcChmdW5jdGlvbihhdXRob3Ipe1xyXG4gICAgbGV0IGRpdiA9IF9jcmVhdGVOb2RlKCdkaXYnKSwgLy8gQ3JlYXRlIHRoZSBlbGVtZW50cyB3ZSBuZWVkXHJcbiAgICAgICAgaW1nID0gX2NyZWF0ZU5vZGUoJ2ltZycpLFxyXG4gICAgICAgIHAgPSBfY3JlYXRlTm9kZSgncCcpO1xyXG4gICAgaW1nLnNyYyA9IGF1dGhvci5waWN0dXJlLm1lZGl1bTsgXHJcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWNlbGwnLCAnc2hyaW5rJyk7XHJcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLXRleHQnLCAnY2VudGVyJyk7XHJcbiAgICAvLyBBZGQgdGhlIHNvdXJjZSBvZiB0aGUgaW1hZ2UgdG8gYmUgdGhlIHNyYyBvZiB0aGUgaW1nIGVsZW1lbnRcclxuICAgIHAuaW5uZXJIVE1MID0gYCR7YXV0aG9yLm5hbWUuZmlyc3R9ICR7YXV0aG9yLm5hbWUubGFzdH1gOyBcclxuICAgIC8vIE1ha2UgdGhlIEhUTUwgb2Ygb3VyIHAgdG8gYmUgdGhlIGZpcnN0IGFuZCBsYXN0IG5hbWUgb2Ygb3VyIGF1dGhvclxyXG4gICAgX2FwcGVuZChkaXYsIGltZyk7IC8vIEFwcGVuZCBhbGwgb3VyIGVsZW1lbnRzXHJcbiAgICBfYXBwZW5kKGRpdiwgcCk7XHJcbiAgICBfYXBwZW5kKGdyaWQsIGRpdik7XHJcbiAgfSlcclxufSlcclxuLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbn0pO1xyXG5cclxuLy8gLS0tLS0tIFNMSURFUiBXSVRIIExJR0hUQk9YIC0tLS0tLVxyXG53aW5kb3cuc2xpZGVycyA9IF9tYXAoJy5zbGlkZXInLCBwYXJlbnQgPT4ge1xyXG4gIGNvbnN0IHNsaWRlciA9IG5ldyBTbGlkZXIoe1xyXG4gICAgcGFyZW50XHJcbiAgfSk7XHJcbiAgY29uZmlnU2xpZGVyKHNsaWRlciwgcGFyZW50KTtcclxufSk7XHJcblxyXG53aW5kb3cuY2Fyb3VzZWxzID0gX21hcCgnLmNhcm91c2VsJywgcGFyZW50ID0+IHtcclxuICBjb25zdCBzaXplID0gcGFyZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zaXplJykgfCAwO1xyXG4gIGNvbnN0IGNhcm91c2VsID0gbmV3IENhcm91c2VsKHtcclxuICAgIHBhcmVudCxcclxuICAgIHNpemVcclxuICB9KTtcclxuICBjb25maWdTbGlkZXIoY2Fyb3VzZWwsIHBhcmVudCk7XHJcbiAgcmV0dXJuIGNhcm91c2VsO1xyXG59KTtcclxuXHJcbnZhciBsaWdodGJveCA9IG5ldyBMaWdodGJveChcIltkYXRhLWxpZ2h0Ym94XVwiKTtcclxuXHJcbi8vIC0tLS0tLSBNQVNLUyAtLS0tLS1cclxuY29uc3QgZWFjaCA9IChpLCBmKSA9PiBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGksIGYpO1xyXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpO1xyXG5cclxuaWYgKGZvcm0ubGVuZ3RoKSBlYWNoKGZvcm0sIEZvcm1NYXNrKTtcclxuZnVuY3Rpb24gRm9ybU1hc2soZikge1xyXG4gIChBcnJheS5mcm9tKGYuZWxlbWVudHMpKVxyXG4gICAgICAuZmlsdGVyKGVsID0+IGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1tYXNrJykpXHJcbiAgICAgIC5mb3JFYWNoKGNhbXBvID0+IGNhbXBvLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IG1ldG9kbyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLW1hc2snKTtcclxuICAgICAgICBpZiAoIW1hc2NhcmFzW21ldG9kb10pIHJldHVybiBjb25zb2xlLmxvZyhgQSBtw6FzY2FyYSBkbyB0aXBvIFwiJHttZXRvZG99XCIgbsOjbyBmb2kgZGVmaW5pZGEuYCk7XHJcblxyXG4gICAgICAgIG1hc2NhcmFzW21ldG9kb10odGhpcyk7XHJcbiAgfSkpO1xyXG59XHJcblxyXG4vLyAtLS0tLS0gQ1JVRCBXSVRIIEpTIC0tLS0tLVxyXG5jb25zdCBub21lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vbWUnKTtcclxuY29uc3QgcGsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3BmY25waicpO1xyXG5jb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpO1xyXG5cclxuZnVuY3Rpb24gbWFrZU9iaigpe1xyXG4gIHJldHVybiB7XHJcbiAgICBub21lOiBub21lLnZhbHVlLFxyXG4gICAgY3BmOiBway52YWx1ZSxcclxuICAgIGVtYWlsOiBlbWFpbC52YWx1ZVxyXG4gIH1cclxufVxyXG5cclxubGV0IGFycmF5ID0gW107XHJcbmNvbnN0IGNsZWFyRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0LWZvcm0nKTtcclxuY29uc3QgYnRuRW52aWFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVudmlhcicpO1xyXG5jb25zdCBidG5EZWxldGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0YXInKTtcclxuXHJcbmJ0bkVudmlhciAmJiBidG5FbnZpYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gIGlmKG5vbWUudmFsdWUhPW51bGwsIG5vbWUudmFsdWUhPVwiXCIgJiYgcGsudmFsdWUhPW51bGwsIHBrLnZhbHVlIT1cIlwiICYmIGVtYWlsLnZhbHVlIT1udWxsLCBlbWFpbC52YWx1ZSE9XCJcIil7XHJcbiAgICBsZXQgaW5kZXhBcnJheSA9IGFycmF5LmZpbmRJbmRleChlbGVtID0+IHtcclxuICAgICAgcmV0dXJuIGVsZW0uY3BmPT09cGsudmFsdWVcclxuICAgIH0pO1xyXG4gICAgaWYoaW5kZXhBcnJheSA+IC0xKXtcclxuICAgICAgYXJyYXlbaW5kZXhBcnJheV0gPSBtYWtlT2JqKCk7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBhcnJheS5wdXNoKG1ha2VPYmooKSk7XHJcbiAgICB9XHJcbiAgICB0cmFuc2Zvcm1UZXh0KGFycmF5KTtcclxuICAgIGNsZWFyRm9ybS5yZXNldCgpO1xyXG4gIH1cclxuICBlbHNle1xyXG4gICAgYWxlcnQoJ1ByZWVuY2hhIHRvZG9zIG9zIGNhbXBvcyEnKTtcclxuICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gdHJhbnNmb3JtVGV4dChhcnJheSl7XHJcbiAgLy8gY29uc3Qgb2JqZWN0VGV4dCA9IEpTT04uc3RyaW5naWZ5KHthcnJheX0sIG51bGwsIFwiIFwiKVxyXG4gIC8vIGNvbnN0IGRhdGFDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0c19kaXNwbGF5Jyk7XHJcbiAgLy8gZGF0YUNvbnRhaW5lci50ZXh0Q29udGVudCA9IG9iamVjdFRleHQ7XHJcbiAgY29uc3Qgb2JqZWN0VGV4dCA9IGFycmF5LnJlZHVjZSgoYWNjLCBpdGVtLCBpbmRleCkgPT57XHJcbiAgICBhY2MrPSBgPHVsPjxsaT4ke2l0ZW0ubm9tZX08L2xpPjxsaT4ke2l0ZW0uY3BmfTwvbGk+PGxpPiR7aXRlbS5lbWFpbH08L2xpPjwvdWw+YDtcclxuICAgIHJldHVybiBhY2NcclxuICB9LCAnJyk7XHJcbiAgY29uc3QgZGF0YUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzX2Rpc3BsYXknKTtcclxuICBkYXRhQ29udGFpbmVyLmlubmVySFRNTCA9IG9iamVjdFRleHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFycmF5UmVtb3ZlKGFyciwgdmFsdWUpeyAvL3JldG9ybmEgdG9kb3Mgb3MgZWxlbWVudG9zIGRvIGFycmF5IG1lbm9zIG8gcXVlIHZvY8OqIHBhc3NhclxyXG4gIHJldHVybiBhcnIuZmlsdGVyKChlbGUsIGluZGV4KSA9PiB7cmV0dXJuIGluZGV4ICE9IHZhbHVlfSlcclxufVxyXG5cclxuYnRuRGVsZXRhciAmJiBidG5EZWxldGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XHJcbiAgbGV0IGluZGV4QXJyYXkgPSBhcnJheS5maW5kSW5kZXgoZWxlbSA9PiB7XHJcbiAgICByZXR1cm4gZWxlbS5jcGYgPT09IHBrLnZhbHVlXHJcbiAgfSk7XHJcblxyXG4gIGlmKGluZGV4QXJyYXkgPiAtMSl7XHJcbiAgICBhcnJheSA9IGFycmF5UmVtb3ZlKGFycmF5LCBpbmRleEFycmF5KTtcclxuICB9XHJcbiAgdHJhbnNmb3JtVGV4dChhcnJheSk7XHJcbiAgY2xlYXJGb3JtLnJlc2V0KCk7XHJcbn0pO1xyXG5cclxuLy8gLS0tLS0tVE9HR0xFIEJVVFRPTi0tLS0tLVxyXG4vLyBjb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b2dnbGVdJyk7XHJcbi8vIGNvbnN0IHRvZ2dsZUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb250ZW50XScpO1xyXG5cclxuLy8gdG9nZ2xlQnRuICYmIHRvZ2dsZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcblxyXG4vLyAgIGlmKHRvZ2dsZUNvbnRlbnQuaGFzQXR0cmlidXRlKCdoaWRkZW4nKSl7XHJcbi8vICAgICB0b2dnbGVDb250ZW50LnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJylcclxuLy8gICB9XHJcbi8vICAgZWxzZXtcclxuLy8gICAgIHRvZ2dsZUNvbnRlbnQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJylcclxuLy8gICB9XHJcbi8vIH0pXHJcbl90b2dnbGVJdHNlbGYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdG9nZ2xlXScpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb250ZW50XScpKTtcclxuXHJcbi8vIC0tLS0tLSBNQVAgQU5EIEZJTFRFUiAtLS0tLS1cclxubGV0IGRhdGEgPSBbXHJcbiAge1xyXG4gICAgbmFtZTogJ0J1dHRlcnMnLFxyXG4gICAgYWdlOiAzLFxyXG4gICAgdHlwZTogJ2RvZydcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdMaXp6eScsXHJcbiAgICBhZ2U6IDYsXHJcbiAgICB0eXBlOiAnZG9nJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ1JlZCcsXHJcbiAgICBhZ2U6IDEsXHJcbiAgICB0eXBlOiAnY2F0J1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ0pvZXknLFxyXG4gICAgYWdlOiAzLFxyXG4gICAgdHlwZTogJ2RvZydcclxuICB9XHJcbl07XHJcblxyXG5sZXQgZG9ncyA9IGRhdGEuZmlsdGVyKChhbmltYWwpPT57XHJcbiAgcmV0dXJuIGFuaW1hbC50eXBlID09PSAnZG9nJ1xyXG59KTtcclxuXHJcbmRvZ3MubWFwKChhbmltYWwpPT57XHJcbiAgcmV0dXJuIGFuaW1hbC5hZ2UgKj0gN1xyXG59KTtcclxuXHJcbmNvbnN0IGNhbGNBZ2UgPSBkb2dzLnJlZHVjZSgoc3VtLCBhbmltYWwpPT57XHJcbiAgcmV0dXJuIHN1bSArIGFuaW1hbC5hZ2VcclxufSwgMCk7XHJcblxyXG5jb25zb2xlLmxvZyhkb2dzKTtcclxuY29uc29sZS5sb2coY2FsY0FnZSk7XHJcblxyXG4vLyAtLS0tLS0gRklMVEVSIEZFVENIIFJFU1VMVFMgLS0tLS0tXHJcblxyXG5jb25zdCBkYXRhR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNoYXJhY3RlcnNdJyk7XHJcbmNvbnN0IGRhdGFHcmlkRmlsdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2hhcmFjdGVycy1maWx0ZXJdJyk7XHJcbmNvbnN0IHN3YXBpID0gJ2h0dHBzOi8vc3dhcGkuY28vYXBpL3Blb3BsZS8nO1xyXG5cclxuZmV0Y2goc3dhcGkpXHJcbi50aGVuKChyZXNwKT0+IHJlc3AuanNvbigpKVxyXG4udGhlbihmdW5jdGlvbihkYXRhKXtcclxuICBjb25zb2xlLmxvZyhkYXRhLnJlc3VsdHMpO1xyXG4gIGxldCBwZW9wbGUgPSBkYXRhLnJlc3VsdHM7XHJcbiAgY29uc3QgcGVvcGxlTWFwID0gcGVvcGxlLm1hcCgoaXRlbSk9PntcclxuICAgIGxldCBkaXYgPSBfY3JlYXRlTm9kZSgnZGl2JyksXHJcbiAgICAgICAgcCA9IF9jcmVhdGVOb2RlKCdwJyk7XHJcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWNlbGwnLCAnc2hyaW5rJyk7XHJcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLXRleHQnLCAnY2VudGVyJyk7XHJcbiAgICBwLmlubmVySFRNTCA9IGAke2l0ZW0ubmFtZX1gO1xyXG4gICAgX2FwcGVuZChkaXYsIHApO1xyXG4gICAgX2FwcGVuZChkYXRhR3JpZCwgZGl2KTtcclxuICB9KTsgIFxyXG5cclxuICBjb25zdCBwZW9wbGVGaWx0ZXIgPSBwZW9wbGUuZmlsdGVyKChpdGVtKT0+e1xyXG4gICAgcmV0dXJuIGl0ZW0uaGFpcl9jb2xvciA9PT0gJ2Jsb25kJztcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcGVvcGxlRmlsdGVyTWFwID0gcGVvcGxlRmlsdGVyLm1hcCgoaXRlbSk9PntcclxuICAgIGxldCBkaXYgPSBfY3JlYXRlTm9kZSgnZGl2JyksXHJcbiAgICAgICAgcCA9IF9jcmVhdGVOb2RlKCdwJyk7XHJcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWNlbGwnLCAnc2hyaW5rJyk7XHJcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLXRleHQnLCAnY2VudGVyJyk7XHJcbiAgICBwLmlubmVySFRNTCA9IGAke2l0ZW0ubmFtZX1gO1xyXG4gICAgX2FwcGVuZChkaXYsIHApO1xyXG4gICAgX2FwcGVuZChkYXRhR3JpZEZpbHRlciwgZGl2KTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtwZW9wbGVNYXAsIHBlb3BsZUZpbHRlck1hcH1cclxufSlcclxuLmNhdGNoKChlcnJvcik9PntcclxuICBjb25zb2xlLmxvZyhlcnJvcik7ICBcclxufSk7XG5cbn0oKSk7XG4iXX0=
