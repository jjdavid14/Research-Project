// Set an onclick listener to the back button
// which returns the user to the full page map
$("#back").on('click', function() {
	$("#sub").addClass("hide");
	$("#back").addClass("hide");
	$("#main").removeClass("hide");
    // Redirect back to home page
    window.location.href = "/";
	//restoreMap();
});

// Hides the full map and focuses on the details
// of a single marker by displaying its own data
// and isolating itself on the map
function focusOnMarker(marker, userInfo) {
	$("#main").addClass("hide");
	$("#sub").removeClass("hide");
	$("#back").removeClass("hide");

	populateInfo(userInfo);
	moveMap(marker);
}

// This function redraws the map to the container
// for the small-map
function moveMap(marker) {
	$(".full-map").removeAttr("id");
	$(".small-map").attr("id", "map");
	initMap();
	hideListings();

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.position);
    google.maps.event.clearInstanceListeners(marker);
}

// This functions restores the full page map
// and hides everything else
function restoreMap() {
	$(".small-map").removeAttr("id");
	$(".full-map").attr("id", "map");
	hideListings();
	initMap();
}

// This function dynamically changes the content
// of the info box on the focused view
function populateInfo(obj) {
	$(".info").html(objToHtml(obj));
}

// This function creates the html content for the info
function objToHtml(obj) {
    // Determine the color of our markers.
    let color = "text-body"
    let greenIcon = ('00ff00');
    let yellowIcon = ('FFFF24');
    let redIcon = ('FF0000');
   
    var data = JSON.parse(obj);

     switch (data.esi) {
        case 1:
            color = "text-danger";
            break;
        case 2:
            color = "text-warning";
            break;
        case 3:
            color = "text-success";
            break;
    }

    var content  = "<div class='container info-window py-4'>";
        content += "<div class='row'>";
        // First Col
        content += "<div class='col-12'>"
        content += "<h3 class='my-2 text-center " + color + "'><i class='fas fa-user-md'></i> ESI: " + data.esi + "</h3></div>";
        // End First Col
        content += "</div>";
        // End First Row

        // Second Row
        content += "<div class='row'>";
        // First Col
        content += "<div class='col-6'>"
        content += "<p class='my-2 text-center'><i class='fas fa-thermometer-empty'></i> TEMP: " + data.temp + " °F</p></div>";
        // End First Col
        // Second Col
        content += "<div class='col-6'>"
        content += "<p class='my-2 text-center'><i class='fas fa-heartbeat'></i> HR: " + data.hr + " BPM</p></div>";
        // End Second Col
        content += "</div>";
        // End Second Row

        // Third Row
        content += "<div class='row'>";
        // First Col
        content += "<div class='col-6'>"
        content += "<p class='my-2 text-center'><i class='fab fa-cloudsmith'></i> SPO2: " + data.spo2 + " %</p></div>";
        // End First Col
        // Second Col
        content += "<div class='col-6'>"
        content += "<p class='my-2 text-center'><i class='fas fa-stethoscope'></i> RESP: " + data.resp + " RPM</p></div>";
        // End Second Col
        content += "</div>";
        // End Third Row

    return content;
}