/* global m, $ */

/** @namespace */
var select2 = {};

/**
 select2 config factory. The params in this doc refer to properties of the `ctrl` argument
 @param {Object} data - the data with which to populate the <option> list
 @param {number} value - the id of the item in `data` that we want to select
 @param {function(Object id)} onchange - the event handler to call when the selection changes.
 `id` is the the same as `value`
 */
select2.config = function(ctrl) {
  return function(element, isInitialized) {
    var el = $(element);

    if (!isInitialized) {
      //set up select2 (only if not initialized already)
      el.select2()
        //this event handler updates the controller when the view changes
        .on("change", function(e) {
          //integrate with the auto-redrawing system...
          m.startComputation();

          //...so that Mithril autoredraws the view after calling the controller callback
          if (typeof ctrl.onchange === "function") ctrl.onchange(el.select2("val"));

          m.endComputation();
          //end integration
        });
    }

    //update the view with the latest controller value
    el.select2("val", ctrl.value);
  };
};

//this view implements select2's `<select>` progressive enhancement mode
select2.view = function(ctrl) {
  return m("select", {config: select2.config(ctrl)}, [
    ctrl.data.map(function(item) {
      return m("option", {value: item.id}, item.name);
    })
  ]);
};

//usage
var dashboard = {};

dashboard.controller = function() {
  //list of users to show
  this.data = [{id: 1, name: "John"}, {id: 2, name: "Mary"}, {id: 3, name: "Jane"}];

  //select Mary
  this.currentUser = this.data[1];

  this.changeUser = function(id) {
    console.log(id);
  };
};

dashboard.view = function(ctrl) {
  return m("div", [
    m("label", "User:"),
    select2.view({data: ctrl.data, value: ctrl.currentUser.id, onchange: ctrl.changeUser})
  ]);
};

// views will be re-rendered when mc.Select.view's onchange is triggered.
$(document).ready(function () {
  m.module(document.body, dashboard);
});