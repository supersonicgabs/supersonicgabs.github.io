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