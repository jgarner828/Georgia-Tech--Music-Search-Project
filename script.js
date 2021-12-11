//NAVBAR//
jQuery(document).ready(function (e) {
  function t(t) {
      e(t).bind("click", function (t) {
          t.preventDefault();
          e(this).parent().fadeOut()
      })
  }
  e(".dropdown-toggle").click(function () {
      var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
      e(".button-dropdown .dropdown-menu").hide();
      e(".button-dropdown .dropdown-toggle").removeClass("active");
      if (t) {
          e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
      }
  });
  e(document).bind("click", function (t) {
      var n = e(t.target);
      if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide();
  });
  e(document).bind("click", function (t) {
      var n = e(t.target);
      if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("active");
  })
});

//CALENDAR//



/*  https://developer.spotify.com/documentation/web-api/#response-schema
*   https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/
*   https://developer.spotify.com/dashboard/applications
*
*   The below code  is trying to make a POST request using the information required by spotify to grant a token. Not currently working (Justin 12/4)
*/ 
var client_id = 'bf2b6b1e0d444912ba9ca99426b39f16';
var client_secret = '45870bee58304f8d975f82ff44d06d0f';

// to be base 64 encoded 'bf2b6b1e0d444912ba9ca99426b39f16:45870bee58304f8d975f82ff44d06d0f'


fetch('https://accounts.spotify.com/api/token', {
  headers: {
    'Authorization': 'Basic ' + 'YmYyYjZiMWUwZDQ0NDkxMmJhOWNhOTk0MjZiMzlmMTY6NDU4NzBiZWU1ODMwNGY4ZDk3NWY4MmZmNDRkMDZkMGY'
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
})
    .then(response => {
      return response.json();
  })
    .then(data => {
      console.log(data)
    })
  
    