import { View } from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Trips from 'collections/trips';


let NextMonthView = View.extend({
  el: '#content',

  initialize(options) {
    this.router = options.router;

    this.template = _.template($('#next-month-tmpl').html());

    this.trips = new Trips();
    this.trips.url = '/trips/next-month';
    this.trips.fetch({reset: true});

    this.listenTo(this.trips, 'reset', this.render);
  },

  render() {
    this.$el.html(this.template({trips: this.trips}));
    return this;
  }
});

export default NextMonthView;
