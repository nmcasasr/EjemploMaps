const API_KEY = "AIzaSyD6tx2xb6xJ9KLMwxlpfqFc7cAjREe8qEI";
var map;
var nYorkCoor = {lat: 40.7291, lng: -73.9965};
 var markers = [];
 var y = 0;
 //
   var directionsDisplay;
   var directionService;
function initMap() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    //directionService = new google.maps.DirectionsService();
       map = new google.maps.Map(document.getElementById('map'), {
         zoom: 10,
         center: nYorkCoor

       });
        directionsDisplay.setMap(map);
        map.data.loadGeoJson( 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
     map.data.setStyle(function(feature) {
     var boroCD = feature.getProperty('BoroCD');
    var boroCD2 = Math.floor(boroCD/100)*100;
    var boroCD3 = boroCD - Math.floor(boroCD/100)*100;
    if(boroCD3 >= 20)
    {
      boroCD2 = 0;
    }
     return {

       fillColor:   'hsl('+boroCD2+', 100%, 50%)',
       strokeWeight: 1
     };
 });


         map.data.addListener('mouseover', function(event) {
           map.data.revertStyle();
           map.data.overrideStyle(event.feature, {strokeWeight: 5});
         });

         map.data.addListener('click', function(event) {
        console.log(event);
          var boroCD = event.feature.getProperty('BoroCD');
          var boroCD2 = Math.floor(boroCD/100);
          var BoroFinal;
          if(boroCD2 == 1) //Manhattan
          {
            if(boroCD - boroCD2*100 < 10)
            {
              boroFinal = 'MN-0' + (boroCD - boroCD2*100);
            }
            else {
              boroFinal = 'MN-' + (boroCD - boroCD2*100);
           }

          }
          if(boroCD2 == 2) //Bronx
          {
            if(boroCD - boroCD2*100 < 10)
            {
               boroFinal = 'BX-0' + (boroCD - boroCD2*100);
            }
            else {
              boroFinal = 'BX-' + (boroCD - boroCD2*100);
            }


          }
          if(boroCD2 == 3)  //Brooklyn
          {

            if(boroCD - boroCD2*100 < 10)
            {
               boroFinal = 'BK-0' + (boroCD - boroCD2*100);
            }
            else {
           boroFinal = 'BK-' + (boroCD - boroCD2*100);
         }

          }
          if(boroCD2 == 4) //Queens
          {
            if(boroCD - boroCD2*100 < 10)
            {
              boroFinal = 'QN-0' + (boroCD - boroCD2*100);
            }
            else {
             boroFinal = 'QN-' + (boroCD - boroCD2*100);
           }

          }
          if(boroCD2 == 5)//staten island
          {
            if(boroCD - boroCD2*100 < 10)
            {
              boroFinal = 'SI-0' + (boroCD - boroCD2*100);
            }
            else {
               boroFinal = 'SI-' + (boroCD - boroCD2*100);
            }

          }
          var money =  $('.selectMoney option:selected');
          Housing_NY(money.val(),boroFinal,null);
         });

         map.data.addListener('click',function(event){
           y = 0;
           var boroCD = event.feature.getProperty('BoroCD');
           var boroCD2 = Math.floor(boroCD/100);

           if(boroCD2 == 1) //Manhattan
           {
            Crimes_NY2('MANHATTAN',boroCD);

           }
           if(boroCD2 == 2) //Bronx
           {

           Crimes_NY2('BRONX',boroCD);

           }
           if(boroCD2 == 3)  //Brooklyn
           {

           Crimes_NY2('BROOKLYN',boroCD) ;
           }
           if(boroCD2 == 4) //Queens
           {

           Crimes_NY2('QUEENS',boroCD);
           }
           if(boroCD2 == 5)//staten island
           {
          Crimes_NY2('STATEN ISLAND',boroCD);

           }


         });


         map.data.addListener('mouseout', function(event) {
           map.data.revertStyle();
         });

      }




function markLivPlace(lat,lng,titleMarker)
{
  var  myLating = {lat: parseFloat(lng), lng: parseFloat(lat)};

  var marker = new google.maps.Marker({
      position: myLating,
      map: map,
      title: titleMarker
    });
    google.maps.event.addListener(marker, 'click', function() {

        calcRoute(myLating);
    });
    markers.push(marker);
}
function calcRoute(end) {
   directionService = new google.maps.DirectionsService();
    var start = new google.maps.LatLng(40.7291, -73.9965);
    //var end = new google.maps.LatLng(38.334818, -181.884886);

    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map);

        $.getJSON('https://maps.googleapis.com/maps/api/directions/json?origin=40.7291,-73.9965&destination='+end.lat+','+end.lng+'&key=AIzaSyD6tx2xb6xJ9KLMwxlpfqFc7cAjREe8qEI', function(dato) {
                         $.each(dato.data, function(i, data)
                      {

                      });
                       //console.log(dato);
                console.log('duration ' +dato.routes["0"].legs["0"].duration.text+ ' distance '+dato.routes["0"].legs["0"].distance.text);
                    });

      } else {
        alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
      }
    });
  }
