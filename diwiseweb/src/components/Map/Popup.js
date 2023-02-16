import { IconSolid } from "./Icons";

const Popup = ({ parent, popupContent }) => {
	return (
		<div id="popup" ref={parent} className="ol-popup">
			<div id="popup-content">{popupContent}</div>
		</div>
	);
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
			<div>
				{d.types.includes('urn:oma:lwm2m:ext:3303') ? <IconSolid name="temperature-half" color="red" /> : <></>}
				{d.types.includes('urn:oma:lwm2m:ext:3200') ? <IconSolid name="lightbulb" color="black" /> : <></>}
				{d.types.includes('urn:oma:lwm2m:ext:3304') ? <IconSolid name="image" color="black" /> : <></>}
			</div>
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