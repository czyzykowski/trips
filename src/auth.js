import axios from 'axios';

function extractError(response) {
  throw response.data.non_field_errors.join("\n");
}

function extractToken(response) {
  return response.data.token;
}

export default {
  login(username, password) {
    return axios.post('/api-token-auth/', {username, password})
      .then(extractToken)
      .catch(extractError);
  }
}
