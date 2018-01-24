/* eslint no-console: 0, no-confusing-arrow:0 */

const Logger = {
  info: message => process.env.DEVELOPMENT ? console.info(message) : '',
  warning: message => process.env.DEVELOPMENT ? console.warning(message) : '',
  error: message => process.env.DEVELOPMENT ? console.error(message) : '',
  log: message => process.env.DEVELOPMENT ? console.log(message) : ''
};

export default Logger;
