import React, { useState, useEffect } from "react";

import { fromLonLat } from "ol/proj";

import Map from "../components/Map";
import { Controls, FullScreenControl } from "../components/Map/Controls";
import { Layers, TileLayer, VectorLayer } from "../components/Map/Layers";
import { osm, vector } from "../components/Map/Source";

import "../components/Map/Map.css";
import { addMarkers } from "../components/Map/Markers";

const MapView = ({ devices, functions }) => {
  const [showDeviceLayer, setShowDeviceLayer] = useState(false);
  const [showFunctionsLayer, setShowFunctionsLayer] = useState(false);

  const [deviceSource, setDeviceSource] = useState(vector({ features: addMarkers(devices) }));
  const [functionsSource, setFunctionsSource] = useState();

  useEffect(() => {
    setFunctionsSource(vector({ features: addMarkers(functions) }))
  }, [functions]);

  useEffect(() => {
    setDeviceSource(vector({ features: addMarkers(devices) }));
  }, [devices]);

  return (
    <div>
      <Map center={fromLonLat([17.519440, 62.416863])} zoom={9} >
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {showDeviceLayer && <VectorLayer source={deviceSource} />}
          {showFunctionsLayer && <VectorLayer source={functionsSource} />}
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
            checked={showFunctionsLayer}
            onChange={(event) => setShowFunctionsLayer(event.target.checked)}
          />
          Visa funktioner
        </div>
      </div>
    </div>
  );
};

export default MapView;