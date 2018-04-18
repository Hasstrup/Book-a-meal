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

addListener()
