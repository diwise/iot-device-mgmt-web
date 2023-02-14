import React, { useState, useEffect } from "react";

import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";

import Map from "../components/Map";
import { Controls, FullScreenControl } from "../components/Map/Controls";
import { Layers, TileLayer, VectorLayer } from "../components/Map/Layers";
import { osm, vector } from "../components/Map/Source";

import UserService from "../services/UserService";
import "../components/Map/Map.css";

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
  let marker = require("../assets/images/" + filename);
  var iconStyle = new Style({
    image: new Icon({
      opacity: 1,
      src: marker,
      scale: 0.5
    }),
  });
  return iconStyle;
}

const MapView = ({ devices }) => {
  const [features, setFeatures] = useState([]);

  const [showDeviceLayer, setShowDeviceLayer] = useState(false);
  const [showFeaturesLayer, setShowFeaturesLayer] = useState(false);
  
  const [deviceSource, setDeviceSource] = useState();
  const [featuresSource, setFeaturesSource] = useState();

  useEffect(() => {
    fetch(`/api/features`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${UserService.getToken()}`
      },
    }).then(res => res.json())
      .then(json => {
        setFeatures(json);
      })
  }, []);

  useEffect(() => {
    setFeaturesSource(vector({ features: addFeatureMarkers(features) }))
  }, [features]);

  useEffect(() => { 
    setDeviceSource(vector({ features: addDeviceMarkers(devices) }));
  }, [devices]);

  return (
    <div>
      <Map center={fromLonLat([17.519440,62.416863])} zoom={9} >
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {showDeviceLayer && <VectorLayer source={deviceSource} />}
          {showFeaturesLayer && <VectorLayer source={featuresSource} />}                  
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
      
      <div>
        <input
          type="checkbox"
          checked={showDeviceLayer}
          onChange={(event) => setShowDeviceLayer(event.target.checked)}
        />{" "}
        Visa sensorer
      </div>

      <div>
        <input
          type="checkbox"
          checked={showFeaturesLayer}
          onChange={(event) => setShowFeaturesLayer(event.target.checked)}
        />{" "}
        Visa features        
      </div>          

    </div>
  );
};

export default MapView;