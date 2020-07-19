const path = require('path');
const fs = require('fs');

const electron = require('electron');
const {
  ipcRenderer
} = electron;

const CSON = require('cson');
const Mustache = require('mustache');

let curDir = '/';

const $fileContainer = document.querySelector('#file-container');
const $directoryPathForm = document.querySelector('#dir-path-form');
const $directoryPath = document.querySelector('#dir-path-input');

const fileTemplate = document.querySelector('#file-template').innerHTML;

// TODO elim path.join here, some some of error: ENOIT for no reason
const iconDict = CSON.load(path.join(__dirname,'./icons/iconDict.cson'));

$directoryPathForm.addEventListener('submit', (e) => {
  e.preventDefault();

  dirRequest($directoryPath.value);
});

ipcRenderer.on('dirContent', (e, dirPath, files) => {
  curDir = dirPath;
  $directoryPath.value = curDir;
  $fileContainer.innerHTML = '';
  renderFile('..');

  files.forEach((file) => {
    renderFile(file.name);
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

function renderFile(fileName) {
  const filePath = path.join(curDir, fileName);

  const iconObj = getIcon(filePath);

  console.log(`${iconObj.icon} ${iconObj.color}`)

  const render = Mustache.render(fileTemplate, {
    name: fileName,
    iconClasses: `${iconObj.icon} ${iconObj.color}`
  });
  $fileContainer.insertAdjacentHTML('beforeend', render);
}

function dirRequest(dirPath) {
  ipcRenderer.send('dirRequest', dirPath);
}

async function sendMessage(message) {
  ipcRenderer.send('message', message);
}

function getIcon(filePath) {
  const iconScope = fs.statSync(filePath).isDirectory() ? iconDict.directoryIcons : iconDict.fileIcons;

  for (key of Object.keys(iconScope)) {
    let iconClass = iconScope[key];

    if (!iconClass.matchPath) {
      filePath = filePath.substring(filePath.search(/\/[^/]*$/));
    }

    if (iconClass.match instanceof Array) {
      for (matchPair of iconClass.match) {
        matchPair[0] = ensureRegex(matchPair[0]);

        if (matchPair[0].test(filePath)) {
          return {
            icon: iconClass.icon,
            color: matchPair[1]
          };
        }
      }
    } else {
      iconClass.match = ensureRegex(iconClass.match);

      if (iconClass.match.test(filePath)) {
        return {
          icon: iconClass.icon,
          color: iconClass.color
        };
      }
    }
  }

  return {icon: "fa-folder", color: "light-green"}
}

function ensureRegex(expression) {
  if(expression instanceof RegExp){
    return expression;
  }

  return new RegExp(`\\${expression}`)
}
