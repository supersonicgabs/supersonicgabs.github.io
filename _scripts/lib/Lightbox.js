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