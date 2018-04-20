let wantsToLogin = false

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

const changeDetails = () => {
  const textTarget = document.getElementsByClassName('main-bold-text')[0]
  const nodeTarget = document.getElementsByClassName('section')[0]
  let buttonTarget = document.getElementsByClassName('submit-button')[0];
  let returnTarget = document.getElementsByClassName('got-an-account-id')[0]
  if(!wantsToLogin) {
    textTarget.innerText = 'Hungry again? Me too.'
    textTarget.nextElementSibling.innerText = ''
    console.log(nodeTarget.childNodes)
    nodeTarget.nextElementSibling.style.display = 'none';
    nodeTarget.childNodes[1].childNodes[1].innerText = 'Username';
    nodeTarget.childNodes[3].childNodes[1].innerText = 'Password';
    buttonTarget.innerText = 'Login';
    returnTarget.innerText = 'Create an account'
    return wantsToLogin = true
  }
  textTarget.innerText = 'Sign Up. Get Fed'
  textTarget.nextElementSibling.innerText = "Create an account with Book A Meal,get the best menu options and the most ridiculous deals you might find anywhere else, and you have our word for that. Let's have you join us!"
  console.log(nodeTarget.childNodes)
  nodeTarget.nextElementSibling.style.display = 'flex';
  nodeTarget.childNodes[1].childNodes[1].innerText = 'Full Name';
  nodeTarget.childNodes[3].childNodes[1].innerText = 'Email';
  buttonTarget.innerText = 'Sign Up';
  returnTarget.innerText = 'I already have an account'
  return wantsToLogin = false

}

addListener()
