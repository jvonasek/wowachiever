const fs = require('fs');
const unirest = require('unirest');

const ROOT_APP_PATH = fs.realpathSync('.');

/**
 * JSON Downloader
 */
class Downloader {
  /**
   * @param {String} endpoint
   * @param {String} file
   * @param {Function} processFn
   */
  constructor(endpoint, file, processFn = null) {
    this.endpoint = endpoint;
    this.file = file;
    this.processFn = processFn;
    this.request = unirest('GET', this.endpoint);
    this.fullFilePath = `${ROOT_APP_PATH}${this.file}`;
  }

  /**
   * Setup request and fetch the data
   */
  download() {
    this.request.end((res) => this.writeFile(res, this.file));
  }

  /**
   * Process the data
   * @param {Object} data
   */
  processData(data) {
    if (typeof this.processFn === 'function') {
      return JSON.stringify(this.processFn(data));
    }

    return JSON.stringify(data);
  }

  /**
   * Save the file to filesystem
   * @param {Object} result
   */
  writeFile(result) {
    fs.writeFile(
      this.fullFilePath,
      this.processData(result.body),
      'utf8',
      (err) => {
        if (err) {
          throw new Error(result.error);
        }
        // eslint-disable-next-line
        console.log(`File saved to ${this.fullFilePath}`);
      },
    );
  }
}

module.exports = Downloader;
