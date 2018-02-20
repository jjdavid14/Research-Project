// Set an onclick listener to the back button
// which returns the user to the full page map
$("#back").on('click', function() {
	$("#sub").addClass("hide");
	$("#back").addClass("hide");
	$("#main").removeClass("hide");
	restoreMap();
});

// Hides the full map and focuses on the details
// of a single marker by displaying its own data
// and isolating itself on the map
function focusOnMarker(marker) {
	$("#main").addClass("hide");
	$("#sub").removeClass("hide");
	$("#back").removeClass("hide");

	populateInfo(marker.title);
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
    var data = JSON.parse(obj);

    var content  = "<div class='container mt-3'>";
        // First Row
        content += "<div class='row'>";
        // First Col
        content += "<div class='col-6'>"
        content += "<p>ESI: " + data.esi + "</p></div>";
        // End First Col
        // Second Col
        content += "<div class='col-6'>"
        content += "<p>HR: " + data.hr + "</p></div>";
        // End Second Col
        content += "</div>";
        // End First Row

        // Second Row
        content += "<div class='row'>";
        // First Col
        content += "<div class='col-6'>"
        content += "<p>SPO2: " + data.spo2 + "</p></div>";
        // End First Col
        // Second Col
        content += "<div class='col-6'>"
        content += "<p>RESP: " + data.resp + "</p></div>";
        // End Second Col
        content += "</div>";
        // End Second Row

    return content;
}