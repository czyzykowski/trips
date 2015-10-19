import { View } from 'backbone';
import Syphon from 'syphon';
import $ from 'jquery';
import _ from 'underscore';


let AddTripView = View.extend({
  el: '#content',
  events: {
    'click #save': 'addTrip',
  },

  initialize(options) {
    this.template = _.template($('#add-trip-tmpl').html());
    this.router = options.router;
    this.collection = options.collection;
  },

  render() {
    this.$el.html(this.template());
    return this;
  },

  addTrip(event) {
    event.preventDefault();

    let tripData = Syphon.serialize(this);
    this.collection.create(tripData);
    this.router.navigate('#trips', {trigger: true});
  }

});

export default AddTripView;
