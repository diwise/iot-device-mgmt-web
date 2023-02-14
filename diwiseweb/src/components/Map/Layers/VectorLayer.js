import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import OLVectorLayer from "ol/layer/Vector";

const VectorLayer = ({ source }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;
	
		let vectorLayer = new OLVectorLayer({
			source			
		});
		
		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(0);

		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [map, source]);

	return null;
};

export default VectorLayer;