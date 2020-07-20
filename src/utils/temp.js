const CSON = require('cson');

const file = CSON.load('../../public/icons/config.cson');
console.log(file);

console.log(require('path').join(__dirname, '../../public/icons/config.cson'));
