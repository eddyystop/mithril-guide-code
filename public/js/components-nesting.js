//root module
var dashboard = {};

dashboard.controller = function() {
  this.userProfile = new userProfile.controller();
  this.projectList = new projectList.controller();
};

dashboard.view = function(ctrl) {
  return m("#example", [
    m(".profile", [
      userProfile.view(ctrl.userProfile)
    ]),
    m(".projects", [
      projectList.view(ctrl.projectList)
    ])
  ]);
};

//components

//user profile component
var userProfile = {};

userProfile.controller = function() {
  this.name = m.prop("John Doe");
};

userProfile.view = function(ctrl) {
  return [
    m("h1", "Profile"),
      "Name: " + ctrl.name()
  ];
};

//project list component
var projectList = {};

projectList.controller = function() {
  this.list = m.prop(['project 1', 'project 2', 'project 3']);
};

projectList.view = function(ctrl) {
  return m('ul',
    ctrl.list().map(function (item) {
        return m('li', item);
      }
    ));
};

//initialize
m.module(document.getElementById('insertion'), dashboard);