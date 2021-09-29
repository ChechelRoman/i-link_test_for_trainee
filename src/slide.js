const getNextIndex = (index, length, direction) => {
  let nextIndex = index;

  if (direction === 'forward') {
    nextIndex += 1;
    if (nextIndex > length - 1) {
      nextIndex = 0;
      return nextIndex;
    }

    return nextIndex;
  }

  if (direction === 'back') {
    nextIndex -= 1;
    if (nextIndex < 0) {
      nextIndex = length - 1;
      return nextIndex;
    }

    return nextIndex;
  }
};

const render = (state, slides, buttons) => {
  slides.map((slide) => {

    if (slides.indexOf(slide) === state.currentSlideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }

    return slide;
  });

  buttons.map((button) => {

    if (buttons.indexOf(button) === state.currentSlideIndex) {
      button.style.background = '#FFFFFF';
    } else {
      button.style.background = 'none';
    }

    return button;
  });
};

const slide = () => {
  const state = {
    currentSlideIndex: 0,
  };

  const slides = [...document.querySelectorAll('.slider-item')];
  const buttons = [...document.querySelectorAll('.slider-button')];
  const nextSlideArrow = document.querySelector('.slide-next');
  const prevSlideArrow = document.querySelector('.slide-prev');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      state.currentSlideIndex = buttons.indexOf(event.target);
      render(state, slides, buttons);
    });
  });

  nextSlideArrow.addEventListener('click', (event) => {
    event.preventDefault();
    state.currentSlideIndex = getNextIndex(state.currentSlideIndex, slides.length, 'forward');
    render(state, slides, buttons);
  });

  prevSlideArrow.addEventListener('click', (event) => {
    event.preventDefault();
    state.currentSlideIndex = getNextIndex(state.currentSlideIndex, slides.length, 'back');
    render(state, slides, buttons);
  });

};

export default slide;
