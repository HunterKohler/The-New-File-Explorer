const electron = require('electron');
const Mustache = require('mustache');

const {
  ipcRenderer
} = electron;

let curDir = '/';

const $fileContainer = document.querySelector('#file-container');
const $directoryPathForm = document.querySelector('#directory-path-form');
const $directoryPath = document.querySelector('#directory-path');

const fileTemplate = document.querySelector('#file-template').innerHTML;

$directoryPathForm.addEventListener('submit', (e) => {
  e.preventDefault();

  dirRequest($directoryPath.value, true);
});

ipcRenderer.on('dirContent', (e, dirPath,files) => {
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
    file.addEventListener('dblclick', (e) => dirRequest(e.target.innerHTML));
  }
});

ipcRenderer.on('fileNotFound', (e, file) => {
  $directoryPath.value = curDir;
  alert(`File ${file} not found.`);
});

function renderFile(file) {
  const render = Mustache.render(fileTemplate, {
    name: file.name
  });
  $fileContainer.insertAdjacentHTML('beforeend', render);
}

function dirRequest(fileName, full) {
  ipcRenderer.send('dirRequest', fileName, full);
}

async function sendMessage(message) {
  ipcRenderer.send('message', message);
}
