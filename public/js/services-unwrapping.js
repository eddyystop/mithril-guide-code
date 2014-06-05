/* global m */
(function (m) {
  'use strict';

  // model =====================================================================
  var User = {};

  User.list = function (url) {
    console.log('\nin User.list. url=', url);

    return m.request({
      method: "GET", url: url, extract: coerceToJson,
      unwrapSuccess: function(response) {
        return response.data;
      },
      unwrapError: function(response) {
        return typeof response === 'object' && 'error' in response ? response.error : response;
      }
    })
      // note: its preferable to do error handling in the controller as that leads to less code
      .then(null, logError);
  };

  // app =======================================================================
  var app = {
    controller: function() {
      console.log('\n.....in app.controller');
      var me = this;

      me.error1 = m.prop('');
      me.users1 = User.list('/userok').then(null, me.error1).then(next, next);

      // we run this sequentially not to interleave the async console.log's
      function next () {
        me.error2 = m.prop('');
        me.users2 = User.list('/userbad').then(null, me.error2).then(next2, next2);
      }

      function next2() {
        me.error3 = m.prop('');
        me.users3 = User.list('/bad-route').then(null, me.error3)
      }
    },

    view: function (ctrl) {
      console.log('\n .....in app.view');

      console.log('users1', ctrl.users1());
      console.log('error1', ctrl.error1());
      console.log('users2', ctrl.users2());
      console.log('error2', ctrl.error2());
      console.log('users3', ctrl.users3());
      console.log('error3', ctrl.error3());

      return m('ul',
        ctrl.users1().map(function (user) {
            return m('li', user.id + ' ' + user.name);
          }
        ));
    }
  };

  m.module(document.body, app);

  // utilities =================================================================

  function coerceToJson(xhr) {
    var isJson = '"[{'.indexOf(xhr.responseText.charAt(0)) !== -1; // fragile but fast
    return isJson ? xhr.responseText : JSON.stringify(xhr.responseText);
  }

  function logError (response) {
    console.log('logError. typeof response=', typeof response, 'response=', response);
  }

}(m));