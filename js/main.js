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

  document.querySelector('.enviar').onclick = function () {
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
  };

  function transformText(array) {
    // const objectText = JSON.stringify({array}, null, " ")
    // const dataContainer = document.querySelector('.results_display');
    // dataContainer.textContent = objectText;
    var objectText = array.reduce(function (acc, item, index) {
      acc += '<ul><li>' + item.nome + '</li><li>' + item.cpf + '</li><li>' + item.email + '</li></ul>';
      return acc;
    }, '');
    var dataContainer = document.querySelector('.results_display');
    dataContainer.textContent = objectText;
  }

  function arrayRemove(arr, value) {
    //retorna todos os elementos do array menos o que você passar
    return arr.filter(function (ele, index) {
      return index != value;
    });
  }

  document.querySelector('.deletar').onclick = function () {
    var indexArray = array.findIndex(function (elem) {
      return elem.cpf === pk.value;
    });

    if (indexArray > -1) {
      array = arrayRemove(array, indexArray);
    }
    transformText(array);
    clearForm.reset();
  };
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiU2xpZGVyIiwiY29uZmlnIiwidHlwZSIsInBhcmVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBhcmVudFNlbGVjdG9yIiwiY2hpbGRTZWxlY3RvciIsImNoaWxkcmVuIiwibGVuZ3RoIiwiaW5kZXgiLCJkdXJhdGlvbiIsImNsYXNzTGlzdCIsImFkZCIsImNvbXBvc2UiLCJmbiIsImZvckVhY2giLCJtYXAiLCJmaWx0ZXIiLCJmaW5kIiwibmV4dEluZGV4IiwicHJldkluZGV4IiwiZWwiLCJpIiwicmVtb3ZlIiwidGhhdCIsInBsYXlpbmdTdGF0ZUlEIiwic2V0SW50ZXJ2YWwiLCJuZXh0IiwiaXNQbGF5aW5nIiwiY2xlYXJJbnRlcnZhbCIsInBhdXNlIiwicGxheSIsInBsYXlpbmdTdGF0ZSIsImV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb2xsYXBzZWQiLCJjb25zb2xlIiwidGFibGUiLCJPYmplY3QiLCJrZXlzIiwicHJvcCIsImtleSIsInZhbHVlIiwibG9nIiwid2FybiIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsImdyb3VwRW5kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQ2Fyb3VzZWwiLCJzaXplIiwicG9zaXRpb24iLCJzbGlkZSIsIml0ZW1PcmRlciIsInNldEF0dHJpYnV0ZSIsImNsYXNzTmFtZSIsInN0eWxlIiwib3JkZXIiLCJkaXIiLCJhbmltQ2xhc3NOYW1lIiwicmVtb3ZlV2lsbFJlbmRlckNsYXNzIiwiX21hcCIsIndoYXQiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwidyIsImNyZWF0ZUVsZW1lbnQiLCJhdHRycyIsImVsZW1lbnQiLCJOb2RlIiwiZXh0ZW5kIiwib2JqIiwicHJvcHMiLCJleHRlbmRlcnMiLCJzdHlsZXMiLCJkYXRhc2V0IiwiZGF0YSIsIm5hbWUiLCJldmVudHMiLCJjYWxsYmFja3MiLCJraWRzIiwiayIsImFwcGVuZENoaWxkIiwidmFsIiwiTGlnaHRib3giLCJzZWxlY3RvciIsImNvbnRhaW5lciIsIm1vZGFsIiwiZ3JpZCIsInByZXYiLCJ3cmFwcGVyIiwicGFyZW50RWxlbWVudCIsImJvZHkiLCJjbG9zZUJ1dHRvbiIsImltZyIsIml0ZW1zIiwic2hvdyIsInNyYyIsImdldEF0dHJpYnV0ZSIsIm9wZW4iLCJjZWxsIiwiaW5uZXJIVE1MIiwiYnRuIiwiY2xpY2siLCJnb1ByZXYiLCJnb05leHQiLCJjbG9zZSIsImRvbU5vZGVzIiwic2xpZGVyT3B0aW9ucyIsImF1dG9wbGF5Iiwic2xpZGVyIiwib24iLCJjb25maWdTbGlkZXIiLCJmaXJzdCIsImdvVG8iLCJvcHRpb25zIiwiaGFzQXR0cmlidXRlIiwic3BsaXQiLCJvcHRpb24iLCJzbGlkZXJDYWxsYmFja3MiLCJvcGVuT25Nb2JpbGUiLCJzY3JlZW4iLCJ3aWR0aCIsInRhcmdldCIsImNvbnRyb2wiLCJ0YXJnZXRFbGVtZW50IiwiYWN0aW9uIiwiYWN0aW9uRGF0YSIsInBhcmFtcyIsImFwcGx5IiwibWFzY2FyYXMiLCJub21lIiwiY2FtcG8iLCJ0ZXN0IiwicmVncmEiLCJ2YWxvcmVzIiwibWF0Y2giLCJqb2luIiwicmVwbGFjZSIsImNlcCIsInJlZ3JhcyIsInN1YnN0ciIsInRlbGVmb25lIiwidmFsb3IiLCJyZyIsImxldHJhcyIsImRpZ2l0byIsInRvVXBwZXJDYXNlIiwiY3BmY25waiIsIm51bWVyb3MiLCJjcGYiLCJjbnBqIiwiYWxsIiwiYSIsImIiLCJjIiwiZCIsImUiLCJib3JkZXJDb2xvciIsImRkIiwiczEiLCJtbSIsInMyIiwiYWFhYSIsImVtYWlsIiwidG9Mb3dlckNhc2UiLCJzZW5oYSIsImFsbFRhcmdldHMiLCJsaW5rcyIsImxpbmsiLCJsaW5rVGFyZ2V0IiwiYWxsVGFicyIsInRhcmdldHMiLCJyZW1vdmVBdHRyaWJ1dGUiLCJidG5DcmVhdGVFbCIsIm5ld0xpc3QiLCJjb250ZW50Iiwic3VtUmVkdWNlciIsImFyZ3MiLCJhcmd1bWVudHMiLCJmbGF0QXJncyIsImZsYXQiLCJJbmZpbml0eSIsIm51bWJlckFyZ3MiLCJuIiwicmVkdWNlIiwic3VtIiwicmVzdWx0IiwicmVzdWx0U3VtIiwibmV3RGl2IiwiY3JlYXRlTm9kZSIsImFwcGVuZCIsInVsIiwiZ2V0RWxlbWVudEJ5SWQiLCJ1cmwiLCJmZXRjaCIsInRoZW4iLCJyZXNwIiwianNvbiIsImF1dGhvcnMiLCJyZXN1bHRzIiwiYXV0aG9yIiwibGkiLCJzcGFuIiwicGljdHVyZSIsIm1lZGl1bSIsImxhc3QiLCJjYXRjaCIsImVycm9yIiwid2luZG93Iiwic2xpZGVycyIsImNhcm91c2VscyIsImNhcm91c2VsIiwibGlnaHRib3giLCJlYWNoIiwiZiIsImZvcm0iLCJGb3JtTWFzayIsImZyb20iLCJlbGVtZW50cyIsIm1ldG9kbyIsInBrIiwibWFrZU9iaiIsImFycmF5IiwiY2xlYXJGb3JtIiwib25jbGljayIsImluZGV4QXJyYXkiLCJmaW5kSW5kZXgiLCJlbGVtIiwicHVzaCIsInRyYW5zZm9ybVRleHQiLCJyZXNldCIsImFsZXJ0Iiwib2JqZWN0VGV4dCIsImFjYyIsIml0ZW0iLCJkYXRhQ29udGFpbmVyIiwidGV4dENvbnRlbnQiLCJhcnJheVJlbW92ZSIsImFyciIsImVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQyxhQUFZO0FBQ2I7O0FBRGEsTUFHUEEsTUFITztBQUtULG9CQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ2xCLFdBQUtDLElBQUwsR0FBWSxRQUFaO0FBQ0EsVUFBSSxFQUFFLGdCQUFnQkYsTUFBbEIsQ0FBSixFQUErQixPQUFPLElBQUlBLE1BQUosQ0FBV0MsTUFBWCxDQUFQOztBQUUvQixXQUFLRSxNQUFMLEdBQWNGLE9BQU9FLE1BQVAsSUFBaUJDLFNBQVNDLGFBQVQsQ0FBdUJKLE9BQU9LLGNBQVAsSUFBeUIsU0FBaEQsQ0FBL0I7QUFDQSxVQUFJLENBQUMsS0FBS0gsTUFBVixFQUFr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QXZCLEVBQW1DbU8sT0FBbkMsR0FBNkMsWUFBVTtBQUNyRCxRQUFJQyxhQUFhSCxNQUFNSSxTQUFOLENBQWdCLGdCQUFRO0FBQ3ZDLGFBQU9DLEtBQUs5RSxHQUFMLEtBQWF1RSxHQUFHeEwsS0FBdkI7QUFDRCxLQUZnQixDQUFqQjs7QUFJQSxRQUFHNkwsYUFBYSxDQUFDLENBQWpCLEVBQW1CO0FBQ2pCSCxjQUFRZSxZQUFZZixLQUFaLEVBQW1CRyxVQUFuQixDQUFSO0FBQ0Q7QUFDREksa0JBQWNQLEtBQWQ7QUFDQUMsY0FBVU8sS0FBVjtBQUNELEdBVkQ7QUFZQyxDQWx0QkEsR0FBRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbid1c2Ugc3RyaWN0JztcblxuY2xhc3MgU2xpZGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgdGhpcy50eXBlID0gJ1NsaWRlcic7XHJcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTbGlkZXIpKSByZXR1cm4gbmV3IFNsaWRlcihjb25maWcpO1xyXG4gIFxyXG4gICAgICB0aGlzLnBhcmVudCA9IGNvbmZpZy5wYXJlbnQgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb25maWcucGFyZW50U2VsZWN0b3IgfHwgJy5zbGlkZXInKTtcclxuICAgICAgaWYgKCF0aGlzLnBhcmVudCkgdGhyb3cgJ1tTTElERVJdOiBDb250YWluZXIgbsOjbyBlbmNvbnRyYWRvLic7XHJcbiAgXHJcbiAgICAgIHRoaXMuY2hpbGRTZWxlY3RvciA9IGNvbmZpZy5jaGlsZFNlbGVjdG9yIHx8ICcuc2xpZGUnO1xyXG4gICAgICBpZiAoIXRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB0aHJvdyAnW1NMSURFUl06IFNsaWRlcyBuw6NvIGVuY29udHJhZG9zLic7XHJcbiAgXHJcbiAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgICB0aGlzLmR1cmF0aW9uID0gY29uZmlnLmR1cmF0aW9uIHx8IDMwMDA7XHJcbiAgICAgIHRoaXMucGFyZW50LmNsYXNzTGlzdC5hZGQoJ3NldCcpO1xyXG4gICAgICB0aGlzLmNvbXBvc2UoKTtcclxuICAgIH1cclxuICBcclxuICAgIGdldCBjaGlsZHJlbigpIHtcclxuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMucGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5jaGlsZFNlbGVjdG9yKSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBnZXQgbGVuZ3RoKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBmb3JFYWNoKGZuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZvckVhY2goZm4pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgbWFwKGZuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLm1hcChmbik7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBmaWx0ZXIoZm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmlsdGVyKGZuKTtcclxuICAgIH1cclxuICBcclxuICAgIGZpbmQoZm4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmluZChmbik7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBjb21wb3NlKCkge1xyXG4gICAgICB2YXIgbmV4dEluZGV4LCBwcmV2SW5kZXg7XHJcbiAgICAgIHByZXZJbmRleCA9IHRoaXMuaW5kZXggPiAwID8gdGhpcy5pbmRleCAtIDEgOiB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDE7XHJcbiAgICAgIG5leHRJbmRleCA9IHRoaXMuaW5kZXggPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDEgPyB0aGlzLmluZGV4ICsgMSA6IDA7XHJcbiAgICAgIHRoaXMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdwcmV2Jyk7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudCcpO1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ25leHQnKTtcclxuICAgICAgICBpZiAoaSA9PT0gcHJldkluZGV4KSBlbC5jbGFzc0xpc3QuYWRkKCdwcmV2Jyk7XHJcbiAgICAgICAgaWYgKGkgPT09IG5leHRJbmRleCkgZWwuY2xhc3NMaXN0LmFkZCgnbmV4dCcpO1xyXG4gICAgICAgIGlmIChpID09PSB0aGlzLmluZGV4KSBlbC5jbGFzc0xpc3QuYWRkKCdjdXJyZW50Jyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICBcclxuICAgIHBsYXkoKSB7XHJcbiAgICAgIHZhciB0aGF0O1xyXG4gICAgICB0aGF0ID0gdGhpcztcclxuICAgICAgdGhpcy5wbGF5aW5nU3RhdGVJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhhdC5uZXh0KCk7XHJcbiAgICAgIH0sIHRoaXMuZHVyYXRpb24pO1xyXG4gICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5wbGF5aW5nU3RhdGVJRCk7XHJcbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgcGxheXBhdXNlKCkge1xyXG4gICAgICBpZiAodGhpcy5pc1BsYXlpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXVzZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgcHJldigpIHtcclxuICAgICAgdmFyIHBsYXlpbmdTdGF0ZTtcclxuICAgICAgaWYgKHRoaXMuaW5kZXggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleC0tO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDE7XHJcbiAgICAgIH1cclxuICAgICAgcGxheWluZ1N0YXRlID0gdGhpcy5pc1BsYXlpbmc7XHJcbiAgICAgIGlmIChwbGF5aW5nU3RhdGUpIHtcclxuICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb21wb3NlKCk7XHJcbiAgICAgIGlmIChwbGF5aW5nU3RhdGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIG5leHQoKSB7XHJcbiAgICAgIHZhciBwbGF5aW5nU3RhdGU7XHJcbiAgICAgIGlmICh0aGlzLmluZGV4IDwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCsrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIHBsYXlpbmdTdGF0ZSA9IHRoaXMuaXNQbGF5aW5nO1xyXG4gICAgICBpZiAocGxheWluZ1N0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY29tcG9zZSgpO1xyXG4gICAgICBpZiAocGxheWluZ1N0YXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICBnb1RvKGluZGV4KSB7XHJcbiAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgICAgcmV0dXJuIHRoaXMuY29tcG9zZSgpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgb24oZXZlbnQsIGZuKSB7XHJcbiAgICAgIHRoaXMucGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBvZmYoZXZlbnQsIGZuKSB7XHJcbiAgICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBpbnNwZWN0KGNvbGxhcHNlZCkge1xyXG4gICAgICBjb25zb2xlW2NvbGxhcHNlZCA9PT0gdHJ1ZSA/ICdncm91cENvbGxhcHNlZCcgOiAnZ3JvdXAnXSh0aGlzLnR5cGUpO1xyXG4gICAgICBjb25zb2xlLnRhYmxlKFxyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMpLm1hcChrZXkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcHJvcDoga2V5LFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpc1trZXldLFxyXG4gICAgICAgICAgICB0eXBlOiB0eXBlb2YgdGhpc1trZXldXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5wYXJlbnQpO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmNoaWxkcmVuKTtcclxuICAgICAgY29uc29sZS53YXJuKERhdGUubm93KCkudG9TdHJpbmcoKSk7XHJcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQodGhpcy50eXBlKTtcclxuICBcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgXHJcbiAgfVxuXG5jbGFzcyBDYXJvdXNlbCBleHRlbmRzIFNsaWRlciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG4gICAgY29uZmlnLnBhcmVudFNlbGVjdG9yID0gY29uZmlnLnBhcmVudFNlbGVjdG9yIHx8ICcuY2Fyb3VzZWwnO1xyXG4gICAgc3VwZXIoY29uZmlnKTtcclxuICAgIHRoaXMudHlwZSA9ICdDYXJvdXNlbCc7XHJcbiAgICB0aGlzLnNpemUgPSBjb25maWcuc2l6ZSB8IDA7XHJcbiAgICB0aGlzLmNvbXBvc2UoKTtcclxuICB9XHJcblxyXG4gIGNvbXBvc2UoKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuaW5kZXggKyAxO1xyXG4gICAgdGhpcy5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xyXG4gICAgICBsZXQgaXRlbU9yZGVyID0gaSAtIHBvc2l0aW9uICsgMTtcclxuICAgICAgaWYgKGl0ZW1PcmRlciA8IDApIGl0ZW1PcmRlciA9IHRoaXMubGVuZ3RoIC0gcG9zaXRpb24gKyBpICsgMTtcclxuICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCdkYXRhLW9yZGVyJywgaXRlbU9yZGVyKTtcclxuXHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3ByZXYnKTtcclxuICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudCcpO1xyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCduZXh0Jyk7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3dpbGwtZ28tcHJldicpO1xyXG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd3aWxsLWdvLW5leHQnKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnNpemUpIHtcclxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPVxyXG4gICAgICAgICAgdGhpcy5sZW5ndGggPD0gdGhpcy5zaXplID8gJ2N1cnJlbnQnIDpcclxuICAgICAgICAgIGl0ZW1PcmRlciA+IC0xICYmIGl0ZW1PcmRlciA8IHRoaXMuc2l6ZSA/ICdjdXJyZW50JyA6XHJcbiAgICAgICAgICBpdGVtT3JkZXIgPT09IC0xIHx8IGl0ZW1PcmRlciA9PT0gdGhpcy5sZW5ndGggLSAxID8gJ3ByZXYnIDpcclxuICAgICAgICAgIGl0ZW1PcmRlciA9PT0gdGhpcy5zaXplID8gJ25leHQnIDpcclxuICAgICAgICAgICcnO1xyXG4gICAgICAgIGlmICghY2xhc3NOYW1lKSByZXR1cm4gdGhpcztcclxuICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgc2xpZGUuc3R5bGUub3JkZXIgPSBpdGVtT3JkZXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmRpcikge1xyXG4gICAgICAgIGNvbnN0IGFuaW1DbGFzc05hbWUgPSAnd2lsbC1nby0nICsgdGhpcy5kaXI7XHJcbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChhbmltQ2xhc3NOYW1lKTtcclxuICAgICAgICBzbGlkZS5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0QW5pbWF0aW9uRW5kXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmVtb3ZlV2lsbFJlbmRlckNsYXNzKHNsaWRlLCBhbmltQ2xhc3NOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzbGlkZS5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmVtb3ZlV2lsbFJlbmRlckNsYXNzKHNsaWRlLCBhbmltQ2xhc3NOYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVdpbGxSZW5kZXJDbGFzcyhzbGlkZSwgY2xhc3NOYW1lKSB7XHJcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHByZXYoKSB7XHJcbiAgICB0aGlzLmRpciA9ICdwcmV2JztcclxuICAgIHJldHVybiBzdXBlci5wcmV2KCk7XHJcbiAgfVxyXG5cclxuICBuZXh0KCkge1xyXG4gICAgdGhpcy5kaXIgPSAnbmV4dCc7XHJcbiAgICByZXR1cm4gc3VwZXIubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgZ29UbyhpbmRleCkge1xyXG4gICAgdGhpcy5kaXIgPSBpbmRleCA+IHRoaXMuaW5kZXggPyAnbmV4dCcgOiAncHJldic7XHJcbiAgICByZXR1cm4gc3VwZXIuZ29UbyhpbmRleCk7XHJcbiAgfVxyXG5cclxufVxuXG5mdW5jdGlvbiBfbWFwKHdoYXQsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAodHlwZW9mIHdoYXQgPT09ICdzdHJpbmcnKSB3aGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh3aGF0KTtcclxuICAgIGlmICghKHdoYXQgaW5zdGFuY2VvZiBBcnJheSkpIHdoYXQgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh3aGF0KTtcclxuICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB3aGF0ID0gd2hhdC5tYXAodyA9PiBjYWxsYmFjayh3KSk7XHJcbiAgICByZXR1cm4gd2hhdDtcclxuICB9XHJcbiAgXHJcbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChlbCwgYXR0cnMpIHtcclxuICBcclxuICAgIGZ1bmN0aW9uIGVsZW1lbnQoZWwsIGF0dHJzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbCk7XHJcbiAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBOb2RlKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChhdHRycykgZXh0ZW5kKGVsLCBhdHRycyk7XHJcbiAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZnVuY3Rpb24gZXh0ZW5kKG9iaiwgcHJvcHMpIHtcclxuICAgICAgICBjb25zdCBleHRlbmRlcnMgPSB7XHJcbiAgICAgICAgICAgIHN0eWxlOiBmdW5jdGlvbiAoc3R5bGVzKSB7XHJcbiAgICAgICAgICAgICAgICBleHRlbmQob2JqLnN0eWxlLCBzdHlsZXMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhc2V0OiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBkYXRhKSBvYmouc2V0QXR0cmlidXRlKCdkYXRhLScgKyBuYW1lLCBkYXRhW25hbWVdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXZlbnRzOiBmdW5jdGlvbiAoY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIGNhbGxiYWNrcykgb2JqLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgY2FsbGJhY2tzW25hbWVdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IGZ1bmN0aW9uIChraWRzKSB7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGtpZHMsIGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmFwcGVuZENoaWxkKGspO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgKGV4dGVuZGVyc1tuYW1lXSB8fCBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICBvYmpbbmFtZV0gPSB2YWw7XHJcbiAgICAgICAgICAgIH0pKHByb3BzW25hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICByZXR1cm4gZWxlbWVudChlbCwgYXR0cnMpO1xyXG4gIFxyXG4gIH1cblxuY2xhc3MgTGlnaHRib3gge1xyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtY29udGFpbmVyJykgfHwgY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1jb250YWluZXInLFxyXG4gICAgICAgICAgICBkYXRhc2V0OiB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbDogJycsXHJcbiAgICAgICAgICAgICAgICBncmlkOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucHJldik7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm5leHQpO1xyXG4gICAgICAgIC8vdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUJ1dHRvbik7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnBhcmVudEVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlQnV0dG9uKTtcclxuICAgICAgICB0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy5pbWcpO1xyXG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaW1nLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQgd3JhcHBlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LXdyYXBwZXInKSB8fCBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2xpZ2h0Ym94LXdyYXBwZXInLFxyXG4gICAgICAgICAgICBkYXRhc2V0OiB7XHJcbiAgICAgICAgICAgICAgICBjZWxsOiAnc2hyaW5rJyxcclxuICAgICAgICAgICAgICAgIGdyaWQ6ICdjb2x1bW4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgZ2V0IHByZXYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5saWdodGJveC1wcmV2JykgfHwgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1wcmV2JyxcclxuICAgICAgICAgICAgaW5uZXJIVE1MOiAnPHN2ZyB4bWxucz1cImh0dHBzOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdib3g9XCIwIDAgMTI5IDEyOVwiPjxwYXRoIGQ9XCJNODguNiAxMjEuM2MuOC44IDEuOCAxLjIgMi45IDEuMnMyLjEtLjQgMi45LTEuMmMxLjYtMS42IDEuNi00LjIgMC01LjhsLTUxLTUxIDUxLTUxYzEuNi0xLjYgMS42LTQuMiAwLTUuOHMtNC4yLTEuNi01LjggMGwtNTQgNTMuOWMtMS42IDEuNi0xLjYgNC4yIDAgNS44bDU0IDUzLjl6XCIgLz48L3N2Zz4nLFxyXG4gICAgICAgICAgICBkYXRhc2V0OiB7XHJcbiAgICAgICAgICAgICAgICBidG46ICdsaW5rJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLmdvUHJldigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldCBuZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtbmV4dCcpIHx8IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlnaHRib3gtbmV4dCcsXHJcbiAgICAgICAgICAgIGlubmVySFRNTDogJzxzdmcgeG1sbnM9XCJodHRwczovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Ym94PVwiMCAwIDEyOSAxMjlcIj48cGF0aCBkPVwiTTQwLjQgMTIxLjNjLS44LjgtMS44IDEuMi0yLjkgMS4ycy0yLjEtLjQtMi45LTEuMmMtMS42LTEuNi0xLjYtNC4yIDAtNS44bDUxLTUxLTUxLTUxYy0xLjYtMS42LTEuNi00LjIgMC01LjggMS42LTEuNiA0LjItMS42IDUuOCAwbDUzLjkgNTMuOWMxLjYgMS42IDEuNiA0LjIgMCA1LjhsLTUzLjkgNTMuOXpcIiAvPjwvc3ZnPicsXHJcbiAgICAgICAgICAgIGRhdGFzZXQ6IHtcclxuICAgICAgICAgICAgICAgIGJ0bjogJ2xpbmsnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMuZ29OZXh0KCksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldCBjbG9zZUJ1dHRvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmxpZ2h0Ym94LWNsb3NlJykgfHwgY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1jbG9zZScsXHJcbiAgICAgICAgICAgIGlubmVySFRNTDogJzxzdmcgeG1sbnM9XCJodHRwczovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Ym94PVwiMCAwIDUxMiA1MTJcIj48cGF0aCBmaWxsPVwiI2ZmZlwiIGQ9XCJNNTA1Ljk0MyA2LjA1OGMtOC4wNzctOC4wNzctMjEuMTcyLTguMDc3LTI5LjI0OSAwTDYuMDU4IDQ3Ni42OTNjLTguMDc3IDguMDc3LTguMDc3IDIxLjE3MiAwIDI5LjI0OUEyMC42MTIgMjAuNjEyIDAgMCAwIDIwLjY4MyA1MTJhMjAuNjE0IDIwLjYxNCAwIDAgMCAxNC42MjUtNi4wNTlMNTA1Ljk0MyAzNS4zMDZjOC4wNzYtOC4wNzYgOC4wNzYtMjEuMTcxIDAtMjkuMjQ4elwiLz48cGF0aCBmaWxsPVwiI2ZmZlwiIGQ9XCJNNTA1Ljk0MiA0NzYuNjk0TDM1LjMwNiA2LjA1OWMtOC4wNzYtOC4wNzctMjEuMTcyLTguMDc3LTI5LjI0OCAwLTguMDc3IDguMDc2LTguMDc3IDIxLjE3MSAwIDI5LjI0OGw0NzAuNjM2IDQ3MC42MzZhMjAuNjE2IDIwLjYxNiAwIDAgMCAxNC42MjUgNi4wNTggMjAuNjE1IDIwLjYxNSAwIDAgMCAxNC42MjQtNi4wNTdjOC4wNzUtOC4wNzggOC4wNzUtMjEuMTczLS4wMDEtMjkuMjV6XCIvPjwvc3ZnPicsXHJcbiAgICAgICAgICAgIGRhdGFzZXQ6IHtcclxuICAgICAgICAgICAgICAgIGJ0bjogJ2xpbmsnLFxyXG4gICAgICAgICAgICAgICAgY2VsbDogJ3NocmluayBlbmQnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMuY2xvc2UoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXRlbXMoKSB7XHJcbiAgICAgICAgdmFyIGRvbU5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNlbGVjdG9yKTtcclxuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9tTm9kZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpbWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCcubGlnaHRib3gtaW1nJykgfHwgY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaWdodGJveC1pbWcnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFyZ2V0Jyk7XHJcbiAgICB9XHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd0YXJnZXQnKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGNvbnN0IGltZyA9IHRoaXMuaXRlbXNbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IHNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGlnaHRib3gnKSA/IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGlnaHRib3gnKSA6IGltZy5zcmM7XHJcbiAgICAgICAgdGhpcy5pbWcuc3JjID0gc3JjO1xyXG4gICAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdvUHJldigpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4IC0gMTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5pdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3coaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgZ29OZXh0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXggKyAxO1xyXG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLml0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zaG93KGluZGV4KTtcclxuICAgIH1cclxufVxuXG5jb25zdCBzbGlkZXJPcHRpb25zID0ge1xyXG4gICAgYXV0b3BsYXk6IHNsaWRlciA9PiB7XHJcbiAgICAgIHNsaWRlclxyXG4gICAgICAgIC5wbGF5KClcclxuICAgICAgICAub24oJ21vdXNlb3ZlcicsICgpID0+IHNsaWRlci5wYXVzZSgpKVxyXG4gICAgICAgIC5vbignbW91c2VvdXQnLCAoKSA9PiBzbGlkZXIucGxheSgpKTtcclxuICAgIH1cclxuICB9O1xyXG5mdW5jdGlvbiBjb25maWdTbGlkZXIoc2xpZGVyLCBwYXJlbnQpIHtcclxuICAgIGNvbnN0IGZpcnN0ID0gcGFyZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1maXJzdCcpIHwgMDtcclxuICAgIGlmIChmaXJzdCkge1xyXG4gICAgICBzbGlkZXIuZ29UbyhmaXJzdCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvcHRpb25zID0gcGFyZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1vcHRpb25zJykgPyBwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW9wdGlvbnMnKS5zcGxpdCgnICcpIDogW107XHJcbiAgICBvcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHNsaWRlck9wdGlvbnNbb3B0aW9uXSAmJiBzbGlkZXJPcHRpb25zW29wdGlvbl0oc2xpZGVyKSk7XHJcbiAgXHJcbiAgICBjb25zdCBzbGlkZXJDYWxsYmFja3MgPSB7XHJcbiAgICAgIG9wZW5Pbk1vYmlsZTogKCkgPT4ge1xyXG4gICAgICAgIGlmIChzY3JlZW4oKS53aWR0aCA+IDYwMCkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0ID0gc2xpZGVyLmZpbmQoc2xpZGUgPT4gc2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW9yZGVyJykgPT09ICcwJyk7XHJcbiAgICAgICAgaWYgKCFmaXJzdCkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGZpcnN0LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLWltZyBhW2hyZWZePVwiamF2YXNjcmlwdDpcIl0nKTtcclxuICAgICAgICBpZiAoIWJ0bikgcmV0dXJuO1xyXG4gICAgICAgIGJ0bi5jbGljaygpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIFxyXG4gICAgX21hcCgnW2RhdGEtY29udHJvbF0nLCBjb250cm9sID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gY29udHJvbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29udHJvbCcpO1xyXG4gICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gdGFyZ2V0ID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpIDogbnVsbDtcclxuICBcclxuICAgICAgaWYgKHRhcmdldEVsZW1lbnQgJiYgdGFyZ2V0RWxlbWVudCA9PT0gc2xpZGVyLnBhcmVudCkge1xyXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGNvbnRyb2wuZ2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicpO1xyXG4gICAgICAgIGlmICgoYWN0aW9uID09PSAncHJldicgfHwgYWN0aW9uID09PSAnbmV4dCcpICYmIChzbGlkZXIuc2l6ZSA+PSBzbGlkZXIubGVuZ3RoKSkge1xyXG4gICAgICAgICAgY29udHJvbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3ZlcnNpemUnLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYWN0aW9uRGF0YSA9IGNvbnRyb2wuZ2V0QXR0cmlidXRlKCdkYXRhLXBhcmFtcycpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IGFjdGlvbkRhdGEgPyBhY3Rpb25EYXRhLnNwbGl0KCcsJykgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gY29udHJvbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2FsbGJhY2snKTtcclxuICAgICAgICBpZiAoYWN0aW9uICYmIHNsaWRlclthY3Rpb25dIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICAgIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNsaWRlclthY3Rpb25dLmFwcGx5KHNsaWRlciwgcGFyYW1zKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIHNsaWRlckNhbGxiYWNrc1tjYWxsYmFja10pIHNsaWRlckNhbGxiYWNrc1tjYWxsYmFja10oKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxuXG5jb25zdCBtYXNjYXJhcyA9IHtcclxuXHJcbiAgICBub21lOiAoY2FtcG8pID0+IHtcclxuICAgICAgICBpZiAoL15bXmEtekEtWl0rLy50ZXN0KGNhbXBvLnZhbHVlKSkgY2FtcG8udmFsdWUgPSAnJztcclxuICAgICAgICBjb25zdCByZWdyYSA9IC9bLSdhLXpBLVrDgC3DlsOYLcO2w7gtxb8gXSsvZ2k7XHJcbiAgICAgICAgY29uc3QgdmFsb3JlcyA9IGNhbXBvLnZhbHVlLm1hdGNoKHJlZ3JhKTtcclxuICAgICAgICBpZiAodmFsb3JlcykgY2FtcG8udmFsdWUgPSB2YWxvcmVzLmpvaW4oJycpLnJlcGxhY2UoLyArL2dpLCAnICcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjZXA6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlZ3JhcyA9IFsvXFxkKy9naSwgL14oXFxkezV9KS0/KFxcZHsxLDN9KS9dO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yZXMgPSBjYW1wby52YWx1ZS5tYXRjaChyZWdyYXNbMF0pO1xyXG4gICAgICAgIGlmICghdmFsb3JlcykgcmV0dXJuIGNhbXBvLnZhbHVlID0gJyc7XHJcbiAgICAgICAgY2FtcG8udmFsdWUgPSB2YWxvcmVzLmpvaW4oJycpO1xyXG4gICAgICAgIGlmIChyZWdyYXNbMV0udGVzdChjYW1wby52YWx1ZSkpIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUucmVwbGFjZShyZWdyYXNbMV0sICckMS0kMicpO1xyXG4gICAgICAgIGlmIChjYW1wby52YWx1ZS5sZW5ndGggPiA5KSBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnN1YnN0cigwLCA5KTtcclxuICAgIH0sXHJcblxyXG4gICAgdGVsZWZvbmU6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlZ3JhcyA9IFsvXFxkKy9naSwgL14oXFxkXFxkPykvLCAvXihcXGRcXGQpKFxcZHs0fSktPyhcXGR7MSw0fSkvLCAvXihcXGRcXGQpKFxcZHs1fSktPyhcXGR7MSw0fSkvXTtcclxuICAgICAgICBjb25zdCB2YWxvcmVzID0gY2FtcG8udmFsdWUubWF0Y2gocmVncmFzWzBdKTtcclxuICAgICAgICBpZiAoIXZhbG9yZXMpIHJldHVybiBjYW1wby52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yID0gY2FtcG8udmFsdWUgPSB2YWxvcmVzLmpvaW4oJycpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAwKSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzFdLCAnKCQxJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDIpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbMV0sICcoJDEpICcpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA2KSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzJdLCAnKCQxKSAkMi0kMycpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiAxMCkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1szXSwgJygkMSkgJDItJDMnKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gMTEpIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUuc3Vic3RyKDAsIDE1KTtcclxuICAgIH0sXHJcblxyXG4gICAgcmc6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlZ3JhcyA9IFsvXFxkKy9naSwgL14oXFxkezEsMn0pLywgL14oXFxkezEsMn0pXFwuPyhcXGR7M30pLywgL14oXFxkezEsMn0pXFwuPyhcXGR7M30pXFwuPyhcXGR7M30pLywgL14oXFxkezEsMn0pXFwuPyhcXGR7M30pXFwuPyhcXGR7M30pLT8oXFxkKT8vXTtcclxuICAgICAgICBjb25zdCB2YWxvcmVzID0gY2FtcG8udmFsdWUubWF0Y2gocmVncmFzWzBdKTtcclxuICAgICAgICBjb25zdCBsZXRyYXMgPSBjYW1wby52YWx1ZS5tYXRjaCgvW2EtekEtWl0rJC9naSk7XHJcbiAgICAgICAgY29uc3QgZGlnaXRvID0gbGV0cmFzID8gbGV0cmFzWzBdWzBdIDogJyc7XHJcbiAgICAgICAgaWYgKCF2YWxvcmVzKSByZXR1cm4gY2FtcG8udmFsdWUgPSAnJztcclxuICAgICAgICBjb25zdCB2YWxvciA9IGNhbXBvLnZhbHVlID0gdmFsb3Jlcy5qb2luKCcnKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gMikgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1sxXSwgJyQxLicpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPiA1KSBjYW1wby52YWx1ZSA9IHZhbG9yLnJlcGxhY2UocmVncmFzWzJdLCAnJDEuJDIuJyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDcpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShyZWdyYXNbM10sICckMS4kMi4kMycpO1xyXG4gICAgICAgIGlmICh2YWxvci5sZW5ndGggPT09IDggJiYgZGlnaXRvKSBjYW1wby52YWx1ZSArPSAnLScgKyBkaWdpdG8udG9VcHBlckNhc2UoKTtcclxuICAgICAgICBpZiAodmFsb3IubGVuZ3RoID4gOCkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKHJlZ3Jhc1s0XSwgJyQxLiQyLiQzLSQ0Jyk7XHJcbiAgICAgICAgaWYgKHZhbG9yLmxlbmd0aCA+IDkpIGNhbXBvLnZhbHVlID0gY2FtcG8udmFsdWUuc3Vic3RyKDAsIDEyKTtcclxuICAgIH0sXHJcblxyXG4gICAgY3BmY25wajogKGNhbXBvKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbnVtZXJvcyA9IC9cXGQrL2dpO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yZXMgPSBjYW1wby52YWx1ZS5tYXRjaChudW1lcm9zKTtcclxuICAgICAgICBpZiAoIXZhbG9yZXMpIHJldHVybiBjYW1wby52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGNvbnN0IHZhbG9yID0gdmFsb3Jlcy5qb2luKCcnKTtcclxuICAgICAgICBjb25zdCBjcGYgPSAvXihbMC05XXsxLDN9KT9cXC4/KFswLTldezEsM30pP1xcLj8oWzAtOV17MSwzfSk/XFwtPyhbMC05XXsxLDJ9KT8kLztcclxuICAgICAgICBjb25zdCBjbnBqID0gL14oWzAtOV17MSwyfSk/XFwuPyhbMC05XXsxLDN9KT9cXC4/KFswLTldezEsM30pP1xcLz8oWzAtOV17MSw0fSk/XFwtPyhbMC05XXsxLDJ9KT8kLztcclxuICAgICAgICBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnJlcGxhY2UoL1teXFxkLlxcLy1dL2dpLCAnJyk7XHJcbiAgICAgICAgaWYgKGNwZi50ZXN0KHZhbG9yKSkgY2FtcG8udmFsdWUgPSB2YWxvci5yZXBsYWNlKGNwZiwgKGFsbCwgYSwgYiwgYywgZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKGEgfHwgJycpICsgKGIgPyAnLicgKyBiIDogJycpICsgKGMgPyAnLicgKyBjIDogJycpICsgKGQgPyAnLScgKyBkIDogJycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsc2UgaWYgKGNucGoudGVzdCh2YWxvcikpIGNhbXBvLnZhbHVlID0gdmFsb3IucmVwbGFjZShjbnBqLCAoYWxsLCBhLCBiLCBjLCBkLCBlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoYSB8fCAnJykgKyAoYiA/ICcuJyArIGIgOiAnJykgKyAoYyA/ICcuJyArIGMgOiAnJykgKyAoZCA/ICcvJyArIGQgOiAnJykgKyAoZSA/ICctJyArIGUgOiAnJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGNhbXBvLnZhbHVlLmxlbmd0aCA+IDE4KSBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnN1YnN0cigwLCAxOCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRhdGE6IChjYW1wbykgPT4ge1xyXG4gICAgICAgIGlmIChjYW1wby50eXBlID09PSAnZGF0ZScpIHJldHVybjtcclxuICAgICAgICBjb25zdCBudW1lcm9zID0gY2FtcG8udmFsdWUucmVwbGFjZSgvXjA/XFwvfFteXFxkXFwvXS9naSwgJycpO1xyXG4gICAgICAgIGlmIChudW1lcm9zID09PSAnJykge1xyXG4gICAgICAgICAgICBjYW1wby52YWx1ZSA9IG51bWVyb3M7XHJcbiAgICAgICAgICAgIGNhbXBvLnN0eWxlLmJvcmRlckNvbG9yID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYW1wby52YWx1ZSA9IG51bWVyb3NcclxuICAgICAgICAucmVwbGFjZSgvKF58XFwvKTAwK1xcLz8vZywgJzAnKVxyXG4gICAgICAgIC5yZXBsYWNlKC8oXnxcXC8pKFsxLTldXFwvKS8sICcwJDInKVxyXG4gICAgICAgIC5yZXBsYWNlKFxyXG4gICAgICAgICAgICAvKFxcZFxcZCkoXFwvPykoXFxkezEsMn0pPyhcXC8/KTAqKFxcZHsxLDR9KT8uKi9nLFxyXG4gICAgICAgICAgICBmdW5jdGlvbihhbGwsIGRkLCBzMSwgbW0sIHMyLCBhYWFhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGQgPiAzMSB8fCBtbSA+IDEyKSBjYW1wby5zdHlsZS5ib3JkZXJDb2xvciA9ICdyZWQnO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBjYW1wby5zdHlsZS5ib3JkZXJDb2xvciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGQgKyAobW0gPyAnLycgKyBtbSA6IHMxIHx8ICcnKSArIChhYWFhID8gJy8nICsgYWFhYSA6IHMyIHx8ICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIGVtYWlsOiAoY2FtcG8pID0+IHtcclxuICAgICAgICBjYW1wby52YWx1ZSA9IGNhbXBvLnZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmhhOiAoY2FtcG8pID0+IHtcclxuICAgICAgICBpZiAoY2FtcG8udmFsdWUubGVuZ3RoID4gMCAmJiBjYW1wby52YWx1ZS5sZW5ndGggPCA2KSBjYW1wby5zdHlsZS5ib3JkZXJDb2xvciA9ICdyZWQnO1xyXG4gICAgICAgIGVsc2UgY2FtcG8uc3R5bGUuYm9yZGVyQ29sb3IgPSBudWxsO1xyXG4gICAgfVxyXG5cclxufTtcblxuLy8gLS0tLS0tIFRBQlMgLS0tLS0tXHJcbmNvbnN0IGFsbFRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YXJnZXRdJyk7XHJcbmNvbnN0IGxpbmtzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYWxsVGFyZ2V0cyk7XHJcblxyXG5saW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rKXtcclxuICBjb25zdCBsaW5rVGFyZ2V0ID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyk7XHJcbiAgY29uc3QgYWxsVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYl0nKTtcclxuXHJcbiAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0YXJnZXRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYWxsVGFicyk7ICAgICAgXHJcbiAgICB0YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCl7XHJcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcclxuXHJcbiAgICAgIGlmKGxpbmtUYXJnZXQgPT09IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJykpe1xyXG4gICAgICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xyXG4gICAgICAgIGxpbmtzLmZvckVhY2goYnRuID0+e1xyXG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbi8vIC0tLS0tLSBDUkVBVEUgRUxFTUVOVCAtLS0tLS1cclxuY29uc3QgYnRuQ3JlYXRlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jcmVhdGVdJyk7XHJcbmJ0bkNyZWF0ZUVsICYmIGJ0bkNyZWF0ZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICBjb25zdCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzPVwicG9zdC1jb250ZW50XCJdJyk7XHJcbiAgY29udGVudC5hcHBlbmRDaGlsZChuZXdMaXN0KTtcclxuICBuZXdMaXN0LmlubmVySFRNTCA9ICc8bGk+dGVzdGUxPC9saT48bGk+dGVzdGUyPC9saT4nO1xyXG59KTtcclxuXHJcbi8vIC0tLS0tLSBTVU1SRURVQ0VSIFdJVEggRkxBVCAtLS0tLS1cclxuZnVuY3Rpb24gc3VtUmVkdWNlcigpIHtcclxuICAvL2NvbnZlcnRlciBhcmd1bWVudHMgZW0gYXJyYXlcclxuICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAvLyBhY2hhdGFyIGFyZ3NcclxuICBjb25zdCBmbGF0QXJncyA9IGFyZ3MuZmxhdChJbmZpbml0eSk7XHJcbiAgLy9maWx0YXIgbsO6bWVyb3NcclxuICBjb25zdCBudW1iZXJBcmdzID0gZmxhdEFyZ3MuZmlsdGVyKG4gPT4gdHlwZW9mIG4gPT09ICdudW1iZXInKTtcclxuICAvLyBzb21hclxyXG4gIHJldHVybiBudW1iZXJBcmdzLnJlZHVjZSgoc3VtLCBuKSA9PiBzdW0gKyBuLCAwKTtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gZmxhdHRlbkRlZXAoYXJyMSl7XHJcbi8vICAgcmV0dXJuIGFycjEucmVkdWNlKChhY2MsIHZhbCkgPT4gQXJyYXkuaXNBcnJheSh2YWwpID8gYWNjLmNvbmNhdChmbGF0dGVuRGVlcCh2YWwpKSA6IGFjYy5jb25jYXQodmFsKSwgW10pO1xyXG4vLyB9XHJcblxyXG5jb25zdCByZXN1bHQgPSBzdW1SZWR1Y2VyKFswLCAzLCA3XSwgW251bGwsICdlbWEgd2F0c29uJywgODJdLCA1LCBbWzMsIDBdLCBbMV0sIG51bGxdLCBbXSk7XHJcblxyXG5jb25zdCByZXN1bHRTdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zdW1dJyk7XHJcbnJlc3VsdFN1bSAmJiByZXN1bHRTdW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gIGNvbnN0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3M9XCJwb3N0LWNvbnRlbnRcIl0nKTtcclxuICBjb250ZW50LmFwcGVuZENoaWxkKG5ld0Rpdik7XHJcbiAgbmV3RGl2LmlubmVySFRNTCA9IGAke3Jlc3VsdH1gO1xyXG59KTtcclxuXHJcbi8vIC0tLS0tLSBGRVRDSCAtLS0tLS1cclxuZnVuY3Rpb24gY3JlYXRlTm9kZShlbGVtZW50KXtcclxuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTsgLy8gQ3JlYXRlIHRoZSB0eXBlIG9mIGVsZW1lbnQgeW91IHBhc3MgaW4gdGhlIHBhcmFtZXRlcnNcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kKHBhcmVudCwgZWwpe1xyXG4gIHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpOyAvLyBBcHBlbmQgdGhlIHNlY29uZCBwYXJhbWV0ZXIoZWxlbWVudCkgdG8gdGhlIGZpcnN0IG9uZVxyXG59XHJcblxyXG5jb25zdCB1bCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdXRob3JzJyk7IC8vIEdldCB0aGUgbGlzdCB3aGVyZSB3ZSB3aWxsIHBsYWNlIG91ciBhdXRob3JzXHJcbmNvbnN0IHVybCA9ICdodHRwczovL3JhbmRvbXVzZXIubWUvYXBpLz9yZXN1bHRzPTEwJzsgLy8gR2V0IDEwIHJhbmRvbSB1c2Vyc1xyXG5cclxuZmV0Y2godXJsKSAvLyBDYWxsIHRoZSBmZXRjaCBmdW5jdGlvbiBwYXNzaW5nIHRoZSB1cmwgb2YgdGhlIEFQSSBhcyBhIHBhcmFtZXRlclxyXG4udGhlbigocmVzcCk9PiByZXNwLmpzb24oKSkgLy8gVHJhbnNmb3JtIHRoZSBkYXRhIGludG8gSlNPTlxyXG4udGhlbihmdW5jdGlvbihkYXRhKXtcclxuICAvLyBZb3VyIGNvZGUgZm9yIGhhbmRsaW5nIHRoZSBkYXRhIHlvdSBnZXQgZnJvbSB0aGUgQVBJXHJcbiAgLy8gQ3JlYXRlIGFuZCBhcHBlbmQgdGhlIGxpJ3MgdG8gdGhlIHVsXHJcbiAgbGV0IGF1dGhvcnMgPSBkYXRhLnJlc3VsdHM7IC8vIEdldCB0aGUgcmVzdWx0c1xyXG4gIHJldHVybiBhdXRob3JzLm1hcChmdW5jdGlvbihhdXRob3Ipe1xyXG4gICAgbGV0IGxpID0gY3JlYXRlTm9kZSgnbGknKSwgLy8gQ3JlYXRlIHRoZSBlbGVtZW50cyB3ZSBuZWVkXHJcbiAgICAgICAgaW1nID0gY3JlYXRlTm9kZSgnaW1nJyksXHJcbiAgICAgICAgc3BhbiA9IGNyZWF0ZU5vZGUoJ3NwYW4nKTtcclxuICAgIGltZy5zcmMgPSBhdXRob3IucGljdHVyZS5tZWRpdW07IFxyXG4gICAgLy8gQWRkIHRoZSBzb3VyY2Ugb2YgdGhlIGltYWdlIHRvIGJlIHRoZSBzcmMgb2YgdGhlIGltZyBlbGVtZW50XHJcbiAgICBzcGFuLmlubmVySFRNTCA9IGAke2F1dGhvci5uYW1lLmZpcnN0fSAke2F1dGhvci5uYW1lLmxhc3R9YDsgXHJcbiAgICAvLyBNYWtlIHRoZSBIVE1MIG9mIG91ciBzcGFuIHRvIGJlIHRoZSBmaXJzdCBhbmQgbGFzdCBuYW1lIG9mIG91ciBhdXRob3JcclxuICAgIGFwcGVuZChsaSwgaW1nKTsgLy8gQXBwZW5kIGFsbCBvdXIgZWxlbWVudHNcclxuICAgIGFwcGVuZChsaSwgc3Bhbik7XHJcbiAgICBhcHBlbmQodWwsIGxpKTtcclxuICB9KVxyXG59KVxyXG4uY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gIGNvbnNvbGUubG9nKGVycm9yKTtcclxufSk7XHJcblxyXG4vLyAtLS0tLS0gU0xJREVSIFdJVEggTElHSFRCT1ggLS0tLS0tXHJcbndpbmRvdy5zbGlkZXJzID0gX21hcCgnLnNsaWRlcicsIHBhcmVudCA9PiB7XHJcbiAgY29uc3Qgc2xpZGVyID0gbmV3IFNsaWRlcih7XHJcbiAgICBwYXJlbnRcclxuICB9KTtcclxuICBjb25maWdTbGlkZXIoc2xpZGVyLCBwYXJlbnQpO1xyXG59KTtcclxuXHJcbndpbmRvdy5jYXJvdXNlbHMgPSBfbWFwKCcuY2Fyb3VzZWwnLCBwYXJlbnQgPT4ge1xyXG4gIGNvbnN0IHNpemUgPSBwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNpemUnKSB8IDA7XHJcbiAgY29uc3QgY2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWwoe1xyXG4gICAgcGFyZW50LFxyXG4gICAgc2l6ZVxyXG4gIH0pO1xyXG4gIGNvbmZpZ1NsaWRlcihjYXJvdXNlbCwgcGFyZW50KTtcclxuICByZXR1cm4gY2Fyb3VzZWw7XHJcbn0pO1xyXG5cclxudmFyIGxpZ2h0Ym94ID0gbmV3IExpZ2h0Ym94KFwiW2RhdGEtbGlnaHRib3hdXCIpO1xyXG5cclxuLy8gLS0tLS0tIE1BU0tTIC0tLS0tLVxyXG5jb25zdCBlYWNoID0gKGksIGYpID0+IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoaSwgZik7XHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJyk7XHJcblxyXG5pZiAoZm9ybS5sZW5ndGgpIGVhY2goZm9ybSwgRm9ybU1hc2spO1xyXG5mdW5jdGlvbiBGb3JtTWFzayhmKSB7XHJcbiAgKEFycmF5LmZyb20oZi5lbGVtZW50cykpXHJcbiAgICAgIC5maWx0ZXIoZWwgPT4gZWwuaGFzQXR0cmlidXRlKCdkYXRhLW1hc2snKSlcclxuICAgICAgLmZvckVhY2goY2FtcG8gPT4gY2FtcG8uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgbWV0b2RvID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWFzaycpO1xyXG4gICAgICAgIGlmICghbWFzY2FyYXNbbWV0b2RvXSkgcmV0dXJuIGNvbnNvbGUubG9nKGBBIG3DoXNjYXJhIGRvIHRpcG8gXCIke21ldG9kb31cIiBuw6NvIGZvaSBkZWZpbmlkYS5gKTtcclxuXHJcbiAgICAgICAgbWFzY2FyYXNbbWV0b2RvXSh0aGlzKTtcclxuICB9KSk7XHJcbn1cclxuXHJcbi8vIC0tLS0tLSBDUlVEIFdJVEggSlMgLS0tLS0tXHJcbmNvbnN0IG5vbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm9tZScpO1xyXG5jb25zdCBwayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjcGZjbnBqJyk7XHJcbmNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VtYWlsJyk7XHJcblxyXG5mdW5jdGlvbiBtYWtlT2JqKGRhdGEpe1xyXG4gIHJldHVybiB7XHJcbiAgICBub21lOiBub21lLnZhbHVlLFxyXG4gICAgY3BmOiBway52YWx1ZSxcclxuICAgIGVtYWlsOiBlbWFpbC52YWx1ZVxyXG4gIH1cclxufVxyXG5cclxubGV0IGFycmF5ID0gW107XHJcbmNvbnN0IGNsZWFyRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0LWZvcm0nKTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbnZpYXInKS5vbmNsaWNrID0gZnVuY3Rpb24oKXtcclxuICBpZihub21lLnZhbHVlIT1udWxsLCBub21lLnZhbHVlIT1cIlwiICYmIHBrLnZhbHVlIT1udWxsLCBway52YWx1ZSE9XCJcIiAmJiBlbWFpbC52YWx1ZSE9bnVsbCwgZW1haWwudmFsdWUhPVwiXCIpe1xyXG4gICAgbGV0IGluZGV4QXJyYXkgPSBhcnJheS5maW5kSW5kZXgoZWxlbSA9PiB7XHJcbiAgICAgIHJldHVybiBlbGVtLmNwZj09PXBrLnZhbHVlXHJcbiAgICB9KTtcclxuICAgIGlmKGluZGV4QXJyYXkgPiAtMSl7XHJcbiAgICAgIGFycmF5W2luZGV4QXJyYXldID0gbWFrZU9iaigpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgYXJyYXkucHVzaChtYWtlT2JqKCkpO1xyXG4gICAgfVxyXG4gICAgdHJhbnNmb3JtVGV4dChhcnJheSk7XHJcbiAgICBjbGVhckZvcm0ucmVzZXQoKTtcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIGFsZXJ0KCdQcmVlbmNoYSB0b2RvcyBvcyBjYW1wb3MhJyk7XHJcbiAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gdHJhbnNmb3JtVGV4dChhcnJheSl7XHJcbiAgLy8gY29uc3Qgb2JqZWN0VGV4dCA9IEpTT04uc3RyaW5naWZ5KHthcnJheX0sIG51bGwsIFwiIFwiKVxyXG4gIC8vIGNvbnN0IGRhdGFDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0c19kaXNwbGF5Jyk7XHJcbiAgLy8gZGF0YUNvbnRhaW5lci50ZXh0Q29udGVudCA9IG9iamVjdFRleHQ7XHJcbiAgY29uc3Qgb2JqZWN0VGV4dCA9IGFycmF5LnJlZHVjZSgoYWNjLCBpdGVtLCBpbmRleCkgPT57XHJcbiAgICBhY2MrPSBgPHVsPjxsaT4ke2l0ZW0ubm9tZX08L2xpPjxsaT4ke2l0ZW0uY3BmfTwvbGk+PGxpPiR7aXRlbS5lbWFpbH08L2xpPjwvdWw+YDtcclxuICAgIHJldHVybiBhY2NcclxuICB9LCAnJyk7XHJcbiAgY29uc3QgZGF0YUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzX2Rpc3BsYXknKTtcclxuICBkYXRhQ29udGFpbmVyLnRleHRDb250ZW50ID0gb2JqZWN0VGV4dDtcclxufVxyXG5cclxuZnVuY3Rpb24gYXJyYXlSZW1vdmUoYXJyLCB2YWx1ZSl7IC8vcmV0b3JuYSB0b2RvcyBvcyBlbGVtZW50b3MgZG8gYXJyYXkgbWVub3MgbyBxdWUgdm9jw6ogcGFzc2FyXHJcbiAgcmV0dXJuIGFyci5maWx0ZXIoKGVsZSwgaW5kZXgpID0+IHtyZXR1cm4gaW5kZXggIT0gdmFsdWV9KVxyXG59XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRhcicpLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gIGxldCBpbmRleEFycmF5ID0gYXJyYXkuZmluZEluZGV4KGVsZW0gPT4ge1xyXG4gICAgcmV0dXJuIGVsZW0uY3BmID09PSBway52YWx1ZVxyXG4gIH0pO1xyXG5cclxuICBpZihpbmRleEFycmF5ID4gLTEpe1xyXG4gICAgYXJyYXkgPSBhcnJheVJlbW92ZShhcnJheSwgaW5kZXhBcnJheSk7XHJcbiAgfVxyXG4gIHRyYW5zZm9ybVRleHQoYXJyYXkpO1xyXG4gIGNsZWFyRm9ybS5yZXNldCgpO1xyXG59O1xuXG59KCkpO1xuIl19
