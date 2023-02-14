import React, { useRef, useState, useEffect } from "react"
import MapContext from "./MapContext";
import * as ol from "ol";
import Overlay from 'ol/Overlay';
import "./Map.css";

const Map = ({ children, zoom, center }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);
	const popRef = useRef();
	const [popupContent, setPopupContent] = useState();

	useEffect(() => {
		let options = {
			view: new ol.View({ zoom, center }),
			layers: [],
			controls: [],
			overlays: []
		};

		let mapObject = new ol.Map(options);		
		mapObject.on('pointermove', onPointerMoveHandler);
		mapObject.on('singleclick', onSingleClickHandler);			
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);

		return () => mapObject.setTarget(undefined);
	}, []);

	useEffect(() => {
		if (!map) return;
		map.getView().setZoom(zoom);
	}, [zoom]);

	const onPointerMoveHandler = (event) => {
		const pixel = event.map.getEventPixel(event.originalEvent);
		const hit = event.map.hasFeatureAtPixel(pixel);
		event.map.getTarget().style.cursor = hit ? 'pointer' : '';
	};

	const onSingleClickHandler = (event) => {	
		const feature = event.map.forEachFeatureAtPixel(event.pixel, function (feature) {
			return feature;
		});			
		if (!feature) {
			event.map.getOverlays().clear();
			return;
		} 
		const clickedCoord = event.map.getCoordinateFromPixel(event.pixel);
				
		const popup = new Overlay({
			element: popRef.current,
			position: clickedCoord,
		});

		event.map.addOverlay(popup);	
		console.log(feature);		

		setPopupContent(getPopupContent(feature));
	}	

	return (	
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{children}				
			</div>			
			<Popup parent={popRef} popupContent={popupContent} />
		</MapContext.Provider>				
	)
}

const Popup = ({ parent, popupContent }) => {
	return (
	  <div id="popup" ref={parent} className="ol-popup">
		<a href="#" id="popup-closer" className="ol-popup-closer"></a>
			<div id="popup-content">{ popupContent }</div>
	  </div>
	);
};

const getPopupContent = (feature) => {
	if (feature.markerType === "device") {
		return <DevicePopupContent feature={feature} />
	}
	if (feature.markerType === "feature") {
		return <FeaturePopupContent feature={feature} />
	}

	return <></>;
};


const DevicePopupContent = ({ feature }) => {
	const d = feature["data"];
	return (
		<>
			<div><strong>devEUI:</strong>{d.devEUI}</div>
			<div><strong>deviceID:</strong>{d.deviceID}</div>
			<div><strong>Namn:</strong>{ d.name }</div>
			<div><strong>Beskrivning:</strong>{ d.description }</div>
			<div><strong>Senast:</strong>{ d.lastObserved }</div>
		</>
	);
};

const FeaturePopupContent = ({ feature }) => { 
	const f = feature["data"];
	return (
		<>
			<div><strong>Id:</strong>{f.id}</div>
			<div><strong>Type:</strong>{f.type}</div>
			<div><strong>SubType:</strong>{f.subtype}</div>
			{f.type === "counter" ? <CounterPopupContent counter={ f.counter } />:<></>}
		</>
	);
};

const CounterPopupContent = ({ counter }) => {
	return (
		<>
			<div><strong>Antal:</strong>{counter.count}</div>
			<div><strong>Status:</strong>{counter.state ? "På":"Av"}</div>
		</>
	);	
};

export default Map;