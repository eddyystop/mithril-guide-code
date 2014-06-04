/* global m */
(function (m) {
  'use strict';

  // model =====================================================================
  var User = function(data) {
    this.id = m.prop(data.id);
    this.name = m.prop(data.name);
  };

  User.list = function (url) {
    return m.request({ method: "GET", url: url, type: User, extract: nonJsonErrors })
      .then(null, logError);
  };

  // app =======================================================================
  var app = {
    controller: function() {
      console.log('\n.....in app.controller');
      var me = this;

      me.error1 = m.prop('');
      me.users1 = User.list('/user').then(null, me.error1);
    },

    view: function (ctrl) {
      console.log('\n .....in app.view');

      console.log('error1', ctrl.error1());
      console.log('users1', ctrl.users1());

      ctrl.users1().forEach(function (user, i) {
        console.log(i, 'id=', user.id(), 'name=', user.name());
      });

      return m('ul',
        ctrl.users1().map(function (user) {
            return m('li', user.id() + ' ' + user.name());
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

  function logError (data) {
    console.log('logError. typeof data=', typeof data, 'data=', data);
  }

}(m));