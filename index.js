var map, infoWindow;

$(window).on('load', function() {

  $("#map").height($(window).height() - $("#intro").height() - $("#menu").height());

  getListings(0, "", "");

  initMap();

  $(".two").click(function() {
    var text = $(this).text();
    $( ".twoButton" ).text(text);

    getListings(0, $( ".oneButton" ).text(), text);

  });

  $(".one").click(function() {
    var text = $(this).text();
    $( ".oneButton" ).text(text);

    getListings(0, text, $( ".twoButton" ).text());

  });

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

      function getListings(offset, type, permit) {

        var testBool = 0;

        var urlToQuery = "https://data.sfgov.org/resource/6a9r-agq8.json";
        if (type != "" && !type.includes("Any Food Truck Type")) {
          testBool = 1;
          urlToQuery = urlToQuery + "?facilitytype=" + type;
        }

        if (permit != "" && !permit.includes("Any Permit Status")) {
          if (testBool == 1) {
            urlToQuery = urlToQuery + "&status=" + permit;
          }
          else {
            urlToQuery = urlToQuery + "?status=" + permit;
          }
        }

        $.ajax({
          url: urlToQuery,
          type: "GET",
          data: {
            "$limit" : 10,
            "$offset" : offset,
            "$$app_token" : "Q4wkWXVTDAQjdY5fMw7iENcTf"
          }
        }).done(function(data) {
          console.log(data);
          console.log(urlToQuery);
          createTable(data);
        });
      }

      function createTable(dataTable) {

        $( "table" ).empty();

        var body = "<tbody>";
        var tr;
        var td;

        for (var i = 0; i < dataTable.length; i++) {
          tr = tr + "<tr>";

          td = "";

          td = td + "<td>" + dataTable[i].applicant + "</td>";
          td = td + "<td>" + dataTable[i].address + "</td>";
          td = td + "<td>" + dataTable[i].facilitytype + "</td>";
          td = td + "<td>" + dataTable[i].locationdescription + "</td>";
          td = td + "<td>" + dataTable[i].status + "</td>";

          tr = tr + td + "</tr>";
        }

        body = body + tr + "</tbody>";

        $( "table" ).append(body);
      }