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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiU2xpZGVyIiwiY29uZmlnIiwidHlwZSIsInBhcmVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBhcmVudFNlbGVjdG9yIiwiY2hpbGRTZWxlY3RvciIsImNoaWxkcmVuIiwibGVuZ3RoIiwiaW5kZXgiLCJkdXJhdGlvbiIsImNsYXNzTGlzdCIsImFkZCIsImNvbXBvc2UiLCJmbiIsImZvckVhY2giLCJtYXAiLCJmaWx0ZXIiLCJmaW5kIiwibmV4dEluZGV4IiwicHJldkluZGV4IiwiZWwiLCJpIiwicmVtb3ZlIiwidGhhdCIsInBsYXlpbmdTdGF0ZUlEIiwic2V0SW50ZXJ2YWwiLCJuZXh0IiwiaXNQbGF5aW5nIiwiY2xlYXJJbnRlcnZhbCIsInBhdXNlIiwicGxheSIsInBsYXlpbmdTdGF0ZSIsImV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb2xsYXBzZWQiLCJjb25zb2xlIiwidGFibGUiLCJPYmplY3QiLCJrZXlzIiwicHJvcCIsImtleSIsInZhbHVlIiwibG9nIiwid2FybiIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsImdyb3VwRW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQ2Fyb3VzZWwiLCJzaXplIiwicG9zaXRpb24iLCJzbGlkZSIsIml0ZW1PcmRlciIsInNldEF0dHJpYnV0ZSIsImNsYXNzTmFtZSIsInN0eWxlIiwib3JkZXIiLCJkaXIiLCJhbmltQ2xhc3NOYW1lIiwicmVtb3ZlV2lsbFJlbmRlckNsYXNzIiwiX21hcCIsIndoYXQiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwidyIsImNyZWF0ZUVsZW1lbnQiLCJhdHRycyIsImVsZW1lbnQiLCJOb2RlIiwiZXh0ZW5kIiwib2JqIiwicHJvcHMiLCJleHRlbmRlcnMiLCJzdHlsZXMiLCJkYXRhc2V0IiwiZGF0YSIsIm5hbWUiLCJldmVudHMiLCJjYWxsYmFja3MiLCJraWRzIiwiayIsImFwcGVuZENoaWxkIiwidmFsIiwiTGlnaHRib3giLCJzZWxlY3RvciIsImNvbnRhaW5lciIsIm1vZGFsIiwiZ3JpZCIsInByZXYiLCJ3cmFwcGVyIiwicGFyZW50RWxlbWVudCIsImJvZHkiLCJjbG9zZUJ1dHRvbiIsImltZyIsIml0ZW1zIiwic2hvdyIsInNyYyIsImdldEF0dHJpYnV0ZSIsIm9wZW4iLCJjZWxsIiwiaW5uZXJIVE1MIiwiYnRuIiwiY2xpY2siLCJnb1ByZXYiLCJnb05leHQiLCJjbG9zZSIsImRvbU5vZGVzIiwic2xpZGVyT3B0aW9ucyIsImF1dG9wbGF5Iiwic2xpZGVyIiwib24iLCJjb25maWdTbGlkZXIiLCJmaXJzdCIsImdvVG8iLCJvcHRpb25zIiwiaGFzQXR0cmlidXRlIiwic3BsaXQiLCJvcHRpb24iLCJzbGlkZXJDYWxsYmFja3MiLCJvcGVuT25Nb2JpbGUiLCJzY3JlZW4iLCJ3aWR0aCIsInRhcmdldCIsImNvbnRyb2wiLCJ0YXJnZXRFbGVtZW50IiwiYWN0aW9uIiwiYWN0aW9uRGF0YSIsInBhcmFtcyIsImFwcGx5IiwibWFzY2FyYXMiLCJub21lIiwiY2FtcG8iLCJ0ZXN0IiwicmVncmEiLCJ2YWxvcmVzIiwibWF0Y2giLCJqb2luIiwicmVwbGFjZSIsImNlcCIsInJlZ3JhcyIsInN1YnN0ciIsInRlbGVmb25lIiwidmFsb3IiLCJyZyIsImxldHJhcyIsImRpZ2l0byIsInRvVXBwZXJDYXNlIiwiY3BmY25waiIsIm51bWVyb3MiLCJjcGYiLCJjbnBqIiwiYWxsIiwiYSIsImIiLCJjIiwiZCIsImUiLCJib3JkZXJDb2xvciIsImRkIiwiczEiLCJtbSIsInMyIiwiYWFhYSIsImVtYWlsIiwidG9Mb3dlckNhc2UiLCJzZW5oYSIsIl9jcmVhdGVOb2RlIiwiX2FwcGVuZCIsIl90b2dnbGVJdHNlbGYiLCJjb250ZW50IiwicmVtb3ZlQXR0cmlidXRlIiwiYWxsVGFyZ2V0cyIsImxpbmtzIiwibGluayIsImxpbmtUYXJnZXQiLCJhbGxUYWJzIiwidGFyZ2V0cyIsImJ0bkNyZWF0ZUVsIiwibmV3TGlzdCIsInN1bVJlZHVjZXIiLCJhcmdzIiwiYXJndW1lbnRzIiwiZmxhdEFyZ3MiLCJmbGF0IiwiSW5maW5pdHkiLCJudW1iZXJBcmdzIiwibiIsInJlZHVjZSIsInN1bSIsInJlc3VsdCIsInJlc3VsdFN1bSIsIm5ld0RpdiIsImdldEVsZW1lbnRCeUlkIiwidXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJhdXRob3JzIiwicmVzdWx0cyIsImF1dGhvciIsImRpdiIsInAiLCJwaWN0dXJlIiwibWVkaXVtIiwibGFzdCIsImNhdGNoIiwiZXJyb3IiLCJ3aW5kb3ciLCJzbGlkZXJzIiwiY2Fyb3VzZWxzIiwiY2Fyb3VzZWwiLCJsaWdodGJveCIsImVhY2giLCJmIiwiZm9ybSIsIkZvcm1NYXNrIiwiZnJvbSIsImVsZW1lbnRzIiwibWV0b2RvIiwicGsiLCJtYWtlT2JqIiwiYXJyYXkiLCJjbGVhckZvcm0iLCJidG5FbnZpYXIiLCJidG5EZWxldGFyIiwiaW5kZXhBcnJheSIsImZpbmRJbmRleCIsImVsZW0iLCJwdXNoIiwidHJhbnNmb3JtVGV4dCIsInJlc2V0IiwiYWxlcnQiLCJvYmplY3RUZXh0IiwiYWNjIiwiaXRlbSIsImRhdGFDb250YWluZXIiLCJhcnJheVJlbW92ZSIsImFyciIsImVsZSIsImFnZSIsImRvZ3MiLCJhbmltYWwiLCJjYWxjQWdlIiwiZGF0YUdyaWQiLCJkYXRhR3JpZEZpbHRlciIsInN3YXBpIiwicGVvcGxlIiwicGVvcGxlTWFwIiwicGVvcGxlRmlsdGVyIiwiaGFpcl9jb2xvciIsInBlb3BsZUZpbHRlck1hcCIsIkh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsInVybDEiLCJzZW5kIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsIm1lbnVQcmluY2lwYWwiLCJhbGxUYWJzMiIsInNlYXJjaCIsInVsIiwibGkiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFycmF5TGkiLCJpdGVtTG93ZXIiLCJ0ZXh0Q29udGVudCIsImZpbHRlckxvd2VyIiwiYWxsTGlua3MiLCJhbGxTZWN0aW9ucyIsImxpbmtzQXJyIiwic2VjdGlvbnNBcnIiLCJzZWN0aW9uIiwiYXR0TGluayIsImF0dFNlY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUMsYUFBWTtBQUNiOztBQURhLE1BR1BBLE1BSE87QUFLVCxvQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNsQixXQUFLQyxJQUFMLEdBQVksUUFBWjtBQUNBLFVBQUksRUFBRSxnQkFBZ0JGLE1BQWxCLENBQUosRUFBK0IsT0FBTyxJQUFJQSxNQUFKLENBQVdDLE1BQVgsQ0FBUDs7QUFFL0IsV0FBS0UsTUFBTCxHQUFjRixPQUFPRSxNQUFQLElBQWlCQyxTQUFTQyxhQUFULENBQXVCSixPQUFPSyxjQUFQLElBQXlCLFNBQWhELENBQS9CO0FBQ0EsVUFBSSxDQUFDLEtBQUtILE1BQVYsRUFBa0IsTUFBTSxxQ0FBTjs7QUFFbEIsV0FBS0ksYUFBTCxHQUFxQk4sT0FBT00sYUFBUCxJQUF3QixRQUE3QztBQUNBLFVBQUksQ0FBQyxLQUFLQyxRQUFMLENBQWNDLE1BQW5CLEVBQTJCLE1BQU0sbUNBQU47O0FBRTNCLFdBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQlYsT0FBT1UsUUFBUCxJQUFtQixJQUFuQztBQUNBLFdBQUtSLE1BQUwsQ0FBWVMsU0FBWixDQUFzQkMsR0FBdEIsQ0FBMEIsS0FBMUI7QUFDQSxXQUFLQyxPQUFMO0FBQ0Q7O0FBbkJRO0FBQUE7QUFBQSw4QkE2QkRDLEVBN0JDLEVBNkJHO0FBQ1YsZUFBTyxLQUFLUCxRQUFMLENBQWNRLE9BQWQsQ0FBc0JELEVBQXRCLENBQVA7QUFDRDtBQS9CUTtBQUFBO0FBQUEsMEJBaUNMQSxFQWpDSyxFQWlDRDtBQUNOLGVBQU8sS0FBS1AsUUFBTCxDQUFjUyxHQUFkLENBQWtCRixFQUFsQixDQUFQ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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNRSxXQUFXcFIsU0FBU21ELGdCQUFULENBQTBCLGFBQTFCLENBQWpCO0FBQ0EsTUFBTWtPLGNBQWNyUixTQUFTbUQsZ0JBQVQsQ0FBMEIsZ0JBQTFCLENBQXBCO0FBQ0EsTUFBTW1PLFdBQVd2TyxNQUFNOEssSUFBTixDQUFXdUQsUUFBWCxDQUFqQjtBQUNBLE1BQU1HLGNBQWN4TyxNQUFNOEssSUFBTixDQUFXd0QsV0FBWCxDQUFwQjs7QUFFQUMsV0FBU3pRLEdBQVQsQ0FBYSxVQUFDb0ssSUFBRCxFQUFRO0FBQ25Cc0csZ0JBQVkxUSxHQUFaLENBQWlCLFVBQUMyUSxPQUFELEVBQVc7QUFDMUIsVUFBTUMsVUFBVXhHLEtBQUs1RSxZQUFMLENBQWtCLFdBQWxCLENBQWhCO0FBQ0EsVUFBTXFMLGFBQWFGLFFBQVFuTCxZQUFSLENBQXFCLGNBQXJCLENBQW5CO0FBQ0E0RSxXQUFLbEosZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBSTtBQUNqQyxZQUFHMFAsWUFBWUMsVUFBZixFQUEwQjtBQUN4QjlHLHdCQUFjSyxJQUFkLEVBQW9CdUcsT0FBcEI7QUFDQUEsa0JBQVExRyxlQUFSLENBQXdCLFFBQXhCO0FBQ0QsU0FIRCxNQUlLO0FBQ0gwRyxrQkFBUS9OLFlBQVIsQ0FBcUIsUUFBckIsRUFBK0IsRUFBL0I7QUFDRDtBQUNGLE9BUkQ7QUFTRCxLQVpEO0FBYUQsR0FkRDs7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQyxDQXY4QkEsR0FBRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbid1c2Ugc3RyaWN0JztcblxuY2xhc3MgU2xpZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgdGhpcy50eXBlID0gJ1NsaWRlcic7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU2xpZGVyKSkgcmV0dXJuIG5ldyBTbGlkZXIoY29uZmlnKTtcbiAgXG4gICAgICB0aGlzLnBhcmVudCA9IGNvbmZpZy5wYXJlbnQgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb25maWcucGFyZW50U2VsZWN0b3IgfHwgJy5zbGlkZXInKTtcbiAgICAgIGlmICghdGhpcy5wYXJlbnQpIHRocm93ICdbU0xJREVSXTogQ29udGFpbmVyIG7Do28gZW5jb250cmFkby4nO1xuICBcbiAgICAgIHRoaXMuY2hpbGRTZWxlY3RvciA9IGNvbmZpZy5jaGlsZFNlbGVjdG9yIHx8ICcuc2xpZGUnO1xuICAgICAgaWYgKCF0aGlzLmNoaWxkcmVuLmxlbmd0aCkgdGhyb3cgJ1tTTElERVJdOiBTbGlkZXMgbsOjbyBlbmNvbnRyYWRvcy4nO1xuICBcbiAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgdGhpcy5kdXJhdGlvbiA9IGNvbmZpZy5kdXJhdGlvbiB8fCAzMDAwO1xuICAgICAgdGhpcy5wYXJlbnQuY2xhc3NMaXN0LmFkZCgnc2V0Jyk7XG4gICAgICB0aGlzLmNvbXBvc2UoKTtcbiAgICB9XG4gIFxuICAgIGdldCBjaGlsZHJlbigpIHtcbiAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLnBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuY2hpbGRTZWxlY3RvcikpO1xuICAgIH1cbiAgXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICB9XG4gIFxuICAgIGZvckVhY2goZm4pIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZvckVhY2goZm4pO1xuICAgIH1cbiAgXG4gICAgbWFwKGZuKSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5tYXAoZm4pO1xuICAgIH1cbiAgXG4gICAgZmlsdGVyKGZuKSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maWx0ZXIoZm4pO1xuICAgIH1cbiAgXG4gICAgZmluZChmbikge1xuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmluZChmbik7XG4gICAgfVxuICBcbiAgICBjb21wb3NlKCkge1xuICAgICAgdmFyIG5leHRJbmRleCwgcHJldkluZGV4O1xuICAgICAgcHJldkluZGV4ID0gdGhpcy5pbmRleCA+IDAgPyB0aGlzLmluZGV4IC0gMSA6IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgIG5leHRJbmRleCA9IHRoaXMuaW5kZXggPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDEgPyB0aGlzLmluZGV4ICsgMSA6IDA7XG4gICAgICB0aGlzLmZvckVhY2goKGVsLCBpKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ByZXYnKTtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudCcpO1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCduZXh0Jyk7XG4gICAgICAgIGlmIChpID09PSBwcmV2SW5kZXgpIGVsLmNsYXNzTGlzdC5hZGQoJ3ByZXYnKTtcbiAgICAgICAgaWYgKGkgPT09IG5leHRJbmRleCkgZWwuY2xhc3NMaXN0LmFkZCgnbmV4dCcpO1xuICAgICAgICBpZiAoaSA9PT0gdGhpcy5pbmRleCkgZWwuY2xhc3NMaXN0LmFkZCgnY3VycmVudCcpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIFxuICAgIHBsYXkoKSB7XG4gICAgICB2YXIgdGhhdDtcbiAgICAgIHRoYXQgPSB0aGlzO1xuICAgICAgdGhpcy5wbGF5aW5nU3RhdGVJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoYXQubmV4dCgpO1xuICAgICAgfSwgdGhpcy5kdXJhdGlvbik7XG4gICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIFxuICAgIHBhdXNlKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnBsYXlpbmdTdGF0ZUlEKTtcbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIFxuICAgIHBsYXlwYXVzZSgpIHtcbiAgICAgIGlmICh0aGlzLmlzUGxheWluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXVzZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheSgpO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgcHJldigpIHtcbiAgICAgIHZhciBwbGF5aW5nU3RhdGU7XG4gICAgICBpZiAodGhpcy5pbmRleCA+IDApIHtcbiAgICAgICAgdGhpcy5pbmRleC0tO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICAgIHBsYXlpbmdTdGF0ZSA9IHRoaXMuaXNQbGF5aW5nO1xuICAgICAgaWYgKHBsYXlpbmdTdGF0ZSkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbXBvc2UoKTtcbiAgICAgIGlmIChwbGF5aW5nU3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheSgpO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgbmV4dCgpIHtcbiAgICAgIHZhciBwbGF5aW5nU3RhdGU7XG4gICAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMSkge1xuICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIHBsYXlpbmdTdGF0ZSA9IHRoaXMuaXNQbGF5aW5nO1xuICAgICAgaWYgKHBsYXlpbmdTdGF0ZSkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbXBvc2UoKTtcbiAgICAgIGlmIChwbGF5aW5nU3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheSgpO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgZ29UbyhpbmRleCkge1xuICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgcmV0dXJuIHRoaXMuY29tcG9zZSgpO1xuICAgIH1cbiAgXG4gICAgb24oZXZlbnQsIGZuKSB7XG4gICAgICB0aGlzLnBhcmVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmbik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIFxuICAgIG9mZihldmVudCwgZm4pIHtcbiAgICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgXG4gICAgaW5zcGVjdChjb2xsYXBzZWQpIHtcbiAgICAgIGNvbnNvbGVbY29sbGFwc2VkID09PSB0cnVlID8gJ2dyb3VwQ29sbGFwc2VkJyA6ICdncm91cCddKHRoaXMudHlwZSk7XG4gICAgICBjb25zb2xlLnRhYmxlKFxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzKS5tYXAoa2V5ID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJvcDoga2V5LFxuICAgICAgICAgICAgdmFsdWU6IHRoaXNba2V5XSxcbiAgICAgICAgICAgIHR5cGU6IHR5cGVvZiB0aGlzW2tleV1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgY29uc29sZS5sb2codGhpcy5wYXJlbnQpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5jaGlsZHJlbik7XG4gICAgICBjb25zb2xlLndhcm4oRGF0ZS5ub3coKS50b1N0cmluZygpKTtcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQodGhpcy50eXBlKTtcbiAgXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIFxuICB9XG5cbmNsYXNzIENhcm91c2VsIGV4dGVuZHMgU2xpZGVyIHtcblxuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBjb25maWcucGFyZW50U2VsZWN0b3IgPSBjb25maWcucGFyZW50U2VsZWN0b3IgfHwgJy5jYXJvdXNlbCc7XG4gICAgc3VwZXIoY29uZmlnKTtcbiAgICB0aGlzLnR5cGUgPSAnQ2Fyb3VzZWwnO1xuICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplIHwgMDtcbiAgICB0aGlzLmNvbXBvc2UoKTtcbiAgfVxuXG4gIGNvbXBvc2UoKSB7XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmluZGV4ICsgMTtcbiAgICB0aGlzLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XG4gICAgICBsZXQgaXRlbU9yZGVyID0gaSAtIHBvc2l0aW9uICsgMTtcbiAgICAgIGlmIChpdGVtT3JkZXIgPCAwKSBpdGVtT3JkZXIgPSB0aGlzLmxlbmd0aCAtIHBvc2l0aW9uICsgaSArIDE7XG4gICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3JkZXInLCBpdGVtT3JkZXIpO1xuXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdwcmV2Jyk7XG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50Jyk7XG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCduZXh0Jyk7XG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3aWxsLWdvLXByZXYnKTtcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dpbGwtZ28tbmV4dCcpO1xuXG4gICAgICBpZiAodGhpcy5zaXplKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9XG4gICAgICAgICAgdGhpcy5sZW5ndGggPD0gdGhpcy5zaXplID8gJ2N1cnJlbnQnIDpcbiAgICAgICAgICBpdGVtT3JkZXIgPiAtMSAmJiBpdGVtT3JkZXIgPCB0aGlzLnNpemUgPyAnY3VycmVudCcgOlxuICAgICAgICAgIGl0ZW1PcmRlciA9PT0gLTEgfHwgaXRlbU9yZGVyID09PSB0aGlzLmxlbmd0aCAtIDEgPyAncHJldicgOlxuICAgICAgICAgIGl0ZW1PcmRlciA9PT0gdGhpcy5zaXplID8gJ25leHQnIDpcbiAgICAgICAgICAnJztcbiAgICAgICAgaWYgKCFjbGFzc05hbWUpIHJldHVybiB0aGlzO1xuICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIHNsaWRlLnN0eWxlLm9yZGVyID0gaXRlbU9yZGVyO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kaXIpIHtcbiAgICAgICAgY29uc3QgYW5pbUNsYXNzTmFtZSA9ICd3aWxsLWdvLScgKyB0aGlzLmRpcjtcbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChhbmltQ2xhc3NOYW1lKTtcbiAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdEFuaW1hdGlvbkVuZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZW1vdmVXaWxsUmVuZGVyQ2xhc3Moc2xpZGUsIGFuaW1DbGFzc05hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZW1vdmVXaWxsUmVuZGVyQ2xhc3Moc2xpZGUsIGFuaW1DbGFzc05hbWUpO1xuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlV2lsbFJlbmRlckNsYXNzKHNsaWRlLCBjbGFzc05hbWUpIHtcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByZXYoKSB7XG4gICAgdGhpcy5kaXIgPSAncHJldic7XG4gICAgcmV0dXJuIHN1cGVyLnByZXYoKTtcbiAgfVxuXG4gIG5leHQoKSB7XG4gICAgdGhpcy5kaXIgPSAnbmV4dCc7XG4gICAgcmV0dXJuIHN1cGVyLm5leHQoKTtcbiAgfVxuXG4gIGdvVG8oaW5kZXgpIHtcbiAgICB0aGlzLmRpciA9IGluZGV4ID4gdGhpcy5pbmRleCA/ICduZXh0JyA6ICdwcmV2JztcbiAgICByZXR1cm4gc3VwZXIuZ29UbyhpbmRleCk7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBfbWFwKHdoYXQsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiB3aGF0ID09PSAnc3RyaW5nJykgd2hhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwod2hhdCk7XG4gICAgaWYgKCEod2hhdCBpbnN0YW5jZW9mIEFycmF5KSkgd2hhdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHdoYXQpO1xuICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB3aGF0ID0gd2hhdC5tYXAodyA9PiBjYWxsYmFjayh3KSk7XG4gICAgcmV0dXJuIHdoYXQ7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZWwsIGF0dHJzKSB7XG4gIFxuICAgIGZ1bmN0aW9uIGVsZW1lbnQoZWwsIGF0dHJzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpO1xuICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIE5vZGUpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChhdHRycykgZXh0ZW5kKGVsLCBhdHRycyk7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG4gIFxuICAgIGZ1bmN0aW9uIGV4dGVuZChvYmosIHByb3BzKSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZGVycyA9IHtcbiAgICAgICAgICAgIHN0eWxlOiBmdW5jdGlvbiAoc3R5bGVzKSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKG9iai5zdHlsZSwgc3R5bGVzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gZGF0YSkgb2JqLnNldEF0dHJpYnV0ZSgnZGF0YS0nICsgbmFtZSwgZGF0YVtuYW1lXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZlbnRzOiBmdW5jdGlvbiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBjYWxsYmFja3MpIG9iai5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGNhbGxiYWNrc1tuYW1lXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hpbGRyZW46IGZ1bmN0aW9uIChraWRzKSB7XG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChraWRzLCBmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgICAgICAgICBvYmouYXBwZW5kQ2hpbGQoayk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIChleHRlbmRlcnNbbmFtZV0gfHwgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICAgIG9ialtuYW1lXSA9IHZhbDtcbiAgICAgICAgICAgIH0pKHByb3BzW25hbWVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgXG4gICAgcmV0dXJuIGVsZW1lbnQoZWwsIGF0dHJzKTtcbiAgfVxuXG5jbGFzcyBMaWdodGJveCB7XG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1jb250YWluZXInKSB8fCBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1jb250YWluZXInLFxuICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICAgIG1vZGFsOiAnJyxcbiAgICAgICAgICAgICAgICBncmlkOiAnY2VudGVyJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucHJldik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMud3JhcHBlcik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XG4gICAgICAgIC8vdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUJ1dHRvbik7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIucGFyZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgdGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VCdXR0b24pO1xuICAgICAgICB0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy5pbWcpO1xuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGltZywgaSkgPT4ge1xuICAgICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IHdyYXBwZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtd3JhcHBlcicpIHx8IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LXdyYXBwZXInLFxuICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICAgIGNlbGw6ICdzaHJpbmsnLFxuICAgICAgICAgICAgICAgIGdyaWQ6ICdjb2x1bW4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGdldCBwcmV2KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LXByZXYnKSB8fCBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1wcmV2JyxcbiAgICAgICAgICAgIGlubmVySFRNTDogJzxzdmcgeG1sbnM9XCJodHRwczovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Ym94PVwiMCAwIDEyOSAxMjlcIj48cGF0aCBkPVwiTTg4LjYgMTIxLjNjLjguOCAxLjggMS4yIDIuOSAxLjJzMi4xLS40IDIuOS0xLjJjMS42LTEuNiAxLjYtNC4yIDAtNS44bC01MS01MSA1MS01MWMxLjYtMS42IDEuNi00LjIgMC01LjhzLTQuMi0xLjYtNS44IDBsLTU0IDUzLjljLTEuNiAxLjYtMS42IDQuMiAwIDUuOGw1NCA1My45elwiIC8+PC9zdmc+JyxcbiAgICAgICAgICAgIGRhdGFzZXQ6IHtcbiAgICAgICAgICAgICAgICBidG46ICdsaW5rJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLmdvUHJldigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1uZXh0JykgfHwgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtbmV4dCcsXG4gICAgICAgICAgICBpbm5lckhUTUw6ICc8c3ZnIHhtbG5zPVwiaHR0cHM6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld2JveD1cIjAgMCAxMjkgMTI5XCI+PHBhdGggZD1cIk00MC40IDEyMS4zYy0uOC44LTEuOCAxLjItMi45IDEuMnMtMi4xLS40LTIuOS0xLjJjLTEuNi0xLjYtMS42LTQuMiAwLTUuOGw1MS01MS01MS01MWMtMS42LTEuNi0xLjYtNC4yIDAtNS44IDEuNi0xLjYgNC4yLTEuNiA1LjggMGw1My45IDUzLjljMS42IDEuNiAxLjYgNC4yIDAgNS44bC01My45IDUzLjl6XCIgLz48L3N2Zz4nLFxuICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICAgIGJ0bjogJ2xpbmsnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMuZ29OZXh0KCksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgY2xvc2VCdXR0b24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtY2xvc2UnKSB8fCBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1jbG9zZScsXG4gICAgICAgICAgICBpbm5lckhUTUw6ICc8c3ZnIHhtbG5zPVwiaHR0cHM6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld2JveD1cIjAgMCA1MTIgNTEyXCI+PHBhdGggZmlsbD1cIiNmZmZcIiBkPVwiTTUwNS45NDMgNi4wNThjLTguMDc3LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDkgMEw2LjA1OCA0NzYuNjkzYy04LjA3NyA4LjA3Ny04LjA3NyAyMS4xNzIgMCAyOS4yNDlBMjAuNjEyIDIwLjYxMiAwIDAgMCAyMC42ODMgNTEyYTIwLjYxNCAyMC42MTQgMCAwIDAgMTQuNjI1LTYuMDU5TDUwNS45NDMgMzUuMzA2YzguMDc2LTguMDc2IDguMDc2LTIxLjE3MSAwLTI5LjI0OHpcIi8+PHBhdGggZmlsbD1cIiNmZmZcIiBkPVwiTTUwNS45NDIgNDc2LjY5NEwzNS4zMDYgNi4wNTljLTguMDc2LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDggMC04LjA3NyA4LjA3Ni04LjA3NyAyMS4xNzEgMCAyOS4yNDhsNDcwLjYzNiA0NzAuNjM2YTIwLjYxNiAyMC42MTYgMCAwIDAgMTQuNjI1IDYuMDU4IDIwLjYxNSAyMC42MTUgMCAwIDAgMTQuNjI0LTYuMDU3YzguMDc1LTguMDc4IDguMDc1LTIxLjE3My0uMDAxLTI5LjI1elwiLz48L3N2Zz4nLFxuICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICAgIGJ0bjogJ2xpbmsnLFxuICAgICAgICAgICAgICAgIGNlbGw6ICdzaHJpbmsgZW5kJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLmNsb3NlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXQgaXRlbXMoKSB7XG4gICAgICAgIHZhciBkb21Ob2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZWxlY3Rvcik7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb21Ob2Rlcyk7XG4gICAgfVxuXG4gICAgZ2V0IGltZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtaW1nJykgfHwgY3JlYXRlRWxlbWVudCgnaW1nJywge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtaW1nJyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb3BlbigpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFyZ2V0Jyk7XG4gICAgfVxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd0YXJnZXQnKTtcbiAgICB9XG5cbiAgICBzaG93KGluZGV4KSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgY29uc3QgaW1nID0gdGhpcy5pdGVtc1tpbmRleF07XG4gICAgICAgIGNvbnN0IHNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGlnaHRib3gnKSA/IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGlnaHRib3gnKSA6IGltZy5zcmM7XG4gICAgICAgIHRoaXMuaW1nLnNyYyA9IHNyYztcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuXG4gICAgZ29QcmV2KCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4IC0gMTtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93KGluZGV4KTtcbiAgICB9XG4gICAgZ29OZXh0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleCArIDE7XG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9ICAgICAgICBcbiAgICAgICAgdGhpcy5zaG93KGluZGV4KTtcbiAgICB9XG59XG5cbmNvbnN0IHNsaWRlck9wdGlvbnMgPSB7XG4gICAgYXV0b3BsYXk6IHNsaWRlciA9PiB7XG4gICAgICBzbGlkZXJcbiAgICAgICAgLnBsYXkoKVxuICAgICAgICAub24oJ21vdXNlb3ZlcicsICgpID0+IHNsaWRlci5wYXVzZSgpKVxuICAgICAgICAub24oJ21vdXNlb3V0JywgKCkgPT4gc2xpZGVyLnBsYXkoKSk7XG4gICAgfVxuICB9O1xuZnVuY3Rpb24gY29uZmlnU2xpZGVyKHNsaWRlciwgcGFyZW50KSB7XG4gICAgY29uc3QgZmlyc3QgPSBwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWZpcnN0JykgfCAwO1xuICAgIGlmIChmaXJzdCkge1xuICAgICAgc2xpZGVyLmdvVG8oZmlyc3QpO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zID0gcGFyZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1vcHRpb25zJykgPyBwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW9wdGlvbnMnKS5zcGxpdCgnICcpIDogW107XG4gICAgb3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiBzbGlkZXJPcHRpb25zW29wdGlvbl0gJiYgc2xpZGVyT3B0aW9uc1tvcHRpb25dKHNsaWRlcikpO1xuICBcbiAgICBjb25zdCBzbGlkZXJDYWxsYmFja3MgPSB7XG4gICAgICBvcGVuT25Nb2JpbGU6ICgpID0+IHtcbiAgICAgICAgaWYgKHNjcmVlbigpLndpZHRoID4gNjAwKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gc2xpZGVyLmZpbmQoc2xpZGUgPT4gc2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW9yZGVyJykgPT09ICcwJyk7XG4gICAgICAgIGlmICghZmlyc3QpIHJldHVybjtcbiAgICAgICAgY29uc3QgYnRuID0gZmlyc3QucXVlcnlTZWxlY3RvcignLmluZm8taW1nIGFbaHJlZl49XCJqYXZhc2NyaXB0OlwiXScpO1xuICAgICAgICBpZiAoIWJ0bikgcmV0dXJuO1xuICAgICAgICBidG4uY2xpY2soKTtcbiAgICAgIH1cbiAgICB9O1xuICBcbiAgICBfbWFwKCdbZGF0YS1jb250cm9sXScsIGNvbnRyb2wgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gY29udHJvbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29udHJvbCcpO1xuICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IHRhcmdldCA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KSA6IG51bGw7XG4gIFxuICAgICAgaWYgKHRhcmdldEVsZW1lbnQgJiYgdGFyZ2V0RWxlbWVudCA9PT0gc2xpZGVyLnBhcmVudCkge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBjb250cm9sLmdldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nKTtcbiAgICAgICAgaWYgKChhY3Rpb24gPT09ICdwcmV2JyB8fCBhY3Rpb24gPT09ICduZXh0JykgJiYgKHNsaWRlci5zaXplID49IHNsaWRlci5sZW5ndGgpKSB7XG4gICAgICAgICAgY29udHJvbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3ZlcnNpemUnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhY3Rpb25EYXRhID0gY29udHJvbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyYW1zJyk7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IGFjdGlvbkRhdGEgPyBhY3Rpb25EYXRhLnNwbGl0KCcsJykgOiBudWxsO1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9IGNvbnRyb2wuZ2V0QXR0cmlidXRlKCdkYXRhLWNhbGxiYWNrJyk7XG4gICAgICAgIGlmIChhY3Rpb24gJiYgc2xpZGVyW2FjdGlvbl0gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzbGlkZXJbYWN0aW9uXS5hcHBseShzbGlkZXIsIHBhcmFtcyk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgc2xpZGVyQ2FsbGJhY2tzW2NhbGxiYWNrXSkgc2xpZGVyQ2FsbGJhY2tzW2NhbGxiYWNrXSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuY29uc3QgbWFzY2FyYXMgPSB7XG5cbiAgICBub21lOiAoY2FtcG8pID0+IHtcbiAgICAgICAgaWYgKC9eW15hLXpBLVpdKy8udGVzdChjYW1wby52YWx1ZSkpIGNhbXBvLnZhbHVlID0gJyc7XG4gICAgICAgIGNvbnN0IHJlZ3JhID0gL1stJ2EtekEtWsOALcOWw5gtw7bDuC3FvyBdKy9naTtcbiAgICAgICAgY29uc3QgdmFsb3JlcyA9IGNhbXBvLnZhbHVlLm1hdGNoKHJlZ3JhKTtcbiAgICAgICAgaWYgKHZhbG9yZXMpIGNhbXBvLnZhbHVlID0gdmFsb3Jlcy5qb2luKCcnKS5yZXBsYWNlKC8gKy9naSwgJyAnKTtcbiAgICB9LFxuXG4gICAgY2VwOiAoY2FtcG8pID0+IHtcbiAgICAgICAgY29uc3QgcmVncmFzID0gWy9cXGQrL2dpLCAvXihcXGR7NX0pLT8oXFxkezEsM30pL107XG4gICAgICAgIGNvbnN0IHZhbG9yZXMgPSBjYW1wby52YWx1ZS5tYXRjaChyZWdyYXNbMF0pO1xuICAgICAgICBpZiAoIXZhbG9yZXMpIHJldHVybiBjYW1wby52YWx1ZSA9ICcnO1xuICAgICAgICBjYW1wby52YWx1ZSA9IHZhbG9yZXMuam9pbignJyk7XG4gICAgICAgIGlmIChyZWdyYXNbMV0udGVzdChjYW1wby52YWx1ZSkpIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUucmVwbGFjZShyZWdyYXNbMV0sICckMS0kMicpO1xuICAgICAgICBpZiAoY2FtcG8udmFsdWUubGVuZ3RoID4gOSkgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS5zdWJzdHIoMCwgOSk7XG4gICAgfSxcblxuICAgIHRlbGVmb25lOiAoY2FtcG8pID0+IHtcbiAgICAgICAgY29uc3QgcmVncmFzID0gWy9cXGQrL2dpLCAvXihcXGRcXGQ/KS8sIC9eKFxcZFxcZCkoXFxkezR9KS0/KFxcZHsxLDR9KS8sIC9eKFxcZFxcZCkoXFxkezV9KS0/KFxcZHsxLDR9KS9dO1xuICAgICAgICBjb25zdCB2YWxvcmVzID0gY2FtcG8udmFsdWUubWF0Y2gocmVncmFzWzBdKTtcbiAgICAgICAgaWYgKCF2YWxvcmVzKSByZXR1cm4gY2FtcG8udmFsdWUgPSAnJztcbiAgICAgICAgY29uc3QgdmFsb3IgPSBjYW1wby52YWx1ZSA9IHZhbG9yZXMuam9pbignJyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAwKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzFdLCAnKCQxJyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAyKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzFdLCAnKCQxKSAnKTtcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDYpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbMl0sICcoJDEpICQyLSQzJyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAxMCkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1szXSwgJygkMSkgJDItJDMnKTtcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDExKSBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnN1YnN0cigwLCAxNSk7XG4gICAgfSxcblxuICAgIHJnOiAoY2FtcG8pID0+IHtcbiAgICAgICAgY29uc3QgcmVncmFzID0gWy9cXGQrL2dpLCAvXihcXGR7MSwyfSkvLCAvXihcXGR7MSwyfSlcXC4/KFxcZHszfSkvLCAvXihcXGR7MSwyfSlcXC4/KFxcZHszfSlcXC4/KFxcZHszfSkvLCAvXihcXGR7MSwyfSlcXC4/KFxcZHszfSlcXC4/KFxcZHszfSktPyhcXGQpPy9dO1xuICAgICAgICBjb25zdCB2YWxvcmVzID0gY2FtcG8udmFsdWUubWF0Y2gocmVncmFzWzBdKTtcbiAgICAgICAgY29uc3QgbGV0cmFzID0gY2FtcG8udmFsdWUubWF0Y2goL1thLXpBLVpdKyQvZ2kpO1xuICAgICAgICBjb25zdCBkaWdpdG8gPSBsZXRyYXMgPyBsZXRyYXNbMF1bMF0gOiAnJztcbiAgICAgICAgaWYgKCF2YWxvcmVzKSByZXR1cm4gY2FtcG8udmFsdWUgPSAnJztcbiAgICAgICAgY29uc3QgdmFsb3IgPSBjYW1wby52YWx1ZSA9IHZhbG9yZXMuam9pbignJyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAyKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzFdLCAnJDEuJyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA1KSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzJdLCAnJDEuJDIuJyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA3KSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzNdLCAnJDEuJDIuJDMnKTtcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA9PT0gOCAmJiBkaWdpdG8pIGNhbXBvLnZhbHVlICs9ICctJyArIGRpZ2l0by50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gOCkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1s0XSwgJyQxLiQyLiQzLSQ0Jyk7XG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA5KSBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnN1YnN0cigwLCAxMik7XG4gICAgfSxcblxuICAgIGNwZmNucGo6IChjYW1wbykgPT4ge1xuICAgICAgICBjb25zdCBudW1lcm9zID0gL1xcZCsvZ2k7XG4gICAgICAgIGNvbnN0IHZhbG9yZXMgPSBjYW1wby52YWx1ZS5tYXRjaChudW1lcm9zKTtcbiAgICAgICAgaWYgKCF2YWxvcmVzKSByZXR1cm4gY2FtcG8udmFsdWUgPSAnJztcbiAgICAgICAgY29uc3QgdmFsb3IgPSB2YWxvcmVzLmpvaW4oJycpO1xuICAgICAgICBjb25zdCBjcGYgPSAvXihbMC05XXsxLDN9KT9cXC4/KFswLTldezEsM30pP1xcLj8oWzAtOV17MSwzfSk/XFwtPyhbMC05XXsxLDJ9KT8kLztcbiAgICAgICAgY29uc3QgY25waiA9IC9eKFswLTldezEsMn0pP1xcLj8oWzAtOV17MSwzfSk/XFwuPyhbMC05XXsxLDN9KT9cXC8/KFswLTldezEsNH0pP1xcLT8oWzAtOV17MSwyfSk/JC87XG4gICAgICAgIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUucmVwbGFjZSgvW15cXGQuXFwvLV0vZ2ksICcnKTtcbiAgICAgICAgaWYgKGNwZi50ZXN0KHZhbG9yKSkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKGNwZiwgKGFsbCwgYSwgYiwgYywgZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChhIHx8ICcnKSArIChiID8gJy4nICsgYiA6ICcnKSArIChjID8gJy4nICsgYyA6ICcnKSArIChkID8gJy0nICsgZCA6ICcnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVsc2UgaWYgKGNucGoudGVzdCh2YWxvcikpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShjbnBqLCAoYWxsLCBhLCBiLCBjLCBkLCBlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGEgfHwgJycpICsgKGIgPyAnLicgKyBiIDogJycpICsgKGMgPyAnLicgKyBjIDogJycpICsgKGQgPyAnLycgKyBkIDogJycpICsgKGUgPyAnLScgKyBlIDogJycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNhbXBvLnZhbHVlLmxlbmd0aCA+IDE4KSBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnN1YnN0cigwLCAxOCk7XG4gICAgfSxcblxuICAgIGRhdGE6IChjYW1wbykgPT4ge1xuICAgICAgICBpZiAoY2FtcG8udHlwZSA9PT0gJ2RhdGUnKSByZXR1cm47XG4gICAgICAgIGNvbnN0IG51bWVyb3MgPSBjYW1wby52YWx1ZS5yZXBsYWNlKC9eMD9cXC98W15cXGRcXC9dL2dpLCAnJyk7XG4gICAgICAgIGlmIChudW1lcm9zID09PSAnJykge1xuICAgICAgICAgICAgY2FtcG8udmFsdWUgPSBudW1lcm9zO1xuICAgICAgICAgICAgY2FtcG8uc3R5bGUuYm9yZGVyQ29sb3IgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNhbXBvLnZhbHVlID0gbnVtZXJvc1xuICAgICAgICAucmVwbGFjZSgvKF58XFwvKTAwK1xcLz8vZywgJzAnKVxuICAgICAgICAucmVwbGFjZSgvKF58XFwvKShbMS05XVxcLykvLCAnMCQyJylcbiAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICAvKFxcZFxcZCkoXFwvPykoXFxkezEsMn0pPyhcXC8/KTAqKFxcZHsxLDR9KT8uKi9nLFxuICAgICAgICAgICAgZnVuY3Rpb24oYWxsLCBkZCwgczEsIG1tLCBzMiwgYWFhYSkge1xuICAgICAgICAgICAgICAgIGlmIChkZCA+IDMxIHx8IG1tID4gMTIpIGNhbXBvLnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XG4gICAgICAgICAgICAgICAgZWxzZSBjYW1wby5zdHlsZS5ib3JkZXJDb2xvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRkICsgKG1tID8gJy8nICsgbW0gOiBzMSB8fCAnJykgKyAoYWFhYSA/ICcvJyArIGFhYWEgOiBzMiB8fCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIGVtYWlsOiAoY2FtcG8pID0+IHtcbiAgICAgICAgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIH0sXG5cbiAgICBzZW5oYTogKGNhbXBvKSA9PiB7XG4gICAgICAgIGlmIChjYW1wby52YWx1ZS5sZW5ndGggPiAwICYmIGNhbXBvLnZhbHVlLmxlbmd0aCA8IDYpIGNhbXBvLnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XG4gICAgICAgIGVsc2UgY2FtcG8uc3R5bGUuYm9yZGVyQ29sb3IgPSBudWxsO1xuICAgIH1cblxufTtcblxuZnVuY3Rpb24gX2NyZWF0ZU5vZGUoZWxlbWVudCl7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudClcbn1cblxuZnVuY3Rpb24gX2FwcGVuZChwYXJlbnQsIGVsKXtcbiAgICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGVsKVxufVxuXG5mdW5jdGlvbiBfdG9nZ2xlSXRzZWxmKGJ0biwgY29udGVudCl7ICAgIFxuICAgIGJ0biAmJiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuICAgICAgXG4gICAgICBpZihjb250ZW50Lmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpe1xuICAgICAgICBjb250ZW50LnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBjb250ZW50LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgICAgfVxuICAgIH0pOyAgICBcbn1cblxuLy8gLS0tLS0tIFRBQlMgLS0tLS0tXG5jb25zdCBhbGxUYXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFyZ2V0XScpO1xuY29uc3QgbGlua3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhbGxUYXJnZXRzKTtcblxubGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluayl7XG4gIGNvbnN0IGxpbmtUYXJnZXQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKTtcbiAgY29uc3QgYWxsVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYl0nKTtcblxuICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0YXJnZXRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYWxsVGFicyk7ICAgICAgXG4gICAgdGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpe1xuICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuXG4gICAgICBpZihsaW5rVGFyZ2V0ID09PSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpKXtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgICAgIGxpbmtzLmZvckVhY2goYnRuID0+e1xuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbi8vIC0tLS0tLSBDUkVBVEUgRUxFTUVOVCAtLS0tLS1cbmNvbnN0IGJ0bkNyZWF0ZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY3JlYXRlXScpO1xuYnRuQ3JlYXRlRWwgJiYgYnRuQ3JlYXRlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuICBjb25zdCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcz1cInBvc3QtY29udGVudFwiXScpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0xpc3QpO1xuICBuZXdMaXN0LmlubmVySFRNTCA9ICc8bGk+dGVzdGUxPC9saT48bGk+dGVzdGUyPC9saT4nO1xufSk7XG5cbi8vIC0tLS0tLSBTVU1SRURVQ0VSIFdJVEggRkxBVCAtLS0tLS1cbmZ1bmN0aW9uIHN1bVJlZHVjZXIoKSB7XG4gIC8vY29udmVydGVyIGFyZ3VtZW50cyBlbSBhcnJheVxuICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgLy8gYWNoYXRhciBhcmdzXG4gIGNvbnN0IGZsYXRBcmdzID0gYXJncy5mbGF0KEluZmluaXR5KTtcbiAgLy9maWx0YXIgbsO6bWVyb3NcbiAgY29uc3QgbnVtYmVyQXJncyA9IGZsYXRBcmdzLmZpbHRlcihuID0+IHR5cGVvZiBuID09PSAnbnVtYmVyJyk7XG4gIC8vIHNvbWFyXG4gIHJldHVybiBudW1iZXJBcmdzLnJlZHVjZSgoc3VtLCBuKSA9PiBzdW0gKyBuLCAwKTtcbn1cblxuLy8gZnVuY3Rpb24gZmxhdHRlbkRlZXAoYXJyMSl7XG4vLyAgIHJldHVybiBhcnIxLnJlZHVjZSgoYWNjLCB2YWwpID0+IEFycmF5LmlzQXJyYXkodmFsKSA/IGFjYy5jb25jYXQoZmxhdHRlbkRlZXAodmFsKSkgOiBhY2MuY29uY2F0KHZhbCksIFtdKTtcbi8vIH1cblxuY29uc3QgcmVzdWx0ID0gc3VtUmVkdWNlcihbMCwgMywgN10sIFtudWxsLCAnZW1hIHdhdHNvbicsIDgyXSwgNSwgW1szLCAwXSwgWzFdLCBudWxsXSwgW10pO1xuXG5jb25zdCByZXN1bHRTdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zdW1dJyk7XG5yZXN1bHRTdW0gJiYgcmVzdWx0U3VtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgY29uc3QgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3M9XCJwb3N0LWNvbnRlbnRcIl0nKTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChuZXdEaXYpO1xuICBuZXdEaXYuaW5uZXJIVE1MID0gYCR7cmVzdWx0fWA7XG59KTtcblxuLy8gLS0tLS0tIEZFVENIIC0tLS0tLVxuLy8gZnVuY3Rpb24gY3JlYXRlTm9kZShlbGVtZW50KXtcbi8vICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7IC8vIENyZWF0ZSB0aGUgdHlwZSBvZiBlbGVtZW50IHlvdSBwYXNzIGluIHRoZSBwYXJhbWV0ZXJzXG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGFwcGVuZChwYXJlbnQsIGVsKXtcbi8vICAgcmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChlbCk7IC8vIEFwcGVuZCB0aGUgc2Vjb25kIHBhcmFtZXRlcihlbGVtZW50KSB0byB0aGUgZmlyc3Qgb25lXG4vLyB9XG5cbmNvbnN0IGdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0aG9ycycpOyAvLyBHZXQgdGhlIGxpc3Qgd2hlcmUgd2Ugd2lsbCBwbGFjZSBvdXIgYXV0aG9yc1xuY29uc3QgdXJsID0gJ2h0dHBzOi8vcmFuZG9tdXNlci5tZS9hcGkvP3Jlc3VsdHM9MTAnOyAvLyBHZXQgMTAgcmFuZG9tIHVzZXJzXG5cbmZldGNoKHVybCkgLy8gQ2FsbCB0aGUgZmV0Y2ggZnVuY3Rpb24gcGFzc2luZyB0aGUgdXJsIG9mIHRoZSBBUEkgYXMgYSBwYXJhbWV0ZXJcbi50aGVuKChyZXNwKT0+IHJlc3AuanNvbigpKSAvLyBUcmFuc2Zvcm0gdGhlIGRhdGEgaW50byBKU09OXG4udGhlbihmdW5jdGlvbihkYXRhKXtcbiAgLy8gWW91ciBjb2RlIGZvciBoYW5kbGluZyB0aGUgZGF0YSB5b3UgZ2V0IGZyb20gdGhlIEFQSVxuICAvLyBDcmVhdGUgYW5kIGFwcGVuZCB0aGUgbGkncyB0byB0aGUgdWxcbiAgbGV0IGF1dGhvcnMgPSBkYXRhLnJlc3VsdHM7IC8vIEdldCB0aGUgcmVzdWx0c1xuICByZXR1cm4gYXV0aG9ycy5tYXAoZnVuY3Rpb24oYXV0aG9yKXtcbiAgICBsZXQgZGl2ID0gX2NyZWF0ZU5vZGUoJ2RpdicpLCAvLyBDcmVhdGUgdGhlIGVsZW1lbnRzIHdlIG5lZWRcbiAgICAgICAgaW1nID0gX2NyZWF0ZU5vZGUoJ2ltZycpLFxuICAgICAgICBwID0gX2NyZWF0ZU5vZGUoJ3AnKTtcbiAgICBpbWcuc3JjID0gYXV0aG9yLnBpY3R1cmUubWVkaXVtOyBcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWNlbGwnLCAnc2hyaW5rJyk7XG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JywgJ2NlbnRlcicpO1xuICAgIC8vIEFkZCB0aGUgc291cmNlIG9mIHRoZSBpbWFnZSB0byBiZSB0aGUgc3JjIG9mIHRoZSBpbWcgZWxlbWVudFxuICAgIHAuaW5uZXJIVE1MID0gYCR7YXV0aG9yLm5hbWUuZmlyc3R9ICR7YXV0aG9yLm5hbWUubGFzdH1gOyBcbiAgICAvLyBNYWtlIHRoZSBIVE1MIG9mIG91ciBwIHRvIGJlIHRoZSBmaXJzdCBhbmQgbGFzdCBuYW1lIG9mIG91ciBhdXRob3JcbiAgICBfYXBwZW5kKGRpdiwgaW1nKTsgLy8gQXBwZW5kIGFsbCBvdXIgZWxlbWVudHNcbiAgICBfYXBwZW5kKGRpdiwgcCk7XG4gICAgX2FwcGVuZChncmlkLCBkaXYpO1xuICB9KVxufSlcbi5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gIGNvbnNvbGUubG9nKGVycm9yKTtcbn0pO1xuXG4vLyAtLS0tLS0gU0xJREVSIFdJVEggTElHSFRCT1ggLS0tLS0tXG53aW5kb3cuc2xpZGVycyA9IF9tYXAoJy5zbGlkZXInLCBwYXJlbnQgPT4ge1xuICBjb25zdCBzbGlkZXIgPSBuZXcgU2xpZGVyKHtcbiAgICBwYXJlbnRcbiAgfSk7XG4gIGNvbmZpZ1NsaWRlcihzbGlkZXIsIHBhcmVudCk7XG59KTtcblxud2luZG93LmNhcm91c2VscyA9IF9tYXAoJy5jYXJvdXNlbCcsIHBhcmVudCA9PiB7XG4gIGNvbnN0IHNpemUgPSBwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNpemUnKSB8IDA7XG4gIGNvbnN0IGNhcm91c2VsID0gbmV3IENhcm91c2VsKHtcbiAgICBwYXJlbnQsXG4gICAgc2l6ZVxuICB9KTtcbiAgY29uZmlnU2xpZGVyKGNhcm91c2VsLCBwYXJlbnQpO1xuICByZXR1cm4gY2Fyb3VzZWw7XG59KTtcblxudmFyIGxpZ2h0Ym94ID0gbmV3IExpZ2h0Ym94KFwiW2RhdGEtbGlnaHRib3hdXCIpO1xuXG4vLyAtLS0tLS0gTUFTS1MgLS0tLS0tXG5jb25zdCBlYWNoID0gKGksIGYpID0+IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoaSwgZik7XG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpO1xuXG5pZiAoZm9ybS5sZW5ndGgpIGVhY2goZm9ybSwgRm9ybU1hc2spO1xuZnVuY3Rpb24gRm9ybU1hc2soZikge1xuICAoQXJyYXkuZnJvbShmLmVsZW1lbnRzKSlcbiAgICAgIC5maWx0ZXIoZWwgPT4gZWwuaGFzQXR0cmlidXRlKCdkYXRhLW1hc2snKSlcbiAgICAgIC5mb3JFYWNoKGNhbXBvID0+IGNhbXBvLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBtZXRvZG8gPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1tYXNrJyk7XG4gICAgICAgIGlmICghbWFzY2FyYXNbbWV0b2RvXSkgcmV0dXJuIGNvbnNvbGUubG9nKGBBIG3DoXNjYXJhIGRvIHRpcG8gXCIke21ldG9kb31cIiBuw6NvIGZvaSBkZWZpbmlkYS5gKTtcblxuICAgICAgICBtYXNjYXJhc1ttZXRvZG9dKHRoaXMpO1xuICB9KSk7XG59XG5cbi8vIC0tLS0tLSBDUlVEIFdJVEggSlMgLS0tLS0tXG5jb25zdCBub21lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vbWUnKTtcbmNvbnN0IHBrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NwZmNucGonKTtcbmNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VtYWlsJyk7XG5cbmZ1bmN0aW9uIG1ha2VPYmooKXtcbiAgcmV0dXJuIHtcbiAgICBub21lOiBub21lLnZhbHVlLFxuICAgIGNwZjogcGsudmFsdWUsXG4gICAgZW1haWw6IGVtYWlsLnZhbHVlXG4gIH1cbn1cblxubGV0IGFycmF5ID0gW107XG5jb25zdCBjbGVhckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdC1mb3JtJyk7XG5jb25zdCBidG5FbnZpYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW52aWFyJyk7XG5jb25zdCBidG5EZWxldGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0YXInKTtcblxuYnRuRW52aWFyICYmIGJ0bkVudmlhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG4gIGlmKG5vbWUudmFsdWUhPW51bGwsIG5vbWUudmFsdWUhPVwiXCIgJiYgcGsudmFsdWUhPW51bGwsIHBrLnZhbHVlIT1cIlwiICYmIGVtYWlsLnZhbHVlIT1udWxsLCBlbWFpbC52YWx1ZSE9XCJcIil7XG4gICAgbGV0IGluZGV4QXJyYXkgPSBhcnJheS5maW5kSW5kZXgoZWxlbSA9PiB7XG4gICAgICByZXR1cm4gZWxlbS5jcGY9PT1way52YWx1ZVxuICAgIH0pO1xuICAgIGlmKGluZGV4QXJyYXkgPiAtMSl7XG4gICAgICBhcnJheVtpbmRleEFycmF5XSA9IG1ha2VPYmooKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIGFycmF5LnB1c2gobWFrZU9iaigpKTtcbiAgICB9XG4gICAgdHJhbnNmb3JtVGV4dChhcnJheSk7XG4gICAgY2xlYXJGb3JtLnJlc2V0KCk7XG4gIH1cbiAgZWxzZXtcbiAgICBhbGVydCgnUHJlZW5jaGEgdG9kb3Mgb3MgY2FtcG9zIScpO1xuICB9XG59KTtcblxuZnVuY3Rpb24gdHJhbnNmb3JtVGV4dChhcnJheSl7XG4gIC8vIGNvbnN0IG9iamVjdFRleHQgPSBKU09OLnN0cmluZ2lmeSh7YXJyYXl9LCBudWxsLCBcIiBcIilcbiAgLy8gY29uc3QgZGF0YUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzX2Rpc3BsYXknKTtcbiAgLy8gZGF0YUNvbnRhaW5lci50ZXh0Q29udGVudCA9IG9iamVjdFRleHQ7XG4gIGNvbnN0IG9iamVjdFRleHQgPSBhcnJheS5yZWR1Y2UoKGFjYywgaXRlbSwgaW5kZXgpID0+e1xuICAgIGFjYys9IGA8dWw+PGxpPiR7aXRlbS5ub21lfTwvbGk+PGxpPiR7aXRlbS5jcGZ9PC9saT48bGk+JHtpdGVtLmVtYWlsfTwvbGk+PC91bD5gO1xuICAgIHJldHVybiBhY2NcbiAgfSwgJycpO1xuICBjb25zdCBkYXRhQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdHNfZGlzcGxheScpO1xuICBkYXRhQ29udGFpbmVyLmlubmVySFRNTCA9IG9iamVjdFRleHQ7XG59XG5cbmZ1bmN0aW9uIGFycmF5UmVtb3ZlKGFyciwgdmFsdWUpeyAvL3JldG9ybmEgdG9kb3Mgb3MgZWxlbWVudG9zIGRvIGFycmF5IG1lbm9zIG8gcXVlIHZvY8OqIHBhc3NhclxuICByZXR1cm4gYXJyLmZpbHRlcigoZWxlLCBpbmRleCkgPT4ge3JldHVybiBpbmRleCAhPSB2YWx1ZX0pXG59XG5cbmJ0bkRlbGV0YXIgJiYgYnRuRGVsZXRhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4ge1xuICBsZXQgaW5kZXhBcnJheSA9IGFycmF5LmZpbmRJbmRleChlbGVtID0+IHtcbiAgICByZXR1cm4gZWxlbS5jcGYgPT09IHBrLnZhbHVlXG4gIH0pO1xuXG4gIGlmKGluZGV4QXJyYXkgPiAtMSl7XG4gICAgYXJyYXkgPSBhcnJheVJlbW92ZShhcnJheSwgaW5kZXhBcnJheSk7XG4gIH1cbiAgdHJhbnNmb3JtVGV4dChhcnJheSk7XG4gIGNsZWFyRm9ybS5yZXNldCgpO1xufSk7XG5cbi8vIC0tLS0tLVRPR0dMRSBCVVRUT04tLS0tLS1cbi8vIGNvbnN0IHRvZ2dsZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRvZ2dsZV0nKTtcbi8vIGNvbnN0IHRvZ2dsZUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb250ZW50XScpO1xuXG4vLyB0b2dnbGVCdG4gJiYgdG9nZ2xlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcblxuLy8gICBpZih0b2dnbGVDb250ZW50Lmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpe1xuLy8gICAgIHRvZ2dsZUNvbnRlbnQucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKVxuLy8gICB9XG4vLyAgIGVsc2V7XG4vLyAgICAgdG9nZ2xlQ29udGVudC5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKVxuLy8gICB9XG4vLyB9KVxuX3RvZ2dsZUl0c2VsZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b2dnbGVdJyksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnRlbnRdJykpO1xuXG4vLyAtLS0tLS0gTUFQIEFORCBGSUxURVIgLS0tLS0tXG5sZXQgZGF0YSA9IFtcbiAge1xuICAgIG5hbWU6ICdCdXR0ZXJzJyxcbiAgICBhZ2U6IDMsXG4gICAgdHlwZTogJ2RvZydcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdMaXp6eScsXG4gICAgYWdlOiA2LFxuICAgIHR5cGU6ICdkb2cnXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnUmVkJyxcbiAgICBhZ2U6IDEsXG4gICAgdHlwZTogJ2NhdCdcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdKb2V5JyxcbiAgICBhZ2U6IDMsXG4gICAgdHlwZTogJ2RvZydcbiAgfVxuXTtcblxubGV0IGRvZ3MgPSBkYXRhLmZpbHRlcigoYW5pbWFsKT0+e1xuICByZXR1cm4gYW5pbWFsLnR5cGUgPT09ICdkb2cnXG59KTtcblxuZG9ncy5tYXAoKGFuaW1hbCk9PntcbiAgcmV0dXJuIGFuaW1hbC5hZ2UgKj0gN1xufSk7XG5cbmNvbnN0IGNhbGNBZ2UgPSBkb2dzLnJlZHVjZSgoc3VtLCBhbmltYWwpPT57XG4gIHJldHVybiBzdW0gKyBhbmltYWwuYWdlXG59LCAwKTtcblxuY29uc29sZS5sb2coZG9ncyk7XG5jb25zb2xlLmxvZyhjYWxjQWdlKTtcblxuLy8gLS0tLS0tIEZJTFRFUiBGRVRDSCBSRVNVTFRTIC0tLS0tLVxuXG5jb25zdCBkYXRhR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNoYXJhY3RlcnNdJyk7XG5jb25zdCBkYXRhR3JpZEZpbHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNoYXJhY3RlcnMtZmlsdGVyXScpO1xuY29uc3Qgc3dhcGkgPSAnaHR0cHM6Ly9zd2FwaS5jby9hcGkvcGVvcGxlLyc7XG5cbmZldGNoKHN3YXBpKVxuLnRoZW4oKHJlc3ApPT4gcmVzcC5qc29uKCkpXG4udGhlbihmdW5jdGlvbihkYXRhKXtcbiAgY29uc29sZS5sb2coZGF0YS5yZXN1bHRzKTtcbiAgbGV0IHBlb3BsZSA9IGRhdGEucmVzdWx0cztcbiAgY29uc3QgcGVvcGxlTWFwID0gcGVvcGxlLm1hcCgoaXRlbSk9PntcbiAgICBsZXQgZGl2ID0gX2NyZWF0ZU5vZGUoJ2RpdicpLFxuICAgICAgICBwID0gX2NyZWF0ZU5vZGUoJ3AnKTtcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWNlbGwnLCAnc2hyaW5rJyk7XG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JywgJ2NlbnRlcicpO1xuICAgIHAuaW5uZXJIVE1MID0gYCR7aXRlbS5uYW1lfWA7XG4gICAgX2FwcGVuZChkaXYsIHApO1xuICAgIF9hcHBlbmQoZGF0YUdyaWQsIGRpdik7XG4gIH0pOyAgXG5cbiAgY29uc3QgcGVvcGxlRmlsdGVyID0gcGVvcGxlLmZpbHRlcigoaXRlbSk9PntcbiAgICByZXR1cm4gaXRlbS5oYWlyX2NvbG9yID09PSAnYmxvbmQnO1xuICB9KTtcblxuICBjb25zdCBwZW9wbGVGaWx0ZXJNYXAgPSBwZW9wbGVGaWx0ZXIubWFwKChpdGVtKT0+e1xuICAgIGxldCBkaXYgPSBfY3JlYXRlTm9kZSgnZGl2JyksXG4gICAgICAgIHAgPSBfY3JlYXRlTm9kZSgncCcpO1xuICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbCcsICdzaHJpbmsnKTtcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLXRleHQnLCAnY2VudGVyJyk7XG4gICAgcC5pbm5lckhUTUwgPSBgJHtpdGVtLm5hbWV9YDtcbiAgICBfYXBwZW5kKGRpdiwgcCk7XG4gICAgX2FwcGVuZChkYXRhR3JpZEZpbHRlciwgZGl2KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtwZW9wbGVNYXAsIHBlb3BsZUZpbHRlck1hcH1cbn0pXG4uY2F0Y2goKGVycm9yKT0+e1xuICBjb25zb2xlLmxvZyhlcnJvcik7ICBcbn0pO1xuXG4vLyAtLS0tLS0gQUpBWCBSRVFVRVNUIC0tLS0tLVxuY29uc3QgSHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuY29uc3QgdXJsMT0naHR0cHM6Ly9zd2FwaS5jby9hcGkvcGVvcGxlLyc7XG5IdHRwLm9wZW4oJ0dFVCcsIHVybDEpO1xuSHR0cC5zZW5kKCk7XG5cbkh0dHAub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7XG4gIGlmKHRoaXMucmVhZHlTdGF0ZT09NCAmJiB0aGlzLnN0YXR1cz09MjAwKXtcbiAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKEh0dHAucmVzcG9uc2VUZXh0KSk7XG4gICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShIdHRwLnJlc3BvbnNlVGV4dCkucmVzdWx0cyk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLSBNRU5VIEhPVkVSIC0tLS0tLVxuLy8gY29uc3QgYWxsVGFyZ2V0czIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b10nKTtcbi8vIGNvbnN0IGxpbmtzMiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFsbFRhcmdldHMyKTtcbi8vIGNvbnN0IGFsbFRhYnMyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpXG5cbi8vIGxpbmtzMi5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rKXtcbi8vICAgY29uc3QgbGlua1RhcmdldCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLXRvJylcblxuLy8gICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCl7XG4vLyAgICAgY29uc3QgdGFyZ2V0cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFsbFRhYnMyKTsgICAgICBcbi8vICAgICB0YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCl7XG4vLyAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG5cbi8vICAgICAgIGlmKGxpbmtUYXJnZXQgPT09IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJykpe1xuLy8gICAgICAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcbi8vICAgICAgICAgbGlua3MyLmZvckVhY2goYnRuID0+e1xuLy8gICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbi8vICAgICAgICAgfSlcbi8vICAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbi8vICAgICAgIH1cbi8vICAgICB9KVxuLy8gICB9KTtcbi8vIH0pO1xuXG5jb25zdCBtZW51UHJpbmNpcGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbWVudV0nKTtcbm1lbnVQcmluY2lwYWwgJiYgbWVudVByaW5jaXBhbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCk9PntcbiAgICBjb25zdCB0YXJnZXRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYWxsVGFiczIpO1xuICAgIHRhcmdldHMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KXtcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcbiAgICB9KTtcbn0pO1xuXG4vLyAtLS0tLS0gU0VBUkNIIC0tLS0tLVxuY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc2VhcmNoXScpO1xuXG5zZWFyY2ggJiYgc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCk9PntcbiAgY29uc3QgZmlsdGVyID0gc2VhcmNoLnZhbHVlO1xuICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlc3VsdHNdJyk7XG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyk7XG4gIHVsLmlubmVySFRNTD1cIlwiO1xuICBjb25zdCBhcnJheUxpID0gQXJyYXkuZnJvbShsaSk7XG4gIGFycmF5TGkuZmlsdGVyKChpdGVtKT0+e1xuICAgIGNvbnN0IGl0ZW1Mb3dlciA9IGl0ZW0udGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTsgICAgIFxuICAgIGNvbnN0IGZpbHRlckxvd2VyID0gZmlsdGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYoZmlsdGVyTG93ZXIgJiYgaXRlbUxvd2VyLm1hdGNoKGZpbHRlckxvd2VyKSl7XG4gICAgICB1bC5pbm5lckhUTUwgKz0gYDxsaT4ke2l0ZW0udGV4dENvbnRlbnR9PC9saT5gO1xuICAgIH1cbiAgfSk7IFxufSk7XG5cbi8vIC0tLS0tLSBDT00gTElOSyBFIEFQRU5BUyBURVhUTyAtLS0tLS1cbi8vIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNlYXJjaF0nKVxuXG4vLyBzZWFyY2ggJiYgc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCk9Pntcbi8vICAgY29uc3QgdmFsID0gc2VhcmNoLnZhbHVlXG4vLyAgIGNvbnN0IHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcmVzdWx0c10nKVxuLy8gICBjb25zdCBsaSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWxpbmtdJylcbi8vICAgY29uc3QgYXJyYXlMaSA9IEFycmF5LmZyb20obGkpXG4vLyAgIHVsLmlubmVySFRNTD1cIlwiO1xuLy8gICBhcnJheUxpLmZpbHRlcigoaXRlbSk9Pntcbi8vICAgICBjb25zdCB1cmwgPSBpdGVtLmdldEF0dHJpYnV0ZSgnaHJlZicpXG4vLyAgICAgY29uc3QgdGV4dCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtdGV4dF0nKVxuLy8gICAgIGNvbnN0IGl0ZW1Mb3dlciA9IHRleHQudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKVxuLy8gICAgIGNvbnN0IHZhbExvd2VyID0gdmFsLnRvTG93ZXJDYXNlKClcbi8vICAgICBpZih2YWxMb3dlciAmJiBpdGVtTG93ZXIubWF0Y2godmFsTG93ZXIpKXtcbi8vICAgICAgIHVsLmlubmVySFRNTCArPSBgPGxpPjxhIGhyZWY9XCIke3VybH1cIj4ke3RleHQudGV4dENvbnRlbnR9PC9hPjwvbGk+YFxuLy8gICAgIH1cbi8vICAgfSkgXG4vLyB9KVxuXG4vLyAtLS0tLS0gVEFCUyBJVFNFTEYgLS0tLS0tXG5jb25zdCBhbGxMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWxpbmtdJyk7XG5jb25zdCBhbGxTZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNlY3Rpb25dJyk7XG5jb25zdCBsaW5rc0FyciA9IEFycmF5LmZyb20oYWxsTGlua3MpO1xuY29uc3Qgc2VjdGlvbnNBcnIgPSBBcnJheS5mcm9tKGFsbFNlY3Rpb25zKTtcblxubGlua3NBcnIubWFwKChsaW5rKT0+e1xuICBzZWN0aW9uc0Fyci5tYXAoKChzZWN0aW9uKT0+e1xuICAgIGNvbnN0IGF0dExpbmsgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rJyk7XG4gICAgY29uc3QgYXR0U2VjdGlvbiA9IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLXNlY3Rpb24nKTtcbiAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgICAgIGlmKGF0dExpbmsgPT09IGF0dFNlY3Rpb24pe1xuICAgICAgICBfdG9nZ2xlSXRzZWxmKGxpbmssIHNlY3Rpb24pO1xuICAgICAgICBzZWN0aW9uLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VjdGlvbi5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkpO1xufSk7XG5cbi8vIGxpbmtzQXJyLm1hcCgobGluayk9Pntcbi8vICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7ICAgICBcbi8vICAgICBzZWN0aW9uc0Fyci5tYXAoKHRhcmdldCk9Pntcbi8vICAgICAgIGNvbnN0IGxpbmtMaW5rID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycpXG4vLyAgICAgICBjb25zdCBzZWN0aW9uVGFyZ2V0ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1zZWN0aW9uJylcblxuLy8gICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuXG4vLyAgICAgICBpZihsaW5rTGluayA9PT0gc2VjdGlvblRhcmdldCl7XG4vLyAgICAgICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuXG4vLyAgICAgICAgIGxpbmtzQXJyLm1hcChidG4gPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKVxuLy8gICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuLy8gICAgICAgfVxuXG4vLyAgICAgICBlbHNlIGlmKGxpbmtMaW5rID09PSBzZWN0aW9uVGFyZ2V0ICYmICF0YXJnZXQuaGFzQXR0cmlidXRlKCdoaWRkZW4nKSl7XG4vLyAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKVxuLy8gICAgICAgfVxuLy8gICAgIH0pXG4vLyAgIH0pO1xuLy8gfSk7XG5cbn0oKSk7XG4iXX0=
