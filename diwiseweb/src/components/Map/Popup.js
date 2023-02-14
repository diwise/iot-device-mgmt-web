const Popup = ({ parent, popupContent }) => {
	return (
	  <div id="popup" ref={parent} className="ol-popup">
		<a href="#" id="popup-closer" className="ol-popup-closer"></a>
			<div id="popup-content">{ popupContent }</div>
	  </div>
	);
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
            {f.type === "counter" ? <CounterPopupContent counter={f.counter} /> : <></>}
            {f.type === "level" ? <LevelPopupContent level={f.level} /> : <></> } 
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

const LevelPopupContent = ({ level }) => {
	return (
		<>
			<div><strong>Aktuell:</strong>{level.current}</div>
            <div><strong>%:</strong>{level.percent}</div>
            <div><strong>Offset:</strong>{level.offset}</div>
		</>
	);	
};

export {
    Popup,
    DevicePopupContent,
    FeaturePopupContent
}