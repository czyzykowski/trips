import { View } from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import TripsList from 'views/tripslist';


let MainView = View.extend({
  el: '#content',

  events: {
    'click #add-trip': 'addTrip',
  },

  initialize(options) {
    this.collection.fetch({reset: true});

    this.users = options.users;
    this.users.fetch({reset: true});
    this.listenTo(this.users, 'reset', this.render);

    this.tripsList = new TripsList({
      collection: this.collection,
      showUsersLink: false
    });
  },

  render() {
    this.tripsList.showUsersLink = this.users.length > 0;
    this.$el.html(this.tripsList.render().el);
    return this;
  },

  addTrip(event) {
    event.preventDefault();

    Backbone.history.navigate('#add-trip', {trigger: true});
  }
});

export default MainView;
