/* global m */
(function (m) {
  'use strict';

  /**
   * Information about m.request and thennables
   *
   * 1. m.request() returns an m.prop getter-setter asynchronously.
   * Views are rendered only after all m.request's are resolved, therefore
   *   this.user = m.request(...).then(...)
   * sets a value for this.user before the view is rendered.
   *
   * The above syntax is considered to be easier to read than
   *   m.request(...).then(this.user).then(...)
   * though this would have to be used if .then(...) referred to this.user.
   *
   * 2. m.request(..., extract: nonJsonErrors)
   *    function nonJsonErrors (xhr) {
   *      return xhr.status > 200 ? JSON.stringify(xhr.responseText) : xhr.responseText;
   *    }
   * Mithril assumes a resource uses JSON format for both success and failure.
   * If errors return in non-JSON format, they have to be converted.
   *
   * 3. .then(success, failure) or .then(null, failure) or .then(success)
   * Each thennable has a success and failure argument. If an m.request succeeds
   * only the success arguments in all the thennables are called.
   * If it fails only the failure arguments are called.
   *
   * 4. .then(console.log) fails in Chrome. Use .then(console.log.bind(console))
   *
   * 5. .then(console.log.bind(console)).then(function (json) {})
   * If a function does not return a value, the data passed to that function is
   * passed on to the next thennable.
   */

  // model =====================================================================
  var User = {};

  User.listEven = function (url) {
    console.log('\nin User.listEven. url=', url);

    return m.request({ method: "GET", url: url, extract: nonJsonErrors })
      // note: its preferable to do error handling in the controller as that leads to less code
      .then(filterList, logError);
  };

  // app =======================================================================
  var app = {
    controller: function() {
      console.log('\n.....in app.controller');
      var me = this;

      me.error1 = m.prop('');
      me.users1 = User.listEven('/user').then(null, me.error1).then(next, next);

      // we run this sequentially not to interleave the async console.log's
      function next () {
        me.error2 = m.prop('');
        me.users2 = User.listEven('/bad-route').then(null, me.error2);
      }
    },

    view: function (ctrl) {
      console.log('\n .....in app.view');

      console.log('users1', ctrl.users1());
      console.log('error1', ctrl.error1());
      console.log('users2', ctrl.users2());
      console.log('error2', ctrl.error2());

      return m('ul',
        ctrl.users1().map(function (user) {
            return m('li', user.id + ' ' + user.name);
          }
        ));
    }
  };

  m.module(document.body, app);

  // utilities =================================================================
  function nonJsonErrors(xhr) {
    console.log('nonJsonErrors. status=', xhr.status);
    return xhr.status > 200 ? JSON.stringify(xhr.responseText) : xhr.responseText;
  }

  function filterList (list) {
    console.log('filterList');
    return list.filter(function(user) {return user.id % 2 == 0});
  }

  function logError (data) {
    console.log('logError. typeof data=', typeof data, 'data=', data);
  }

}(m));