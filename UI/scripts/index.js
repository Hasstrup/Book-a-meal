const addListener = () => {
  const arr = Array.from(document.getElementsByClassName('menu-details'))
  arr.forEach((node) => {
    node.addEventListener('mouseover', () => {
      node.classList.add('fade-in');
      node.style.opacity = 1;
    })
    node.addEventListener('mouseout', () => {
      node.style.opacity = 0;
      node.classList.remove('fade-in')
    })
  })
}

addListener()
