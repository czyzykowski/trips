import { View } from 'backbone';
import Syphon from 'syphon';
import $ from 'jquery';
import _ from 'underscore';


let AddUserView = View.extend({
  el: '#content',
  events: {
    'click #save': 'addUser',
  },

  initialize(options) {
    this.template = _.template($('#add-user-tmpl').html());
    this.router = options.router;
    this.collection = options.collection;
  },

  render() {
    this.$el.html(this.template());
    return this;
  },

  addUser(event) {
    event.preventDefault();

    let userData = Syphon.serialize(this);
    this.collection.create(userData);
    this.router.navigate('#users', {trigger: true});
  }

});

export default AddUserView;
