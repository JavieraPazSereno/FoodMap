
var tipoDeLugar;
var map;
var infowindow;
var myLatlng;

function initMap()
{
    // mapa con las coordenadas actuales
    navigator.geolocation.getCurrentPosition(function(pos) {

    lat = pos.coords.latitude;
    lon = pos.coords.longitude;

    myLatlng = new google.maps.LatLng(lat, lon);
    console.log(lat);
    console.log(lon);

    var mapOptions = {
        center: myLatlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

   map = new google.maps.Map(document.getElementById("mapa"),  mapOptions);
   if(tipoDeLugar)
   {
        nearbySearch(map)
   }
 });
}
 function nearbySearch(map)
 {
   //  infowindow
   infowindow = new google.maps.InfoWindow();

   //  localización, radio y el tipo de lugares
   console.log(tipoDeLugar);
   var request = {
     location: myLatlng,
     radius: 800,
     types: [tipoDeLugar],
     key: 'AIzaSyA6WgRywAc99hocbaMPBOXHCYkkGIZ9Flc'
   };

   // servicio PlaceService y enviamos la petición.
   var service = new google.maps.places.PlacesService(map);

   service.nearbySearch(request, function(results, status) {
     if (status === google.maps.places.PlacesServiceStatus.OK) {
       for (var i = 0; i < results.length; i++) {
         crearMarcador(results[i]);
         console.log(results[i]);
       }
     }
   });
 }

 function crearMarcador(place){
   // marcador
   var marker = new google.maps.Marker({
     map: map,
     position: place.geometry.location
   });

 // evento click
   google.maps.event.addListener(marker, 'click', function() {
        var abiertoCerrado;
        if(place.opening_hours.open_now)
        {
            abiertoCerrado = 'Abierto'
        }
        else
            abiertoCerrado = 'Cerrado'

     infowindow.setContent(place.name + ' <br> ' + place.vicinity + ' <br> ' + abiertoCerrado);
     infowindow.open(map, this);
   });
   }

   function filtroDeLugares(xx){
        tipoDeLugar = xx;
        initMap();
   }

   //carrusel

   $('.carousel').carousel()