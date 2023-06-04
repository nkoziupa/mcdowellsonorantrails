let polylines = [];

polylines.push(segmentBR3UR1polyline, segmentBR3BR5polyline, segmentBR5UR2polyline, segmentUR1UR2polyline);

map.on('click', function(e) {
    let minDistance = Infinity;
    let closestPolyline;

    for(let i = 0; i < polylines.length; i++) {
        let closest = L.GeometryUtil.closest(map, polylines[i], e.latlng);

        if(closest.distance < minDistance) {
            minDistance = closest.distance;
            closestPolyline = polylines[i];
        }
    }

    if(minDistance < 5){
      console.log("You're on " + closestPolyline.segmentName + ".");
    }
    else {
      console.log("You're near " + closestPolyline.segmentName + ".");
    }
});