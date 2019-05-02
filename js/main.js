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
      var div = createNode('div'),
          // Create the elements we need
      img = createNode('img'),
          p = createNode('p');
      img.src = author.picture.medium;
      div.setAttribute('data-cell', 'shrink');
      div.setAttribute('data-text', 'center');
      // Add the source of the image to be the src of the img element
      p.innerHTML = author.name.first + ' ' + author.name.last;
      // Make the HTML of our p to be the first and last name of our author
      append(div, img); // Append all our elements
      append(div, p);
      append(grid, div);
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

  function makeObj(data) {
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
  var toggleBtn = document.querySelector('[data-toggle]');
  var toggleContent = document.querySelector('[data-content]');

  toggleBtn && toggleBtn.addEventListener('click', function () {
    if (toggleContent.hasAttribute('hidden')) {
      toggleContent.removeAttribute('hidden');
    } else {
      toggleContent.setAttribute('hidden', '');
    }
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiU2xpZGVyIiwiY29uZmlnIiwidHlwZSIsInBhcmVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBhcmVudFNlbGVjdG9yIiwiY2hpbGRTZWxlY3RvciIsImNoaWxkcmVuIiwibGVuZ3RoIiwiaW5kZXgiLCJkdXJhdGlvbiIsImNsYXNzTGlzdCIsImFkZCIsImNvbXBvc2UiLCJmbiIsImZvckVhY2giLCJtYXAiLCJmaWx0ZXIiLCJmaW5kIiwibmV4dEluZGV4IiwicHJldkluZGV4IiwiZWwiLCJpIiwicmVtb3ZlIiwidGhhdCIsInBsYXlpbmdTdGF0ZUlEIiwic2V0SW50ZXJ2YWwiLCJuZXh0IiwiaXNQbGF5aW5nIiwiY2xlYXJJbnRlcnZhbCIsInBhdXNlIiwicGxheSIsInBsYXlpbmdTdGF0ZSIsImV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb2xsYXBzZWQiLCJjb25zb2xlIiwidGFibGUiLCJPYmplY3QiLCJrZXlzIiwicHJvcCIsImtleSIsInZhbHVlIiwibG9nIiwid2FybiIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsImdyb3VwRW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQ2Fyb3VzZWwiLCJzaXplIiwicG9zaXRpb24iLCJzbGlkZSIsIml0ZW1PcmRlciIsInNldEF0dHJpYnV0ZSIsImNsYXNzTmFtZSIsInN0eWxlIiwib3JkZXIiLCJkaXIiLCJhbmltQ2xhc3NOYW1lIiwicmVtb3ZlV2lsbFJlbmRlckNsYXNzIiwiX21hcCIsIndoYXQiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwidyIsImNyZWF0ZUVsZW1lbnQiLCJhdHRycyIsImVsZW1lbnQiLCJOb2RlIiwiZXh0ZW5kIiwib2JqIiwicHJvcHMiLCJleHRlbmRlcnMiLCJzdHlsZXMiLCJkYXRhc2V0IiwiZGF0YSIsIm5hbWUiLCJldmVudHMiLCJjYWxsYmFja3MiLCJraWRzIiwiayIsImFwcGVuZENoaWxkIiwidmFsIiwiTGlnaHRib3giLCJzZWxlY3RvciIsImNvbnRhaW5lciIsIm1vZGFsIiwiZ3JpZCIsInByZXYiLCJ3cmFwcGVyIiwicGFyZW50RWxlbWVudCIsImJvZHkiLCJjbG9zZUJ1dHRvbiIsImltZyIsIml0ZW1zIiwic2hvdyIsInNyYyIsImdldEF0dHJpYnV0ZSIsIm9wZW4iLCJjZWxsIiwiaW5uZXJIVE1MIiwiYnRuIiwiY2xpY2siLCJnb1ByZXYiLCJnb05leHQiLCJjbG9zZSIsImRvbU5vZGVzIiwic2xpZGVyT3B0aW9ucyIsImF1dG9wbGF5Iiwic2xpZGVyIiwib24iLCJjb25maWdTbGlkZXIiLCJmaXJzdCIsImdvVG8iLCJvcHRpb25zIiwiaGFzQXR0cmlidXRlIiwic3BsaXQiLCJvcHRpb24iLCJzbGlkZXJDYWxsYmFja3MiLCJvcGVuT25Nb2JpbGUiLCJzY3JlZW4iLCJ3aWR0aCIsInRhcmdldCIsImNvbnRyb2wiLCJ0YXJnZXRFbGVtZW50IiwiYWN0aW9uIiwiYWN0aW9uRGF0YSIsInBhcmFtcyIsImFwcGx5IiwibWFzY2FyYXMiLCJub21lIiwiY2FtcG8iLCJ0ZXN0IiwicmVncmEiLCJ2YWxvcmVzIiwibWF0Y2giLCJqb2luIiwicmVwbGFjZSIsImNlcCIsInJlZ3JhcyIsInN1YnN0ciIsInRlbGVmb25lIiwidmFsb3IiLCJyZyIsImxldHJhcyIsImRpZ2l0byIsInRvVXBwZXJDYXNlIiwiY3BmY25waiIsIm51bWVyb3MiLCJjcGYiLCJjbnBqIiwiYWxsIiwiYSIsImIiLCJjIiwiZCIsImUiLCJib3JkZXJDb2xvciIsImRkIiwiczEiLCJtbSIsInMyIiwiYWFhYSIsImVtYWlsIiwidG9Mb3dlckNhc2UiLCJzZW5oYSIsImFsbFRhcmdldHMiLCJsaW5rcyIsImxpbmsiLCJsaW5rVGFyZ2V0IiwiYWxsVGFicyIsInRhcmdldHMiLCJyZW1vdmVBdHRyaWJ1dGUiLCJidG5DcmVhdGVFbCIsIm5ld0xpc3QiLCJjb250ZW50Iiwic3VtUmVkdWNlciIsImFyZ3MiLCJhcmd1bWVudHMiLCJmbGF0QXJncyIsImZsYXQiLCJJbmZpbml0eSIsIm51bWJlckFyZ3MiLCJuIiwicmVkdWNlIiwic3VtIiwicmVzdWx0IiwicmVzdWx0U3VtIiwibmV3RGl2IiwiY3JlYXRlTm9kZSIsImFwcGVuZCIsImdldEVsZW1lbnRCeUlkIiwidXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJhdXRob3JzIiwicmVzdWx0cyIsImF1dGhvciIsImRpdiIsInAiLCJwaWN0dXJlIiwibWVkaXVtIiwibGFzdCIsImNhdGNoIiwiZXJyb3IiLCJ3aW5kb3ciLCJzbGlkZXJzIiwiY2Fyb3VzZWxzIiwiY2Fyb3VzZWwiLCJsaWdodGJveCIsImVhY2giLCJmIiwiZm9ybSIsIkZvcm1NYXNrIiwiZnJvbSIsImVsZW1lbnRzIiwibWV0b2RvIiwicGsiLCJtYWtlT2JqIiwiYXJyYXkiLCJjbGVhckZvcm0iLCJidG5FbnZpYXIiLCJidG5EZWxldGFyIiwiaW5kZXhBcnJheSIsImZpbmRJbmRleCIsImVsZW0iLCJwdXNoIiwidHJhbnNmb3JtVGV4dCIsInJlc2V0IiwiYWxlcnQiLCJvYmplY3RUZXh0IiwiYWNjIiwiaXRlbSIsImRhdGFDb250YWluZXIiLCJhcnJheVJlbW92ZSIsImFyciIsImVsZSIsInRvZ2dsZUJ0biIsInRvZ2dsZUNvbnRlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUMsYUFBWTtBQUNiOztBQURhLE1BR1BBLE1BSE87QUFLVCxvQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNsQixXQUFLQyxJQUFMLEdBQVksUUFBWjtBQUNBLFVBQUksRUFBRSxnQkFBZ0JGLE1BQWxCLENBQUosRUFBK0IsT0FBTyxJQUFJQSxNQUFKLENBQVdDLE1BQVgsQ0FBUDs7QUFFL0IsV0FBS0UsTUFBTCxHQUFjRixPQUFPRSxNQUFQLElBQWlCQyxTQUFTQyxhQUFULENBQXVCSixPQUFPSyxjQUFQLElBQXlCLFNBQWhELENBQS9CO0FBQ0EsVUFB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R0FBMEJvSSxVQUExQjtBQUNEOztBQUVELFdBQVNJLFdBQVQsQ0FBcUJDLEdBQXJCLEVBQTBCek0sS0FBMUIsRUFBZ0M7QUFBRTtBQUNoQyxXQUFPeU0sSUFBSW5PLE1BQUosQ0FBVyxVQUFDb08sR0FBRCxFQUFNNU8sS0FBTixFQUFnQjtBQUFDLGFBQU9BLFNBQVNrQyxLQUFoQjtBQUFzQixLQUFsRCxDQUFQO0FBQ0Q7O0FBRUQ0TCxnQkFBY0EsV0FBV3JNLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLFlBQUs7QUFDdEQsUUFBSXNNLGFBQWFKLE1BQU1LLFNBQU4sQ0FBZ0IsZ0JBQVE7QUFDdkMsYUFBT0MsS0FBSzlFLEdBQUwsS0FBYXNFLEdBQUd2TCxLQUF2QjtBQUNELEtBRmdCLENBQWpCOztBQUlBLFFBQUc2TCxhQUFhLENBQUMsQ0FBakIsRUFBbUI7QUFDakJKLGNBQVFlLFlBQVlmLEtBQVosRUFBbUJJLFVBQW5CLENBQVI7QUFDRDtBQUNESSxrQkFBY1IsS0FBZDtBQUNBQyxjQUFVUSxLQUFWO0FBQ0QsR0FWYSxDQUFkOztBQVlBO0FBQ0EsTUFBTVMsWUFBWW5QLFNBQVNDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBbEI7QUFDQSxNQUFNbVAsZ0JBQWdCcFAsU0FBU0MsYUFBVCxDQUF1QixnQkFBdkIsQ0FBdEI7O0FBRUFrUCxlQUFhQSxVQUFVcE4sZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0MsWUFBSTtBQUNuRCxRQUFHcU4sY0FBYzdILFlBQWQsQ0FBMkIsUUFBM0IsQ0FBSCxFQUF3QztBQUN0QzZILG9CQUFjcEUsZUFBZCxDQUE4QixRQUE5QjtBQUNELEtBRkQsTUFHSTtBQUNGb0Usb0JBQWMzTCxZQUFkLENBQTJCLFFBQTNCLEVBQXFDLEVBQXJDO0FBQ0Q7QUFDRixHQVBZLENBQWI7QUFTQyxDQW51QkEsR0FBRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbid1c2Ugc3RyaWN0JztcblxuY2xhc3MgU2xpZGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgdGhpcy50eXBlID0gJ1NsaWRlcic7XHJcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTbGlkZXIpKSByZXR1cm4gbmV3IFNsaWRlcihjb25maWcpO1xyXG4gIFxyXG4gICAgICB0aGlzLnBhcmVudCA9IGNvbmZpZy5wYXJlbnQgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb25maWcucGFyZW50U2VsZWN0b3IgfHwgJy5zbGlkZXInKTtcclxuICAgICAgaWYgKCF0aGlzLnBhcmVudCkgdGhyb3cgJ1tTTElERVJdOiBDb250YWluZXIgbsOjbyBlbmNvbnRyYWRvLic7XHJcbiAgXHJcbiAgICAgIHRoaXMuY2hpbGRTZWxlY3RvciA9IGNvbmZpZy5jaGlsZFNlbGVjdG9yIHx8ICcuc2xpZGUnO1xyXG4gICAgICBpZiAoIXRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB0aHJvdyAnW1NMSURFUl06IFNsaWRlcyBuw6NvIGVuY29udHJhZG9zLic7XHJcbiAgXHJcbiAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgICB0aGlzLmR1cmF0aW9uID0gY29uZmlnLmR1cmF0aW9uIHx8IDMwMDA7XHJcbiAgICAgIHRoaXMucGFyZW50LmNsYXNzTGlzdC5hZGQoJ3NldCcpO1xyXG4gICAgICB0aGlzLmNvbXBvc2UoKTtcclxuICAgIH1cclxuICBcclxuICAgIGdldCBjaGlsZHJlbigpIHtcclxuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMucGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5jaGlsZFNlbGVjdG9yKSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBnZXQgbGVuZ3RoKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBmb3JFYWNoKGZuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZvckVhY2goZm4pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgbWFwKGZuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLm1hcChmbik7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBmaWx0ZXIoZm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmlsdGVyKGZuKTtcclxuICAgIH1cclxuICBcclxuICAgIGZpbmQoZm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmluZChmbik7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBjb21wb3NlKCkge1xyXG4gICAgICB2YXIgbmV4dEluZGV4LCBwcmV2SW5kZXg7XHJcbiAgICAgIHByZXZJbmRleCA9IHRoaXMuaW5kZXggPiAwID8gdGhpcy5pbmRleCAtIDEgOiB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDE7XHJcbiAgICAgIG5leHRJbmRleCA9IHRoaXMuaW5kZXggPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDEgPyB0aGlzLmluZGV4ICsgMSA6IDA7XHJcbiAgICAgIHRoaXMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdwcmV2Jyk7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudCcpO1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ25leHQnKTtcclxuICAgICAgICBpZiAoaSA9PT0gcHJldkluZGV4KSBlbC5jbGFzc0xpc3QuYWRkKCdwcmV2Jyk7XHJcbiAgICAgICAgaWYgKGkgPT09IG5leHRJbmRleCkgZWwuY2xhc3NMaXN0LmFkZCgnbmV4dCcpO1xyXG4gICAgICAgIGlmIChpID09PSB0aGlzLmluZGV4KSBlbC5jbGFzc0xpc3QuYWRkKCdjdXJyZW50Jyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICBcclxuICAgIHBsYXkoKSB7XHJcbiAgICAgIHZhciB0aGF0O1xyXG4gICAgICB0aGF0ID0gdGhpcztcclxuICAgICAgdGhpcy5wbGF5aW5nU3RhdGVJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhhdC5uZXh0KCk7XHJcbiAgICAgIH0sIHRoaXMuZHVyYXRpb24pO1xyXG4gICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5wbGF5aW5nU3RhdGVJRCk7XHJcbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgcGxheXBhdXNlKCkge1xyXG4gICAgICBpZiAodGhpcy5pc1BsYXlpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXVzZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgcHJldigpIHtcclxuICAgICAgdmFyIHBsYXlpbmdTdGF0ZTtcclxuICAgICAgaWYgKHRoaXMuaW5kZXggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleC0tO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDE7XHJcbiAgICAgIH1cclxuICAgICAgcGxheWluZ1N0YXRlID0gdGhpcy5pc1BsYXlpbmc7XHJcbiAgICAgIGlmIChwbGF5aW5nU3RhdGUpIHtcclxuICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb21wb3NlKCk7XHJcbiAgICAgIGlmIChwbGF5aW5nU3RhdGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIG5leHQoKSB7XHJcbiAgICAgIHZhciBwbGF5aW5nU3RhdGU7XHJcbiAgICAgIGlmICh0aGlzLmluZGV4IDwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCsrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIHBsYXlpbmdTdGF0ZSA9IHRoaXMuaXNQbGF5aW5nO1xyXG4gICAgICBpZiAocGxheWluZ1N0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY29tcG9zZSgpO1xyXG4gICAgICBpZiAocGxheWluZ1N0YXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICBnb1RvKGluZGV4KSB7XHJcbiAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgICAgcmV0dXJuIHRoaXMuY29tcG9zZSgpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgb24oZXZlbnQsIGZuKSB7XHJcbiAgICAgIHRoaXMucGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBvZmYoZXZlbnQsIGZuKSB7XHJcbiAgICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBpbnNwZWN0KGNvbGxhcHNlZCkge1xyXG4gICAgICBjb25zb2xlW2NvbGxhcHNlZCA9PT0gdHJ1ZSA/ICdncm91cENvbGxhcHNlZCcgOiAnZ3JvdXAnXSh0aGlzLnR5cGUpO1xyXG4gICAgICBjb25zb2xlLnRhYmxlKFxyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMpLm1hcChrZXkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcHJvcDoga2V5LFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpc1trZXldLFxyXG4gICAgICAgICAgICB0eXBlOiB0eXBlb2YgdGhpc1trZXldXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5wYXJlbnQpO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmNoaWxkcmVuKTtcclxuICAgICAgY29uc29sZS53YXJuKERhdGUubm93KCkudG9TdHJpbmcoKSk7XHJcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQodGhpcy50eXBlKTtcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgXHJcbiAgfVxuXG5jbGFzcyBDYXJvdXNlbCBleHRlbmRzIFNsaWRlciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG4gICAgY29uZmlnLnBhcmVudFNlbGVjdG9yID0gY29uZmlnLnBhcmVudFNlbGVjdG9yIHx8ICcuY2Fyb3VzZWwnO1xyXG4gICAgc3VwZXIoY29uZmlnKTtcclxuICAgIHRoaXMudHlwZSA9ICdDYXJvdXNlbCc7XHJcbiAgICB0aGlzLnNpemUgPSBjb25maWcuc2l6ZSB8IDA7XHJcbiAgICB0aGlzLmNvbXBvc2UoKTtcclxuICB9XHJcblxyXG4gIGNvbXBvc2UoKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuaW5kZXggKyAxO1xyXG4gICAgdGhpcy5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xyXG4gICAgICBsZXQgaXRlbU9yZGVyID0gaSAtIHBvc2l0aW9uICsgMTtcclxuICAgICAgaWYgKGl0ZW1PcmRlciA8IDApIGl0ZW1PcmRlciA9IHRoaXMubGVuZ3RoIC0gcG9zaXRpb24gKyBpICsgMTtcclxuICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCdkYXRhLW9yZGVyJywgaXRlbU9yZGVyKTtcclxuXHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3ByZXYnKTtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudCcpO1xyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCduZXh0Jyk7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dpbGwtZ28tcHJldicpO1xyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3aWxsLWdvLW5leHQnKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnNpemUpIHtcclxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPVxyXG4gICAgICAgICAgdGhpcy5sZW5ndGggPD0gdGhpcy5zaXplID8gJ2N1cnJlbnQnIDpcclxuICAgICAgICAgIGl0ZW1PcmRlciA+IC0xICYmIGl0ZW1PcmRlciA8IHRoaXMuc2l6ZSA/ICdjdXJyZW50JyA6XHJcbiAgICAgICAgICBpdGVtT3JkZXIgPT09IC0xIHx8IGl0ZW1PcmRlciA9PT0gdGhpcy5sZW5ndGggLSAxID8gJ3ByZXYnIDpcclxuICAgICAgICAgIGl0ZW1PcmRlciA9PT0gdGhpcy5zaXplID8gJ25leHQnIDpcclxuICAgICAgICAgICcnO1xyXG4gICAgICAgIGlmICghY2xhc3NOYW1lKSByZXR1cm4gdGhpcztcclxuICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgc2xpZGUuc3R5bGUub3JkZXIgPSBpdGVtT3JkZXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmRpcikge1xyXG4gICAgICAgIGNvbnN0IGFuaW1DbGFzc05hbWUgPSAnd2lsbC1nby0nICsgdGhpcy5kaXI7XHJcbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChhbmltQ2xhc3NOYW1lKTtcclxuICAgICAgICBzbGlkZS5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0QW5pbWF0aW9uRW5kXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmVtb3ZlV2lsbFJlbmRlckNsYXNzKHNsaWRlLCBhbmltQ2xhc3NOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzbGlkZS5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmVtb3ZlV2lsbFJlbmRlckNsYXNzKHNsaWRlLCBhbmltQ2xhc3NOYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVdpbGxSZW5kZXJDbGFzcyhzbGlkZSwgY2xhc3NOYW1lKSB7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHByZXYoKSB7XHJcbiAgICB0aGlzLmRpciA9ICdwcmV2JztcclxuICAgIHJldHVybiBzdXBlci5wcmV2KCk7XHJcbiAgfVxyXG5cclxuICBuZXh0KCkge1xyXG4gICAgdGhpcy5kaXIgPSAnbmV4dCc7XHJcbiAgICByZXR1cm4gc3VwZXIubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgZ29UbyhpbmRleCkge1xyXG4gICAgdGhpcy5kaXIgPSBpbmRleCA+IHRoaXMuaW5kZXggPyAnbmV4dCcgOiAncHJldic7XHJcbiAgICByZXR1cm4gc3VwZXIuZ29UbyhpbmRleCk7XHJcbiAgfVxyXG5cclxufVxuXG5mdW5jdGlvbiBfbWFwKHdoYXQsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAodHlwZW9mIHdoYXQgPT09ICdzdHJpbmcnKSB3aGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh3aGF0KTtcclxuICAgIGlmICghKHdoYXQgaW5zdGFuY2VvZiBBcnJheSkpIHdoYXQgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh3aGF0KTtcclxuICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB3aGF0ID0gd2hhdC5tYXAodyA9PiBjYWxsYmFjayh3KSk7XHJcbiAgICByZXR1cm4gd2hhdDtcclxuICB9XHJcbiAgXHJcbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChlbCwgYXR0cnMpIHtcclxuICBcclxuICAgIGZ1bmN0aW9uIGVsZW1lbnQoZWwsIGF0dHJzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbCk7XHJcbiAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBOb2RlKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChhdHRycykgZXh0ZW5kKGVsLCBhdHRycyk7XHJcbiAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZnVuY3Rpb24gZXh0ZW5kKG9iaiwgcHJvcHMpIHtcclxuICAgICAgICBjb25zdCBleHRlbmRlcnMgPSB7XHJcbiAgICAgICAgICAgIHN0eWxlOiBmdW5jdGlvbiAoc3R5bGVzKSB7XHJcbiAgICAgICAgICAgICAgICBleHRlbmQob2JqLnN0eWxlLCBzdHlsZXMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhc2V0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBkYXRhKSBvYmouc2V0QXR0cmlidXRlKCdkYXRhLScgKyBuYW1lLCBkYXRhW25hbWVdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXZlbnRzOiBmdW5jdGlvbiAoY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIGNhbGxiYWNrcykgb2JqLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgY2FsbGJhY2tzW25hbWVdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IGZ1bmN0aW9uIChraWRzKSB7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGtpZHMsIGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmFwcGVuZENoaWxkKGspO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgKGV4dGVuZGVyc1tuYW1lXSB8fCBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICBvYmpbbmFtZV0gPSB2YWw7XHJcbiAgICAgICAgICAgIH0pKHByb3BzW25hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICByZXR1cm4gZWxlbWVudChlbCwgYXR0cnMpO1xyXG4gIFxyXG4gIH1cblxuY2xhc3MgTGlnaHRib3gge1xyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtY29udGFpbmVyJykgfHwgY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1jb250YWluZXInLFxyXG4gICAgICAgICAgICBkYXRhc2V0OiB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbDogJycsXHJcbiAgICAgICAgICAgICAgICBncmlkOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucHJldik7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG4gICAgICAgIC8vdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUJ1dHRvbik7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnBhcmVudEVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlQnV0dG9uKTtcclxuICAgICAgICB0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy5pbWcpO1xyXG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaW1nLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQgd3JhcHBlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LXdyYXBwZXInKSB8fCBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LXdyYXBwZXInLFxyXG4gICAgICAgICAgICBkYXRhc2V0OiB7XHJcbiAgICAgICAgICAgICAgICBjZWxsOiAnc2hyaW5rJyxcclxuICAgICAgICAgICAgICAgIGdyaWQ6ICdjb2x1bW4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgZ2V0IHByZXYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1wcmV2JykgfHwgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1wcmV2JyxcclxuICAgICAgICAgICAgaW5uZXJIVE1MOiAnPHN2ZyB4bWxucz1cImh0dHBzOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdib3g9XCIwIDAgMTI5IDEyOVwiPjxwYXRoIGQ9XCJNODguNiAxMjEuM2MuOC44IDEuOCAxLjIgMi45IDEuMnMyLjEtLjQgMi45LTEuMmMxLjYtMS42IDEuNi00LjIgMC01LjhsLTUxLTUxIDUxLTUxYzEuNi0xLjYgMS42LTQuMiAwLTUuOHMtNC4yLTEuNi01LjggMGwtNTQgNTMuOWMtMS42IDEuNi0xLjYgNC4yIDAgNS44bDU0IDUzLjl6XCIgLz48L3N2Zz4nLFxyXG4gICAgICAgICAgICBkYXRhc2V0OiB7XHJcbiAgICAgICAgICAgICAgICBidG46ICdsaW5rJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLmdvUHJldigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldCBuZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtbmV4dCcpIHx8IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtbmV4dCcsXHJcbiAgICAgICAgICAgIGlubmVySFRNTDogJzxzdmcgeG1sbnM9XCJodHRwczovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Ym94PVwiMCAwIDEyOSAxMjlcIj48cGF0aCBkPVwiTTQwLjQgMTIxLjNjLS44LjgtMS44IDEuMi0yLjkgMS4ycy0yLjEtLjQtMi45LTEuMmMtMS42LTEuNi0xLjYtNC4yIDAtNS44bDUxLTUxLTUxLTUxYy0xLjYtMS42LTEuNi00LjIgMC01LjggMS42LTEuNiA0LjItMS42IDUuOCAwbDUzLjkgNTMuOWMxLjYgMS42IDEuNiA0LjIgMCA1LjhsLTUzLjkgNTMuOXpcIiAvPjwvc3ZnPicsXHJcbiAgICAgICAgICAgIGRhdGFzZXQ6IHtcclxuICAgICAgICAgICAgICAgIGJ0bjogJ2xpbmsnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMuZ29OZXh0KCksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldCBjbG9zZUJ1dHRvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LWNsb3NlJykgfHwgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1jbG9zZScsXHJcbiAgICAgICAgICAgIGlubmVySFRNTDogJzxzdmcgeG1sbnM9XCJodHRwczovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Ym94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiI2ZmZlwiIGQ9XCJNNTA1Ljk0MyA2LjA1OGMtOC4wNzctOC4wNzctMjEuMTcyLTguMDc3LTI5LjI0OSAwTDYuMDU4IDQ3Ni42OTNjLTguMDc3IDguMDc3LTguMDc3IDIxLjE3MiAwIDI5LjI0OUEyMC42MTIgMjAuNjEyIDAgMCAwIDIwLjY4MyA1MTJhMjAuNjE0IDIwLjYxNCAwIDAgMCAxNC42MjUtNi4wNTlMNTA1Ljk0MyAzNS4zMDZjOC4wNzYtOC4wNzYgOC4wNzYtMjEuMTcxIDAtMjkuMjQ4elwiLz48cGF0aCBmaWxsPVwiI2ZmZlwiIGQ9XCJNNTA1Ljk0MiA0NzYuNjk0TDM1LjMwNiA2LjA1OWMtOC4wNzYtOC4wNzctMjEuMTcyLTguMDc3LTI5LjI0OCAwLTguMDc3IDguMDc2LTguMDc3IDIxLjE3MSAwIDI5LjI0OGw0NzAuNjM2IDQ3MC42MzZhMjAuNjE2IDIwLjYxNiAwIDAgMCAxNC42MjUgNi4wNTggMjAuNjE1IDIwLjYxNSAwIDAgMCAxNC42MjQtNi4wNTdjOC4wNzUtOC4wNzggOC4wNzUtMjEuMTczLS4wMDEtMjkuMjV6XCIvPjwvc3ZnPicsXHJcbiAgICAgICAgICAgIGRhdGFzZXQ6IHtcclxuICAgICAgICAgICAgICAgIGJ0bjogJ2xpbmsnLFxyXG4gICAgICAgICAgICAgICAgY2VsbDogJ3NocmluayBlbmQnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMuY2xvc2UoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXRlbXMoKSB7XHJcbiAgICAgICAgdmFyIGRvbU5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNlbGVjdG9yKTtcclxuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9tTm9kZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpbWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtaW1nJykgfHwgY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1pbWcnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFyZ2V0Jyk7XHJcbiAgICB9XHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd0YXJnZXQnKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGNvbnN0IGltZyA9IHRoaXMuaXRlbXNbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IHNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGlnaHRib3gnKSA/IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGlnaHRib3gnKSA6IGltZy5zcmM7XHJcbiAgICAgICAgdGhpcy5pbWcuc3JjID0gc3JjO1xyXG4gICAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdvUHJldigpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4IC0gMTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5pdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3coaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgZ29OZXh0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXggKyAxO1xyXG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLml0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zaG93KGluZGV4KTtcclxuICAgIH1cclxufVxuXG5jb25zdCBzbGlkZXJPcHRpb25zID0ge1xyXG4gICAgYXV0b3BsYXk6IHNsaWRlciA9PiB7XHJcbiAgICAgIHNsaWRlclxyXG4gICAgICAgIC5wbGF5KClcclxuICAgICAgICAub24oJ21vdXNlb3ZlcicsICgpID0+IHNsaWRlci5wYXVzZSgpKVxyXG4gICAgICAgIC5vbignbW91c2VvdXQnLCAoKSA9PiBzbGlkZXIucGxheSgpKTtcclxuICAgIH1cclxuICB9O1xyXG5mdW5jdGlvbiBjb25maWdTbGlkZXIoc2xpZGVyLCBwYXJlbnQpIHtcclxuICAgIGNvbnN0IGZpcnN0ID0gcGFyZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1maXJzdCcpIHwgMDtcclxuICAgIGlmIChmaXJzdCkge1xyXG4gICAgICBzbGlkZXIuZ29UbyhmaXJzdCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvcHRpb25zID0gcGFyZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1vcHRpb25zJykgPyBwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW9wdGlvbnMnKS5zcGxpdCgnICcpIDogW107XHJcbiAgICBvcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHNsaWRlck9wdGlvbnNbb3B0aW9uXSAmJiBzbGlkZXJPcHRpb25zW29wdGlvbl0oc2xpZGVyKSk7XHJcbiAgXHJcbiAgICBjb25zdCBzbGlkZXJDYWxsYmFja3MgPSB7XHJcbiAgICAgIG9wZW5Pbk1vYmlsZTogKCkgPT4ge1xyXG4gICAgICAgIGlmIChzY3JlZW4oKS53aWR0aCA+IDYwMCkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0ID0gc2xpZGVyLmZpbmQoc2xpZGUgPT4gc2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW9yZGVyJykgPT09ICcwJyk7XHJcbiAgICAgICAgaWYgKCFmaXJzdCkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGZpcnN0LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLWltZyBhW2hyZWZePVwiamF2YXNjcmlwdDpcIl0nKTtcclxuICAgICAgICBpZiAoIWJ0bikgcmV0dXJuO1xyXG4gICAgICAgIGJ0bi5jbGljaygpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIFxyXG4gICAgX21hcCgnW2RhdGEtY29udHJvbF0nLCBjb250cm9sID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gY29udHJvbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29udHJvbCcpO1xyXG4gICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gdGFyZ2V0ID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpIDogbnVsbDtcclxuICBcclxuICAgICAgaWYgKHRhcmdldEVsZW1lbnQgJiYgdGFyZ2V0RWxlbWVudCA9PT0gc2xpZGVyLnBhcmVudCkge1xyXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGNvbnRyb2wuZ2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicpO1xyXG4gICAgICAgIGlmICgoYWN0aW9uID09PSAncHJldicgfHwgYWN0aW9uID09PSAnbmV4dCcpICYmIChzbGlkZXIuc2l6ZSA+PSBzbGlkZXIubGVuZ3RoKSkge1xyXG4gICAgICAgICAgY29udHJvbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3ZlcnNpemUnLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYWN0aW9uRGF0YSA9IGNvbnRyb2wuZ2V0QXR0cmlidXRlKCdkYXRhLXBhcmFtcycpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IGFjdGlvbkRhdGEgPyBhY3Rpb25EYXRhLnNwbGl0KCcsJykgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gY29udHJvbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2FsbGJhY2snKTtcclxuICAgICAgICBpZiAoYWN0aW9uICYmIHNsaWRlclthY3Rpb25dIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICAgIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNsaWRlclthY3Rpb25dLmFwcGx5KHNsaWRlciwgcGFyYW1zKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIHNsaWRlckNhbGxiYWNrc1tjYWxsYmFja10pIHNsaWRlckNhbGxiYWNrc1tjYWxsYmFja10oKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxuXG5jb25zdCBtYXNjYXJhcyA9IHtcclxuXHJcbiAgICBub21lOiAoY2FtcG8pID0+IHtcclxuICAgICAgICBpZiAoL15bXmEtekEtWl0rLy50ZXN0KGNhbXBvLnZhbHVlKSkgY2FtcG8udmFsdWUgPSAnJztcclxuICAgICAgICBjb25zdCByZWdyYSA9IC9bLSdhLXpBLVrDgC3DlsOYLcO2w7gtxb8gXSsvZ2k7XHJcbiAgICAgICAgY29uc3QgdmFsb3JlcyA9IGNhbXBvLnZhbHVlLm1hdGNoKHJlZ3JhKTtcclxuICAgICAgICBpZiAodmFsb3JlcykgY2FtcG8udmFsdWUgPSB2YWxvcmVzLmpvaW4oJycpLnJlcGxhY2UoLyArL2dpLCAnICcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjZXA6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlZ3JhcyA9IFsvXFxkKy9naSwgL14oXFxkezV9KS0/KFxcZHsxLDN9KS9dO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yZXMgPSBjYW1wby52YWx1ZS5tYXRjaChyZWdyYXNbMF0pO1xyXG4gICAgICAgIGlmICghdmFsb3JlcykgcmV0dXJuIGNhbXBvLnZhbHVlID0gJyc7XHJcbiAgICAgICAgY2FtcG8udmFsdWUgPSB2YWxvcmVzLmpvaW4oJycpO1xyXG4gICAgICAgIGlmIChyZWdyYXNbMV0udGVzdChjYW1wby52YWx1ZSkpIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUucmVwbGFjZShyZWdyYXNbMV0sICckMS0kMicpO1xyXG4gICAgICAgIGlmIChjYW1wby52YWx1ZS5sZW5ndGggPiA5KSBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnN1YnN0cigwLCA5KTtcclxuICAgIH0sXHJcblxyXG4gICAgdGVsZWZvbmU6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlZ3JhcyA9IFsvXFxkKy9naSwgL14oXFxkXFxkPykvLCAvXihcXGRcXGQpKFxcZHs0fSktPyhcXGR7MSw0fSkvLCAvXihcXGRcXGQpKFxcZHs1fSktPyhcXGR7MSw0fSkvXTtcclxuICAgICAgICBjb25zdCB2YWxvcmVzID0gY2FtcG8udmFsdWUubWF0Y2gocmVncmFzWzBdKTtcclxuICAgICAgICBpZiAoIXZhbG9yZXMpIHJldHVybiBjYW1wby52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yID0gY2FtcG8udmFsdWUgPSB2YWxvcmVzLmpvaW4oJycpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAwKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzFdLCAnKCQxJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDIpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbMV0sICcoJDEpICcpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA2KSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzJdLCAnKCQxKSAkMi0kMycpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAxMCkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1szXSwgJygkMSkgJDItJDMnKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gMTEpIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUuc3Vic3RyKDAsIDE1KTtcclxuICAgIH0sXHJcblxyXG4gICAgcmc6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlZ3JhcyA9IFsvXFxkKy9naSwgL14oXFxkezEsMn0pLywgL14oXFxkezEsMn0pXFwuPyhcXGR7M30pLywgL14oXFxkezEsMn0pXFwuPyhcXGR7M30pXFwuPyhcXGR7M30pLywgL14oXFxkezEsMn0pXFwuPyhcXGR7M30pXFwuPyhcXGR7M30pLT8oXFxkKT8vXTtcclxuICAgICAgICBjb25zdCB2YWxvcmVzID0gY2FtcG8udmFsdWUubWF0Y2gocmVncmFzWzBdKTtcclxuICAgICAgICBjb25zdCBsZXRyYXMgPSBjYW1wby52YWx1ZS5tYXRjaCgvW2EtekEtWl0rJC9naSk7XHJcbiAgICAgICAgY29uc3QgZGlnaXRvID0gbGV0cmFzID8gbGV0cmFzWzBdWzBdIDogJyc7XHJcbiAgICAgICAgaWYgKCF2YWxvcmVzKSByZXR1cm4gY2FtcG8udmFsdWUgPSAnJztcclxuICAgICAgICBjb25zdCB2YWxvciA9IGNhbXBvLnZhbHVlID0gdmFsb3Jlcy5qb2luKCcnKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gMikgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1sxXSwgJyQxLicpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA1KSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzJdLCAnJDEuJDIuJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDcpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbM10sICckMS4kMi4kMycpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPT09IDggJiYgZGlnaXRvKSBjYW1wby52YWx1ZSArPSAnLScgKyBkaWdpdG8udG9VcHBlckNhc2UoKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gOCkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1s0XSwgJyQxLiQyLiQzLSQ0Jyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDkpIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUuc3Vic3RyKDAsIDEyKTtcclxuICAgIH0sXHJcblxyXG4gICAgY3BmY25wajogKGNhbXBvKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbnVtZXJvcyA9IC9cXGQrL2dpO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yZXMgPSBjYW1wby52YWx1ZS5tYXRjaChudW1lcm9zKTtcclxuICAgICAgICBpZiAoIXZhbG9yZXMpIHJldHVybiBjYW1wby52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yID0gdmFsb3Jlcy5qb2luKCcnKTtcclxuICAgICAgICBjb25zdCBjcGYgPSAvXihbMC05XXsxLDN9KT9cXC4/KFswLTldezEsM30pP1xcLj8oWzAtOV17MSwzfSk/XFwtPyhbMC05XXsxLDJ9KT8kLztcclxuICAgICAgICBjb25zdCBjbnBqID0gL14oWzAtOV17MSwyfSk/XFwuPyhbMC05XXsxLDN9KT9cXC4/KFswLTldezEsM30pP1xcLz8oWzAtOV17MSw0fSk/XFwtPyhbMC05XXsxLDJ9KT8kLztcclxuICAgICAgICBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnJlcGxhY2UoL1teXFxkLlxcLy1dL2dpLCAnJyk7XHJcbiAgICAgICAgaWYgKGNwZi50ZXN0KHZhbG9yKSkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKGNwZiwgKGFsbCwgYSwgYiwgYywgZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKGEgfHwgJycpICsgKGIgPyAnLicgKyBiIDogJycpICsgKGMgPyAnLicgKyBjIDogJycpICsgKGQgPyAnLScgKyBkIDogJycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsc2UgaWYgKGNucGoudGVzdCh2YWxvcikpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShjbnBqLCAoYWxsLCBhLCBiLCBjLCBkLCBlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoYSB8fCAnJykgKyAoYiA/ICcuJyArIGIgOiAnJykgKyAoYyA/ICcuJyArIGMgOiAnJykgKyAoZCA/ICcvJyArIGQgOiAnJykgKyAoZSA/ICctJyArIGUgOiAnJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGNhbXBvLnZhbHVlLmxlbmd0aCA+IDE4KSBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnN1YnN0cigwLCAxOCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRhdGE6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGlmIChjYW1wby50eXBlID09PSAnZGF0ZScpIHJldHVybjtcclxuICAgICAgICBjb25zdCBudW1lcm9zID0gY2FtcG8udmFsdWUucmVwbGFjZSgvXjA/XFwvfFteXFxkXFwvXS9naSwgJycpO1xyXG4gICAgICAgIGlmIChudW1lcm9zID09PSAnJykge1xyXG4gICAgICAgICAgICBjYW1wby52YWx1ZSA9IG51bWVyb3M7XHJcbiAgICAgICAgICAgIGNhbXBvLnN0eWxlLmJvcmRlckNvbG9yID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYW1wby52YWx1ZSA9IG51bWVyb3NcclxuICAgICAgICAucmVwbGFjZSgvKF58XFwvKTAwK1xcLz8vZywgJzAnKVxyXG4gICAgICAgIC5yZXBsYWNlKC8oXnxcXC8pKFsxLTldXFwvKS8sICcwJDInKVxyXG4gICAgICAgIC5yZXBsYWNlKFxyXG4gICAgICAgICAgICAvKFxcZFxcZCkoXFwvPykoXFxkezEsMn0pPyhcXC8/KTAqKFxcZHsxLDR9KT8uKi9nLFxyXG4gICAgICAgICAgICBmdW5jdGlvbihhbGwsIGRkLCBzMSwgbW0sIHMyLCBhYWFhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGQgPiAzMSB8fCBtbSA+IDEyKSBjYW1wby5zdHlsZS5ib3JkZXJDb2xvciA9ICdyZWQnO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBjYW1wby5zdHlsZS5ib3JkZXJDb2xvciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGQgKyAobW0gPyAnLycgKyBtbSA6IHMxIHx8ICcnKSArIChhYWFhID8gJy8nICsgYWFhYSA6IHMyIHx8ICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIGVtYWlsOiAoY2FtcG8pID0+IHtcclxuICAgICAgICBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmhhOiAoY2FtcG8pID0+IHtcclxuICAgICAgICBpZiAoY2FtcG8udmFsdWUubGVuZ3RoID4gMCAmJiBjYW1wby52YWx1ZS5sZW5ndGggPCA2KSBjYW1wby5zdHlsZS5ib3JkZXJDb2xvciA9ICdyZWQnO1xyXG4gICAgICAgIGVsc2UgY2FtcG8uc3R5bGUuYm9yZGVyQ29sb3IgPSBudWxsO1xyXG4gICAgfVxyXG5cclxufTtcblxuLy8gLS0tLS0tIFRBQlMgLS0tLS0tXHJcbmNvbnN0IGFsbFRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YXJnZXRdJyk7XHJcbmNvbnN0IGxpbmtzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYWxsVGFyZ2V0cyk7XHJcblxyXG5saW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rKXtcclxuICBjb25zdCBsaW5rVGFyZ2V0ID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyk7XHJcbiAgY29uc3QgYWxsVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYl0nKTtcclxuXHJcbiAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0YXJnZXRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYWxsVGFicyk7ICAgICAgXHJcbiAgICB0YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCl7XHJcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcclxuXHJcbiAgICAgIGlmKGxpbmtUYXJnZXQgPT09IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJykpe1xyXG4gICAgICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xyXG4gICAgICAgIGxpbmtzLmZvckVhY2goYnRuID0+e1xyXG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbi8vIC0tLS0tLSBDUkVBVEUgRUxFTUVOVCAtLS0tLS1cclxuY29uc3QgYnRuQ3JlYXRlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jcmVhdGVdJyk7XHJcbmJ0bkNyZWF0ZUVsICYmIGJ0bkNyZWF0ZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICBjb25zdCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzPVwicG9zdC1jb250ZW50XCJdJyk7XHJcbiAgY29udGVudC5hcHBlbmRDaGlsZChuZXdMaXN0KTtcclxuICBuZXdMaXN0LmlubmVySFRNTCA9ICc8bGk+dGVzdGUxPC9saT48bGk+dGVzdGUyPC9saT4nO1xyXG59KTtcclxuXHJcbi8vIC0tLS0tLSBTVU1SRURVQ0VSIFdJVEggRkxBVCAtLS0tLS1cclxuZnVuY3Rpb24gc3VtUmVkdWNlcigpIHtcclxuICAvL2NvbnZlcnRlciBhcmd1bWVudHMgZW0gYXJyYXlcclxuICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAvLyBhY2hhdGFyIGFyZ3NcclxuICBjb25zdCBmbGF0QXJncyA9IGFyZ3MuZmxhdChJbmZpbml0eSk7XHJcbiAgLy9maWx0YXIgbsO6bWVyb3NcclxuICBjb25zdCBudW1iZXJBcmdzID0gZmxhdEFyZ3MuZmlsdGVyKG4gPT4gdHlwZW9mIG4gPT09ICdudW1iZXInKTtcclxuICAvLyBzb21hclxyXG4gIHJldHVybiBudW1iZXJBcmdzLnJlZHVjZSgoc3VtLCBuKSA9PiBzdW0gKyBuLCAwKTtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gZmxhdHRlbkRlZXAoYXJyMSl7XHJcbi8vICAgcmV0dXJuIGFycjEucmVkdWNlKChhY2MsIHZhbCkgPT4gQXJyYXkuaXNBcnJheSh2YWwpID8gYWNjLmNvbmNhdChmbGF0dGVuRGVlcCh2YWwpKSA6IGFjYy5jb25jYXQodmFsKSwgW10pO1xyXG4vLyB9XHJcblxyXG5jb25zdCByZXN1bHQgPSBzdW1SZWR1Y2VyKFswLCAzLCA3XSwgW251bGwsICdlbWEgd2F0c29uJywgODJdLCA1LCBbWzMsIDBdLCBbMV0sIG51bGxdLCBbXSk7XHJcblxyXG5jb25zdCByZXN1bHRTdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zdW1dJyk7XHJcbnJlc3VsdFN1bSAmJiByZXN1bHRTdW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gIGNvbnN0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3M9XCJwb3N0LWNvbnRlbnRcIl0nKTtcclxuICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0Rpdik7XHJcbiAgbmV3RGl2LmlubmVySFRNTCA9IGAke3Jlc3VsdH1gO1xyXG59KTtcclxuXHJcbi8vIC0tLS0tLSBGRVRDSCAtLS0tLS1cclxuZnVuY3Rpb24gY3JlYXRlTm9kZShlbGVtZW50KXtcclxuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTsgLy8gQ3JlYXRlIHRoZSB0eXBlIG9mIGVsZW1lbnQgeW91IHBhc3MgaW4gdGhlIHBhcmFtZXRlcnNcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kKHBhcmVudCwgZWwpe1xyXG4gIHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpOyAvLyBBcHBlbmQgdGhlIHNlY29uZCBwYXJhbWV0ZXIoZWxlbWVudCkgdG8gdGhlIGZpcnN0IG9uZVxyXG59XHJcblxyXG5jb25zdCBncmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dGhvcnMnKTsgLy8gR2V0IHRoZSBsaXN0IHdoZXJlIHdlIHdpbGwgcGxhY2Ugb3VyIGF1dGhvcnNcclxuY29uc3QgdXJsID0gJ2h0dHBzOi8vcmFuZG9tdXNlci5tZS9hcGkvP3Jlc3VsdHM9MTAnOyAvLyBHZXQgMTAgcmFuZG9tIHVzZXJzXHJcblxyXG5mZXRjaCh1cmwpIC8vIENhbGwgdGhlIGZldGNoIGZ1bmN0aW9uIHBhc3NpbmcgdGhlIHVybCBvZiB0aGUgQVBJIGFzIGEgcGFyYW1ldGVyXHJcbi50aGVuKChyZXNwKT0+IHJlc3AuanNvbigpKSAvLyBUcmFuc2Zvcm0gdGhlIGRhdGEgaW50byBKU09OXHJcbi50aGVuKGZ1bmN0aW9uKGRhdGEpe1xyXG4gIC8vIFlvdXIgY29kZSBmb3IgaGFuZGxpbmcgdGhlIGRhdGEgeW91IGdldCBmcm9tIHRoZSBBUElcclxuICAvLyBDcmVhdGUgYW5kIGFwcGVuZCB0aGUgbGkncyB0byB0aGUgdWxcclxuICBsZXQgYXV0aG9ycyA9IGRhdGEucmVzdWx0czsgLy8gR2V0IHRoZSByZXN1bHRzXHJcbiAgcmV0dXJuIGF1dGhvcnMubWFwKGZ1bmN0aW9uKGF1dGhvcil7XHJcbiAgICBsZXQgZGl2ID0gY3JlYXRlTm9kZSgnZGl2JyksIC8vIENyZWF0ZSB0aGUgZWxlbWVudHMgd2UgbmVlZFxyXG4gICAgICAgIGltZyA9IGNyZWF0ZU5vZGUoJ2ltZycpLFxyXG4gICAgICAgIHAgPSBjcmVhdGVOb2RlKCdwJyk7XHJcbiAgICBpbWcuc3JjID0gYXV0aG9yLnBpY3R1cmUubWVkaXVtOyBcclxuICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbCcsICdzaHJpbmsnKTtcclxuICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcsICdjZW50ZXInKTtcclxuICAgIC8vIEFkZCB0aGUgc291cmNlIG9mIHRoZSBpbWFnZSB0byBiZSB0aGUgc3JjIG9mIHRoZSBpbWcgZWxlbWVudFxyXG4gICAgcC5pbm5lckhUTUwgPSBgJHthdXRob3IubmFtZS5maXJzdH0gJHthdXRob3IubmFtZS5sYXN0fWA7IFxyXG4gICAgLy8gTWFrZSB0aGUgSFRNTCBvZiBvdXIgcCB0byBiZSB0aGUgZmlyc3QgYW5kIGxhc3QgbmFtZSBvZiBvdXIgYXV0aG9yXHJcbiAgICBhcHBlbmQoZGl2LCBpbWcpOyAvLyBBcHBlbmQgYWxsIG91ciBlbGVtZW50c1xyXG4gICAgYXBwZW5kKGRpdiwgcCk7XHJcbiAgICBhcHBlbmQoZ3JpZCwgZGl2KTtcclxuICB9KVxyXG59KVxyXG4uY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gIGNvbnNvbGUubG9nKGVycm9yKTtcclxufSk7XHJcblxyXG4vLyAtLS0tLS0gU0xJREVSIFdJVEggTElHSFRCT1ggLS0tLS0tXHJcbndpbmRvdy5zbGlkZXJzID0gX21hcCgnLnNsaWRlcicsIHBhcmVudCA9PiB7XHJcbiAgY29uc3Qgc2xpZGVyID0gbmV3IFNsaWRlcih7XHJcbiAgICBwYXJlbnRcclxuICB9KTtcclxuICBjb25maWdTbGlkZXIoc2xpZGVyLCBwYXJlbnQpO1xyXG59KTtcclxuXHJcbndpbmRvdy5jYXJvdXNlbHMgPSBfbWFwKCcuY2Fyb3VzZWwnLCBwYXJlbnQgPT4ge1xyXG4gIGNvbnN0IHNpemUgPSBwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNpemUnKSB8IDA7XHJcbiAgY29uc3QgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWwoe1xyXG4gICAgcGFyZW50LFxyXG4gICAgc2l6ZVxyXG4gIH0pO1xyXG4gIGNvbmZpZ1NsaWRlcihjYXJvdXNlbCwgcGFyZW50KTtcclxuICByZXR1cm4gY2Fyb3VzZWw7XHJcbn0pO1xyXG5cclxudmFyIGxpZ2h0Ym94ID0gbmV3IExpZ2h0Ym94KFwiW2RhdGEtbGlnaHRib3hdXCIpO1xyXG5cclxuLy8gLS0tLS0tIE1BU0tTIC0tLS0tLVxyXG5jb25zdCBlYWNoID0gKGksIGYpID0+IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoaSwgZik7XHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJyk7XHJcblxyXG5pZiAoZm9ybS5sZW5ndGgpIGVhY2goZm9ybSwgRm9ybU1hc2spO1xyXG5mdW5jdGlvbiBGb3JtTWFzayhmKSB7XHJcbiAgKEFycmF5LmZyb20oZi5lbGVtZW50cykpXHJcbiAgICAgIC5maWx0ZXIoZWwgPT4gZWwuaGFzQXR0cmlidXRlKCdkYXRhLW1hc2snKSlcclxuICAgICAgLmZvckVhY2goY2FtcG8gPT4gY2FtcG8uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgbWV0b2RvID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWFzaycpO1xyXG4gICAgICAgIGlmICghbWFzY2FyYXNbbWV0b2RvXSkgcmV0dXJuIGNvbnNvbGUubG9nKGBBIG3DoXNjYXJhIGRvIHRpcG8gXCIke21ldG9kb31cIiBuw6NvIGZvaSBkZWZpbmlkYS5gKTtcclxuXHJcbiAgICAgICAgbWFzY2FyYXNbbWV0b2RvXSh0aGlzKTtcclxuICB9KSk7XHJcbn1cclxuXHJcbi8vIC0tLS0tLSBDUlVEIFdJVEggSlMgLS0tLS0tXHJcbmNvbnN0IG5vbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm9tZScpO1xyXG5jb25zdCBwayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjcGZjbnBqJyk7XHJcbmNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VtYWlsJyk7XHJcblxyXG5mdW5jdGlvbiBtYWtlT2JqKGRhdGEpe1xyXG4gIHJldHVybiB7XHJcbiAgICBub21lOiBub21lLnZhbHVlLFxyXG4gICAgY3BmOiBway52YWx1ZSxcclxuICAgIGVtYWlsOiBlbWFpbC52YWx1ZVxyXG4gIH1cclxufVxyXG5cclxubGV0IGFycmF5ID0gW107XHJcbmNvbnN0IGNsZWFyRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0LWZvcm0nKTtcclxuY29uc3QgYnRuRW52aWFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVudmlhcicpO1xyXG5jb25zdCBidG5EZWxldGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0YXInKTtcclxuXHJcbmJ0bkVudmlhciAmJiBidG5FbnZpYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gIGlmKG5vbWUudmFsdWUhPW51bGwsIG5vbWUudmFsdWUhPVwiXCIgJiYgcGsudmFsdWUhPW51bGwsIHBrLnZhbHVlIT1cIlwiICYmIGVtYWlsLnZhbHVlIT1udWxsLCBlbWFpbC52YWx1ZSE9XCJcIil7XHJcbiAgICBsZXQgaW5kZXhBcnJheSA9IGFycmF5LmZpbmRJbmRleChlbGVtID0+IHtcclxuICAgICAgcmV0dXJuIGVsZW0uY3BmPT09cGsudmFsdWVcclxuICAgIH0pO1xyXG4gICAgaWYoaW5kZXhBcnJheSA+IC0xKXtcclxuICAgICAgYXJyYXlbaW5kZXhBcnJheV0gPSBtYWtlT2JqKCk7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBhcnJheS5wdXNoKG1ha2VPYmooKSk7XHJcbiAgICB9XHJcbiAgICB0cmFuc2Zvcm1UZXh0KGFycmF5KTtcclxuICAgIGNsZWFyRm9ybS5yZXNldCgpO1xyXG4gIH1cclxuICBlbHNle1xyXG4gICAgYWxlcnQoJ1ByZWVuY2hhIHRvZG9zIG9zIGNhbXBvcyEnKTtcclxuICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gdHJhbnNmb3JtVGV4dChhcnJheSl7XHJcbiAgLy8gY29uc3Qgb2JqZWN0VGV4dCA9IEpTT04uc3RyaW5naWZ5KHthcnJheX0sIG51bGwsIFwiIFwiKVxyXG4gIC8vIGNvbnN0IGRhdGFDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0c19kaXNwbGF5Jyk7XHJcbiAgLy8gZGF0YUNvbnRhaW5lci50ZXh0Q29udGVudCA9IG9iamVjdFRleHQ7XHJcbiAgY29uc3Qgb2JqZWN0VGV4dCA9IGFycmF5LnJlZHVjZSgoYWNjLCBpdGVtLCBpbmRleCkgPT57XHJcbiAgICBhY2MrPSBgPHVsPjxsaT4ke2l0ZW0ubm9tZX08L2xpPjxsaT4ke2l0ZW0uY3BmfTwvbGk+PGxpPiR7aXRlbS5lbWFpbH08L2xpPjwvdWw+YDtcclxuICAgIHJldHVybiBhY2NcclxuICB9LCAnJyk7XHJcbiAgY29uc3QgZGF0YUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzX2Rpc3BsYXknKTtcclxuICBkYXRhQ29udGFpbmVyLmlubmVySFRNTCA9IG9iamVjdFRleHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFycmF5UmVtb3ZlKGFyciwgdmFsdWUpeyAvL3JldG9ybmEgdG9kb3Mgb3MgZWxlbWVudG9zIGRvIGFycmF5IG1lbm9zIG8gcXVlIHZvY8OqIHBhc3NhclxyXG4gIHJldHVybiBhcnIuZmlsdGVyKChlbGUsIGluZGV4KSA9PiB7cmV0dXJuIGluZGV4ICE9IHZhbHVlfSlcclxufVxyXG5cclxuYnRuRGVsZXRhciAmJiBidG5EZWxldGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XHJcbiAgbGV0IGluZGV4QXJyYXkgPSBhcnJheS5maW5kSW5kZXgoZWxlbSA9PiB7XHJcbiAgICByZXR1cm4gZWxlbS5jcGYgPT09IHBrLnZhbHVlXHJcbiAgfSk7XHJcblxyXG4gIGlmKGluZGV4QXJyYXkgPiAtMSl7XHJcbiAgICBhcnJheSA9IGFycmF5UmVtb3ZlKGFycmF5LCBpbmRleEFycmF5KTtcclxuICB9XHJcbiAgdHJhbnNmb3JtVGV4dChhcnJheSk7XHJcbiAgY2xlYXJGb3JtLnJlc2V0KCk7XHJcbn0pO1xyXG5cclxuLy8gLS0tLS0tVE9HR0xFIEJVVFRPTi0tLS0tLVxyXG5jb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b2dnbGVdJyk7XHJcbmNvbnN0IHRvZ2dsZUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb250ZW50XScpO1xyXG5cclxudG9nZ2xlQnRuICYmIHRvZ2dsZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgaWYodG9nZ2xlQ29udGVudC5oYXNBdHRyaWJ1dGUoJ2hpZGRlbicpKXtcclxuICAgIHRvZ2dsZUNvbnRlbnQucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIHRvZ2dsZUNvbnRlbnQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XHJcbiAgfVxyXG59KTtcblxufSgpKTtcbiJdfQ==
