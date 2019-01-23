/* map.js */
var display, service = new google.maps.DirectionsService(), map;
			
$(document).on("pageinit", "#map_page", function() {
 initialize();
 });

function initialize() {
    display = new google.maps.DirectionsRenderer();				
    var mapCenter = new google.maps.LatLng(43.469117,-79.70017);  //Sheridan College - Trafalgar

    var myOptions = {
        zoom:8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: mapCenter
    }

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
    var startFrom = new google.maps.Marker ({
                map : map,
                position: mapCenter
    });	
            
    var mapEnd = new google.maps.LatLng(43.5924,-79.6512);	//Niagara Falls
    var endAt = new google.maps.Marker ({
                map : map,
                position: mapEnd
    });	
            
    display.setMap(map);
    display.setPanel(document.getElementById("directions"));  
}		

$(document).on('click', '#submit', function(e) {
calculateRoute();
});

function calculateRoute() {
var selectedMode = $("#mode").val(),
    start = $("#from").val(),
    end = $("#to").val();						// From entry fields

if (start == '' || end == '') {
  // cannot calculate route - empty field
  $("#results").hide();
  return;
}
else {
  var request = { origin:start, 
                destination:end,
                travelMode: google.maps.DirectionsTravelMode[selectedMode]
                };

  service.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        display.setDirections(response); 
        $("#results").show();
    }
    else {
        $("#results").hide();
    }
  });

}
}