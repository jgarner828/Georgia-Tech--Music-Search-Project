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

// 
// 
// 
// 
// 
// 
// 
// 
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




// 
// 
// 
// 
//CAROUSEL//
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, options);
  });

// // Or with jQuery

//   $(document).ready(function(){
//     $('.carousel').carousel();
//   });



// 
// 
function displayCarousel(videoArray) {

  for( let i  = 0; i < videoArray.length; i++) {
    let videoCode = videoArray[i].split('=');
    if (videoCode[1]) {
     let URL = "https://www.youtube.com/embed/" + videoCode[1];
     $('.carousel').append('<iframe class="carousel-item" width="420" height="315"src="' + URL + '"></iframe>');
    }
  }

}

// 
// 
// 
// 
//bandsintown api pulls the events from an artist input and sends that data to the upcomingEvents function
function bandsintownApi() {
  var requestUrl = "https://rest.bandsintown.com/artists/" + artistinput.value + "/events?app_id=392f3980cc0e8271628b55280c3e881a"
  
  fetch(requestUrl)
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      upcomingEvents(data);
  })
}


// 
// 
// This function appends the Upcoming Events list with data from the Bands in Town API
function upcomingEvents(data) {
  $('.upcomingEvents').empty();
  for( let i = 0; i < data.length; i++) {
    $('.upcomingEvents').append('<li> City:    ' + data[i].venue.city + '  Date:     ' + data[i].datetime + '</li>');
  }
}



// 
// 
// This function calls the audio DB API to get the top ten tracks and send them to be displayed in Fresh Finds section
function artistTopTen() {

  $('.songs').empty();
  let artist = artistinput.value;
  let URL = "https://theaudiodb.com/api/v1/json/523532/track-top10.php?s=" + artist;
  
  fetch(URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for(let i = 0; i < data.track.length; i++){
      $('.songs').append('<li><a href=\"' + data.track[i].strMusicVid + '\">' + data.track[i].strTrack + '</a></li>');
    }
  })
}

// 
// 
// 
// 
//  This function calls the audio DB API to fetch the top 50 singles and sends them to displayCarousel function to be displayed.
function topSongs() {
  let URL = "https://theaudiodb.com/api/v1/json/523532/mostloved.php?format=track";
  let URLarray = [];

  
  fetch(URL)
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
    for(let i  = 0; i < data.loved.length; i++){
      let tempURL = data.loved[i].strMusicVid;
      if(tempURL) {
        URLarray.push(tempURL);
      } 
      
    }
      displayCarousel(URLarray);
  })
  
}




// 
// 
// 
// this function fills the local storage.
function yourFaves(input) {

  let favArtists = localStorage.getItem('favArtists');
  let artistArray = [];


  if (favArtists === null) {
    artistArray[0] = input;
    let artistLocal = JSON.stringify(artistArray);
    localStorage.setItem('favArtists', artistLocal)
    return;

  } else {
    artistArray = JSON.parse(favArtists);
    
    if (artistArray.includes(input)) {
      return;
    }
    artistArray.push(input);
    let artistLocal = JSON.stringify(artistArray);
    localStorage.setItem('favArtists', artistLocal);
    return;
  }
}







//run topSingles function to create array of carousel items.
topSongs()


var okbutton = document.getElementById("OK")
okbutton.addEventListener('click', getApi) 

function getApi() {
  
  if($(".favorites:checkbox")) {
    yourFaves(artistinput.value);
  }

  bandsintownApi();
  artistTopTen();

  
}