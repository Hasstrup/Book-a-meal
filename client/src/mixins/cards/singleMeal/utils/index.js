/**
 * This module contains functions that directly manipulate the DOM
 */

/**
  * @name makeEditable
  * @description receives an arbitary number of arguments, all elements in
  * the dom with classnames that match any of the args passed will be set to
  * contenteditable true
  * @returns {function} inconsequential to the process being run
  * @param {number} Identifier 1 sets all the elements to true, any other number \
  * removes the content editable property
  * @param {any} keys the classnames to be modified
  */
const makeEditable = (identifier, ...keys) => {
  // expecting that keys[0] is a className property in the
  keys.forEach((key) => { // THIS is N2 , look into flattening it subsequently
    Array.from(document.getElementsByClassName(key))
      .forEach((element) => {
        const bool = identifier === 1; // the last argument tells if to hide or to keep visible
        element.setAttribute('contenteditable', bool);
      });
  });
  // focus the very first one so the user is aware that the lements are now editable
  return identifier === 1 ? document.getElementsByClassName(keys[0])[0].focus() : document.getElementsByClassName(keys[0])[0].blur();
};

/**
 *
 * @param {String} id The id of the meal to get information for
 * @name getMealInformation
 * @description gets the name, description and the image now set for the image
 * @returns {object} an object containing the meal name, description and image
 */
const getMealInformation = (id) => {
  const [name, description] = Array.from(document.getElementsByClassName(`editable${id}`));
  const image = document.getElementsByClassName(`image-${id}`)[0].files[0];
  return {
    name: name.innerText,
    description: description.innerText,
    image
  };
};

export { makeEditable, getMealInformation };

