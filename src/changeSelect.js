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

export default changeSelect;
