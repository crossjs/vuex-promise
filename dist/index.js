/*!
 * Vuex-Promise v0.1.0
 * (c) 2016 Rich Lee
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vuexPromise = factory());
}(this, function () { 'use strict';

  var hasPromise = function hasPromise(payload) {
    return payload && (payload.then || Array.isArray(payload) && payload.some(function (p) {
      return p && p.then;
    }));
  };

  function vuexPromise() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$debug = _ref.debug;
    var debug = _ref$debug === undefined ? false : _ref$debug;
    var _ref$status = _ref.status;
    var status = _ref$status === undefined ? {
      PENDING: 0,
      SUCCESS: 1,
      FAILURE: 2
    } : _ref$status;

    return {
      onInit: function onInit() {
        if (debug) {
          console.log('Vuex Promise Initialized.');
        }
      },
      onMutation: function onMutation(_ref2, state, store) {
        var type = _ref2.type;
        var payload = _ref2.payload;

        if (hasPromise(payload)) {
          store.dispatch({
            type: type,
            silent: true,
            meta: status.PENDING
          });
          if (!Array.isArray(payload)) {
            payload = [payload];
          }
          Promise.all(payload).then(function (res) {
            return store.dispatch({
              type: type,
              silent: true,
              payload: payload.length === 1 ? res[0] : res,
              meta: status.SUCCESS
            });
          }, function (err) {
            return store.dispatch({
              type: type,
              silent: true,
              payload: err,
              error: true,
              meta: status.FAILURE
            });
          });
        }
      }
    };
  }

  return vuexPromise;

}));