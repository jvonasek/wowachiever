const fs = require('fs');
const unirest = require('unirest');

const ROOT_APP_PATH = fs.realpathSync('.');

/**
 * JSON Downloader
 */
class Downloader {
  /**
   * @param {string|Array} endpoint
   * @param {string} file
   * @param {function} processFn
   */
  constructor(endpoint, file, processFn = null) {
    this.endpoint = endpoint;
    this.file = file;
    this.processFn = processFn;
    this.request = [];
    this.temp = [];

    if (this.endpoint instanceof Array) {
      this.endpoint.forEach((ep) => {
        this.request.push(unirest('GET', ep));
      });
    } else {
      this.request.push(unirest('GET', this.endpoint));
    }
  }

  /**
   * Setup request and fetch the data
   */
  download() {
    if (!this.request.length) {
      return;
    }

    this.request.forEach((req) => {
      req.end((res) => {
        this.temp.push(this.processData(res));
        if (this.temp.length === this.request.length) {
          this.constructor.writeFile(
            this.temp.length === 1 ? this.temp[0] : this.temp,
            this.file,
          );
        }
      });
    });
  }

  /**
   * Process the data
   * @param {Object} data
   */
  processData(data) {
    if (typeof this.processFn === 'function') {
      return this.processFn(data);
    }

    return data;
  }

  /**
   * Save the file to filesystem
   * @param {Object} result
   * @param {String} filePath
   */
  static writeFile(result, file) {
    fs.writeFile(
      `${ROOT_APP_PATH}${file}`,
      JSON.stringify(result),
      'utf8',
      (err) => {
        if (err) {
          throw new Error(result.error);
        }
        // eslint-disable-next-line
        console.log(`File saved to ${file}`);
      },
    );
  }
}

module.exports = Downloader;