function markLivPlace2(myLating,titleMarker)
{


  var marker = new google.maps.Marker({
      position: myLating,
      map: map,
      title: titleMarker
    });
    google.maps.event.addListener(marker, 'click', function() {

        calcRoute(myLating);
    });
    markers.push(marker);
}


//dato.features.length



function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

function Neighborhood_Names()
{

  $.getJSON('https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD', function(dato) {
                   $.each(dato.data, function(i, data)
                 {
                   var coord = dato.data[i][9];
                   var coord2 = coord.split(' ');
                   var lng = coord2[1].split('(');  //lng[1]  longitud
                   var lat = coord2[2].split(')');  //lat[0] latitud
                  markLivPlace(lng[1],lat[0],lat);


                 });
               });
}

$('.selectMoney, .selectBorouhg').change(function()
{
    var money =  $('.selectMoney option:selected');
    var borouhg =  $('.selectBorouhg option:selected');
    Housing_NY(money.val(),null,borouhg.val());



});




function Crimes_NY2(boro,boroCD)
      {

          $.ajax({
    url: "https://data.cityofnewyork.us/resource/9s4h-37hy.json?cmplnt_fr_dt=2016-12-31T00:00:00.000&boro_nm=" + boro,
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "iu5CgTQIcvajmlutWjTQ2aphI"
    }
}).done(function(data) {
console.log(123);
for (var i = 2; i < data.length; i++) {
var coor =  new google.maps.LatLng(data[i].lat_lon.coordinates[1],data[i].lat_lon.coordinates[0]);
 geoJson2(coor,boroCD);

}


});
      }


      function geoJson3(searchPoint,boro)
      {

          $.getJSON('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson', function(dato) {
              //console.log(dato.features[0].geometry.coordinates["0"]);
              var boroCD = dato.feature.getProperty('BoroCD');
              var boroCD2 = Math.floor(boroCD/100);

              for(var i = 0; i < dato.features.length; i++)
              {

                if (dato.features[i].properties.BoroCD  == boro)
       {
                 var polyCrime;
                 var points=[];
                  for(var j=0; j < dato.features[i].geometry.coordinates["0"].length; j++)
                  {

                  points.push(new google.maps.LatLng(dato.features[i].geometry.coordinates["0"][j][1], dato.features[i].geometry.coordinates["0"][j][0]));


                 }
                 polyCrime = new google.maps.Polygon({paths: points,
                   strokeColor: '#FF0000',
           strokeOpacity: 0.8,
           strokeWeight: 2,
           fillColor: '#FF0000',
           fillOpacity: 0.35});
      polyCrime.setMap(map);
                  if(google.maps.geometry.poly.containsLocation(searchPoint, polyCrime))
                      {
                     y++;
                    console.log('numero de crimenes en esta zona'+y);
                      }
                      else
                      {

                      }


      }

              }

                          });
      }




      function geoJson2(searchPoint,boro)
      {

          $.getJSON('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson', function(dato) {
              //console.log(dato.features[0].geometry.coordinates["0"]);


              for(var i = 0; i < dato.features.length; i++)
              {

                if (dato.features[i].properties.BoroCD  == boro)
       {
                 var polyCrime;
                 var points=[];
                  for(var j=0; j < dato.features[i].geometry.coordinates["0"].length; j++)
                  {
                    var boroCD = dato.features[i].properties.BoroCD;
                    var boroCD2 = Math.floor(boroCD/100);
                  points.push(new google.maps.LatLng(dato.features[i].geometry.coordinates["0"][j][1], dato.features[i].geometry.coordinates["0"][j][0]));

                 }

                                   polyCrime = new google.maps.Polygon({paths: points,
                                     strokeColor: '#FF0000',
                             strokeOpacity: 0.8,
                             strokeWeight: 2,
                             fillColor: 'hsl('+boroCD2+', 100%, 50%)',
                             fillOpacity: 0.35});
                  polyCrime.setMap(map);
                  if(google.maps.geometry.poly.containsLocation(searchPoint, polyCrime))
                      {
                     y++;
console.log(y);
                      }
                      else
                      {

                      }


      }

              }

                          });
      }


      function Housing_NY(price,borouhgId,borouhgName)
      {
        clearMarkers();
        $.getJSON('https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD', function(dato) {
          $.each(dato.data, function(i, data)
        {
          if(dato.data[i][price] > 0 && borouhgId == null && dato.data[i][15] == borouhgName)
          {
            markLivPlace(dato.data[i][24],dato.data[i][23],dato.data[i][9]);
          }
          if(dato.data[i][price] > 0 && dato.data[i][19] == borouhgId)
          {

       markLivPlace(dato.data[i][24],dato.data[i][23],dato.data[i][9]);
          }

        });
                     });

      }
