/*!
 * Apic
 * Copyright (c) 2012 Christian Sullivan <cs@euforic.co>
 * MIT Licensed
 */
// Hack to work with titanium as a single file
if('undefined' !== typeof Titanium){
  var exports = undefined;
  var window = this;
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

    // Create array if user passes single function
    if(!isArray(methods)){
      methods = [methods];
    }

    var ns = self.api[namespace] || (self.api[namespace] = {});

    methods.forEach(function(method){
      //Create Method for Namespace
      ns[method.action] = function(data,cb){

        var verb = method.verb || 'GET';
        var callback = cb || noop;
        var url = (method.url) ? method.url : self.baseUrl;
            url = url +'/'+ ((method.path) ? method.path : namespace + method.action);

        // Debug Output
        if(self.debug) { method.url = url; console.log('[HAPI DEBUG]:',{request:method}); }

        request(verb, url)
          .set('Accept', 'application/json')
          .send(data)
          .end(function(response){
            callback(response);
            // Debug Output
            if(self.debug){ console.log('[HAPI DEBUG]:',{response:response}); }
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