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
			<div><strong>Senast:</strong>{d.lastObserved}</div>
			<hr />
			<div>
				{d.types.includes('urn:oma:lwm2m:ext:3428') ? <IconSolid name="smog" color="black" /> : <></>}
				{d.types.includes('urn:oma:lwm2m:ext:3327') ? <IconSolid name="bolt" color="black" /> : <></>}
				{d.types.includes('urn:oma:lwm2m:ext:3200') ? <IconSolid name="toggle-on" color="black" /> : <></>}
				{d.types.includes('urn:oma:lwm2m:ext:3304') ? <IconSolid name="droplet" color="black" /> : <></>}
				{d.types.includes('urn:oma:lwm2m:ext:3301') ? <IconSolid name="lightbulb" color="black" /> : <></>}
				{d.types.includes('urn:oma:lwm2m:ext:3434') ? <IconSolid name="people-group" color="black" /> : <></>}
				{d.types.includes('urn:oma:lwm2m:ext:3302') ? <IconSolid name="hand" color="black" /> : <></>}
				{d.types.includes('urn:oma:lwm2m:ext:3323') ? <IconSolid name="weight-hanging" color="black" /> : <></>}
				{d.types.includes('urn:oma:lwm2m:ext:3303') ? <IconSolid name="temperature-half" color="black" /> : <></>}
				{d.types.includes('urn:oma:lwm2m:ext:3330') ? <IconSolid name="route" color="black" /> : <></>}
				{d.types.includes('urn:oma:lwm2m:ext:3424') ? <IconSolid name="gauge-simple-high" color="black" /> : <></>}
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