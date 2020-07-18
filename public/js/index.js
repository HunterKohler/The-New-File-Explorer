const path = require('path');

const electron = require('electron');
const Mustache = require('mustache');

const {
  ipcRenderer
} = electron;

let curDir = '/';

const $fileContainer = document.querySelector('#file-container');
const $directoryPathForm = document.querySelector('#dir-path-form');
const $directoryPath = document.querySelector('#dir-path-input');

const fileTemplate = document.querySelector('#file-template').innerHTML;

$directoryPathForm.addEventListener('submit', (e) => {
  e.preventDefault();

  dirRequest($directoryPath.value);
});

ipcRenderer.on('dirContent', (e, dirPath, files) => {
  curDir = dirPath;
  $directoryPath.value = curDir;
  $fileContainer.innerHTML = '';
  renderFile({
    name: '..'
  });

  files.forEach((file) => {
    renderFile(file);
  });

  for (file of $fileContainer.children) {
    file.addEventListener('dblclick', (e) => {
      dirRequest(path.join(curDir, e.target.innerHTML));
    });
  }
});

ipcRenderer.on('fileNotFound', (e, file) => {
  dirRequest(curDir);
  alert(`File ${file} not found.`);
});

function renderFile(file) {
  const render = Mustache.render(fileTemplate, {
    name: file.name
  });
  $fileContainer.insertAdjacentHTML('beforeend', render);
}

function dirRequest(dirPath) {
  ipcRenderer.send('dirRequest', dirPath);
}

async function sendMessage(message) {
  ipcRenderer.send('message', message);
}
