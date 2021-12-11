//NAVBAR//
var artistinput = document.getElementById("artistinput")

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

//FAVORITES//
document.addEventListener('DOMContentLoaded', (event) => {
    var dragSrcEl = null;
    function handleDragStart(e) {
      this.style.opacity = '0.4';
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }
    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      return false;
    }
    function handleDragEnter(e) {
      this.classList.add('over');
    }
    function handleDragLeave(e) {
      this.classList.remove('over');
    }
    function handleDrop(e) {
      if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
      }
      if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }
      return false;
    }
    function handleDragEnd(e) {
      this.style.opacity = '1';
      items.forEach(function (item) {
        item.classList.remove('over');
      });
    }
    let items = document.querySelectorAll('.dragcontainer .box');
    items.forEach(function(item) {
      item.addEventListener('dragstart', handleDragStart, false);
      item.addEventListener('dragenter', handleDragEnter, false);
      item.addEventListener('dragover', handleDragOver, false);
      item.addEventListener('dragleave', handleDragLeave, false);
      item.addEventListener('drop', handleDrop, false);
      item.addEventListener('dragend', handleDragEnd, false);
    });
  });




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

  var requestURL = "https://theaudiodb.com/api/v1/json/523532/search.php?s=" + artistinput.value;
  
  fetch(requestURL)
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      console.log("The Audio DB data: ", data)
  })

  //pulling top 10 singles...

  var requestURL = "https://theaudiodb.com/api/v1/json/523532/trending.php?country=us&type=itunes&format=singles";
  fetch(requestURL)
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      console.log("The top 10 singles are: ", data)
  })

  
}


var okbutton = document.getElementById("OK")
okbutton.addEventListener ('click', getApi) 

function getApi() {
  bandsintownApi();
  audiodbAPI();
}