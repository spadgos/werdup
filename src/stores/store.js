var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

class Store extends EventEmitter {

  constructor() {
    // Token returned by "AppDispatcher.register(..)"
    // for use by "AppDispatcher.waitFor()"
    this.dispatchToken = null;
    super();
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(/*function*/ callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(/*function*/ callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

module.exports = Store;
