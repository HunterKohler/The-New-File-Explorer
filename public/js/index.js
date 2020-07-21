const path = require('path');
const fs = require('fs');

const electron = require('electron');
const {
  ipcRenderer
} = electron;

const Mustache = require('mustache');

let curDir = '/';

const $dirPathForm = document.querySelector('#dir-path-form');
const $dirPath = document.querySelector('#dir-path-input');

const $dirItemsHeader = document.querySelector('#dir-items-header');
const $dirHeaderName = document.querySelector('#dir-header-name');
const $dirHeaderType = document.querySelector('#dir-header-type');
const $dirHeaderSize = document.querySelector('#dir-header-size');
const $dirHeaderModified = document.querySelector('#dir-header-modified');

const $dirItems = document.querySelector('#dir-items');

const fileTemplate = document.querySelector('#file-template').innerHTML;

$dirPathForm.addEventListener('submit', (e) => {
  e.preventDefault();

  dirRequest($dirPath.value);
});

ipcRenderer.on('dirContent', (e, dirPath, files) => {
  curDir = dirPath;
  $dirPath.value = curDir;
  $dirItems.innerHTML = '';
  // renderFile('..');

  files.forEach((file) => {
    renderFile(file);
  });

  for (file of $dirItems.children) {
    file.querySelector('.file-name span')
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
  icon,
  sizestring,
  mtimestring
}) {
  const render = Mustache.render(fileTemplate, {
    name,
    modified : mtimestring,
    size: sizestring,
    icon: icon.name,
    color: icon.color
  });
  $dirItems.insertAdjacentHTML('beforeend', render);
}

function dirRequest(dirPath) {
  ipcRenderer.send('dirRequest', dirPath);
}

async function sendMessage(message) {
  ipcRenderer.send('message', message);
}
