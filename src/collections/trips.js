import { Collection } from 'backbone';
import Trip from 'models/trip';

let Trips = Collection.extend({
  model: Trip,
  url: '/trips',
});


export default Trips;

