const electron = require('electron');
const Mustache = require('mustache');

const {
  ipcRenderer
} = electron;

const $fileContainer = document.querySelector('#file-container');

const fileTemplate = document.querySelector('#file-template').innerHTML;

ipcRenderer.on('dirContent', (e, files) => {
  files.forEach((file) => {
    renderFile(file);
  });

  for (file of $fileContainer.children) {
    file.addEventListener('dblclick', (e) => filerequest(e.target.innerHTML));
  }
});


function renderFile(file) {
  const render = Mustache.render(fileTemplate, {
    name: file.name
  });
  $fileContainer.insertAdjacentHTML('beforeend', render);
}

function fileRequest(fileName) {
  ipcRenderer.send('fileRequest', fileName);
}

async function sendMessage(message) {
  ipcRenderer.send('message', message);
}
