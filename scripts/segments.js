// create segments

function CreateSegment(segmentMarkerA, segmentMarkerB, segmentName, segmentLength, segmentElevGainA, segmentElevGainB) {
  this.segmentMarkerA = segmentMarkerA;
  this.segmentMarkerB = segmentMarkerB;
  this.segmentName = segmentName;
  this.segmentLength = segmentLength;
  this.segmentElevGainA = segmentElevGainA;
  this.segmentElevGainB = segmentElevGainB;
}

var segmentPolylineOptions = {renderer: myRenderer, interactive: false, color: segmentColorInitial, opacity: segmentOpacityInitial, weight: segmentWeightInitial, smoothFactor: 0};

// create tech segments

var segmentTechPolylineOptions = {renderer: myRenderer, interactive: false, color: segmentColorInitial, opacity: segmentOpacityInitial, weight: segmentWeightInitial, dashArray: '1,10', smoothFactor: 0};

// create segments - maricopa trail

var segmentMTPolylineOptions = {renderer: myRenderer, interactive: false, color: segmentMTColor, opacity: segmentMTOpacity, weight: segmentMTWeightInitial, dashArray: '1,10', smoothFactor: 0};
