/*!
 * Apic
 * Copyright (c) 2012 Christian Sullivan <cs@euforic.co>
 * MIT Licensed
 */
// Hack to work with titanium as a single file
if('undefined' !== typeof Titanium){
  var exports = undefined;
  var window = this;
  function XMLHttpRequest() {

    // titanium xhr client

    this._proxy =  Ti.Network.createHTTPClient();

    // mapping for compatible functions

    this.getResponseHeader = this._proxy.getResponseHeader;
    this.open = this._proxy.open;
    this.send = this._proxy.send;
    this.setRequestHeader = this._proxy.setRequestHeader;
    this.abort = this._proxy.abort;
  }


  Object.defineProperties(XMLHttpRequest.prototype, {
     'onreadystatechange' : {
        set: function (val) {
          return this._proxy.onreadystatechange = val
        }
      },
      'readyState': {
        get: function () {
          return this._proxy.readyState;
        }
      },
      'responseText': {
        get: function () {
          return this._proxy.responseText;
        }
      },
      'responseXML': {
        get: function () {
          return this._proxy.responseXML;
        }
      },
      'status': {
        get: function () {
          return this._proxy.status;
        }
      }
  });

  XMLHttpRequest.prototype.getAllResponseHeaders = function() {
    return '';
  };

  this.XMLHttpRequest = XMLHttpRequest;

  var location = this.location = {};
}

;(function(){
  var request = 'undefined' == typeof exports
    ? request
    : require('superagent');

  /**
   * Noop.
   */

  function noop(){}

  /**
   * Check if `obj` is an array.
   */

  function isArray(obj) {
    return '[object Array]' == {}.toString.call(obj);
  }
  /**
   * Apic Object
   */

  function Apic(schema){
    this.debug = false;
    this.baseUrl = '';
    this.api = {};
    if(schema) {
      for(var key in schema){
        this.add(key, schema[key]);
      }
    }
  }

  /**
   * Add Methods for Given Namespace
   *
   * @param {String} namespace
   * @package {Array} val
   * @return {Boolean}
   * @api public
   */

  Apic.prototype.add = function (namespace,methods){
    var self = this;

    if(!isArray(methods)){
      methods = [methods];
    }

    methods.forEach(function(method){
    // Create array if user passes single function

    var ns = self.api[namespace] || (self.api[namespace] = {});
      //Create Method for Namespace
      ns[method.action] = function(data,cb){

        var verb = method.verb || 'GET';
        var callback = cb || noop;
        var url = (method.url) ? method.url : self.baseUrl;
            url = url +'/'+ ((method.path) ? method.path : namespace + '/' + method.action);

        // Debug Output
        if(self.debug) { console.log('[APIC DEBUG]:',{request:method}); }

        request(verb, url)
          .set('Accept', 'application/json')[(verb === 'GET') ? 'query' : 'send'](data)
          .end(function(response){
            callback(response);
            // Debug Output
            if(self.debug){ console.log('[APIC DEBUG]:',{request:{ verb: verb, data: data, url: url }}); }
          });
      };
    });
    return self;
  };


    /**
     * Create a Apic API Object:
     *
     * Examples:
     *
     *    apic();
     *    apic({ user: [{ method:'create' , verb:'PUT'  }] });
     *    apic().add('user', [{ method:'create' , verb:'PUT'  }]);
     *
     * @param {Object|NULL} schema
     * @return {apic Object}
     * @api public
     */

  function apic(schema){
    return new Apic(schema);
  }

  // expose

  if ('undefined' == typeof exports) {
    window.apic = window.apic = apic;
  } else {
    module.exports = apic;
  }

})();
