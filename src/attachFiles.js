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
      deleteIcon.setAttribute('src', '/images/delete-icon.svg');
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

export default attachFiles;
