---
title: Carousel with Lightbox
date: 2019-04-26 00:00:00 Z
categories:
- Javascript
tags:
- javascript,
- vanilla,
- fetch
- api
- data
excerpt: 'Carousel with Lightbox using pure vanilla js.'
img: "../img/ilustrativas/vanilla-js.jpg"
---

Carousel with Lightbox using pure vanilla js.

<h1>Demo</h1>
<div class="container-carousel">
    <section data-grid="row center" class="page-content">
        <button type="button" data-btn="link" data-control="#oculos-sol" class="icon" data-action="prev">
            <svg xmlns="https://www.w3.org/2000/svg" viewbox="0 0 129 129">
                <path d="M88.6 121.3c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8 0l-54 53.9c-1.6 1.6-1.6 4.2 0 5.8l54 53.9z" />
            </svg>
        </button>
        <section id="oculos-sol" class="carousel" data-size="3" data-grid="row center justify" data-options="">
            <div class="slide" data-cell="shrink">
                <div class="foto">
                    <img data-lightbox src="{{site.baseurl}}/img/ilustrativas/black-panther.jpg" />
                </div>
            </div>
            <div class="slide" data-cell="shrink">
                <div class="foto">
                    <img data-lightbox src="{{site.baseurl}}/img/ilustrativas/profile-2.JPG" />
                </div>
            </div>
            <div class="slide" data-cell="shrink">
                <div class="foto">
                    <img data-lightbox src="{{site.baseurl}}/img/ilustrativas/profile.JPG" />
                </div>
            </div>
            <div class="slide">
                <div class="foto">
                    <img data-lightbox src="{{site.baseurl}}/img/ilustrativas/vanilla-js.jpg" />
                </div>
            </div>
            <div class="slide">
                <div class="foto">
                    <img data-lightbox src="{{site.baseurl}}/img/ilustrativas/black-panther.jpg" />
                </div>
            </div>
            <div class="slide">
                <div class="foto">
                    <img data-lightbox src="{{site.baseurl}}/img/ilustrativas/profile.jpg" />
                </div>
            </div>
        </section>
        <button type="button" data-btn="link" data-control="#oculos-sol" class="icon" data-action="next">
            <svg xmlns="https://www.w3.org/2000/svg" viewbox="0 0 129 129">
                <path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z" />
            </svg>
        </button>
    </section>
</div>

Main:

```javacript
import Slider from './lib/Slider';
import Carousel from './lib/Carousel';
import Lightbox from './lib/Lightbox';
import {configSlider} from './lib/configSlider';
import {
  _map,
  screen,
  _toggle,
  _show,
  createElement,
  _hide
} from './util/helpers';

window.sliders = _map('.slider', parent => {
  const slider = new Slider({
    parent
  });
  configSlider(slider, parent);
});

window.carousels = _map('.carousel', parent => {
  const size = parent.getAttribute('data-size') | 0;
  const carousel = new Carousel({
    parent,
    size
  });
  configSlider(carousel, parent);
  return carousel;
});

var lightbox = new Lightbox("[data-lightbox]");
```

<!-- <div data-grid="small-spacing row">
    <a data-btn data-target="slider" class="active">Slider.js</a>
    <a data-btn data-target="carousel" class="">Carousel.js</a>
    <a data-btn data-target="lightbox" class="">Lighbox.js</a>
    <a data-btn data-target="config-slider" class="">configSlider.js</a>
