// Slider Functionality

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

// Slider Functionality

// Custom Select Functionality

const renderInitialSelect = (container) => {
  const initialButton = document.createElement('button');
  initialButton.classList.add('custom__select','custom-select__placeholder');
  initialButton.textContent = 'Choose your gender';
  initialButton.setAttribute('id', 'gender');

  const labelForButton = document.createElement('label');
  labelForButton.classList.add('field-label');
  labelForButton.setAttribute('for', 'gender');
  labelForButton.textContent = 'Your gender';

  const dropdownArrow = document.createElement('img');
  dropdownArrow.classList.add('custom__select','dropdown__arrow-down');
  dropdownArrow.setAttribute('src', './images/dropdown-arrow.svg');
  dropdownArrow.setAttribute('alt', 'dropdown arrow');

  container.replaceChildren(labelForButton,dropdownArrow, initialButton);
};

const renderSelect = (state, container, arrow) => {
if (state.state === 'opened') {
  const option1 = document.createElement('button');
  option1.classList.add('custom__option', 'first-option');
  option1.textContent = 'Male';

  const option2 = document.createElement('button');
  option2.classList.add('custom__option', 'second-option');
  option2.textContent = 'Female';

  arrow.classList.add('dropdown__arrow-up');
  
  container.append(option1);
  container.append(option2);
}

if (state.state === 'closed') {

  if (state.selectValue === null) {
    container.removeChild(container.lastChild);
    container.removeChild(container.lastChild);
    arrow.classList.remove('dropdown__arrow-up');
    return;
  }

  const initialButton = container.querySelector('.custom-select__placeholder');
  initialButton.classList.add('status__fulfilled');
  initialButton.textContent = state.selectValue;

  arrow.classList.remove('dropdown__arrow-up');

  container.removeChild(container.lastChild);
  container.removeChild(container.lastChild);
}
};

const changeSelect  = () => {
const state = {
  state: 'closed',
  selectValue: null,
};

const container = document.querySelector('.form__select-gender');

renderInitialSelect(container);

const dropdownArrow = document.querySelector('.dropdown__arrow-down');

const customSelect = [...document.querySelectorAll('.custom__select')];
customSelect.forEach((select) => {
  select.addEventListener('click', (event) => {
    event.preventDefault();
    state.state = state.state === 'closed' ? 'opened' : 'closed';
    renderSelect(state, container, dropdownArrow);
    const options = document.querySelectorAll('.custom__option');
    options.forEach((option) => {
      option.addEventListener('click', (event) => {
        event.preventDefault();
        state.state = 'closed';
        state.selectValue = event.target.textContent;
        renderSelect(state, container, dropdownArrow);
      });
    });
  });
});
};

//  Custom Select Functionality

//  Attach Files Functionality

const getInfo = (str) => {
  const [name, type] = str.split('.');
  return {
    name,
    type,
  };
};

const capitalize = (str) => {
  const result = str.split('').map((char) => char.toUpperCase()).join('');
  return result;
};

const formatSize = (size) => {
  let result;

  if (size > 1048576) {
    result = `${(size/1048576).toFixed(1)} mb`
  } else {
    result = `${(size/1024).toFixed(1)} kb`
  }

  return result
};

const renderPreview = (state, container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  state.files.map((filelist) => {
      const previewItem = document.createElement('div');
      previewItem.classList.add('preview__item',);

      container.append(previewItem);

      const deleteIcon = document.createElement('img');
      deleteIcon.classList.add('delete__item-icon');
      deleteIcon.setAttribute('src', './images/delete-icon.svg');
      deleteIcon.setAttribute('alt', 'delete icon');
      deleteIcon.dataset.icon = 'delete-icon';
  
      previewItem.append(deleteIcon);
      

      if (filelist.type === 'application/pdf') {
        const fileName = document.createElement('span');
        fileName.classList.add('file__name-pdf');
        fileName.textContent = getInfo(filelist.name).name;
  
        const fileSize = document.createElement('span');
        fileSize.classList.add('file__size-pdf');
        fileSize.textContent = `${capitalize((getInfo(filelist.name).type))} ${formatSize(filelist.size)}`;

        previewItem.append(fileName);
        previewItem.append(fileSize);
      } else {
        const previewImage = document.createElement('img');
        const imageURL = window.URL.createObjectURL(filelist);
        previewImage.setAttribute('src', imageURL);
        previewImage.setAttribute('alt', 'loaded image');
        previewImage.classList.add('file__image');

        const fileName = document.createElement('span');
        fileName.classList.add('file__name-img');
        fileName.textContent = getInfo(filelist.name).name;

        const fileSize = document.createElement('span');
        fileSize.classList.add('file__size-img');
        fileSize.textContent = `${capitalize((getInfo(filelist.name).type))} ${formatSize(filelist.size)}`;

        previewItem.append(previewImage);
        previewItem.append(fileName);
        previewItem.append(fileSize);
      }
  });
};

