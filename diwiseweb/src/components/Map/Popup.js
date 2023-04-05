import { FunctionCard } from "../FunctionCard";
import DeviceCard from "../DeviceCard";

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
		<DeviceCard device={d} />
	);
};


const FunctionCardPopupContent = ({ feature }) => {
	const f = feature["data"];
	return (
		<FunctionCard func={f} />
	);
};
export {
	Popup,
	DevicePopupContent,
	FunctionCardPopupContent 
}