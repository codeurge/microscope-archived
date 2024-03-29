Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=message]').val()
    };

    var errors = validatePost(post);
    if (errors.title || errors.url)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('post', post, function(error, result) {
      if (error)
        Errors.throw(error.reason);
      // show this result but route anyway
      if (result.postExists)
        Errors.throw('This link has already been posted!');
      Router.go('postPage', {_id: result._id});
    });
  }
});

Template.postSubmit.created = function() {
  Session.get('postSubmitErrors', {});
};

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function(field) {
    return Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});
