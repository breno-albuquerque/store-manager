function MyError(message, status) {
  this.name = 'MyError';
  this.message = message;
  this.status = status;
  this.stack = (new Error()).stack;
}
MyError.prototype = Object.create(MyError.prototype);
MyError.prototype.constructor = MyError;

module.exports = MyError;