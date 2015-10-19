import Backbone from 'backbone';
import $ from 'jquery';

let authToken = null;

export let authenticate = function(username, password) {
  return new Promise(function(resolve, reject) {
    $.post('/api-token-auth/', {
      username: username,
      password: password
    }).then((data) => {
      authToken = data.token;
      resolve();
    }).fail((response) => {
      reject(response.responseJSON.non_field_errors[0]);
    });
  });
};

export let beforeSend = function(xhr) {
  if (authToken) {
    xhr.setRequestHeader('Authorization', `Token ${authToken}`);
  }
};

export let logout = function() {
  authToken = null;
  Backbone.history.navigate('#login', {trigger: true});
};
