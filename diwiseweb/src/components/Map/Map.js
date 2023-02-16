import React, { useRef, useState, useEffect } from "react"
import MapContext from "./MapContext";
import * as ol from "ol";
import Overlay from 'ol/Overlay';
import "./Map.css";
import { Popup, DevicePopupContent, FeaturePopupContent } from "./Popup";

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

		event.map.getOverlays().clear();

		if (!feature) {
			return;
		}

		const popup = new Overlay({
			element: popRef.current,
			position: event.map.getCoordinateFromPixel(event.pixel),
		});

		event.map.addOverlay(popup);

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

const getPopupContent = (feature) => {
	switch (feature.type) {
		case "qalcosonic":
		case "elsys_codec":
		case "enviot":
		case "tem_lab_14ns":
		case "strips_lora_ms_h":
		case "milesight_am100":
		case "presence":
		case "cube02":
		case "niab-fls":
			return <DevicePopupContent feature={feature} />
		case "counter":
			return <FeaturePopupContent feature={feature} />
		default:
			console.log(feature.type);
			return <></>
	}
};

export default Map;