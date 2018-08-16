
const intGen = (node) => {
  if (node.style.bottom.length === 3) {
    return parseInt(`${node.style.bottom.split('')[0]}`);
  }
  return parseInt(`${node.style.bottom.split('')[0]}${node.style.bottom.split('')[1]}`);
};

export const liftCard = (name) => {
  const node = document.getElementById(`${name}`);
  node.style.position = 'relative';
  if (node.style.bottom && ((isNaN(parseInt(`${node.style.bottom.split('')[0]}${node.style.bottom.split('')[1]}`)) ? parseInt(`${node.style.bottom.split('')[0]}`) :
    parseInt(`${node.style.bottom.split('')[0]}${node.style.bottom.split('')[1]}`))) < 20) {
    const newVal = (intGen(node)) + 1;
    node.style.bottom = `${newVal}px`;
    window.requestAnimationFrame(() => {
      liftCard(`${name}`);
    });
  }
  if (!node.style.bottom) {
    node.style.bottom = '1px';
    window.requestAnimationFrame(() => {
      liftCard(`${name}`);
});
  }
  Array.from(document.getElementsByName(`${name}`))[0].classList.add('fade-in');
  Array.from(document.getElementsByName(`${name}`))[0].style.opacity = 1;
};


export const dropCard = (name) => {
  const node = document.getElementById(`${name}`);
  if (node.style.bottom !== '0px') {
    const value = intGen(node);
    node.style.bottom = `${(value - 1)}px`;
    window.requestAnimationFrame(() => dropCard(name));
  }
  Array.from(document.getElementsByName(`${name}`))[0].classList.remove('fade-in');
  Array.from(document.getElementsByName(`${name}`))[0].style.opacity = 0;
};

