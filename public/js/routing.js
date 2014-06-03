var dashboard = {
  controller: function() {
    this.id = m.route.param("userID"); // not a getter-setter
  },

  view: function(controller) {
    if (!document.body) { console.log('* document.body does not yet exist.'); }

    return [
      m("div", controller.id),
      m('br'),
      m("a[href='/dashboard/alicesmith']", {config: m.route}, 'goto alicesmith')
    ];
  }
};

// When the URL matches a route, the respective module's controller is
// instantiated and passed as a parameter to the view.
// and, under the hood, it calls m.module(document.body, dashboard).

m.route(document.body, "/dashboard/johndoe", {
  "/dashboard/:userID": dashboard
});

m.route.mode = 'search';