const attachFiles = () => {
  const state = {
    files: [],
  };

  const container = document.querySelector('.files__preview');

  const fileInput = document.querySelector('#file-input');
  fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    state.files = [...state.files, ...files];
    renderPreview(state, container);
  });

  container.addEventListener('click', (event) => {
    if (event.target.dataset.icon === 'delete-icon') {
      const index = [...event.target.parentElement.parentElement.children].indexOf(event.target.parentElement);
      state.files.splice(index, 1);
      renderPreview(state, container);
    } else {
      return;
    }
  });

};

//  Attach Files Functionality

//  Validate Form Functionality

const validateName = (name) => {
  const regName = /^[A-Z]{1}[a-z]+ [A-Z]{1}[a-z]+$/;
  return regName.test(name);
};

const validateGender = (gender) => {
  if (gender === 'Male') {
    return true;
  }

  if (gender === 'Female') {
    return true;
  }

  return false;
};

const validateLocation = (location) => {
  const regLocation = /^[A-Z]{1}[a-z]+$/;
  return regLocation.test(location);
};

const validateDateOfBirth = (dateOfBirth) => {
  const regDateOfBirth = /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/;
  return regDateOfBirth.test(dateOfBirth);
};

const renderInvalidInput = (state, element) => {
  if (element.parentElement.children.length > 2) {
    element.parentElement.removeChild(element.parentElement.lastChild);
  }

  element.classList.add('registration-field__invalid');
  const errorMessage = document.createElement('span');
  errorMessage.classList.add('field__erorr-message');
  errorMessage.textContent = state.form.errors[element.id];
  element.parentElement.append(errorMessage);
};

const clearInvalidInput = (element) => {
  if (element.parentElement.children.length > 2) {
    element.parentElement.removeChild(element.parentElement.lastChild);
  }
  element.classList.remove('registration-field__invalid');
  element.classList.add('status__fulfilled');
};

const renderInvalidSelect = (state, element, counter) => {
    if (counter > 0) {
      element.parentElement.removeChild(element.parentElement.firstChild);
    }

    const fakeSelectValue = document.querySelector('.custom-select__placeholder');
    fakeSelectValue.classList.add('custom-select__invalid');
    const errorMessage = document.createElement('span');
    errorMessage.classList.add('field__erorr-message');
    errorMessage.textContent = state.form.errors.gender;
    element.parentElement.prepend(errorMessage);
};

const clearInvalidSelect = (form, element) => {
  const fakeSelectValue = document.querySelector('.custom-select__placeholder');
  if (!fakeSelectValue.classList.contains('custom-select__invalid')) {
    return;
  }
  if (element.textContent !== 'Choose your gender') {
    form.removeChild(form.firstChild);
    fakeSelectValue.classList.remove('custom-select__invalid');
  }
};

const checkIfFormIsValid = (state) => {
  if (validateName(state.form.values.name) === true
  && validateGender(state.form.values.gender) === true
  && validateLocation(state.form.values.country) === true
  && validateLocation(state.form.values.city) === true
  && validateDateOfBirth(state.form.values.dateOfBirth) === true
  && state.form.values.documents.length > 0) {
    return true;
  } else {
    return false;
  }
};

const checkForSecondStep = (state) => {
  if (validateName(state.form.values.name) === true
  && validateGender(state.form.values.gender) === true) {
    return true;
  } else {
    return false;
  }
};

const checkForThirdStep = (state) => {
  if (validateLocation(state.form.values.country) === true
  && validateLocation(state.form.values.city) === true
  && validateDateOfBirth(state.form.values.dateOfBirth) === true) {
    return true;
  } else {
    return false;
  }
};

const renderForm = (state) => {
  const formSecondRow = document.querySelector('.registration__second-row');
  const formThirdRow = document.querySelector('.registration__third-row ');
  const sendButton = document.querySelector('.button-primary');
  const formWrapper = document.querySelector('.form__wrapper');

  if (state.ui === 'formStep2') {
    formSecondRow.style.visibility = 'visible';
  }

  if (state.ui === 'formStep3') {
    formThirdRow.style.visibility = 'visible';
  }

  if (state.form.valid === false) {
    sendButton.setAttribute('disabled', '');
  }

  if (state.form.valid === true) {
    sendButton.removeAttribute('disabled');
  }

  if (state.form.status === 'submitted') {
    sendButton.setAttribute('disabled', '');

    const completeIcon = document.createElement('img');
    completeIcon.setAttribute('src', './images/complete-icon.svg');
    completeIcon.setAttribute('alt', 'Complete icon');
    completeIcon.classList.add('complete-icon');

    const completeMessage = document.createElement('span');
    completeMessage.classList.add('complete-message');
    completeMessage.textContent = 'Completed'

    formWrapper.append(completeIcon);
    formWrapper.append(completeMessage);
  }
};

