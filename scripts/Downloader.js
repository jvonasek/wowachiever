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
  }

  /**
   * Setup request and fetch the data
   */
  download() {
    this.request.end((res) => this.constructor.writeFile(
      this.processData(res.body),
      this.file,
    ));
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
