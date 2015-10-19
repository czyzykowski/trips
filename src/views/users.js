import { View } from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import TripsList from 'views/tripslist';


let UsersView = View.extend({
  el: '#content',

  initialize() {
    this.template = _.template($('#users-list-tmpl').html());

    this.collection.fetch({reset: true});
    this.listenTo(this.collection, 'all', this.render);
  },

  render() {
    this.$el.html(this.template({users: this.collection}));
    return this;
  }});

export default UsersView;
