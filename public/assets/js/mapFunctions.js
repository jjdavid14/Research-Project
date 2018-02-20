var locations = [];
var users;

function loadUsers() {
    // GET the datas from users.js
    $.get("/api/map", function(data) {

        console.log(data);

        for (var i = 0; i < data.points.length; i++) {
            locations.push({
                location: {
                    lat: data.points[i].location[0],
                    lng: data.points[i].location[1]
                }
            });
        }

        users = data.points;
        initMap();

    });
}
var map;
var styes;
// Create a new blank array for all the listing markers.
var markers = [];

function initMap() {
    // Create a styles array to use with the map.
    styles = new google.maps.StyledMapType([{
            "featureType": "all",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [{
                    "visibility": "off"
                },
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "visibility": "off"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#4d6059"
            }]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#4d6059"
            }]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#4d6059"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "lightness": 21
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#4d6059"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#4d6059"
            }]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#7f8d89"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                    "color": "#7f8d89"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#7f8d89"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#7f8d89"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#7f8d89"
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#7f8d89"
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#7f8d89"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                    "color": "#2b3638"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#2b3638"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#24282b"
            }]
        },
        {
            "featureType": "water",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#24282b"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }
    ], {
        name: 'Styled Map'
    });
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: locations[0].location,
        zoom: 13,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'styled_map']
        }
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styles);
    //map.setMapTypeId('styled_map');

    var largeInfowindow = new google.maps.InfoWindow();
    // Style the markers for different levels.
    var greenIcon = makeMarkerIcon('00ff00');
    var yellowIcon = makeMarkerIcon('FFFF24');
    var redIcon = makeMarkerIcon('FF0000');

    var largeInfowindow = new google.maps.InfoWindow();
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var userInfo = JSON.stringify(users[i], null, 4);
        var defaultIcon;

        // Determine the color of our markers.
        switch (users[i].esi) {
            case 1:
                defaultIcon = (redIcon);
                break;
            case 2:
                defaultIcon = (yellowIcon);
                break;
            case 3:
                defaultIcon = (greenIcon);
                break;
        }

        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {
            focusOnMarker(this, userInfo);
        });
        // Two event listeners - one for mouseover, one for mouseout,
        // to show the info window back and forth.
        marker.addListener('mouseover', function() {
            populateInfoWindow(this, largeInfowindow, userInfo);
        });
        marker.addListener('mouseout', function() {
            largeInfowindow.close();
            largeInfowindow.marker = null;
        });
    }
    //document.getElementById('show-listings').addEventListener('click', showCustomMapStyle);
    //document.getElementById('hide-listings').addEventListener('click', hideCustomMapStyle);
    showListings();
}
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow, userInfo) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent(populateContent(userInfo));
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}
// This function will loop through the markers array and display them all.
function showListings() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}
// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}
// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}

// This function creates the html content for the content window
function populateContent(obj) {
    var data = JSON.parse(obj);

    var content  = "<div class='container info-window'>";
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