const validateForm = () => {
  const state = {
    form: {
      valid: false,
      status: 'filling',
      values: {
        name: '',
        gender: '',
        country: '',
        city: '',
        dateOfBirth: '',
        documents: [],
      },
      errors: {
        name: 'Please enter your first and last name',
        gender: 'Please choose your gender',
        country: 'Please enter the country you live in',
        city: 'Please enter the city you live in',
        dateOfBirth: 'Please enter your date of birth (dd.mm.yyyy)',
      },
    },
    ui: 'formStep1',
  };

  const nameInput = document.querySelector('.input-name');
  nameInput.addEventListener('input', (event) => {
    event.preventDefault();
    if (state.form.status === 'submitted') {
      return;
    }

    if (validateName(event.target.value)) {
      state.form.values.name = event.target.value;
      clearInvalidInput(event.target);
    } else {
      state.form.values.name = event.target.value;
      renderInvalidInput(state, event.target);
    }

    if (checkForSecondStep(state)) {
      state.ui = 'formStep2';
    }

    if (checkIfFormIsValid(state)) {
      state.form.valid = true;
    } else {
      state.form.valid = false;
    }

    renderForm(state);
  });

  
  let counter = 0;
  const select = document.querySelector('.form__select-gender');
  select.addEventListener('click', (event) => {
    event.preventDefault();
    if (state.form.status === 'submitted') {
      return;
    }

    if (validateGender(event.target.innerText)) {
      state.form.values.gender = event.target.innerText;
      clearInvalidSelect(select, event.target);
    } else {
      state.form.values.gender = event.target.innerText;
      
      renderInvalidSelect(state, event.target, counter);
      counter += 1;
    }

    if (checkForSecondStep(state)) {
      state.ui = 'formStep2'
    }

    if (checkIfFormIsValid(state)) {
      state.form.valid = true;
    } else {
      state.form.valid = false;
    }

    console.log(state.form.values);

    renderForm(state);
  });

  const countryInput = document.querySelector('.input-country');
  countryInput.addEventListener('input', (event) => {
    event.preventDefault();
    if (state.form.status === 'submitted') {
      return;
    }

    if (validateLocation(event.target.value)) {
      state.form.values.country = event.target.value;
      clearInvalidInput(event.target);
    } else {
      state.form.values.country = event.target.value;
      renderInvalidInput(state, event.target);
    }

    if (checkForThirdStep(state)) {
        state.ui = 'formStep3';
    }

    if (checkIfFormIsValid(state)) {
      state.form.valid = true;
    } else {
      state.form.valid = false;
    }

    renderForm(state);
  });

  const cityInput = document.querySelector('.input-city');
  cityInput.addEventListener('input', (event) => {
    event.preventDefault();
    if (state.form.status === 'submitted') {
      return;
    }

    if (validateLocation(event.target.value)) {
      state.form.values.city = event.target.value;
      clearInvalidInput(event.target);
    } else {
      state.form.values.city = event.target.value;
      renderInvalidInput(state, event.target);
    }

    if (checkForThirdStep(state)) {
      state.ui = 'formStep3';
    }

    if (checkIfFormIsValid(state)) {
      state.form.valid = true;
    } else {
      state.form.valid = false;
    }

    renderForm(state);
  });

  const dateOfBirthInput = document.querySelector('.input-birthday');
  dateOfBirthInput.addEventListener('input', (event) => {
    event.preventDefault();
    if (state.form.status === 'submitted') {
      return;
    }

    if (validateDateOfBirth(event.target.value)) {
      state.form.values.dateOfBirth = event.target.value;
      clearInvalidInput(event.target);
    } else {
      state.form.values.dateOfBirth = event.target.value;
      renderInvalidInput(state, event.target);
    }

    if (checkForThirdStep(state)) {
      state.ui = 'formStep3';
    }

    if (checkIfFormIsValid(state)) {
      state.form.valid = true;
    } else {
      state.form.valid = false;
    }
    
    renderForm(state);
  });

  const fileInput = document.querySelector('#file-input');
  fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (state.form.status === 'submitted') {
      return;
    }

    state.form.values.documents = [...state.form.values.documents, ...files];

    if (checkIfFormIsValid(state)) {
      state.form.valid = true;
    } else {
      state.form.valid = false;
    }

    renderForm(state);
  });

  const previewsContainer = document.querySelector('.files__preview');
  previewsContainer.addEventListener('click', (event) => {
    if (state.form.status === 'submitted') {
      return;
    }

    if (event.target.dataset.icon === 'delete-icon') {
      const index = [...event.target.parentElement.parentElement.children].indexOf(event.target.parentElement);
      state.form.values.documents.splice(index, 1);
    } else {
      return;
    }

    if (checkIfFormIsValid(state)) {
      state.form.valid = true;
    } else {
      state.form.valid = false;
    }

    renderForm(state);
  });

  const form = document.querySelector('.registration-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = state.form.values;
    state.form.status = 'submitted';
    renderForm(state);
  });
};

//  Validate Form Functionality


slide();
validateForm();
attachFiles();
changeSelect();
