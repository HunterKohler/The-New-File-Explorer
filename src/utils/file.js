const fs = require('fs');
const {
  getIcon
} = require('./icon');

class File {
  /**
   * @param  {String} path
   */
  constructor(path, isDir) {
    this.path = path;
    this.name = path.substring(path.search(/\/[^/]*$/) + 1);
    this.isDir = isDir;

    this.icon = getIcon(this);
  }
}

module.exports = {
  File
}
