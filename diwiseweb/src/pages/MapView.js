import React, { useState, useEffect } from "react";

import { fromLonLat } from "ol/proj";

import Map from "../components/Map";
import { Controls, FullScreenControl } from "../components/Map/Controls";
import { Layers, TileLayer, VectorLayer } from "../components/Map/Layers";
import { osm, vector } from "../components/Map/Source";

import "../components/Map/Map.css";
import { addMarkers } from "../components/Map/Markers";

const MapView = ({ devices, features }) => {
  const [showDeviceLayer, setShowDeviceLayer] = useState(false);
  const [showFeaturesLayer, setShowFeaturesLayer] = useState(false);

  const [deviceSource, setDeviceSource] = useState(vector({ features: addMarkers(devices) }));
  const [featuresSource, setFeaturesSource] = useState();

  useEffect(() => {
    setFeaturesSource(vector({ features: addMarkers(features) }))
  }, [features]);

  useEffect(() => {
    setDeviceSource(vector({ features: addMarkers(devices) }));
  }, [devices]);

  return (
    <div>
      <Map center={fromLonLat([17.519440, 62.416863])} zoom={9} >
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