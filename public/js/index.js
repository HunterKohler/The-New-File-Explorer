const path = require('path');
const fs = require('fs');

const electron = require('electron');
const {
  ipcRenderer
} = electron;

const Mustache = require('mustache');

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
  // renderFile('..');

  files.forEach((file) => {
    renderFile(file);
  });

  for (file of $fileContainer.children) {
    file.querySelector('.file-name')
      .addEventListener('dblclick', (e) => {
        dirRequest(path.join(curDir, e.target.innerHTML));
      });
  }
});

ipcRenderer.on('fileNotFound', (e, file) => {
  dirRequest(curDir);
  alert(`File ${file} not found.`);
});

function renderFile({
  name,
  icon
}) {
  const render = Mustache.render(fileTemplate, {
    name,
    iconClass: icon ? `${icon.name} ${icon.color}` : ''
  });
  $fileContainer.insertAdjacentHTML('beforeend', render);
}

function dirRequest(dirPath) {
  ipcRenderer.send('dirRequest', dirPath);
}

async function sendMessage(message) {
  ipcRenderer.send('message', message);
}
