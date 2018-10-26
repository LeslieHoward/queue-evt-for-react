const utils = {
  type: function(o) {
    return Object.prototype.toString
      .call(o)
      .slice(8, -1)
      .toLowerCase();
  },

  isNull: function(o) {
    let item;
    for (item in o) {
      return false;
    }
    return true;
  },

  notNull: function(o) {
    return !utils.isNull(o);
  },

  isArray: function(o) {
    return utils.type(o) === 'array';
  },

  isFunction: function(o) {
    return utils.type(o) === 'function';
  },

  uuid: function() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
};

export default utils;
