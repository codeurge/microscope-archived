Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=message]').val()
    };

    Meteor.call('post', post, function(error, result) {
      if (error)
        return alert(error.reason);
      // show this result but route anyway
      if (result.postExists)
        alert('This link has already been posted!');
      Router.go('postPage', {_id: result._id});
    });
  }
});
