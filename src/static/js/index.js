const path = require('path')
const fs = require('fs')
const electron = {
    ipcRenderer
} = require('electron')
const Mustache = require('mustache')

let curDir = '/'
let dirEntries = []

const qs = (element, str) => element.querySelector(str)
const qsAll = (element, str) => element.querySelectorAll(str)
const dqs = (str) => qs(document, str)
const dqsAll = (str) => qs(document, str)

const $dirPathForm = dqs('#dir-path-form')
const $dirPathInput = dqs('#dir-path-input')
const $fileRowTemplate = dqs('#file-row-template')
const $dirFiles = dqs('#dir-files')
const $infoBar = dqs('#info-bar')
const $dirWindow = dqs('.dir-window')
const $infoBarWrapper = dqs('#info-bar-wrapper')

$dirPathForm.addEventListener('submit', (e) => {
    e.preventDefault()
    dirRequest($dirPathInput.value)
})

ipcRenderer.on('dirContent', (e, dirPath, files) => {
    curDir = dirPath
    dirEntries = []
    $dirPathInput.value = dirPath
    $dirFiles.innerHTML = ''

    files.forEach((file, index) => {
        dirEntries.push(file)
        renderFile(index)
    })
})

ipcRenderer.on('fileNotFound', (e, file) => {
    dirRequest(curDir)
    alert(`File ${file} not found.`)
})

ipcRenderer.on('returnDir', (e, file) => {
    ipcRenderer.send('dirReturn', curDir)
})

function renderFile(index) {
    const {
        name,
        icon,
        sizestring,
        mtimestring,
        type,
        path
    } = dirEntries[index]

    const template = $fileRowTemplate.innerHTML
    $dirFiles.insertAdjacentHTML('beforeend',
        Mustache.render(template, {
            index,
            name,
            type,
            icon,
            size: sizestring,
            modified: mtimestring
        }))

    const $file = $dirFiles.lastElementChild
    $file.addEventListener('dblclick', (e) => {
        dirRequest(dirEntries[$file.dataset.index].path)
    })

    for(let j = 0; j < $file.children.length; j++) {
        new ResizeObserver(() => {
            resize(index, j)
        }).observe($file.children[j])
    }
}

for(let j = 0; j < qsAll($infoBar, 'div').length; j++) {
    new ResizeObserver(() => {
        resize(-1, j)
    }).observe(qsAll($infoBar, 'div')[j])
}

$dirFiles.addEventListener('scroll', (e) => {
    $infoBarWrapper.scrollLeft = $dirFiles.scrollLeft;
})

$infoBarWrapper.addEventListener('scroll', (e) => {
    $dirFiles.scrollLeft = $infoBarWrapper.scrollLeft;
})

function dirRequest(dirPath) {
    ipcRenderer.send('dirRequest', dirPath)
}

async function sendMessage(message) {
    ipcRenderer.send('message', message)
}

async function contextRequest(filePath) {
    ipcRenderer.send('contextMenu', curDir, filePath)
}

function resize(row, column) { // row -1 for infobar
    let width;

    if(row < 0) {
        width = $infoBar
            .children[column]
            .style
            .width
    } else {
        width = $dirFiles
            .children[row]
            .children[column]
            .style
            .width

        $infoBar
            .children[column]
            .style
            .width = width
    }

    for(let i = 0; i < $dirFiles.children.length; i++) {
        if(i != row) {
            $dirFiles.children[i]
            .children[column]
            .style
            .width = width
        }
    }
}
