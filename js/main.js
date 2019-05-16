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
  var allTargets2 = document.querySelectorAll('[data-to]');
  var links2 = Array.prototype.slice.call(allTargets2);
  var allTabs2 = document.querySelectorAll('[data-tab]');

  links2.forEach(function (link) {
    var linkTarget = link.getAttribute('data-to');

    link.addEventListener('mouseover', function () {
      var targets = Array.prototype.slice.call(allTabs2);
      targets.forEach(function (target) {
        target.setAttribute('hidden', '');

        if (linkTarget === target.getAttribute('data-tab')) {
          target.removeAttribute('hidden');
          links2.forEach(function (btn) {
            btn.classList.remove('active');
          });
          link.classList.add('active');
        }
      });
    });
  });

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
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiU2xpZGVyIiwiY29uZmlnIiwidHlwZSIsInBhcmVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBhcmVudFNlbGVjdG9yIiwiY2hpbGRTZWxlY3RvciIsImNoaWxkcmVuIiwibGVuZ3RoIiwiaW5kZXgiLCJkdXJhdGlvbiIsImNsYXNzTGlzdCIsImFkZCIsImNvbXBvc2UiLCJmbiIsImZvckVhY2giLCJtYXAiLCJmaWx0ZXIiLCJmaW5kIiwibmV4dEluZGV4IiwicHJldkluZGV4IiwiZWwiLCJpIiwicmVtb3ZlIiwidGhhdCIsInBsYXlpbmdTdGF0ZUlEIiwic2V0SW50ZXJ2YWwiLCJuZXh0IiwiaXNQbGF5aW5nIiwiY2xlYXJJbnRlcnZhbCIsInBhdXNlIiwicGxheSIsInBsYXlpbmdTdGF0ZSIsImV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb2xsYXBzZWQiLCJjb25zb2xlIiwidGFibGUiLCJPYmplY3QiLCJrZXlzIiwicHJvcCIsImtleSIsInZhbHVlIiwibG9nIiwid2FybiIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsImdyb3VwRW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQ2Fyb3VzZWwiLCJzaXplIiwicG9zaXRpb24iLCJzbGlkZSIsIml0ZW1PcmRlciIsInNldEF0dHJpYnV0ZSIsImNsYXNzTmFtZSIsInN0eWxlIiwib3JkZXIiLCJkaXIiLCJhbmltQ2xhc3NOYW1lIiwicmVtb3ZlV2lsbFJlbmRlckNsYXNzIiwiX21hcCIsIndoYXQiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwidyIsImNyZWF0ZUVsZW1lbnQiLCJhdHRycyIsImVsZW1lbnQiLCJOb2RlIiwiZXh0ZW5kIiwib2JqIiwicHJvcHMiLCJleHRlbmRlcnMiLCJzdHlsZXMiLCJkYXRhc2V0IiwiZGF0YSIsIm5hbWUiLCJldmVudHMiLCJjYWxsYmFja3MiLCJraWRzIiwiayIsImFwcGVuZENoaWxkIiwidmFsIiwiTGlnaHRib3giLCJzZWxlY3RvciIsImNvbnRhaW5lciIsIm1vZGFsIiwiZ3JpZCIsInByZXYiLCJ3cmFwcGVyIiwicGFyZW50RWxlbWVudCIsImJvZHkiLCJjbG9zZUJ1dHRvbiIsImltZyIsIml0ZW1zIiwic2hvdyIsInNyYyIsImdldEF0dHJpYnV0ZSIsIm9wZW4iLCJjZWxsIiwiaW5uZXJIVE1MIiwiYnRuIiwiY2xpY2siLCJnb1ByZXYiLCJnb05leHQiLCJjbG9zZSIsImRvbU5vZGVzIiwic2xpZGVyT3B0aW9ucyIsImF1dG9wbGF5Iiwic2xpZGVyIiwib24iLCJjb25maWdTbGlkZXIiLCJmaXJzdCIsImdvVG8iLCJvcHRpb25zIiwiaGFzQXR0cmlidXRlIiwic3BsaXQiLCJvcHRpb24iLCJzbGlkZXJDYWxsYmFja3MiLCJvcGVuT25Nb2JpbGUiLCJzY3JlZW4iLCJ3aWR0aCIsInRhcmdldCIsImNvbnRyb2wiLCJ0YXJnZXRFbGVtZW50IiwiYWN0aW9uIiwiYWN0aW9uRGF0YSIsInBhcmFtcyIsImFwcGx5IiwibWFzY2FyYXMiLCJub21lIiwiY2FtcG8iLCJ0ZXN0IiwicmVncmEiLCJ2YWxvcmVzIiwibWF0Y2giLCJqb2luIiwicmVwbGFjZSIsImNlcCIsInJlZ3JhcyIsInN1YnN0ciIsInRlbGVmb25lIiwidmFsb3IiLCJyZyIsImxldHJhcyIsImRpZ2l0byIsInRvVXBwZXJDYXNlIiwiY3BmY25waiIsIm51bWVyb3MiLCJjcGYiLCJjbnBqIiwiYWxsIiwiYSIsImIiLCJjIiwiZCIsImUiLCJib3JkZXJDb2xvciIsImRkIiwiczEiLCJtbSIsInMyIiwiYWFhYSIsImVtYWlsIiwidG9Mb3dlckNhc2UiLCJzZW5oYSIsIl9jcmVhdGVOb2RlIiwiX2FwcGVuZCIsIl90b2dnbGVJdHNlbGYiLCJjb250ZW50IiwicmVtb3ZlQXR0cmlidXRlIiwiYWxsVGFyZ2V0cyIsImxpbmtzIiwibGluayIsImxpbmtUYXJnZXQiLCJhbGxUYWJzIiwidGFyZ2V0cyIsImJ0bkNyZWF0ZUVsIiwibmV3TGlzdCIsInN1bVJlZHVjZXIiLCJhcmdzIiwiYXJndW1lbnRzIiwiZmxhdEFyZ3MiLCJmbGF0IiwiSW5maW5pdHkiLCJudW1iZXJBcmdzIiwibiIsInJlZHVjZSIsInN1bSIsInJlc3VsdCIsInJlc3VsdFN1bSIsIm5ld0RpdiIsImdldEVsZW1lbnRCeUlkIiwidXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJhdXRob3JzIiwicmVzdWx0cyIsImF1dGhvciIsImRpdiIsInAiLCJwaWN0dXJlIiwibWVkaXVtIiwibGFzdCIsImNhdGNoIiwiZXJyb3IiLCJ3aW5kb3ciLCJzbGlkZXJzIiwiY2Fyb3VzZWxzIiwiY2Fyb3VzZWwiLCJsaWdodGJveCIsImVhY2giLCJmIiwiZm9ybSIsIkZvcm1NYXNrIiwiZnJvbSIsImVsZW1lbnRzIiwibWV0b2RvIiwicGsiLCJtYWtlT2JqIiwiYXJyYXkiLCJjbGVhckZvcm0iLCJidG5FbnZpYXIiLCJidG5EZWxldGFyIiwiaW5kZXhBcnJheSIsImZpbmRJbmRleCIsImVsZW0iLCJwdXNoIiwidHJhbnNmb3JtVGV4dCIsInJlc2V0IiwiYWxlcnQiLCJvYmplY3RUZXh0IiwiYWNjIiwiaXRlbSIsImRhdGFDb250YWluZXIiLCJhcnJheVJlbW92ZSIsImFyciIsImVsZSIsImFnZSIsImRvZ3MiLCJhbmltYWwiLCJjYWxjQWdlIiwiZGF0YUdyaWQiLCJkYXRhR3JpZEZpbHRlciIsInN3YXBpIiwicGVvcGxlIiwicGVvcGxlTWFwIiwicGVvcGxlRmlsdGVyIiwiaGFpcl9jb2xvciIsInBlb3BsZUZpbHRlck1hcCIsIkh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsInVybDEiLCJzZW5kIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsImFsbFRhcmdldHMyIiwibGlua3MyIiwiYWxsVGFiczIiLCJtZW51UHJpbmNpcGFsIiwic2VhcmNoIiwidWwiLCJsaSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXJyYXlMaSIsIml0ZW1Mb3dlciIsInRleHRDb250ZW50IiwiZmlsdGVyTG93ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUMsYUFBWTtBQUNiOztBQURhLE1BR1BBLE1BSE87QUFLVCxvQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNsQixXQUFLQyxJQUFMLEdBQVksUUFBWjtBQUNBLFVBQUksRUFBRSxnQkFBZ0JGLE1BQWxCLENBQUosRUFBK0IsT0FBTyxJQUFJQSxNQUFKLENBQVdDLE1BQVgsQ0FBUDs7QUFFL0IsV0FBS0UsTUFBTCxHQUFjRixPQUFPRSxNQUFQLElBQWlCQyxTQUFTQyxhQUFULENBQXVCSixPQUFPSyxjQUFQLElBQXlCLFNBQWhELENBQS9CO0FBQ0EsVUFBSSxDQUFDLEtBQUtILE1BQVYsRUFBa0IsTUFBTSxxQ0FBTjs7QUFFbEIsV0FBS0ksYUFBTCxHQUFxQk4sT0FBT00sYUFBUCxJQUF3QixRQUE3QztBQUNBLFVBQUksQ0FBQyxLQUFLQyxRQUFMLENBQWNDLE1BQW5CLEVBQTJCLE1BQU0sbUNBQU47O0FBRTNCLFdBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQlYsT0FBT1UsUUFBUCxJQUFtQixJQUFuQztBQUNBLFdBQUtSLE1BQUwsQ0FBWVMsU0FBWixDQUFzQkMsR0FBdEIsQ0FBMEIsS0FBMUI7QUFDQSxXQUFLQyxPQUFMO0FBQ0Q7O0FBbkJRO0FBQUE7QUFBQSw4QkE2QkRDLEVBN0JDLEVBNkJHO0FBQ1YsZUFBTyxLQUFLUCxRQUFMLENBQWNRLE9BQWQsQ0FBc0JELEVBQXRCLENBQVA7QUFDRDtBQS9CUTtBQUFBO0FBQUEsMEJBaUNMQSxFQWpDSyxFQWlDRDtBQUNOLGVBQU8sS0FBS1AsUUFBTCxDQUFjUyxHQUFkLENBQWtCRixFQUFsQixDQUFQO0FBQ0Q7QUFuQ1E7QUFBQTtBQUFBLDZCQXFDRkEsRUFyQ0UsRUFxQ0U7QUFDVCxlQUFPLEtBQUtQLFFB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TUFBTXFOLFNBQVM5USxTQUFTQyxhQUFULENBQXVCLGVBQXZCLENBQWY7O0FBRUE2USxZQUFVQSxPQUFPL08sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBSTtBQUM3QyxRQUFNakIsU0FBU2dRLE9BQU90TyxLQUF0QjtBQUNBLFFBQU11TyxLQUFLL1EsU0FBU0MsYUFBVCxDQUF1QixnQkFBdkIsQ0FBWDtBQUNBLFFBQU0rUSxLQUFLaFIsU0FBU2lSLG9CQUFULENBQThCLElBQTlCLENBQVg7QUFDQUYsT0FBR3ZLLFNBQUgsR0FBYSxFQUFiO0FBQ0EsUUFBTTBLLFVBQVVuTyxNQUFNOEssSUFBTixDQUFXbUQsRUFBWCxDQUFoQjtBQUNBRSxZQUFRcFEsTUFBUixDQUFlLFVBQUNpTyxJQUFELEVBQVE7QUFDckIsVUFBTW9DLFlBQVlwQyxLQUFLcUMsV0FBTCxDQUFpQjVHLFdBQWpCLEVBQWxCO0FBQ0EsVUFBTTZHLGNBQWN2USxPQUFPMEosV0FBUCxFQUFwQjtBQUNBLFVBQUc2RyxlQUFlRixVQUFVeEksS0FBVixDQUFnQjBJLFdBQWhCLENBQWxCLEVBQStDO0FBQzdDTixXQUFHdkssU0FBSCxhQUF1QnVJLEtBQUtxQyxXQUE1QjtBQUNEO0FBQ0YsS0FORDtBQU9ELEdBYlMsQ0FBVjtBQWVDLENBdjRCQSxHQUFEIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBTbGlkZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG4gICAgICB0aGlzLnR5cGUgPSAnU2xpZGVyJztcclxuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNsaWRlcikpIHJldHVybiBuZXcgU2xpZGVyKGNvbmZpZyk7XHJcbiAgXHJcbiAgICAgIHRoaXMucGFyZW50ID0gY29uZmlnLnBhcmVudCB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5wYXJlbnRTZWxlY3RvciB8fCAnLnNsaWRlcicpO1xyXG4gICAgICBpZiAoIXRoaXMucGFyZW50KSB0aHJvdyAnW1NMSURFUl06IENvbnRhaW5lciBuw6NvIGVuY29udHJhZG8uJztcclxuICBcclxuICAgICAgdGhpcy5jaGlsZFNlbGVjdG9yID0gY29uZmlnLmNoaWxkU2VsZWN0b3IgfHwgJy5zbGlkZSc7XHJcbiAgICAgIGlmICghdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHRocm93ICdbU0xJREVSXTogU2xpZGVzIG7Do28gZW5jb250cmFkb3MuJztcclxuICBcclxuICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgIHRoaXMuZHVyYXRpb24gPSBjb25maWcuZHVyYXRpb24gfHwgMzAwMDtcclxuICAgICAgdGhpcy5wYXJlbnQuY2xhc3NMaXN0LmFkZCgnc2V0Jyk7XHJcbiAgICAgIHRoaXMuY29tcG9zZSgpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZ2V0IGNoaWxkcmVuKCkge1xyXG4gICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5wYXJlbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmNoaWxkU2VsZWN0b3IpKTtcclxuICAgIH1cclxuICBcclxuICAgIGdldCBsZW5ndGgoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcclxuICAgIH1cclxuICBcclxuICAgIGZvckVhY2goZm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmbik7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBtYXAoZm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubWFwKGZuKTtcclxuICAgIH1cclxuICBcclxuICAgIGZpbHRlcihmbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maWx0ZXIoZm4pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZmluZChmbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maW5kKGZuKTtcclxuICAgIH1cclxuICBcclxuICAgIGNvbXBvc2UoKSB7XHJcbiAgICAgIHZhciBuZXh0SW5kZXgsIHByZXZJbmRleDtcclxuICAgICAgcHJldkluZGV4ID0gdGhpcy5pbmRleCA+IDAgPyB0aGlzLmluZGV4IC0gMSA6IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcclxuICAgICAgbmV4dEluZGV4ID0gdGhpcy5pbmRleCA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMSA/IHRoaXMuaW5kZXggKyAxIDogMDtcclxuICAgICAgdGhpcy5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ByZXYnKTtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50Jyk7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnbmV4dCcpO1xyXG4gICAgICAgIGlmIChpID09PSBwcmV2SW5kZXgpIGVsLmNsYXNzTGlzdC5hZGQoJ3ByZXYnKTtcclxuICAgICAgICBpZiAoaSA9PT0gbmV4dEluZGV4KSBlbC5jbGFzc0xpc3QuYWRkKCduZXh0Jyk7XHJcbiAgICAgICAgaWYgKGkgPT09IHRoaXMuaW5kZXgpIGVsLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQnKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgcGxheSgpIHtcclxuICAgICAgdmFyIHRoYXQ7XHJcbiAgICAgIHRoYXQgPSB0aGlzO1xyXG4gICAgICB0aGlzLnBsYXlpbmdTdGF0ZUlEID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGF0Lm5leHQoKTtcclxuICAgICAgfSwgdGhpcy5kdXJhdGlvbik7XHJcbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnBsYXlpbmdTdGF0ZUlEKTtcclxuICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBwbGF5cGF1c2UoKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzUGxheWluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdXNlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICBwcmV2KCkge1xyXG4gICAgICB2YXIgcGxheWluZ1N0YXRlO1xyXG4gICAgICBpZiAodGhpcy5pbmRleCA+IDApIHtcclxuICAgICAgICB0aGlzLmluZGV4LS07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcclxuICAgICAgfVxyXG4gICAgICBwbGF5aW5nU3RhdGUgPSB0aGlzLmlzUGxheWluZztcclxuICAgICAgaWYgKHBsYXlpbmdTdGF0ZSkge1xyXG4gICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNvbXBvc2UoKTtcclxuICAgICAgaWYgKHBsYXlpbmdTdGF0ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgbmV4dCgpIHtcclxuICAgICAgdmFyIHBsYXlpbmdTdGF0ZTtcclxuICAgICAgaWYgKHRoaXMuaW5kZXggPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICB0aGlzLmluZGV4Kys7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgcGxheWluZ1N0YXRlID0gdGhpcy5pc1BsYXlpbmc7XHJcbiAgICAgIGlmIChwbGF5aW5nU3RhdGUpIHtcclxuICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb21wb3NlKCk7XHJcbiAgICAgIGlmIChwbGF5aW5nU3RhdGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIGdvVG8oaW5kZXgpIHtcclxuICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICByZXR1cm4gdGhpcy5jb21wb3NlKCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBvbihldmVudCwgZm4pIHtcclxuICAgICAgdGhpcy5wYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZm4pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICBcclxuICAgIG9mZihldmVudCwgZm4pIHtcclxuICAgICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZm4pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICBcclxuICAgIGluc3BlY3QoY29sbGFwc2VkKSB7XHJcbiAgICAgIGNvbnNvbGVbY29sbGFwc2VkID09PSB0cnVlID8gJ2dyb3VwQ29sbGFwc2VkJyA6ICdncm91cCddKHRoaXMudHlwZSk7XHJcbiAgICAgIGNvbnNvbGUudGFibGUoXHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcykubWFwKGtleSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwcm9wOiBrZXksXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzW2tleV0sXHJcbiAgICAgICAgICAgIHR5cGU6IHR5cGVvZiB0aGlzW2tleV1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnBhcmVudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2hpbGRyZW4pO1xyXG4gICAgICBjb25zb2xlLndhcm4oRGF0ZS5ub3coKS50b1N0cmluZygpKTtcclxuICAgICAgY29uc29sZS5ncm91cEVuZCh0aGlzLnR5cGUpO1xyXG4gIFxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICBcclxuICB9XG5cbmNsYXNzIENhcm91c2VsIGV4dGVuZHMgU2xpZGVyIHtcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICBjb25maWcucGFyZW50U2VsZWN0b3IgPSBjb25maWcucGFyZW50U2VsZWN0b3IgfHwgJy5jYXJvdXNlbCc7XHJcbiAgICBzdXBlcihjb25maWcpO1xyXG4gICAgdGhpcy50eXBlID0gJ0Nhcm91c2VsJztcclxuICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplIHwgMDtcclxuICAgIHRoaXMuY29tcG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9zZSgpIHtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5pbmRleCArIDE7XHJcbiAgICB0aGlzLmZvckVhY2goKHNsaWRlLCBpKSA9PiB7XHJcbiAgICAgIGxldCBpdGVtT3JkZXIgPSBpIC0gcG9zaXRpb24gKyAxO1xyXG4gICAgICBpZiAoaXRlbU9yZGVyIDwgMCkgaXRlbU9yZGVyID0gdGhpcy5sZW5ndGggLSBwb3NpdGlvbiArIGkgKyAxO1xyXG4gICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3JkZXInLCBpdGVtT3JkZXIpO1xyXG5cclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgncHJldicpO1xyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50Jyk7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ25leHQnKTtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnd2lsbC1nby1wcmV2Jyk7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dpbGwtZ28tbmV4dCcpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuc2l6ZSkge1xyXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9XHJcbiAgICAgICAgICB0aGlzLmxlbmd0aCA8PSB0aGlzLnNpemUgPyAnY3VycmVudCcgOlxyXG4gICAgICAgICAgaXRlbU9yZGVyID4gLTEgJiYgaXRlbU9yZGVyIDwgdGhpcy5zaXplID8gJ2N1cnJlbnQnIDpcclxuICAgICAgICAgIGl0ZW1PcmRlciA9PT0gLTEgfHwgaXRlbU9yZGVyID09PSB0aGlzLmxlbmd0aCAtIDEgPyAncHJldicgOlxyXG4gICAgICAgICAgaXRlbU9yZGVyID09PSB0aGlzLnNpemUgPyAnbmV4dCcgOlxyXG4gICAgICAgICAgJyc7XHJcbiAgICAgICAgaWYgKCFjbGFzc05hbWUpIHJldHVybiB0aGlzO1xyXG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICBzbGlkZS5zdHlsZS5vcmRlciA9IGl0ZW1PcmRlcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuZGlyKSB7XHJcbiAgICAgICAgY29uc3QgYW5pbUNsYXNzTmFtZSA9ICd3aWxsLWdvLScgKyB0aGlzLmRpcjtcclxuICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGFuaW1DbGFzc05hbWUpO1xyXG4gICAgICAgIHNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRBbmltYXRpb25FbmRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZW1vdmVXaWxsUmVuZGVyQ2xhc3Moc2xpZGUsIGFuaW1DbGFzc05hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZW1vdmVXaWxsUmVuZGVyQ2xhc3Moc2xpZGUsIGFuaW1DbGFzc05hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlV2lsbFJlbmRlckNsYXNzKHNsaWRlLCBjbGFzc05hbWUpIHtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHJldigpIHtcclxuICAgIHRoaXMuZGlyID0gJ3ByZXYnO1xyXG4gICAgcmV0dXJuIHN1cGVyLnByZXYoKTtcclxuICB9XHJcblxyXG4gIG5leHQoKSB7XHJcbiAgICB0aGlzLmRpciA9ICduZXh0JztcclxuICAgIHJldHVybiBzdXBlci5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBnb1RvKGluZGV4KSB7XHJcbiAgICB0aGlzLmRpciA9IGluZGV4ID4gdGhpcy5pbmRleCA/ICduZXh0JyA6ICdwcmV2JztcclxuICAgIHJldHVybiBzdXBlci5nb1RvKGluZGV4KTtcclxuICB9XHJcblxyXG59XG5cbmZ1bmN0aW9uIF9tYXAod2hhdCwgY2FsbGJhY2spIHtcclxuICAgIGlmICh0eXBlb2Ygd2hhdCA9PT0gJ3N0cmluZycpIHdoYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHdoYXQpO1xyXG4gICAgaWYgKCEod2hhdCBpbnN0YW5jZW9mIEFycmF5KSkgd2hhdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHdoYXQpO1xyXG4gICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHdoYXQgPSB3aGF0Lm1hcCh3ID0+IGNhbGxiYWNrKHcpKTtcclxuICAgIHJldHVybiB3aGF0O1xyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGVsLCBhdHRycykge1xyXG4gIFxyXG4gICAgZnVuY3Rpb24gZWxlbWVudChlbCwgYXR0cnMpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKTtcclxuICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIE5vZGUpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKGF0dHJzKSBleHRlbmQoZWwsIGF0dHJzKTtcclxuICAgICAgICByZXR1cm4gZWw7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBmdW5jdGlvbiBleHRlbmQob2JqLCBwcm9wcykge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuZGVycyA9IHtcclxuICAgICAgICAgICAgc3R5bGU6IGZ1bmN0aW9uIChzdHlsZXMpIHtcclxuICAgICAgICAgICAgICAgIGV4dGVuZChvYmouc3R5bGUsIHN0eWxlcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGFzZXQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIGRhdGEpIG9iai5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIG5hbWUsIGRhdGFbbmFtZV0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBldmVudHM6IGZ1bmN0aW9uIChjYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gY2FsbGJhY2tzKSBvYmouYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBjYWxsYmFja3NbbmFtZV0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogZnVuY3Rpb24gKGtpZHMpIHtcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoa2lkcywgZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouYXBwZW5kQ2hpbGQoayk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBwcm9wcykge1xyXG4gICAgICAgICAgICAoZXh0ZW5kZXJzW25hbWVdIHx8IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgICAgIG9ialtuYW1lXSA9IHZhbDtcclxuICAgICAgICAgICAgfSkocHJvcHNbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIHJldHVybiBlbGVtZW50KGVsLCBhdHRycyk7XHJcbiAgfVxuXG5jbGFzcyBMaWdodGJveCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1jb250YWluZXInKSB8fCBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LWNvbnRhaW5lcicsXHJcbiAgICAgICAgICAgIGRhdGFzZXQ6IHtcclxuICAgICAgICAgICAgICAgIG1vZGFsOiAnJyxcclxuICAgICAgICAgICAgICAgIGdyaWQ6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5wcmV2KTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubmV4dCk7XHJcbiAgICAgICAgLy90aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlQnV0dG9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucGFyZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VCdXR0b24pO1xyXG4gICAgICAgIHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLmltZyk7XHJcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpbWcsIGkpID0+IHtcclxuICAgICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KGkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldCB3cmFwcGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtd3JhcHBlcicpIHx8IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtd3JhcHBlcicsXHJcbiAgICAgICAgICAgIGRhdGFzZXQ6IHtcclxuICAgICAgICAgICAgICAgIGNlbGw6ICdzaHJpbmsnLFxyXG4gICAgICAgICAgICAgICAgZ3JpZDogJ2NvbHVtbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXQgcHJldigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LXByZXYnKSB8fCBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LXByZXYnLFxyXG4gICAgICAgICAgICBpbm5lckhUTUw6ICc8c3ZnIHhtbG5zPVwiaHR0cHM6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld2JveD1cIjAgMCAxMjkgMTI5XCI+PHBhdGggZD1cIk04OC42IDEyMS4zYy44LjggMS44IDEuMiAyLjkgMS4yczIuMS0uNCAyLjktMS4yYzEuNi0xLjYgMS42LTQuMiAwLTUuOGwtNTEtNTEgNTEtNTFjMS42LTEuNiAxLjYtNC4yIDAtNS44cy00LjItMS42LTUuOCAwbC01NCA1My45Yy0xLjYgMS42LTEuNiA0LjIgMCA1LjhsNTQgNTMuOXpcIiAvPjwvc3ZnPicsXHJcbiAgICAgICAgICAgIGRhdGFzZXQ6IHtcclxuICAgICAgICAgICAgICAgIGJ0bjogJ2xpbmsnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMuZ29QcmV2KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IG5leHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1uZXh0JykgfHwgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1uZXh0JyxcclxuICAgICAgICAgICAgaW5uZXJIVE1MOiAnPHN2ZyB4bWxucz1cImh0dHBzOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdib3g9XCIwIDAgMTI5IDEyOVwiPjxwYXRoIGQ9XCJNNDAuNCAxMjEuM2MtLjguOC0xLjggMS4yLTIuOSAxLjJzLTIuMS0uNC0yLjktMS4yYy0xLjYtMS42LTEuNi00LjIgMC01LjhsNTEtNTEtNTEtNTFjLTEuNi0xLjYtMS42LTQuMiAwLTUuOCAxLjYtMS42IDQuMi0xLjYgNS44IDBsNTMuOSA1My45YzEuNiAxLjYgMS42IDQuMiAwIDUuOGwtNTMuOSA1My45elwiIC8+PC9zdmc+JyxcclxuICAgICAgICAgICAgZGF0YXNldDoge1xyXG4gICAgICAgICAgICAgICAgYnRuOiAnbGluaydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXZlbnRzOiB7XHJcbiAgICAgICAgICAgICAgICBjbGljazogKCkgPT4gdGhpcy5nb05leHQoKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IGNsb3NlQnV0dG9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtY2xvc2UnKSB8fCBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LWNsb3NlJyxcclxuICAgICAgICAgICAgaW5uZXJIVE1MOiAnPHN2ZyB4bWxucz1cImh0dHBzOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdib3g9XCIwIDAgNTEyIDUxMlwiPjxwYXRoIGZpbGw9XCIjZmZmXCIgZD1cIk01MDUuOTQzIDYuMDU4Yy04LjA3Ny04LjA3Ny0yMS4xNzItOC4wNzctMjkuMjQ5IDBMNi4wNTggNDc2LjY5M2MtOC4wNzcgOC4wNzctOC4wNzcgMjEuMTcyIDAgMjkuMjQ5QTIwLjYxMiAyMC42MTIgMCAwIDAgMjAuNjgzIDUxMmEyMC42MTQgMjAuNjE0IDAgMCAwIDE0LjYyNS02LjA1OUw1MDUuOTQzIDM1LjMwNmM4LjA3Ni04LjA3NiA4LjA3Ni0yMS4xNzEgMC0yOS4yNDh6XCIvPjxwYXRoIGZpbGw9XCIjZmZmXCIgZD1cIk01MDUuOTQyIDQ3Ni42OTRMMzUuMzA2IDYuMDU5Yy04LjA3Ni04LjA3Ny0yMS4xNzItOC4wNzctMjkuMjQ4IDAtOC4wNzcgOC4wNzYtOC4wNzcgMjEuMTcxIDAgMjkuMjQ4bDQ3MC42MzYgNDcwLjYzNmEyMC42MTYgMjAuNjE2IDAgMCAwIDE0LjYyNSA2LjA1OCAyMC42MTUgMjAuNjE1IDAgMCAwIDE0LjYyNC02LjA1N2M4LjA3NS04LjA3OCA4LjA3NS0yMS4xNzMtLjAwMS0yOS4yNXpcIi8+PC9zdmc+JyxcclxuICAgICAgICAgICAgZGF0YXNldDoge1xyXG4gICAgICAgICAgICAgICAgYnRuOiAnbGluaycsXHJcbiAgICAgICAgICAgICAgICBjZWxsOiAnc2hyaW5rIGVuZCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXZlbnRzOiB7XHJcbiAgICAgICAgICAgICAgICBjbGljazogKCkgPT4gdGhpcy5jbG9zZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBpdGVtcygpIHtcclxuICAgICAgICB2YXIgZG9tTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2VsZWN0b3IpO1xyXG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb21Ob2Rlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGltZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1pbWcnKSB8fCBjcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LWltZycsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbigpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXJnZXQnKTtcclxuICAgIH1cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3RhcmdldCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgY29uc3QgaW1nID0gdGhpcy5pdGVtc1tpbmRleF07XHJcbiAgICAgICAgY29uc3Qgc3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1saWdodGJveCcpID8gaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1saWdodGJveCcpIDogaW1nLnNyYztcclxuICAgICAgICB0aGlzLmltZy5zcmMgPSBzcmM7XHJcbiAgICAgICAgdGhpcy5vcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29QcmV2KCkge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXggLSAxO1xyXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvdyhpbmRleCk7XHJcbiAgICB9XHJcbiAgICBnb05leHQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleCArIDE7XHJcbiAgICAgICAgaWYgKGluZGV4ID49IHRoaXMuaXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB0aGlzLnNob3coaW5kZXgpO1xyXG4gICAgfVxyXG59XG5cbmNvbnN0IHNsaWRlck9wdGlvbnMgPSB7XHJcbiAgICBhdXRvcGxheTogc2xpZGVyID0+IHtcclxuICAgICAgc2xpZGVyXHJcbiAgICAgICAgLnBsYXkoKVxyXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgKCkgPT4gc2xpZGVyLnBhdXNlKCkpXHJcbiAgICAgICAgLm9uKCdtb3VzZW91dCcsICgpID0+IHNsaWRlci5wbGF5KCkpO1xyXG4gICAgfVxyXG4gIH07XHJcbmZ1bmN0aW9uIGNvbmZpZ1NsaWRlcihzbGlkZXIsIHBhcmVudCkge1xyXG4gICAgY29uc3QgZmlyc3QgPSBwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWZpcnN0JykgfCAwO1xyXG4gICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgIHNsaWRlci5nb1RvKGZpcnN0KTtcclxuICAgIH1cclxuICAgIGNvbnN0IG9wdGlvbnMgPSBwYXJlbnQuaGFzQXR0cmlidXRlKCdkYXRhLW9wdGlvbnMnKSA/IHBhcmVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3B0aW9ucycpLnNwbGl0KCcgJykgOiBbXTtcclxuICAgIG9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4gc2xpZGVyT3B0aW9uc1tvcHRpb25dICYmIHNsaWRlck9wdGlvbnNbb3B0aW9uXShzbGlkZXIpKTtcclxuICBcclxuICAgIGNvbnN0IHNsaWRlckNhbGxiYWNrcyA9IHtcclxuICAgICAgb3Blbk9uTW9iaWxlOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHNjcmVlbigpLndpZHRoID4gNjAwKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgZmlyc3QgPSBzbGlkZXIuZmluZChzbGlkZSA9PiBzbGlkZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3JkZXInKSA9PT0gJzAnKTtcclxuICAgICAgICBpZiAoIWZpcnN0KSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgYnRuID0gZmlyc3QucXVlcnlTZWxlY3RvcignLmluZm8taW1nIGFbaHJlZl49XCJqYXZhc2NyaXB0OlwiXScpO1xyXG4gICAgICAgIGlmICghYnRuKSByZXR1cm47XHJcbiAgICAgICAgYnRuLmNsaWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgXHJcbiAgICBfbWFwKCdbZGF0YS1jb250cm9sXScsIGNvbnRyb2wgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBjb250cm9sLmdldEF0dHJpYnV0ZSgnZGF0YS1jb250cm9sJyk7XHJcbiAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSB0YXJnZXQgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCkgOiBudWxsO1xyXG4gIFxyXG4gICAgICBpZiAodGFyZ2V0RWxlbWVudCAmJiB0YXJnZXRFbGVtZW50ID09PSBzbGlkZXIucGFyZW50KSB7XHJcbiAgICAgICAgY29uc3QgYWN0aW9uID0gY29udHJvbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJyk7XHJcbiAgICAgICAgaWYgKChhY3Rpb24gPT09ICdwcmV2JyB8fCBhY3Rpb24gPT09ICduZXh0JykgJiYgKHNsaWRlci5zaXplID49IHNsaWRlci5sZW5ndGgpKSB7XHJcbiAgICAgICAgICBjb250cm9sLnNldEF0dHJpYnV0ZSgnZGF0YS1vdmVyc2l6ZScsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhY3Rpb25EYXRhID0gY29udHJvbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyYW1zJyk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gYWN0aW9uRGF0YSA/IGFjdGlvbkRhdGEuc3BsaXQoJywnKSA6IG51bGw7XHJcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBjb250cm9sLmdldEF0dHJpYnV0ZSgnZGF0YS1jYWxsYmFjaycpO1xyXG4gICAgICAgIGlmIChhY3Rpb24gJiYgc2xpZGVyW2FjdGlvbl0gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgICAgY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2xpZGVyW2FjdGlvbl0uYXBwbHkoc2xpZGVyLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgc2xpZGVyQ2FsbGJhY2tzW2NhbGxiYWNrXSkgc2xpZGVyQ2FsbGJhY2tzW2NhbGxiYWNrXSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XG5cbmNvbnN0IG1hc2NhcmFzID0ge1xyXG5cclxuICAgIG5vbWU6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGlmICgvXlteYS16QS1aXSsvLnRlc3QoY2FtcG8udmFsdWUpKSBjYW1wby52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGNvbnN0IHJlZ3JhID0gL1stJ2EtekEtWsOALcOWw5gtw7bDuC3FvyBdKy9naTtcclxuICAgICAgICBjb25zdCB2YWxvcmVzID0gY2FtcG8udmFsdWUubWF0Y2gocmVncmEpO1xyXG4gICAgICAgIGlmICh2YWxvcmVzKSBjYW1wby52YWx1ZSA9IHZhbG9yZXMuam9pbignJykucmVwbGFjZSgvICsvZ2ksICcgJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNlcDogKGNhbXBvKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVncmFzID0gWy9cXGQrL2dpLCAvXihcXGR7NX0pLT8oXFxkezEsM30pL107XHJcbiAgICAgICAgY29uc3QgdmFsb3JlcyA9IGNhbXBvLnZhbHVlLm1hdGNoKHJlZ3Jhc1swXSk7XHJcbiAgICAgICAgaWYgKCF2YWxvcmVzKSByZXR1cm4gY2FtcG8udmFsdWUgPSAnJztcclxuICAgICAgICBjYW1wby52YWx1ZSA9IHZhbG9yZXMuam9pbignJyk7XHJcbiAgICAgICAgaWYgKHJlZ3Jhc1sxXS50ZXN0KGNhbXBvLnZhbHVlKSkgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS5yZXBsYWNlKHJlZ3Jhc1sxXSwgJyQxLSQyJyk7XHJcbiAgICAgICAgaWYgKGNhbXBvLnZhbHVlLmxlbmd0aCA+IDkpIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUuc3Vic3RyKDAsIDkpO1xyXG4gICAgfSxcclxuXHJcbiAgICB0ZWxlZm9uZTogKGNhbXBvKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVncmFzID0gWy9cXGQrL2dpLCAvXihcXGRcXGQ/KS8sIC9eKFxcZFxcZCkoXFxkezR9KS0/KFxcZHsxLDR9KS8sIC9eKFxcZFxcZCkoXFxkezV9KS0/KFxcZHsxLDR9KS9dO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yZXMgPSBjYW1wby52YWx1ZS5tYXRjaChyZWdyYXNbMF0pO1xyXG4gICAgICAgIGlmICghdmFsb3JlcykgcmV0dXJuIGNhbXBvLnZhbHVlID0gJyc7XHJcbiAgICAgICAgY29uc3QgdmFsb3IgPSBjYW1wby52YWx1ZSA9IHZhbG9yZXMuam9pbignJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDApIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbMV0sICcoJDEnKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gMikgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1sxXSwgJygkMSkgJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDYpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbMl0sICcoJDEpICQyLSQzJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDEwKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzNdLCAnKCQxKSAkMi0kMycpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAxMSkgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS5zdWJzdHIoMCwgMTUpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZzogKGNhbXBvKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVncmFzID0gWy9cXGQrL2dpLCAvXihcXGR7MSwyfSkvLCAvXihcXGR7MSwyfSlcXC4/KFxcZHszfSkvLCAvXihcXGR7MSwyfSlcXC4/KFxcZHszfSlcXC4/KFxcZHszfSkvLCAvXihcXGR7MSwyfSlcXC4/KFxcZHszfSlcXC4/KFxcZHszfSktPyhcXGQpPy9dO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yZXMgPSBjYW1wby52YWx1ZS5tYXRjaChyZWdyYXNbMF0pO1xyXG4gICAgICAgIGNvbnN0IGxldHJhcyA9IGNhbXBvLnZhbHVlLm1hdGNoKC9bYS16QS1aXSskL2dpKTtcclxuICAgICAgICBjb25zdCBkaWdpdG8gPSBsZXRyYXMgPyBsZXRyYXNbMF1bMF0gOiAnJztcclxuICAgICAgICBpZiAoIXZhbG9yZXMpIHJldHVybiBjYW1wby52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yID0gY2FtcG8udmFsdWUgPSB2YWxvcmVzLmpvaW4oJycpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAyKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzFdLCAnJDEuJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDUpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbMl0sICckMS4kMi4nKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gNykgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1szXSwgJyQxLiQyLiQzJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA9PT0gOCAmJiBkaWdpdG8pIGNhbXBvLnZhbHVlICs9ICctJyArIGRpZ2l0by50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA4KSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzRdLCAnJDEuJDIuJDMtJDQnKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gOSkgY2FtcG8udmFsdWUgPSBjYW1wby52YWx1ZS5zdWJzdHIoMCwgMTIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjcGZjbnBqOiAoY2FtcG8pID0+IHtcclxuICAgICAgICBjb25zdCBudW1lcm9zID0gL1xcZCsvZ2k7XHJcbiAgICAgICAgY29uc3QgdmFsb3JlcyA9IGNhbXBvLnZhbHVlLm1hdGNoKG51bWVyb3MpO1xyXG4gICAgICAgIGlmICghdmFsb3JlcykgcmV0dXJuIGNhbXBvLnZhbHVlID0gJyc7XHJcbiAgICAgICAgY29uc3QgdmFsb3IgPSB2YWxvcmVzLmpvaW4oJycpO1xyXG4gICAgICAgIGNvbnN0IGNwZiA9IC9eKFswLTldezEsM30pP1xcLj8oWzAtOV17MSwzfSk/XFwuPyhbMC05XXsxLDN9KT9cXC0/KFswLTldezEsMn0pPyQvO1xyXG4gICAgICAgIGNvbnN0IGNucGogPSAvXihbMC05XXsxLDJ9KT9cXC4/KFswLTldezEsM30pP1xcLj8oWzAtOV17MSwzfSk/XFwvPyhbMC05XXsxLDR9KT9cXC0/KFswLTldezEsMn0pPyQvO1xyXG4gICAgICAgIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUucmVwbGFjZSgvW15cXGQuXFwvLV0vZ2ksICcnKTtcclxuICAgICAgICBpZiAoY3BmLnRlc3QodmFsb3IpKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UoY3BmLCAoYWxsLCBhLCBiLCBjLCBkKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoYSB8fCAnJykgKyAoYiA/ICcuJyArIGIgOiAnJykgKyAoYyA/ICcuJyArIGMgOiAnJykgKyAoZCA/ICctJyArIGQgOiAnJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZWxzZSBpZiAoY25wai50ZXN0KHZhbG9yKSkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKGNucGosIChhbGwsIGEsIGIsIGMsIGQsIGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChhIHx8ICcnKSArIChiID8gJy4nICsgYiA6ICcnKSArIChjID8gJy4nICsgYyA6ICcnKSArIChkID8gJy8nICsgZCA6ICcnKSArIChlID8gJy0nICsgZSA6ICcnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoY2FtcG8udmFsdWUubGVuZ3RoID4gMTgpIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUuc3Vic3RyKDAsIDE4KTtcclxuICAgIH0sXHJcblxyXG4gICAgZGF0YTogKGNhbXBvKSA9PiB7XHJcbiAgICAgICAgaWYgKGNhbXBvLnR5cGUgPT09ICdkYXRlJykgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IG51bWVyb3MgPSBjYW1wby52YWx1ZS5yZXBsYWNlKC9eMD9cXC98W15cXGRcXC9dL2dpLCAnJyk7XHJcbiAgICAgICAgaWYgKG51bWVyb3MgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIGNhbXBvLnZhbHVlID0gbnVtZXJvcztcclxuICAgICAgICAgICAgY2FtcG8uc3R5bGUuYm9yZGVyQ29sb3IgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbXBvLnZhbHVlID0gbnVtZXJvc1xyXG4gICAgICAgIC5yZXBsYWNlKC8oXnxcXC8pMDArXFwvPy9nLCAnMCcpXHJcbiAgICAgICAgLnJlcGxhY2UoLyhefFxcLykoWzEtOV1cXC8pLywgJzAkMicpXHJcbiAgICAgICAgLnJlcGxhY2UoXHJcbiAgICAgICAgICAgIC8oXFxkXFxkKShcXC8/KShcXGR7MSwyfSk/KFxcLz8pMCooXFxkezEsNH0pPy4qL2csXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGFsbCwgZGQsIHMxLCBtbSwgczIsIGFhYWEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkZCA+IDMxIHx8IG1tID4gMTIpIGNhbXBvLnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGNhbXBvLnN0eWxlLmJvcmRlckNvbG9yID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZCArIChtbSA/ICcvJyArIG1tIDogczEgfHwgJycpICsgKGFhYWEgPyAnLycgKyBhYWFhIDogczIgfHwgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgZW1haWw6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2VuaGE6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGlmIChjYW1wby52YWx1ZS5sZW5ndGggPiAwICYmIGNhbXBvLnZhbHVlLmxlbmd0aCA8IDYpIGNhbXBvLnN0eWxlLmJvcmRlckNvbG9yID0gJ3JlZCc7XHJcbiAgICAgICAgZWxzZSBjYW1wby5zdHlsZS5ib3JkZXJDb2xvciA9IG51bGw7XHJcbiAgICB9XHJcblxyXG59O1xuXG5mdW5jdGlvbiBfY3JlYXRlTm9kZShlbGVtZW50KXtcclxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9hcHBlbmQocGFyZW50LCBlbCl7XHJcbiAgICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGVsKVxyXG59XHJcblxyXG5mdW5jdGlvbiBfdG9nZ2xlSXRzZWxmKGJ0biwgY29udGVudCl7ICAgIFxyXG4gICAgYnRuICYmIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIFxyXG4gICAgICBpZihjb250ZW50Lmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpe1xyXG4gICAgICAgIGNvbnRlbnQucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIGNvbnRlbnQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XHJcbiAgICAgIH1cclxuICAgIH0pOyAgICBcclxufVxuXG4vLyAtLS0tLS0gVEFCUyAtLS0tLS1cclxuY29uc3QgYWxsVGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhcmdldF0nKTtcclxuY29uc3QgbGlua3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhbGxUYXJnZXRzKTtcclxuXHJcbmxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspe1xyXG4gIGNvbnN0IGxpbmtUYXJnZXQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKTtcclxuICBjb25zdCBhbGxUYWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpO1xyXG5cclxuICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRhcmdldHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhbGxUYWJzKTsgICAgICBcclxuICAgIHRhcmdldHMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KXtcclxuICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xyXG5cclxuICAgICAgaWYobGlua1RhcmdldCA9PT0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKSl7XHJcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgbGlua3MuZm9yRWFjaChidG4gPT57XHJcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuLy8gLS0tLS0tIENSRUFURSBFTEVNRU5UIC0tLS0tLVxyXG5jb25zdCBidG5DcmVhdGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNyZWF0ZV0nKTtcclxuYnRuQ3JlYXRlRWwgJiYgYnRuQ3JlYXRlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gIGNvbnN0IG5ld0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3M9XCJwb3N0LWNvbnRlbnRcIl0nKTtcclxuICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0xpc3QpO1xyXG4gIG5ld0xpc3QuaW5uZXJIVE1MID0gJzxsaT50ZXN0ZTE8L2xpPjxsaT50ZXN0ZTI8L2xpPic7XHJcbn0pO1xyXG5cclxuLy8gLS0tLS0tIFNVTVJFRFVDRVIgV0lUSCBGTEFUIC0tLS0tLVxyXG5mdW5jdGlvbiBzdW1SZWR1Y2VyKCkge1xyXG4gIC8vY29udmVydGVyIGFyZ3VtZW50cyBlbSBhcnJheVxyXG4gIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gIC8vIGFjaGF0YXIgYXJnc1xyXG4gIGNvbnN0IGZsYXRBcmdzID0gYXJncy5mbGF0KEluZmluaXR5KTtcclxuICAvL2ZpbHRhciBuw7ptZXJvc1xyXG4gIGNvbnN0IG51bWJlckFyZ3MgPSBmbGF0QXJncy5maWx0ZXIobiA9PiB0eXBlb2YgbiA9PT0gJ251bWJlcicpO1xyXG4gIC8vIHNvbWFyXHJcbiAgcmV0dXJuIG51bWJlckFyZ3MucmVkdWNlKChzdW0sIG4pID0+IHN1bSArIG4sIDApO1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBmbGF0dGVuRGVlcChhcnIxKXtcclxuLy8gICByZXR1cm4gYXJyMS5yZWR1Y2UoKGFjYywgdmFsKSA9PiBBcnJheS5pc0FycmF5KHZhbCkgPyBhY2MuY29uY2F0KGZsYXR0ZW5EZWVwKHZhbCkpIDogYWNjLmNvbmNhdCh2YWwpLCBbXSk7XHJcbi8vIH1cclxuXHJcbmNvbnN0IHJlc3VsdCA9IHN1bVJlZHVjZXIoWzAsIDMsIDddLCBbbnVsbCwgJ2VtYSB3YXRzb24nLCA4Ml0sIDUsIFtbMywgMF0sIFsxXSwgbnVsbF0sIFtdKTtcclxuXHJcbmNvbnN0IHJlc3VsdFN1bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXN1bV0nKTtcclxucmVzdWx0U3VtICYmIHJlc3VsdFN1bS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgY29uc3QgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcz1cInBvc3QtY29udGVudFwiXScpO1xyXG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3RGl2KTtcclxuICBuZXdEaXYuaW5uZXJIVE1MID0gYCR7cmVzdWx0fWA7XHJcbn0pO1xyXG5cclxuLy8gLS0tLS0tIEZFVENIIC0tLS0tLVxyXG4vLyBmdW5jdGlvbiBjcmVhdGVOb2RlKGVsZW1lbnQpe1xyXG4vLyAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpOyAvLyBDcmVhdGUgdGhlIHR5cGUgb2YgZWxlbWVudCB5b3UgcGFzcyBpbiB0aGUgcGFyYW1ldGVyc1xyXG4vLyB9XHJcblxyXG4vLyBmdW5jdGlvbiBhcHBlbmQocGFyZW50LCBlbCl7XHJcbi8vICAgcmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChlbCk7IC8vIEFwcGVuZCB0aGUgc2Vjb25kIHBhcmFtZXRlcihlbGVtZW50KSB0byB0aGUgZmlyc3Qgb25lXHJcbi8vIH1cclxuXHJcbmNvbnN0IGdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0aG9ycycpOyAvLyBHZXQgdGhlIGxpc3Qgd2hlcmUgd2Ugd2lsbCBwbGFjZSBvdXIgYXV0aG9yc1xyXG5jb25zdCB1cmwgPSAnaHR0cHM6Ly9yYW5kb211c2VyLm1lL2FwaS8/cmVzdWx0cz0xMCc7IC8vIEdldCAxMCByYW5kb20gdXNlcnNcclxuXHJcbmZldGNoKHVybCkgLy8gQ2FsbCB0aGUgZmV0Y2ggZnVuY3Rpb24gcGFzc2luZyB0aGUgdXJsIG9mIHRoZSBBUEkgYXMgYSBwYXJhbWV0ZXJcclxuLnRoZW4oKHJlc3ApPT4gcmVzcC5qc29uKCkpIC8vIFRyYW5zZm9ybSB0aGUgZGF0YSBpbnRvIEpTT05cclxuLnRoZW4oZnVuY3Rpb24oZGF0YSl7XHJcbiAgLy8gWW91ciBjb2RlIGZvciBoYW5kbGluZyB0aGUgZGF0YSB5b3UgZ2V0IGZyb20gdGhlIEFQSVxyXG4gIC8vIENyZWF0ZSBhbmQgYXBwZW5kIHRoZSBsaSdzIHRvIHRoZSB1bFxyXG4gIGxldCBhdXRob3JzID0gZGF0YS5yZXN1bHRzOyAvLyBHZXQgdGhlIHJlc3VsdHNcclxuICByZXR1cm4gYXV0aG9ycy5tYXAoZnVuY3Rpb24oYXV0aG9yKXtcclxuICAgIGxldCBkaXYgPSBfY3JlYXRlTm9kZSgnZGl2JyksIC8vIENyZWF0ZSB0aGUgZWxlbWVudHMgd2UgbmVlZFxyXG4gICAgICAgIGltZyA9IF9jcmVhdGVOb2RlKCdpbWcnKSxcclxuICAgICAgICBwID0gX2NyZWF0ZU5vZGUoJ3AnKTtcclxuICAgIGltZy5zcmMgPSBhdXRob3IucGljdHVyZS5tZWRpdW07IFxyXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1jZWxsJywgJ3NocmluaycpO1xyXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JywgJ2NlbnRlcicpO1xyXG4gICAgLy8gQWRkIHRoZSBzb3VyY2Ugb2YgdGhlIGltYWdlIHRvIGJlIHRoZSBzcmMgb2YgdGhlIGltZyBlbGVtZW50XHJcbiAgICBwLmlubmVySFRNTCA9IGAke2F1dGhvci5uYW1lLmZpcnN0fSAke2F1dGhvci5uYW1lLmxhc3R9YDsgXHJcbiAgICAvLyBNYWtlIHRoZSBIVE1MIG9mIG91ciBwIHRvIGJlIHRoZSBmaXJzdCBhbmQgbGFzdCBuYW1lIG9mIG91ciBhdXRob3JcclxuICAgIF9hcHBlbmQoZGl2LCBpbWcpOyAvLyBBcHBlbmQgYWxsIG91ciBlbGVtZW50c1xyXG4gICAgX2FwcGVuZChkaXYsIHApO1xyXG4gICAgX2FwcGVuZChncmlkLCBkaXYpO1xyXG4gIH0pXHJcbn0pXHJcbi5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgY29uc29sZS5sb2coZXJyb3IpO1xyXG59KTtcclxuXHJcbi8vIC0tLS0tLSBTTElERVIgV0lUSCBMSUdIVEJPWCAtLS0tLS1cclxud2luZG93LnNsaWRlcnMgPSBfbWFwKCcuc2xpZGVyJywgcGFyZW50ID0+IHtcclxuICBjb25zdCBzbGlkZXIgPSBuZXcgU2xpZGVyKHtcclxuICAgIHBhcmVudFxyXG4gIH0pO1xyXG4gIGNvbmZpZ1NsaWRlcihzbGlkZXIsIHBhcmVudCk7XHJcbn0pO1xyXG5cclxud2luZG93LmNhcm91c2VscyA9IF9tYXAoJy5jYXJvdXNlbCcsIHBhcmVudCA9PiB7XHJcbiAgY29uc3Qgc2l6ZSA9IHBhcmVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2l6ZScpIHwgMDtcclxuICBjb25zdCBjYXJvdXNlbCA9IG5ldyBDYXJvdXNlbCh7XHJcbiAgICBwYXJlbnQsXHJcbiAgICBzaXplXHJcbiAgfSk7XHJcbiAgY29uZmlnU2xpZGVyKGNhcm91c2VsLCBwYXJlbnQpO1xyXG4gIHJldHVybiBjYXJvdXNlbDtcclxufSk7XHJcblxyXG52YXIgbGlnaHRib3ggPSBuZXcgTGlnaHRib3goXCJbZGF0YS1saWdodGJveF1cIik7XHJcblxyXG4vLyAtLS0tLS0gTUFTS1MgLS0tLS0tXHJcbmNvbnN0IGVhY2ggPSAoaSwgZikgPT4gQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChpLCBmKTtcclxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKTtcclxuXHJcbmlmIChmb3JtLmxlbmd0aCkgZWFjaChmb3JtLCBGb3JtTWFzayk7XHJcbmZ1bmN0aW9uIEZvcm1NYXNrKGYpIHtcclxuICAoQXJyYXkuZnJvbShmLmVsZW1lbnRzKSlcclxuICAgICAgLmZpbHRlcihlbCA9PiBlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbWFzaycpKVxyXG4gICAgICAuZm9yRWFjaChjYW1wbyA9PiBjYW1wby5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBtZXRvZG8gPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1tYXNrJyk7XHJcbiAgICAgICAgaWYgKCFtYXNjYXJhc1ttZXRvZG9dKSByZXR1cm4gY29uc29sZS5sb2coYEEgbcOhc2NhcmEgZG8gdGlwbyBcIiR7bWV0b2RvfVwiIG7Do28gZm9pIGRlZmluaWRhLmApO1xyXG5cclxuICAgICAgICBtYXNjYXJhc1ttZXRvZG9dKHRoaXMpO1xyXG4gIH0pKTtcclxufVxyXG5cclxuLy8gLS0tLS0tIENSVUQgV0lUSCBKUyAtLS0tLS1cclxuY29uc3Qgbm9tZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub21lJyk7XHJcbmNvbnN0IHBrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NwZmNucGonKTtcclxuY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW1haWwnKTtcclxuXHJcbmZ1bmN0aW9uIG1ha2VPYmooKXtcclxuICByZXR1cm4ge1xyXG4gICAgbm9tZTogbm9tZS52YWx1ZSxcclxuICAgIGNwZjogcGsudmFsdWUsXHJcbiAgICBlbWFpbDogZW1haWwudmFsdWVcclxuICB9XHJcbn1cclxuXHJcbmxldCBhcnJheSA9IFtdO1xyXG5jb25zdCBjbGVhckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdC1mb3JtJyk7XHJcbmNvbnN0IGJ0bkVudmlhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbnZpYXInKTtcclxuY29uc3QgYnRuRGVsZXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGFyJyk7XHJcblxyXG5idG5FbnZpYXIgJiYgYnRuRW52aWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICBpZihub21lLnZhbHVlIT1udWxsLCBub21lLnZhbHVlIT1cIlwiICYmIHBrLnZhbHVlIT1udWxsLCBway52YWx1ZSE9XCJcIiAmJiBlbWFpbC52YWx1ZSE9bnVsbCwgZW1haWwudmFsdWUhPVwiXCIpe1xyXG4gICAgbGV0IGluZGV4QXJyYXkgPSBhcnJheS5maW5kSW5kZXgoZWxlbSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmNwZj09PXBrLnZhbHVlXHJcbiAgICB9KTtcclxuICAgIGlmKGluZGV4QXJyYXkgPiAtMSl7XHJcbiAgICAgIGFycmF5W2luZGV4QXJyYXldID0gbWFrZU9iaigpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgYXJyYXkucHVzaChtYWtlT2JqKCkpO1xyXG4gICAgfVxyXG4gICAgdHJhbnNmb3JtVGV4dChhcnJheSk7XHJcbiAgICBjbGVhckZvcm0ucmVzZXQoKTtcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIGFsZXJ0KCdQcmVlbmNoYSB0b2RvcyBvcyBjYW1wb3MhJyk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybVRleHQoYXJyYXkpe1xyXG4gIC8vIGNvbnN0IG9iamVjdFRleHQgPSBKU09OLnN0cmluZ2lmeSh7YXJyYXl9LCBudWxsLCBcIiBcIilcclxuICAvLyBjb25zdCBkYXRhQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdHNfZGlzcGxheScpO1xyXG4gIC8vIGRhdGFDb250YWluZXIudGV4dENvbnRlbnQgPSBvYmplY3RUZXh0O1xyXG4gIGNvbnN0IG9iamVjdFRleHQgPSBhcnJheS5yZWR1Y2UoKGFjYywgaXRlbSwgaW5kZXgpID0+e1xyXG4gICAgYWNjKz0gYDx1bD48bGk+JHtpdGVtLm5vbWV9PC9saT48bGk+JHtpdGVtLmNwZn08L2xpPjxsaT4ke2l0ZW0uZW1haWx9PC9saT48L3VsPmA7XHJcbiAgICByZXR1cm4gYWNjXHJcbiAgfSwgJycpO1xyXG4gIGNvbnN0IGRhdGFDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0c19kaXNwbGF5Jyk7XHJcbiAgZGF0YUNvbnRhaW5lci5pbm5lckhUTUwgPSBvYmplY3RUZXh0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcnJheVJlbW92ZShhcnIsIHZhbHVlKXsgLy9yZXRvcm5hIHRvZG9zIG9zIGVsZW1lbnRvcyBkbyBhcnJheSBtZW5vcyBvIHF1ZSB2b2PDqiBwYXNzYXJcclxuICByZXR1cm4gYXJyLmZpbHRlcigoZWxlLCBpbmRleCkgPT4ge3JldHVybiBpbmRleCAhPSB2YWx1ZX0pXHJcbn1cclxuXHJcbmJ0bkRlbGV0YXIgJiYgYnRuRGVsZXRhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4ge1xyXG4gIGxldCBpbmRleEFycmF5ID0gYXJyYXkuZmluZEluZGV4KGVsZW0gPT4ge1xyXG4gICAgcmV0dXJuIGVsZW0uY3BmID09PSBway52YWx1ZVxyXG4gIH0pO1xyXG5cclxuICBpZihpbmRleEFycmF5ID4gLTEpe1xyXG4gICAgYXJyYXkgPSBhcnJheVJlbW92ZShhcnJheSwgaW5kZXhBcnJheSk7XHJcbiAgfVxyXG4gIHRyYW5zZm9ybVRleHQoYXJyYXkpO1xyXG4gIGNsZWFyRm9ybS5yZXNldCgpO1xyXG59KTtcclxuXHJcbi8vIC0tLS0tLVRPR0dMRSBCVVRUT04tLS0tLS1cclxuLy8gY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdG9nZ2xlXScpO1xyXG4vLyBjb25zdCB0b2dnbGVDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udGVudF0nKTtcclxuXHJcbi8vIHRvZ2dsZUJ0biAmJiB0b2dnbGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG5cclxuLy8gICBpZih0b2dnbGVDb250ZW50Lmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykpe1xyXG4vLyAgICAgdG9nZ2xlQ29udGVudC5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpXHJcbi8vICAgfVxyXG4vLyAgIGVsc2V7XHJcbi8vICAgICB0b2dnbGVDb250ZW50LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpXHJcbi8vICAgfVxyXG4vLyB9KVxyXG5fdG9nZ2xlSXRzZWxmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRvZ2dsZV0nKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udGVudF0nKSk7XHJcblxyXG4vLyAtLS0tLS0gTUFQIEFORCBGSUxURVIgLS0tLS0tXHJcbmxldCBkYXRhID0gW1xyXG4gIHtcclxuICAgIG5hbWU6ICdCdXR0ZXJzJyxcclxuICAgIGFnZTogMyxcclxuICAgIHR5cGU6ICdkb2cnXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTGl6enknLFxyXG4gICAgYWdlOiA2LFxyXG4gICAgdHlwZTogJ2RvZydcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdSZWQnLFxyXG4gICAgYWdlOiAxLFxyXG4gICAgdHlwZTogJ2NhdCdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdKb2V5JyxcclxuICAgIGFnZTogMyxcclxuICAgIHR5cGU6ICdkb2cnXHJcbiAgfVxyXG5dO1xyXG5cclxubGV0IGRvZ3MgPSBkYXRhLmZpbHRlcigoYW5pbWFsKT0+e1xyXG4gIHJldHVybiBhbmltYWwudHlwZSA9PT0gJ2RvZydcclxufSk7XHJcblxyXG5kb2dzLm1hcCgoYW5pbWFsKT0+e1xyXG4gIHJldHVybiBhbmltYWwuYWdlICo9IDdcclxufSk7XHJcblxyXG5jb25zdCBjYWxjQWdlID0gZG9ncy5yZWR1Y2UoKHN1bSwgYW5pbWFsKT0+e1xyXG4gIHJldHVybiBzdW0gKyBhbmltYWwuYWdlXHJcbn0sIDApO1xyXG5cclxuY29uc29sZS5sb2coZG9ncyk7XHJcbmNvbnNvbGUubG9nKGNhbGNBZ2UpO1xyXG5cclxuLy8gLS0tLS0tIEZJTFRFUiBGRVRDSCBSRVNVTFRTIC0tLS0tLVxyXG5cclxuY29uc3QgZGF0YUdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jaGFyYWN0ZXJzXScpO1xyXG5jb25zdCBkYXRhR3JpZEZpbHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNoYXJhY3RlcnMtZmlsdGVyXScpO1xyXG5jb25zdCBzd2FwaSA9ICdodHRwczovL3N3YXBpLmNvL2FwaS9wZW9wbGUvJztcclxuXHJcbmZldGNoKHN3YXBpKVxyXG4udGhlbigocmVzcCk9PiByZXNwLmpzb24oKSlcclxuLnRoZW4oZnVuY3Rpb24oZGF0YSl7XHJcbiAgY29uc29sZS5sb2coZGF0YS5yZXN1bHRzKTtcclxuICBsZXQgcGVvcGxlID0gZGF0YS5yZXN1bHRzO1xyXG4gIGNvbnN0IHBlb3BsZU1hcCA9IHBlb3BsZS5tYXAoKGl0ZW0pPT57XHJcbiAgICBsZXQgZGl2ID0gX2NyZWF0ZU5vZGUoJ2RpdicpLFxyXG4gICAgICAgIHAgPSBfY3JlYXRlTm9kZSgncCcpO1xyXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1jZWxsJywgJ3NocmluaycpO1xyXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JywgJ2NlbnRlcicpO1xyXG4gICAgcC5pbm5lckhUTUwgPSBgJHtpdGVtLm5hbWV9YDtcclxuICAgIF9hcHBlbmQoZGl2LCBwKTtcclxuICAgIF9hcHBlbmQoZGF0YUdyaWQsIGRpdik7XHJcbiAgfSk7ICBcclxuXHJcbiAgY29uc3QgcGVvcGxlRmlsdGVyID0gcGVvcGxlLmZpbHRlcigoaXRlbSk9PntcclxuICAgIHJldHVybiBpdGVtLmhhaXJfY29sb3IgPT09ICdibG9uZCc7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHBlb3BsZUZpbHRlck1hcCA9IHBlb3BsZUZpbHRlci5tYXAoKGl0ZW0pPT57XHJcbiAgICBsZXQgZGl2ID0gX2NyZWF0ZU5vZGUoJ2RpdicpLFxyXG4gICAgICAgIHAgPSBfY3JlYXRlTm9kZSgncCcpO1xyXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1jZWxsJywgJ3NocmluaycpO1xyXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JywgJ2NlbnRlcicpO1xyXG4gICAgcC5pbm5lckhUTUwgPSBgJHtpdGVtLm5hbWV9YDtcclxuICAgIF9hcHBlbmQoZGl2LCBwKTtcclxuICAgIF9hcHBlbmQoZGF0YUdyaWRGaWx0ZXIsIGRpdik7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7cGVvcGxlTWFwLCBwZW9wbGVGaWx0ZXJNYXB9XHJcbn0pXHJcbi5jYXRjaCgoZXJyb3IpPT57XHJcbiAgY29uc29sZS5sb2coZXJyb3IpOyAgXHJcbn0pO1xyXG5cclxuLy8gLS0tLS0tIEFKQVggUkVRVUVTVCAtLS0tLS1cclxuY29uc3QgSHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5jb25zdCB1cmwxPSdodHRwczovL3N3YXBpLmNvL2FwaS9wZW9wbGUvJztcclxuSHR0cC5vcGVuKCdHRVQnLCB1cmwxKTtcclxuSHR0cC5zZW5kKCk7XHJcblxyXG5IdHRwLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe1xyXG4gIGlmKHRoaXMucmVhZHlTdGF0ZT09NCAmJiB0aGlzLnN0YXR1cz09MjAwKXtcclxuICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoSHR0cC5yZXNwb25zZVRleHQpKTtcclxuICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoSHR0cC5yZXNwb25zZVRleHQpLnJlc3VsdHMpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIC0tLS0tLSBNRU5VIEhPVkVSIC0tLS0tLVxyXG5jb25zdCBhbGxUYXJnZXRzMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvXScpO1xyXG5jb25zdCBsaW5rczIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhbGxUYXJnZXRzMik7XHJcbmNvbnN0IGFsbFRhYnMyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpO1xyXG5cclxubGlua3MyLmZvckVhY2goZnVuY3Rpb24gKGxpbmspe1xyXG4gIGNvbnN0IGxpbmtUYXJnZXQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS10bycpO1xyXG5cclxuICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0YXJnZXRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYWxsVGFiczIpOyAgICAgIFxyXG4gICAgdGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpe1xyXG4gICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XHJcblxyXG4gICAgICBpZihsaW5rVGFyZ2V0ID09PSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpKXtcclxuICAgICAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuICAgICAgICBsaW5rczIuZm9yRWFjaChidG4gPT57XHJcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuY29uc3QgbWVudVByaW5jaXBhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW1lbnVdJyk7XHJcbm1lbnVQcmluY2lwYWwgJiYgbWVudVByaW5jaXBhbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCk9PntcclxuICAgIGNvbnN0IHRhcmdldHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhbGxUYWJzMik7XHJcbiAgICB0YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCl7XHJcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbi8vIC0tLS0tLSBTRUFSQ0ggLS0tLS0tXHJcbmNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNlYXJjaF0nKTtcclxuXHJcbnNlYXJjaCAmJiBzZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKT0+e1xyXG4gIGNvbnN0IGZpbHRlciA9IHNlYXJjaC52YWx1ZTtcclxuICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlc3VsdHNdJyk7XHJcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKTtcclxuICB1bC5pbm5lckhUTUw9XCJcIjtcclxuICBjb25zdCBhcnJheUxpID0gQXJyYXkuZnJvbShsaSk7XHJcbiAgYXJyYXlMaS5maWx0ZXIoKGl0ZW0pPT57XHJcbiAgICBjb25zdCBpdGVtTG93ZXIgPSBpdGVtLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7ICAgICBcclxuICAgIGNvbnN0IGZpbHRlckxvd2VyID0gZmlsdGVyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZihmaWx0ZXJMb3dlciAmJiBpdGVtTG93ZXIubWF0Y2goZmlsdGVyTG93ZXIpKXtcclxuICAgICAgdWwuaW5uZXJIVE1MICs9IGA8bGk+JHtpdGVtLnRleHRDb250ZW50fTwvbGk+YDtcclxuICAgIH1cclxuICB9KTsgXHJcbn0pO1xuXG59KCkpO1xuIl19
