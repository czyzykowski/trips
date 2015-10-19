import { View } from 'backbone';
import $ from 'jquery';
import _ from 'underscore';


let TripsList = View.extend({
  initialize(options) {
    this.collection = options.collection;
    this.showUsersLink = options.showUsersLink;

    this.template = _.template($('#trips-list-tmpl').html());

    this.listenTo(this.collection, 'all', this.render);
  },

  render() {
    this.$el.html(this.template({
      trips: this.collection,
      showUsersLink: this.showUsersLink
    }));
    return this;
  }
});

export default TripsList;
