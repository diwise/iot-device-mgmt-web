
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";

const addDeviceMarkers = (devices) => {
    let result = [];
    let features = devices.map((d) => {
        let lonLat = tryParseLonLat(d);
        let feature = new Feature({
            geometry: new Point(fromLonLat(lonLat)),
        });      
        feature.setId(d.deviceID);    

        if (d.active && d.lastObserved !== "0001-01-01T00:00:00Z") {
            feature.setStyle(getMarkerStyle("device_green.png"));
        } else if (d.status.statusCode === 1) {
            feature.setStyle(getMarkerStyle("device_orange.png"));
        } else if (d.status.statusCode === 2) {
            feature.setStyle(getMarkerStyle("device_red.png"));
        } else {
            feature.setStyle(getMarkerStyle("device_gray.png"));
        }
    
        feature["data"] = d;
        feature["markerType"] = "device";
        
        return feature;
    });

    result = [...features];
    return result;
}

const addFeatureMarkers = (diwiseFeatures) => {
    let features = diwiseFeatures.map((d) => {
        let lonLat = tryParseLonLat(d);
        let feature = new Feature({
            geometry: new Point(fromLonLat(lonLat)),
        });
        feature.setId(d.id);    
        feature.setStyle(getMarkerStyle("feature_blue.png"));
        feature["data"] = d;
        feature["markerType"] = "feature";
        return feature;
    });

    return features;
}

const tryParseLonLat = (d) => {
    try {
        let lat = parseFloat(d.location.latitude);
        let lon = parseFloat(d.location.longitude);
        return [lon, lat];
    } catch (error) {
        return [0.0,0.0];
    }
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