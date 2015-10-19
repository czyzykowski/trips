import { View } from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import { authenticate } from 'models/account';


var LoginView = View.extend({
  el: '#content',
  events: {
    'click #login': 'login',
  },

  initialize(options) {
    this.template = _.template($('#login-tmpl').html());

    this.data = {
      error: '',
      username: '',
      password: '',
    };
    this.router = options.router;
  },

  render() {
    this.$el.html(this.template(this.data));
    return this;
  },

  login(event) {
    event.preventDefault();

    this.data.username = this.$el.find('#username').val();
    this.data.password = this.$el.find('#password').val();

    authenticate(this.data.username, this.data.password)
      .then(() => {
        this.router.navigate('#trips', {trigger: true});
      }, (error) => {
        this.data.error = error;
        this.render();
      });
  }
});

export default LoginView;
