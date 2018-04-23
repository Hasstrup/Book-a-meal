const addListener = () => {
  const nodes = Array.from(document.getElementsByClassName('user-list-item'))
  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      document.getElementById('user-details-init').innerText = node.innerText;
      document.getElementsByClassName('display-current-user')[0].style.display = 'none';
    })
  })
}

const showAccountsMenu = () => {
  document.getElementsByClassName('display-current-user')[0].style.display = 'flex';
}

const modal = (close) => {
  if(close) {
    document.getElementsByClassName('modal-base')[0].style.display = 'none';
    return;
  }
  document.getElementsByClassName('modal-base')[0].style.display = 'flex';
}

const addModalListener = () => {
  const nodes = document.getElementsByClassName('order-story-card');
  Array.prototype.forEach.call(nodes, (node) => {
    node.addEventListener('click', () => {
      modal()
    })
  })
}

addListener()
