/*global m */
(function (m) {
  'use strict';

// MODULE ======================================================================
  var todo = {};

// MODELS ======================================================================

  todo.Todo = function(data) {
    this.description = m.prop(data.description);
    this.done = m.prop(false);
  };

  todo.TodoList = Array;

  var myTask = new todo.Todo({description: 'Write code'});

// CONTROLLERS =================================================================

  todo.controller = function () {
    this.list = new todo.TodoList();
    this.description = m.prop(''); // custom defined class

    this.add = function() {
      if (this.description()) {
        this.list.push(new todo.Todo({description: this.description()}));
        this.description("");
      }
    }.bind(this);
  };

// VIEW ========================================================================

  todo.view = function(ctrl) {
    return m("html", [
      m("body", [
        m("input", { value: ctrl.description(), onchange: m.withAttr("value", ctrl.description) }),
        m("button", {onclick: ctrl.add}, "Add"),
        m("table", [
          ctrl.list.map(function(task, index) {
            return m("tr", [
              m("td", [
                m("input[type=checkbox]", { checked: task.done(), onclick: m.withAttr("checked", task.done) })
              ]),
              m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description())
            ]);
          })
        ])
      ])
    ]);
  };

// STARTUP =====================================================================

  m.module(document, todo);

}(m));