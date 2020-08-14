const path = require('path')
const fs = require('fs')
const electron = {
    ipcRenderer
} = require('electron')
const Mustache = require('mustache')

let curDir = '/'
let dirEntries = []

const qs = (element, str) => element.querySelector(str)
const qsAll = (element, srt) => element.querySelectorAll(str)
const dqs = (str) => qs(document, str)
const dqsAll = (str) => qs(document, str)

const $dirPathForm = dqs('#dir-path-form')
const $dirPathInput = dqs('#dir-path-input')
const $fileRowTemplate = dqs('#file-row-template')
const $dirFiles = dqs('#dir-files')

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
}

function dirRequest(dirPath) {
    ipcRenderer.send('dirRequest', dirPath)
}

async function sendMessage(message) {
    ipcRenderer.send('message', message)
}

async function contextRequest(filePath) {
    ipcRenderer.send('contextMenu', curDir, filePath)
}
