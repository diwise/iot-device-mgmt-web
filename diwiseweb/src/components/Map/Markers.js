
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";

const addDeviceMarkers = (devices) => {
    let result = [];
    let features = devices.map((d) => {
      let lat = parseFloat(d.location.latitude);
      let lon = parseFloat(d.location.longitude);
      let feature = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
      });
      feature.setId(d.deviceID);    
      feature.setStyle(getMarkerStyle());
      feature["data"] = d;
      feature["markerType"] = "device";
      return feature;
    });
    result = [...features];
    return result;
  }
  
  const addFeatureMarkers = (diwiseFeatures) => {
    let features = diwiseFeatures.map((d) => {
      let lat = parseFloat(d.location.latitude);
      let lon = parseFloat(d.location.longitude);
      let feature = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
      });
      feature.setId(d.id);    
      feature.setStyle(getMarkerStyle("feature_blue.png"));
      feature["data"] = d;
      feature["markerType"] = "feature";
      return feature;
    });
    
    return features;
  }
  
  const getMarkerStyle = (filename = "device_orange.png") => {
    let marker = require("../../assets/images/" + filename);
    var iconStyle = new Style({
      image: new Icon({
        opacity: 1,
        src: marker,
        scale: 0.5
      }),
    });
    return iconStyle;
  }

export { 
    addDeviceMarkers,
    addFeatureMarkers,
    getMarkerStyle,
};