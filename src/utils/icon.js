const CSON = require('cson');

class Icon {


  /**
   * @static toRegex - ensure strs are regex escape
   *
   * @param  {String | RegExp} expr description
   * @return {RegExp}      description
   */
  static toRegex(expr) {
    if (expr instanceof RegExp) {
      return expr;
    }

    //must add $ to be line ending as config.cson doesnt specify
    expr = expr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(expr + '$');
  }

  /**
   * @param iconConfig from config.cson
   */
  constructor(iconConfig) {
    const {
      matchPath,
      icon,
      color = "light-grey",
      match,
      priority
    } = iconConfig;

    this.matchPath = matchPath;
    this.icon = icon;
    this.match = match instanceof Array ? match : [
      [match, color]
    ];
    this.priority = priority;
  }

  /**
   * isMatch - description
   *
   * @param  {String} path
   * @return {Boolean}
   */
  isMatch(path) {
    for (const pair of this.match) {
      const [expr, color, ...rest] = pair;
      const regex = Icon.toRegex(expr);

      if (regex.test(path)) {
        return color;
      }
    }
  }

  min(color) {
    return {
      color,
      name: `${this.icon}-icon`,
    }
  }
}

//TODO implement priority
/**
 * getIcon - description
 *
 * @param  {File} file
 * @return {Icon}
 */
function getIcon(file) {
  const fileType = file.isDir ? 'directoryIcons' : 'fileIcons';

  for (const key of Object.keys(config[fileType])) {
    const icon = config[fileType][key];

    const str = icon.matchPath ? file.path : file.name;

    const color = icon.isMatch(str);
    if (color) {
      return icon.min(color);
    }
  }
}

// Initialize config
// TODO figure out why path.join has to be used ????
let configPath = require('path').join(__dirname, '../../public/icons/config.cson');
const configCSON = CSON.load(configPath);
const config = {};

for (const i of Object.keys(configCSON)) {
  config[i] = {};
  for (const j of Object.keys(configCSON[i])) {
    config[i][j] = new Icon(configCSON[i][j])
  }
}

module.exports = {
  Icon,
  config,
  getIcon
}