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
  element.classList.remove('status__fulfilled');
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

export default validateForm;
