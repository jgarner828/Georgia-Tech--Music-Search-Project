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
var dates = document.querySelectorAll("section time.hidden");
    var i = 1;
    Array.prototype.forEach.call(dates, function(caldate) {
        setTimeout(function(){ caldate.classList.remove("hidden") }, 250*i)
        i++;
})



var artistinput = document.getElementById("artistinput")


//bandsintown api 
function bandsintownApi() {
  var requestUrl = "https://rest.bandsintown.com/artists/" + artistinput.value + "/events?app_id=392f3980cc0e8271628b55280c3e881a"
  
  fetch(requestUrl)
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      console.log("bandsintown data: ", data)
  })
  
  
}

// 
function audiodbAPI() {

  var requestURL = "https://theaudiodb.com/api/v1/json/523532/search.php?s=" + artistinput.value
  
  fetch(requestURL)
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      console.log("The Audio DB data: ", data)
  })
  
}


var okbutton = document.getElementById("OK")
okbutton.addEventListener ('click', getApi) 

function getApi() {
  bandsintownApi();
  audiodbAPI();
}