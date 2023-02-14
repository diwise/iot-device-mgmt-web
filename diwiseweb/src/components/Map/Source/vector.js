import { Vector as VectorSource } from 'ol/source';

const vector = ({ features }) => {

	return new VectorSource({
		features
	});

	
}

export default vector;