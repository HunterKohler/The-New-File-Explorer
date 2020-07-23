const fs = require('fs');

const BigNumber = require('bignumber.js');
BigNumber.config({ DECIMAL_PLACES: 2 });

const {
  getIcon,
  IconMin
} = require('./icon');

class File {
  /**
   * @param  {String} path
   */
  constructor(path) {

    const stat = fs.statSync(path, {
      bigint: true
    });

    this.isDir = stat.isDirectory();

    this.size = new BigNumber(stat.size);
    this.atime = stat.atime; // accessed Date
    this.mtime = stat.mtime; // modified Date
    this.birthtime = stat.birthtime; // created Date

    this.atimestring = File.dateString(this.atime);
    this.mtimestring = File.dateString(this.mtime);

    this.sizestring = this.isDir ? '' : File.sizeString(this.size);

    // TODO finish getting these var's data for output in HTML

    this.path = path;
    this.name = path.substring(path.search(/\/[^/]*$/) + 1);

    this.icon = getIcon(this) || new IconMin(this.isDir ? 'folder' : 'text', 'light-grey');

    this.type = this.icon.type || ''; // TODO check for better way to type MAYBE

    //TODO integrate this.icon == undefined into icon.js
    // TODO consider changing the icons for no matches
  }

  //TODO customize dateString
  /**
   * @static dateString
   *
   *  @param  {Date} date
   *  @return {String}      custom format for date
   */
  static dateString(date){
    const arr = date.toDateString().split(' ');
    return `${arr[1]} ${arr[2]}`
  }

  //TODO customize sizeString


  /**
   * @static sizeString
   *
   * @param  {BigNumber} size
   * @return {String}
   */
  static sizeString(size){
    let str;

    if(size.isGreaterThan(10n ** 12n)){
      return size.dividedBy(10n ** 12n).toString() + ' TB';
    }
    else if(size.isGreaterThan(10n ** 9n)){
      return size.dividedBy(10n ** 9n).toString() + ' GB';
    }
    else if(size.isGreaterThan(10n ** 6n)){
      return size.dividedBy(10n ** 6n).toString() + ' MB';
    }
    else if(size.isGreaterThan(10n ** 3n)){
      return size.dividedBy(10n ** 3n).toString() + ' kB';
    }
    else {
      return size.toString() + ' B';
    }
  }
}

module.exports = {
  File
}
