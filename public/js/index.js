const path = require('path');
const fs = require('fs');

const electron = require('electron');
const {
  ipcRenderer
} = electron;

const Mustache = require('mustache');

let curDir = '/';
let dirEntries = [];

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
  dirEntries = [];
  // renderFile('..');

  files.forEach((file) => {
    renderFile(file);
    dirEntries.push(file);
  });

  console.log(dirEntries.length);
  for (let i = 0; i < dirEntries.length; i++) {
    $dirItems.children[i]
      .addEventListener('dblclick', (e) => {
        dirRequest(dirEntries[i].path);
      });
  }
});

ipcRenderer.on('fileNotFound', (e, file) => {
  dirRequest(curDir);
  alert(`File ${file} not found.`);
});

ipcRenderer.on('returnDir', (e, file) => {
  ipcRenderer.send('dirReturn', curDir)
});

document.addEventListener('contextmenu', (e) => {
  ipcRenderer.send('contextMenu');
});

function renderFile({
  name,
  icon,
  sizestring,
  mtimestring,
  type
}) {
  const render = Mustache.render(fileTemplate, {
    name,
    type,
    modified: mtimestring,
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
