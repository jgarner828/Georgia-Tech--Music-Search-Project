




/*  https://developer.spotify.com/documentation/web-api/#response-schema
*   https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/
*   https://developer.spotify.com/dashboard/applications
*
*   The below code  is trying to make a POST request using the information required by spotify to grant a token. Not currently working (Justin 12/4)
*/ 
var client_id = 'bf2b6b1e0d444912ba9ca99426b39f16';
var client_secret = '45870bee58304f8d975f82ff44d06d0f';

// to be base 64 encoded 'bf2b6b1e0d444912ba9ca99426b39f16:45870bee58304f8d975f82ff44d06d0f'

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + 'YmYyYjZiMWUwZDQ0NDkxMmJhOWNhOTk0MjZiMzlmMTY6NDU4NzBiZWU1ODMwNGY4ZDk3NWY4MmZmNDRkMDZkMGY',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

$.post(authOptions);