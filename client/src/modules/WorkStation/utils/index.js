/**
 * In this module, Methods that directly manipulate the DOM are registered
 */

let aboutToSave;
let node;
/* eslint-disable prefer-destructuring */

const RenderMealForm = () => {
  node = document.getElementsByClassName('new-meal-form')[0];
  const target = document.getElementById('show-menu');
  if (!aboutToSave) {
    node.style.display = 'flex';
    document.getElementsByClassName('new-meal-title')[0].focus();
    target.innerText = 'Save';
    aboutToSave = true;
  }
};

// TODO: is there a way to get this.ref from the dom?
const GetMealInformation = () => {
  const name = document.getElementsByClassName('new-meal-title')[0].innerText;
  const description = document.getElementsByClassName('new-meal-description')[0].innerText;
  const price = document.getElementsByClassName('new-meal-price')[0].innerText;
  const image = document.getElementsByClassName('inputfile')[0].value;
  return {
    name,
    description,
    price,
    image
  };
};

const changePhoto = (args) => {
  let value;
  if (args) {
    node = document.getElementById(`${args}`);
    value = document.getElementsByClassName(`${args}`)[0].files[0];
  } else {
    value = document.getElementsByName('input-file')[0].files[0];
    node = document.getElementById('preview-image');
  }
  node.setAttribute('src', URL.createObjectURL(value));
};


export default { RenderMealForm, GetMealInformation, changePhoto };

