const path = require('path');
const fs = require('fs');

const electron = require('electron');
const {
  ipcRenderer
} = electron;

const Mustache = require('mustache');

let curDir = '/';
let dirEntries = [];

$('#dir-path-form').submit((e) => {
  e.preventDefault();
  dirRequest($('#dir-path-input').val());
});

ipcRenderer.on('dirContent', (e, dirPath, files) => {
  curDir = dirPath;
  dirEntries = [];
  $('#dir-path-input').val(curDir);
  $('#dir-items .file-info').remove();
  // renderFile('..');

  files.forEach((file) => {
    dirEntries.push(file);
    renderFile(file);
  });

  for (let i = 0; i < dirEntries.length; i++) {
    const fileRow = $(`[data-index="${i}"]`);
    let secondClick = false;

    fileRow.on('dblclick', (e) => {
      dirRequest(dirEntries[i].path);
    }).on('contextmenu', (e) => {
      contextRequest(dirEntries[i].path);
    }).hover((e) => {
      fileRow.css('background-color', 'rgb(100,100,100)');
    }, (e) => {
      fileRow.css('background-color', 'rgb(50,50,50)');
    }).click(async function(e) {
      let that = $(this);
      let secondClick = false;

      if(!secondClick){
        console.log(1);
      }
      else{
        console.log(2);
      }
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

function renderFile({
  name,
  icon,
  sizestring,
  mtimestring,
  type,
  path
}) {
  let index = dirEntries.length - 1;

  $('#name-box .info-box').append(
    Mustache.render(
      $('#file-name-template').html(), {
        name,
        index
      }
    )
  )

  $('#type-box .info-box').append(
    Mustache.render(
      $('#file-type-template').html(), {
        icon: icon.name,
        color: icon.color,
        type,
        index
      }
    )
  )

  $('#size-box .info-box').append(
    Mustache.render(
      $('#file-size-template').html(), {
        size: sizestring,
        index
      }
    )
  )

  $('#modified-box .info-box').append(
    Mustache.render(
      $('#file-modified-template').html(), {
        modified: mtimestring,
        index
      }
    )
  )
}

function dirRequest(dirPath) {
  ipcRenderer.send('dirRequest', dirPath);
}

async function sendMessage(message) {
  ipcRenderer.send('message', message);
}

async function contextRequest(filePath) {
  ipcRenderer.send('contextMenu', curDir, filePath)
}
