import { View } from 'backbone';
import Syphon from 'syphon';
import $ from 'jquery';
import _ from 'underscore';


let EditTripView = View.extend({
  el: '#content',
  events: {
    'click #save': 'editTrip',
  },

  initialize(options) {
    this.template = _.template($('#edit-trip-tmpl').html());
    this.router = options.router;
    this.trip = options.model;
  },

  render() {
    this.$el.html(this.template());
    Syphon.deserialize(this, this.trip.attributes);
    return this;
  },

  editTrip(event) {
    event.preventDefault();

    let tripData = Syphon.serialize(this);

    this.trip.save(tripData, {wait: true});

    this.router.navigate('#trips', {trigger: true});
  }

});

export default EditTripView;