</div>
<section>
    <div data-tab="slider">
        <pre>
            <code>
                export default class Slider {

                    constructor(config) {
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

                    get children() {
                    return Array.prototype.slice.call(this.parent.querySelectorAll(this.childSelector));
                    }

                    get length() {
                    return this.children.length;
                    }

                    forEach(fn) {
                    return this.children.forEach(fn);
                    }

                    map(fn) {
                    return this.children.map(fn);
                    }

                    filter(fn) {
                    return this.children.filter(fn);
                    }

                    find(fn) {
                    return this.children.find(fn);
                    }

                    compose() {
                    var nextIndex, prevIndex;
                    prevIndex = this.index > 0 ? this.index - 1 : this.children.length - 1;
                    nextIndex = this.index < this.children.length - 1 ? this.index + 1 : 0;
                    this.forEach((el, i) => {
                        el.classList.remove('prev');
                        el.classList.remove('current');
                        el.classList.remove('next');
                        if (i === prevIndex) el.classList.add('prev');
                        if (i === nextIndex) el.classList.add('next');
                        if (i === this.index) el.classList.add('current');
                    });
                    return this;
                    }

                    play() {
                    var that;
                    that = this;
                    this.playingStateID = setInterval(function () {
                        return that.next();
                    }, this.duration);
                    this.isPlaying = true;
                    return this;
                    }

                    pause() {
                    clearInterval(this.playingStateID);
                    this.isPlaying = false;
                    return this;
                    }

                    playpause() {
                    if (this.isPlaying) {
                        return this.pause();
                    } else {
                        return this.play();
                    }
                    }

                    prev() {
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

                    next() {
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

                    goTo(index) {
                    this.index = index;
                    return this.compose();
                    }

                    on(event, fn) {
                    this.parent.addEventListener(event, fn);
                    return this;
                    }

                    off(event, fn) {
                    this.parent.removeEventListener(event, fn);
                    return this;
                    }

                    inspect(collapsed) {
                    console[collapsed === true ? 'groupCollapsed' : 'group'](this.type);
                    console.table(
                        Object.keys(this).map(key => {
                        return {
                            prop: key,
                            value: this[key],
                            type: typeof this[key]
                        }
                        })
                    );
                    console.log(this.parent);
                    console.log(this.children);
                    console.warn(Date.now().toString());
                    console.groupEnd(this.type);

                    return this;
                    }

                }                
            </code>
        </pre>
    </div>
    <div data-tab="carousel" hidden>
        <pre><code>
            import Slider from './Slider';

            export default class Carousel extends Slider {

            constructor(config) {
                config.parentSelector = config.parentSelector || '.carousel';
                super(config);
                this.type = 'Carousel';
                this.size = config.size | 0;
                this.compose();
            }

            compose() {
                const position = this.index + 1;
                this.forEach((slide, i) => {
                let itemOrder = i - position + 1;
                if (itemOrder < 0) itemOrder = this.length - position + i + 1;
                slide.setAttribute('data-order', itemOrder);

                slide.classList.remove('prev');
                slide.classList.remove('current');
                slide.classList.remove('next');
                slide.classList.remove('will-go-prev');
                slide.classList.remove('will-go-next');

                if (this.size) {
                    const className =
                    this.length <= this.size ? 'current' :
                    itemOrder > -1 && itemOrder < this.size ? 'current' :
                    itemOrder === -1 || itemOrder === this.length - 1 ? 'prev' :
                    itemOrder === this.size ? 'next' :
                    '';
                    if (!className) return this;
                    slide.classList.add(className);
                    slide.style.order = itemOrder;
                }

                if (this.dir) {
                    const animClassName = 'will-go-' + this.dir;
                    slide.classList.add(animClassName);
                    slide.addEventListener("webkitAnimationEnd", function() {
                    removeWillRenderClass(slide, animClassName);
                    });
                    slide.addEventListener("animationend", function() {
                    removeWillRenderClass(slide, animClassName);
                    });

                }
                });

                function removeWillRenderClass(slide, className) {
                slide.classList.remove(className);
                }

                return this;
            }

            prev() {
                this.dir = 'prev';
                return super.prev();
            }

            next() {
                this.dir = 'next';
                return super.next();
            }

            goTo(index) {
                this.dir = index > this.index ? 'next' : 'prev';
                return super.goTo(index);
            }

            }
        </pre>
        </code>
    </div>
    <div data-tab="lightbox" hidden>
        <pre><code>
        import {
            createElement
        } from '../util/helpers';

        export default class Lightbox {
            constructor(selector) {
                this.selector = selector;
                this.container = document.querySelector('.lightbox-container') || createElement('div', {
                    className: 'lightbox-container',
                    dataset: {
                        modal: '',
                        grid: 'center',
                    }
                })
                this.container.appendChild(this.prev);
                this.container.appendChild(this.wrapper);
                this.container.appendChild(this.next);
                //this.container.appendChild(this.closeButton);

                this.container.parentElement || document.body.appendChild(this.container);

                this.index = 0;
                this.wrapper.appendChild(this.closeButton);
                this.wrapper.appendChild(this.img);
                this.items.forEach((img, i) => {
                    img.addEventListener('click', () => {
                        this.show(i);
                    });
                })
            }
            get wrapper() {
                return this.container.querySelector('.lightbox-wrapper') || createElement('div', {
                    className: 'lightbox-wrapper',
                    dataset: {
                        cell: 'shrink',
                        grid: 'column'
                    }
                })
            }
            get prev() {
                return this.container.querySelector('.lightbox-prev') || createElement('button', {
                    className: 'lightbox-prev',
                    innerHTML: '<svg xmlns="https://www.w3.org/2000/svg" viewbox="0 0 129 129"><path d="M88.6 121.3c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8 0l-54 53.9c-1.6 1.6-1.6 4.2 0 5.8l54 53.9z" /></svg>',
                    dataset: {
                        btn: 'link'
                    },
                    events: {
                        click: () => this.goPrev()
                    }
                });
            }
            get next() {
                return this.container.querySelector('.lightbox-next') || createElement('button', {
                    className: 'lightbox-next',
                    innerHTML: '<svg xmlns="https://www.w3.org/2000/svg" viewbox="0 0 129 129"><path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z" /></svg>',
                    dataset: {
                        btn: 'link'
                    },
                    events: {
                        click: () => this.goNext(),
                    }
                });
            }
            get closeButton() {
                return this.container.querySelector('.lightbox-close') || createElement('button', {
                    className: 'lightbox-close',
                    innerHTML: '<svg xmlns="https://www.w3.org/2000/svg" viewbox="0 0 512 512"><path fill="#fff" d="M505.943 6.058c-8.077-8.077-21.172-8.077-29.249 0L6.058 476.693c-8.077 8.077-8.077 21.172 0 29.249A20.612 20.612 0 0 0 20.683 512a20.614 20.614 0 0 0 14.625-6.059L505.943 35.306c8.076-8.076 8.076-21.171 0-29.248z"/><path fill="#fff" d="M505.942 476.694L35.306 6.059c-8.076-8.077-21.172-8.077-29.248 0-8.077 8.076-8.077 21.171 0 29.248l470.636 470.636a20.616 20.616 0 0 0 14.625 6.058 20.615 20.615 0 0 0 14.624-6.057c8.075-8.078 8.075-21.173-.001-29.25z"/></svg>',
                    dataset: {
                        btn: 'link',
                        cell: 'shrink end'
                    },
                    events: {
                        click: () => this.close()
                    }
                })
            }

            get items() {
                var domNodes = document.querySelectorAll(this.selector);
                return Array.prototype.slice.call(domNodes);
            }

            get img() {
                return this.wrapper.querySelector('.lightbox-img') || createElement('img', {
                    className: 'lightbox-img',
                });
            }

            open() {
                this.container.classList.add('target')
            }
            close() {
                this.container.classList.remove('target')
            }

            show(index) {
                this.index = index;
                const img = this.items[index];
                const src = img.getAttribute('data-lightbox') ? img.getAttribute('data-lightbox') : img.src;
                this.img.src = src;
                this.open();
            }

            goPrev() {
                let index = this.index - 1;
                if (index < 0) {
                    index = this.items.length - 1;
                }
                this.show(index);
            }
            goNext() {
                console.log(this);
                let index = this.index + 1;
                if (index >= this.items.length) {
                    index = 0;
                }        
                this.show(index);
            }
        }        
        </code></pre>
    </div>
    <div data-tab="config-slider" hidden>
        <pre><code>
        import {
            _map
        } from '../util/helpers';

        const sliderOptions = {
            autoplay: slider => {
            slider
                .play()
                .on('mouseover', () => slider.pause())
                .on('mouseout', () => slider.play());
            }
        };
        export function configSlider(slider, parent) {
            const first = parent.getAttribute('data-first') | 0;
            if (first) {
            slider.goTo(first);
            }
            const options = parent.hasAttribute('data-options') ? parent.getAttribute('data-options').split(' ') : [];
            options.forEach(option => sliderOptions[option] && sliderOptions[option](slider));

            const sliderCallbacks = {
            openOnMobile: () => {
                if (screen().width > 600) return;
                const first = slider.find(slide => slide.getAttribute('data-order') === '0');
                if (!first) return;
                const btn = first.querySelector('.info-img a[href^="javascript:"]');
                if (!btn) return;
                btn.click();
            }
            };

            _map('[data-control]', control => {
            const target = control.getAttribute('data-control');
            const targetElement = target ? document.querySelector(target) : null;

            if (targetElement && targetElement === slider.parent) {
                const action = control.getAttribute('data-action');
                if ((action === 'prev' || action === 'next') && (slider.size >= slider.length)) {
                control.setAttribute('data-oversize', true);
                }
                const actionData = control.getAttribute('data-params');
                const params = actionData ? actionData.split(',') : null;
                const callback = control.getAttribute('data-callback');
                if (action && slider[action] instanceof Function) {
                control.addEventListener('click', function () {
                    slider[action].apply(slider, params);
                    if (callback && sliderCallbacks[callback]) sliderCallbacks[callback]();
                });
                }
            }
            });
        }        
        </code></pre>
    </div>
</section> -->
