let aboutToSave = false;

const nullify = (name) => {
  document.getElementsByClassName(`${name}`)[0].innerText = ''
}

const changePhoto = () => {
  const value = document.getElementsByName('input-file')[0].files[0]
  let node = document.getElementById('preview-image')
  node.setAttribute('src', URL.createObjectURL(value));
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
