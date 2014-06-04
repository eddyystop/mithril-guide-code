/* global m */
(function (m) {
  'use strict';

  /**
   * Refer to services-errors.js for a more illuminative example.
   */

  //model
  var User = {};

  User.listEven = function() {
    // this returns an m.prop getter-setter
    return m.request({method: "GET", url: "/user"}).then(function(list) {
      return list.filter(function(user) {return user.id % 2 == 0});
    });
  };

  //app
  var app = {
    controller: function() {
      console.log('controller called');
      this.users = User.listEven().then(log);
    },

    view: function (ctrl) {
      console.log('view called');
      return m('ul',
        ctrl.users().map(function (user) {
            return m('li', user.id + ' ' + user.name);
          }
        ));
    }
  };

  m.module(document.body, app);

  function log (load) {
    console.log('log', typeof load, load, JSON.stringify(load));
    return load;
  }

}(m));