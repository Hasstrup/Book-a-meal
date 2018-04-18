const addListener = () => {
  let nodes = Array.from(document.getElementsByClassName('hover-item-items'))
  nodes.forEach((node) => {
    let name = node.attributes.getNamedItem('name').value
    node.addEventListener('mouseover', () => {
      console.log(`mouse in`)
      showCard(name)
    });
    node.addEventListener('mouseout', () => {
      console.log('moused out')
      return null
    })
  })
}

const showCard = (name) => {
  let node = document.getElementById(`${name}`)
  node.classList.add('fade-in');
  node.style.cursor = 'pointer'
  node.addEventListener('mouseover', () => {
    if([...node.classList].includes('fade-in')){
      return
    }
    node.classList.add('fade-in');
  })
  node.addEventListener('mouseout', () => {
    node.classList.remove('fade-in')
  })
}


addListener()
