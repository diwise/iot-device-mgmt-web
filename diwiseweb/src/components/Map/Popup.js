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
			<TypeIcons types={d.types} />
		</>
	);
};

const TypeIcons = ({ types }) => {
	return (
		<>
			<hr />
			<div>
				{types.includes('urn:oma:lwm2m:ext:3428') ? <IconSolid name="smog" color="grey" /> : <></>}
				{types.includes('urn:oma:lwm2m:ext:3327') ? <IconSolid name="bolt" color="grey" /> : <></>}
				{types.includes('urn:oma:lwm2m:ext:3200') ? <IconSolid name="toggle-on" color="grey" /> : <></>}
				{types.includes('urn:oma:lwm2m:ext:3304') ? <IconSolid name="droplet" color="grey" /> : <></>}
				{types.includes('urn:oma:lwm2m:ext:3301') ? <IconSolid name="lightbulb" color="grey" /> : <></>}
				{types.includes('urn:oma:lwm2m:ext:3434') ? <IconSolid name="people-group" color="grey" /> : <></>}
				{types.includes('urn:oma:lwm2m:ext:3302') ? <IconSolid name="hand" color="grey" /> : <></>}
				{types.includes('urn:oma:lwm2m:ext:3323') ? <IconSolid name="weight-hanging" color="grey" /> : <></>}
				{types.includes('urn:oma:lwm2m:ext:3303') ? <IconSolid name="temperature-half" color="grey" /> : <></>}
				{types.includes('urn:oma:lwm2m:ext:3330') ? <IconSolid name="route" color="grey" /> : <></>}
				{types.includes('urn:oma:lwm2m:ext:3424') ? <IconSolid name="gauge-simple-high" color="grey" /> : <></>}
			</div>
		</>
	);
}

const FeaturePopupContent = ({ feature }) => {
	const f = feature["data"];
	return (
		<>
			<div><strong>Id:</strong>{f.id}</div>
			<div><strong>Typ:</strong>{f.type}</div>
			<div><strong>Kategori:</strong>{f.subtype}</div>
			{f.type === "counter" ? <CounterPopupContent counter={f.counter} /> : <></>}
			{f.type === "level" ? <LevelPopupContent level={f.level} /> : <></>}
			{f.type === "presence" ? <PresencePopupContent presence={f.presence} /> : <></>}
		</>
	);
};

const PresencePopupContent = ({ presence }) => {
	return (
		<>
			<hr />
			<div><strong>Status:</strong>{presence.state ? "På" : "Av"}</div>
		</>
	);
};

const CounterPopupContent = ({ counter }) => {
	return (
		<>
			<hr />
			<div><strong>Antal:</strong>{counter.count}</div>
			<div><strong>Status:</strong>{counter.state ? "På" : "Av"}</div>
		</>
	);
};

const LevelPopupContent = ({ level }) => {
	return (
		<>
			<hr />
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