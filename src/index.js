import _ from 'lodash';
import './style.css';

function component() {
  const element = document.createElement('div');
  element.classList.add('container');

  const elem = document.createElement('div');
  elem.className = 'row d-flex justify-content-center';

  const dvGrid = document.createElement('div');
  dvGrid.className = 'col-8 bg-white';

  const ache = document.createElement('h1');
  ache.classList.add('h1');

  ache.textContent = 'To-do List';

  dvGrid.appendChild(ache);
  elem.appendChild(dvGrid);
  element.appendChild(elem);

  return element;
}

document.body.appendChild(component());