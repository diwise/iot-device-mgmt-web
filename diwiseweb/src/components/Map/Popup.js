const Popup = ({ parent, popupContent }) => {
	return (
		<div id="popup" ref={parent} className="ol-popup">

			<div id="popup-content">{popupContent}</div>
		</div>
	);
};

const TypeIcons = ({ types }) => {
	let fire = require("../../assets/images/fire_black.png");
	let exclamation = require("../../assets/images/exclamation_black.png");
	let cloud = require("../../assets/images/cloud_black.png");

	return (
		<div>
			{types.includes('urn:oma:lwm2m:ext:3303') ? <img alt="temperature" src={fire} /> : <></>}
			{types.includes('urn:oma:lwm2m:ext:3200') ? <img alt="digital input" src={exclamation} /> : <></>}
			{types.includes('urn:oma:lwm2m:ext:3304') ? <img alt="humidity" src={cloud} /> : <></>}
		</div>);
};

const DevicePopupContent = ({ feature }) => {
	const d = feature["data"];

	return (
		<>
			<div><strong>Namn:</strong>{d.name}</div>
			<div><strong>Beskrivning:</strong>{d.description}</div>
			<div><strong>ID:</strong>{d.deviceID}</div>
			<div><strong>Typ:</strong>{d.sensorType.name}</div>
			<hr />
			<div><strong>Senast:</strong>{d.lastObserved}</div>
			<TypeIcons types={d.types} />
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
			<hr />
			{f.type === "counter" ? <CounterPopupContent counter={f.counter} /> : <></>}
			{f.type === "level" ? <LevelPopupContent level={f.level} /> : <></>}
		</>
	);
};

const CounterPopupContent = ({ counter }) => {
	return (
		<>
			<div><strong>Antal:</strong>{counter.count}</div>
			<div><strong>Status:</strong>{counter.state ? "På" : "Av"}</div>
		</>
	);
};

const LevelPopupContent = ({ level }) => {
	return (
		<>
			<div><strong>Aktuell:</strong>{level.current}</div>
			<div><strong>%:</strong>{level.percent ? level.percent : "-"}</div>
			<div><strong>Offset:</strong>{level.offset ? level.offset : "-"}</div>
		</>
	);
};

export {
	Popup,
	DevicePopupContent,
	FeaturePopupContent
}