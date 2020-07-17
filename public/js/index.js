const electron = require('electron');
const Mustache = require('mustache');

const {
  ipcRenderer
} = electron;

const $fileContainer = document.querySelector('#file-container');

const fileTemplate = document.querySelector('#file-template').innerHTML;

ipcRenderer.on('dirContent', (e, files) => {
  $fileContainer.innerHTML = '';
  renderFile({
    name: '..'
  });

  files.forEach((file) => {
    renderFile(file);
  });

  for (file of $fileContainer.children) {
    file.addEventListener('dblclick', (e) => dirRequest(e.target.innerHTML));
  }
});


function renderFile(file) {
  const render = Mustache.render(fileTemplate, {
    name: file.name
  });
  $fileContainer.insertAdjacentHTML('beforeend', render);
}

function dirRequest(fileName) {
  ipcRenderer.send('dirRequest', fileName);
}

async function sendMessage(message) {
  ipcRenderer.send('message', message);
}
