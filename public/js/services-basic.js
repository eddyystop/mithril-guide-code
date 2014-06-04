/* global m */
(function (m) {
  'use strict';

  var users = m.prop([]); //default value

  m.request({method: "GET", url: "/user"})

    // Chrome 34.0.1847.131 m does not allow .then(console.log)
    // Here are 2 workarounds
    .then(console.log.bind(console))
    .then(log)

    .then(users) // unwrap its value
    .then(dumpUsers);


  function log (load) {
    console.log('log', typeof load, load, JSON.stringify(load));
    return load;
  }

  function dumpUsers (load) {
    dump('users', users());
    return load;
  }

  function dump (name, thing) {
    var type = typeof thing;
    if (type === 'object' && thing && thing.nodeName) { type = 'node'; }

    var json = '';
    if (type !== 'node') {
      try {
        json = JSON.stringify(thing);
      } catch (e) {
        json = 'error: ' + e.message;
      }
    }

    switch (type) {
      case 'function':
        console.log(name, 'typeof=', typeof thing, 'return-value=', thing(),
          'JSON.stringify=', json);
        break;
      case 'object':
        console.log(name, 'typeof=', typeof thing, 'JSON.stringify=', json);
        break;
      case 'node':
        console.log(name, 'typeof= node  nodeName=', thing.nodeName);
        break;
      default:
        console.log(name, 'typeof=', typeof thing, 'value=', thing,
          'JSON.stringify=', json);
    }
  }

}(m));