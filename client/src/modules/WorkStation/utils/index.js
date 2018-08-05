/**
 * In this module, Methods that directly manipulate the DOM are registered
 * These methods are called mostly because a full rerender of the component
 * might be a tad bit dramatic.
 */

let node;
const defaultImageUrl = 'https://images.unsplash.com/photo-1432139509613-5c4255815697?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=616fc216eff2732910545ebd5d5018b6&auto=format&fit=crop&w=800&q=60';
/* eslint-disable prefer-destructuring */

const RenderMealForm = () => {
  node = document.getElementsByClassName('new-meal-form')[0];
  const target = document.getElementById('show-menu');
  node.style.display = 'flex';
  document.getElementsByClassName('new-meal-title')[0].focus();
  target.innerText = 'Save';
};

// TODO: is there a way to get this.ref from the dom?
const GetMealInformation = () => {
  const name = document.getElementsByClassName('new-meal-title')[0].innerText;
  const description = document.getElementsByClassName('new-meal-description')[0].innerText;
  const price = document.getElementsByClassName('new-meal-price')[0].innerText;
  const image = document.getElementsByClassName('inputfile')[0].files[0];
  return {
    name,
    description,
    price,
    image
  };
};

export const changePhoto = (args) => {
  let value;
  if (args) {
    node = document.getElementById(`${args}`);
    value = document.getElementsByClassName(`${args}`)[0].files[0];
  } else {
    value = document.getElementsByClassName('inputfile')[0].files[0];
    node = document.getElementById('preview-image');
  }
  node.setAttribute('src', URL.createObjectURL(value));
};

const HideMealForm = () => {
  document.getElementsByClassName('new-meal-title')[0].innerText = 'Meal name'; // reset the meal title
  document.getElementsByClassName('new-meal-description')[0].innerText = 'description'; // reset the description
  document.getElementsByClassName('new-meal-price')[0].innerText = 'Price';
  document.getElementsByClassName('inputfile').files = []; // remove any images stored;
  document.getElementsByClassName('preview-image')[0].setAttribute('src', defaultImageUrl);
  // doing this to prevent any rerenders, rerendering is tacky, core JS implementation seems neater
  // and speed
  document.getElementsByClassName('new-meal-form')[0].style.display = 'none';
  document.getElementById('show-menu').innerText = 'New Meal';
};

export const RenderMealCard = (id) => {
  const element = document.getElementById(id);
  element.style.display = 'flex';
  element.style.zIndex = 3;
  element.style.opacity = 1;
};

export const HideMealCard = (id) => {
  const element = document.getElementById(id);
  element.style.zIndex = -1; // just hide it a little
  element.style.opacity = 0;
};


export default {
  RenderMealForm,
  GetMealInformation,
  changePhoto,
  HideMealForm
};

