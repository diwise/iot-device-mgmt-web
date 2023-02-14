import React, { useState, useEffect } from "react";

import { fromLonLat } from "ol/proj";

import Map from "../components/Map";
import { Controls, FullScreenControl } from "../components/Map/Controls";
import { Layers, TileLayer, VectorLayer } from "../components/Map/Layers";
import { osm, vector } from "../components/Map/Source";

import UserService from "../services/UserService";
import "../components/Map/Map.css";
import { addDeviceMarkers, addFeatureMarkers } from "../components/Map/Markers";

const MapView = ({ devices }) => {
  const [features, setFeatures] = useState([]);

  const [showDeviceLayer, setShowDeviceLayer] = useState(false);
  const [showFeaturesLayer, setShowFeaturesLayer] = useState(false);
  
  const [deviceSource, setDeviceSource] = useState(vector({ features: addDeviceMarkers(devices) }));
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
      <div className="ol-selectLayers">
        <div>          
          <input
            type="checkbox"
            checked={showDeviceLayer}
            onChange={(event) => setShowDeviceLayer(event.target.checked)}
          />          
          Visa sensorer
        </div>

        <div>
          <input
            type="checkbox"
            checked={showFeaturesLayer}
            onChange={(event) => setShowFeaturesLayer(event.target.checked)}
          />          
          Visa features        
        </div>          
      </div>
    </div>
  );
};

export default MapView;