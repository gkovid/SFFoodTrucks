var map, infoWindow;

$(window).on('load', function() {

$("#map").height($(window).height() - $("#intro").height());

getListings(0);

initMap();

});

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

      function getListings(offset) {

        $.ajax({
          url: "https://data.sfgov.org/resource/6a9r-agq8.json",
          type: "GET",
          data: {
            "$limit" : 10,
            "$offset" : offset,
            "$$app_token" : "Q4wkWXVTDAQjdY5fMw7iENcTf"
          }
        }).done(function(data) {
          alert(data[0].applicant);
          createTable(data);
          console.log(data);
        });
      }

      function createTable(dataTable) {

      }