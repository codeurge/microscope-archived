Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('posts'), Meteor.subscribe('notifications')]
  }
});

Router.map(function() {

  this.route('postsList', {path: '/'});
  this.route('postPage', {
    path: '/posts/:_id',
    waitOn: function() {
      return Meteor.subscribe('comments', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postSubmit', {
    path: '/submit'
  });
});

var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    pause();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
