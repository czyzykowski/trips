import { Collection } from 'backbone';
import User from 'models/user';

let Users = Collection.extend({
  model: User,
  url: '/users',
});


export default Users;
