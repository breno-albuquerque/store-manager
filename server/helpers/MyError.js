class MyError {
  constructor(message, status) {
    this.name = 'MyError';
    this.message = message || 'Internal error';
    this.status = status;
    this.stack = (new Error()).stack;
  }
}
MyError.prototype = Object.create(MyError.prototype);

module.exports = MyError;
