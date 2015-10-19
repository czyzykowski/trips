import { View } from 'backbone';
import Syphon from 'syphon';
import $ from 'jquery';
import _ from 'underscore';


let EditUserView = View.extend({
  el: '#content',

  events: {
    'click #save': 'editUser',
  },

  initialize(options) {
    this.template = _.template($('#edit-user-tmpl').html());
    this.router = options.router;
    this.user = options.model;
  },

  render() {
    this.$el.html(this.template());
    Syphon.deserialize(this, this.user.attributes);
    return this;
  },

  editUser(event) {
    event.preventDefault();

    let userData = Syphon.serialize(this);

    this.user.save(userData, {wait: true});

    this.router.navigate('#users', {trigger: true});
  }

});

export default EditUserView;
