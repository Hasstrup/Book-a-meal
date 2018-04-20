let aboutToSave = false;
let aboutToModify = false;

const nullify = (name) => {
  document.getElementsByClassName(`${name}`)[0].innerText = ''
}

const changePhoto = (args) => {
    let value
    let node
  if(args){
      node = document.getElementById(`${args}`)
      value = document.getElementsByClassName(`${args}`)[0].files[0]
  } else {
     value = document.getElementsByName('input-file')[0].files[0]
     node = document.getElementById('preview-image')
  }
  node.setAttribute('src', URL.createObjectURL(value));
}

const addListener = () => {
  let nodes = Array.from(document.getElementsByClassName('display-item-button'))
  nodes.forEach((node) => {
    let name = node.attributes.getNamedItem('name').value
    node.addEventListener('click', () => {
      console.log(`mouse in`)
      showCard(name)
    });
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

const showForm = () => {
  let node = document.getElementsByClassName('new-meal-form')[0]
  let target = document.getElementById('show-menu')
  if(!aboutToSave){
    node.style.display = 'flex';
    document.getElementsByClassName('new-meal-title')[0].focus()
    target.innerText = 'Save';
    return aboutToSave = true;
}
  node.style.display ='none';
  target.innerText = 'New Meal';
  return aboutToSave = false
}

const modify = (a, b, c) => {
  let nodes = Array.from(document.getElementsByClassName(`${a}`))
  let nextTarget = document.getElementById(`${c}`)
  let targets = document.getElementsByClassName(`${b}`)[0]

  if(!aboutToModify){
  nodes.forEach((node) => {
    node.setAttribute('contenteditable', true)
  });
  nodes[0].focus();

  targets.style.zIndex = 5;
  targets.style.opacity = 1;
  nextTarget.innerText = 'Save';
  nextTarget.nextElementSibling.style.display = 'none';
  return aboutToModify = true;
}
  nodes.forEach((node) => {
    node.setAttribute('contenteditable', false)
  });
  nodes[0].blur();
  targets.style.zIndex = -1;
  targets.style.opacity = 0;
  nextTarget.innerText = 'Modify';
  nextTarget.nextElementSibling.style.display = 'block';
  return aboutToModify = false;
}

const makeEditable = (a,b) => {
  let target = document.getElementById(`${a}`)
  let nodes = Array.from(document.getElementsByClassName(`${a}`));
  let holder
  if(target.innerText !== 'Save'){
    nodes.forEach((node) => {
        node.setAttribute('contenteditable', true)
        target.innerText = 'Save';
    })
    nodes[0].focus()
    if (b) {
      nodes[1].setAttribute('contenteditable', false)
      nodes[1].innerText = 'Click here to select meal options';
      nodes[1].style.textDecoration = 'underline';
      nodes[1].addEventListener('click',() => {
        document.getElementsByClassName('modal-base')[0].style.display = 'flex';
      })
    }
    return;
  }

  nodes.forEach((node) => {
    node.setAttribute('contenteditable', false);
    target.innerText = 'Edit'
  });
  if (b) {
    nodes[1].innerText = 'Freid rice & chips, Sweet Sensation  (30)'
    nodes[1].style.textDecoration = 'none';
  }

  // openModal();
  return;
}



const clicker = (index) => {
  let node = document.getElementsByClassName(`it-${index}`)[0]

      node.style.opacity = 1;
      node.style.height = '100%';
      node.style.backgroundColor = 'black';
      node.style.color = 'white';


}

addListener()
