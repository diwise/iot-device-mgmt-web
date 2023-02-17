import { Style, Icon, Text, Stroke, Fill } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";

const addMarkers = (data) => {
    let features = data.filter((d) => hasLonLat(d)).map((d) => {
        let lonLat = tryParseLonLat(d);
        let type = getType(d);
        let feature = new Feature({
            geometry: new Point(fromLonLat(lonLat)),
        });

        feature.setId(getId(d));
        feature.setStyle(function (f, res) {
            let style = getMarker(d, type, getColor(d, type));
            let scale = 1 / Math.pow(res, 0.1);
            if (scale > 1) {
                scale = 1;
            }

            style.getImage()?.setScale(scale);
            style.getImage()?.setAnchor([1 - scale, scale]);
            style.getText()?.setOffsetY(-30 * scale);

            return style;
        });

        feature["type"] = type;
        feature["data"] = d;

        return feature;
    });

    return features;
}

const getMarker = (d, type, color) => {
    var style = new Style({
        image: getIcon(type, color, 36),
    });

    if (type.startsWith("feature.counter")) {
        style.setText(new Text({
            font: '12px sans-serif',
            fill: new Fill({ color: '#fff' }),
            stroke: new Stroke({
                color: '#C24D02', width: 4
            }),
            textAlign: "center",
            text: `${d.counter.count}`
        }));
    }

    return style;
};

const getColor = (d, type) => {
    if (type.startsWith("device.")) {
        if (d.status && d.status.statusCode) {
            if (d.active && d.lastObserved !== "0001-01-01T00:00:00Z") {
                return "#186A3B"; //green
            }
            switch (d.status.statusCode) {
                case 0: return "#797D7F"; // grey
                case 1: return "#D68910"; // orange
                case 2: return "#C0392B"; // red
                default: return "silver";
            }
        }
    }
    if (type.startsWith("feature.presence")) {
        if (d.presence.state) {
            return "#7B241C"; // dark red
        }
    }
    return "#626567"; // darker grey
};

const getId = (d) => {
    if (d.deviceID) return d.deviceID;
    if (d.id) return d.id;
    throw new Error("could not get ID for feature");
};

const getType = (d) => {
    if (d.sensorType && d.sensorType.name) return "device." + d.sensorType.name;
    if (d.type) return "feature." + d.type + "." + d.subtype;
    throw new Error("could not get type for feature");
}

const hasLonLat = (d) => {
    try {
        let lat = parseFloat(d.location.latitude);
        let lon = parseFloat(d.location.longitude);
        return lat !== 0 && lon !== 0;
    } catch (error) {
        return false;
    }
}

const tryParseLonLat = (d) => {
    try {
        let lat = parseFloat(d.location.latitude);
        let lon = parseFloat(d.location.longitude);
        return [lon, lat];
    } catch (error) {
        return [0.0, 0.0];
    }
}


const pin = (icon, color, size) => {
    let svg = `
    <svg viewBox="0 0 384 512" version="1.1" id="svg343" xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"    
    height="${size}px"
    width="${size}px">    
    <defs id="defs347" />
        ${marker(color)}
        ${icon}
    </svg>    
    `;
    return encodeURIComponent(svg);
}

const marker = (color) => `<path style="fill:${color};stroke:#000000;stroke-opacity:1;stroke-width:5;stroke-dasharray:none" d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z" id="path341" />`;

const microchip = `<path style="stroke-width:0.514507" d="m 152.09993,72.722256 c 0,-6.842935 -5.50521,-12.348162 -12.34816,-12.348162 -6.84294,0 -12.34817,5.505227 -12.34817,12.348162 v 20.580282 c -18.16208,0 -32.928436,14.766362 -32.928436,32.928442 H 73.894886 c -6.842942,0 -12.348167,5.50523 -12.348167,12.34818 0,6.84293 5.505225,12.34816 12.348167,12.34816 H 94.475164 V 179.7397 H 73.894886 c -6.842942,0 -12.348167,5.50523 -12.348167,12.34818 0,6.84293 5.505225,12.34816 12.348167,12.34816 h 20.580278 v 28.81239 H 73.894886 c -6.842942,0 -12.348167,5.50522 -12.348167,12.34817 0,6.84294 5.505225,12.34816 12.348167,12.34816 h 20.580278 c 0,18.1621 14.766356,32.92845 32.928436,32.92845 v 20.58028 c 0,6.84294 5.50523,12.34816 12.34817,12.34816 6.84295,0 12.34816,-5.50522 12.34816,-12.34816 v -20.58028 h 28.81239 v 20.58028 c 0,6.84294 5.50523,12.34816 12.34817,12.34816 6.84295,0 12.34817,-5.50522 12.34817,-12.34816 v -20.58028 h 28.81239 v 20.58028 c 0,6.84294 5.50522,12.34816 12.34816,12.34816 6.84295,0 12.34818,-5.50522 12.34818,-12.34816 v -20.58028 c 18.16208,0 32.92843,-14.76635 32.92843,-32.92845 h 20.58029 c 6.84293,0 12.34816,-5.50522 12.34816,-12.34816 0,-6.84295 -5.50523,-12.34817 -12.34816,-12.34817 h -20.58029 v -28.81239 h 20.58029 c 6.84293,0 12.34816,-5.50523 12.34816,-12.34816 0,-6.84295 -5.50523,-12.34818 -12.34816,-12.34818 h -20.58029 v -28.81238 h 20.58029 c 6.84293,0 12.34816,-5.50523 12.34816,-12.34816 0,-6.84295 -5.50523,-12.34818 -12.34816,-12.34818 h -20.58029 c 0,-18.16208 -14.76635,-32.928442 -32.92843,-32.928442 V 72.722256 c 0,-6.842935 -5.50523,-12.348162 -12.34818,-12.348162 -6.84294,0 -12.34816,5.505227 -12.34816,12.348162 V 93.302538 H 205.60866 V 72.722256 c 0,-6.842935 -5.50522,-12.348162 -12.34817,-12.348162 -6.84294,0 -12.34817,5.505227 -12.34817,12.348162 v 20.580282 h -28.81239 z m -8.23211,53.508724 h 98.78534 c 9.10678,0 16.46423,7.35745 16.46423,16.46423 v 98.78533 c 0,9.10677 -7.35745,16.46422 -16.46423,16.46422 h -98.78534 c -9.10677,0 -16.46422,-7.35745 -16.46422,-16.46422 v -98.78533 c 0,-9.10678 7.35745,-16.46423 16.46422,-16.46423 z m 98.78534,16.46423 h -98.78534 v 98.78533 h 98.78534 z" id="path365"  />`;
const gears = `<path d="m 188.14481,110.30591 c 2.99916,-2.66124 4.18193,-6.84318 2.61898,-10.560462 -0.97155,-2.238818 -2.0276,-4.435392 -3.21037,-6.547479 l -1.3095,-2.281059 c -1.26725,-2.112091 -2.66123,-4.181941 -4.1397,-6.167307 -2.40778,-3.210379 -6.63197,-4.266425 -10.43373,-2.99917 l -11.9122,3.92849 C 155.23841,81.961642 150.04267,78.92023 144.46675,76.85038 L 141.89,64.600249 c -0.8026,-3.928489 -3.844,-7.054385 -7.81474,-7.519045 -2.78796,-0.380177 -5.61816,-0.549144 -8.49061,-0.549144 h -0.29569 c -2.87244,0 -5.70264,0.168967 -8.49061,0.506902 -3.97073,0.46466 -7.01214,3.632798 -7.81474,7.519045 l -2.57675,12.292373 c -5.61816,2.112092 -10.771663,5.111262 -15.291538,8.828543 L 79.160884,81.792675 c -3.801765,-1.267255 -8.025948,-0.211209 -10.433732,2.99917 -1.478464,1.985366 -2.872445,4.055216 -4.181942,6.167307 l -1.267255,2.238817 c -1.182771,2.112087 -2.238817,4.308661 -3.210379,6.589721 -1.562947,3.67504 -0.380176,7.85698 2.618994,10.56046 l 9.377686,8.36388 c -0.46466,2.8302 -0.718111,5.78713 -0.718111,8.78631 0,2.99917 0.253451,5.95609 0.718111,8.82853 l -9.377686,8.36389 c -2.99917,2.66124 -4.181941,6.84317 -2.618994,10.56046 0.971562,2.23881 2.027608,4.43539 3.210379,6.58972 l 1.267255,2.19658 c 1.267255,2.15434 2.661236,4.18193 4.181942,6.1673 2.407784,3.21038 6.631967,4.26643 10.433732,2.99917 L 91.07308,169.2755 c 4.519876,3.71728 9.71562,6.7587 15.29154,8.82855 l 2.57675,12.29237 c 0.80259,3.92849 3.84401,7.05439 7.81474,7.51905 2.83021,0.33793 5.70265,0.5069 8.61733,0.5069 2.91469,0 5.78713,-0.16897 8.61734,-0.5069 3.97073,-0.46466 7.01214,-3.6328 7.81473,-7.51905 l 2.57676,-12.29237 c 5.61816,-2.11209 10.77166,-5.11127 15.29154,-8.82855 l 11.9122,3.92849 c 3.80176,1.26726 8.02594,0.21121 10.43373,-2.99917 1.47846,-1.98537 2.87244,-4.01296 4.1397,-6.1673 l 1.3095,-2.28106 c 1.18277,-2.11209 2.23882,-4.30867 3.21037,-6.54749 1.56295,-3.67504 0.38018,-7.85697 -2.61899,-10.56045 l -9.37769,-8.36389 c 0.46466,-2.87244 0.71811,-5.82936 0.71811,-8.82854 0,-2.99917 -0.25345,-5.9561 -0.71811,-8.82854 l 9.37769,-8.36388 z m -83.0052,17.19243 a 20.276078,20.276078 0 1 1 40.55215,0 20.276078,20.276078 0 1 1 -40.55215,0 z m 165.88367,137.07474 c 2.66123,2.99917 6.84318,4.18194 10.56045,2.61899 2.23882,-0.97156 4.4354,-2.02761 6.54749,-3.21038 l 2.28106,-1.3095 c 2.11209,-1.26725 4.18194,-2.66123 6.16731,-4.1397 3.21037,-2.40778 4.26642,-6.63196 2.99916,-10.43373 l -3.92848,-11.91219 c 3.71727,-4.51988 6.75868,-9.71563 8.82854,-15.29155 l 12.29237,-2.57675 c 3.92849,-0.80259 7.05439,-3.844 7.51905,-7.81474 0.33793,-2.8302 0.5069,-5.70265 0.5069,-8.61733 0,-2.91469 -0.16897,-5.78713 -0.5069,-8.61734 -0.46466,-3.97073 -3.6328,-7.01214 -7.51905,-7.81474 l -12.29237,-2.61898 c -2.1121,-5.61817 -5.11127,-10.77168 -8.82854,-15.29155 l 3.92848,-11.9122 c 1.26726,-3.80176 0.21121,-8.02594 -2.99916,-10.43373 -1.98537,-1.47846 -4.05522,-2.87244 -6.16731,-4.18194 l -2.23882,-1.26726 c -2.11209,-1.18277 -4.30867,-2.23881 -6.58973,-3.21038 -3.67503,-1.56295 -7.85697,-0.38017 -10.56045,2.619 l -8.36388,9.37769 c -2.87245,-0.46466 -5.82938,-0.71811 -8.82855,-0.71811 -2.99917,0 -5.9561,0.25345 -8.82854,0.71811 l -8.36388,-9.37769 c -2.66124,-2.99917 -6.84318,-4.18195 -10.56047,-2.619 -2.23881,0.97157 -4.43538,2.02761 -6.58972,3.21038 l -2.19657,1.26726 c -2.15434,1.26726 -4.18195,2.66124 -6.16731,4.18194 -3.21038,2.40779 -4.26642,6.63197 -2.99918,10.43373 l 3.9285,11.9122 c -3.71729,4.51987 -6.75869,9.71562 -8.82854,15.29155 l -12.29238,2.5345 c -3.92848,0.80259 -7.05438,3.84401 -7.51904,7.81474 -0.33794,2.83021 -0.5069,5.70265 -0.5069,8.61734 0,2.91468 0.16896,5.78712 0.5069,8.61733 0.46466,3.97073 3.6328,7.01215 7.51904,7.81474 l 12.29238,2.57674 c 2.11209,5.61817 5.11125,10.77168 8.82854,15.29156 l -3.9285,11.91219 c -1.26724,3.80177 -0.2112,8.02594 2.99918,10.43373 1.98536,1.47846 4.01297,2.87244 6.16731,4.1397 l 2.28106,1.3095 c 2.11209,1.18277 4.30867,2.23881 6.54747,3.21038 3.67505,1.56295 7.85699,0.38017 10.56047,-2.619 l 8.36389,-9.37769 c 2.87243,0.46466 5.82936,0.71811 8.82853,0.71811 2.99917,0 5.9561,-0.25345 8.82855,-0.71811 l 8.36388,9.37769 z m -17.19243,-83.0052 a 20.276078,20.276078 0 1 1 0,40.55215 20.276078,20.276078 0 1 1 0,-40.55215 z" id="path656" style="stroke-width:0.422419" />`;
const burst = `<path d="m 85.9916,61.174061 c -4.985312,-3.375472 -11.632395,-2.752308 -15.890683,1.45405 -4.258288,4.206357 -4.881452,10.905371 -1.45405,15.838753 l 58.161983,84.802246 -51.72262,16.82543 c -5.141105,1.66177 -8.620437,6.43936 -8.620437,11.84012 0,5.40075 3.479332,10.17834 8.620437,11.84012 l 53.54017,17.34473 -27.47114,52.24192 c -2.544588,4.82951 -1.661772,10.74957 2.233,14.59242 3.89478,3.84284 9.76291,4.77759 14.59243,2.233 l 52.24192,-27.47114 17.34474,53.54018 c 1.66176,5.14109 6.43935,8.62043 11.84011,8.62043 5.40075,0 10.17835,-3.47934 11.84012,-8.62043 l 17.34473,-53.54018 52.24192,27.47114 c 4.82951,2.54459 10.74957,1.66177 14.59242,-2.233 3.84284,-3.89477 4.7776,-9.76291 2.233,-14.59242 l -27.47114,-52.24192 53.54018,-17.34473 c 5.1411,-1.66178 8.62043,-6.43937 8.62043,-11.84012 0,-5.40076 -3.47933,-10.17835 -8.62043,-11.84012 l -55.30582,-17.91597 13.3461,-36.55896 c 1.66177,-4.56987 0.51931,-9.65904 -2.9081,-13.08645 -3.4274,-3.42739 -8.51657,-4.56986 -13.08644,-2.90809 l -36.55895,13.34609 -17.9679,-55.357737 c -1.66177,-5.141103 -6.43937,-8.620436 -11.84012,-8.620436 -5.40076,0 -10.17835,3.479333 -11.84011,8.620436 l -16.77351,51.722617 z" id="path610" style="stroke-width:0.519304" />`;
const lifering = `<path d="m 256.7922,271.42289 c -17.50924,12.53057 -38.99023,19.85872 -62.20537,19.85872 -23.21513,0 -44.69612,-7.32815 -62.20537,-19.85872 l 32.44525,-32.44525 c 8.83853,4.81085 19.01963,7.55191 29.81606,7.55191 10.79644,0 20.92159,-2.74106 29.81606,-7.55191 l 32.44525,32.44525 z m 50.73766,0.44752 c 18.90774,-24.278 30.20764,-54.82128 30.20764,-87.99375 0,-33.17247 -11.2999,-63.71576 -30.20764,-87.993756 5.0346,-6.99251 4.41926,-16.837965 -1.90197,-23.103254 -6.32123,-6.265289 -16.0548,-6.93657 -23.04731,-1.901963 -24.278,-18.907747 -54.82128,-30.207644 -87.99375,-30.207644 -33.17246,0 -63.71575,11.299897 -87.99374,30.207644 C 99.600578,65.84308 89.755123,66.458421 83.489834,72.77965 77.224545,79.100879 76.553264,88.890394 81.587871,95.882904 62.680124,120.1609 51.380227,150.70419 51.380227,183.87666 c 0,33.17247 11.299897,63.71575 30.207644,87.99375 -5.034607,6.99251 -4.419266,16.83796 1.901963,23.10325 6.321229,6.26529 16.110744,6.93657 23.103256,1.90196 24.27799,18.90775 54.82128,30.20765 87.99374,30.20765 33.17247,0 63.71575,-11.2999 87.99375,-30.20765 6.99251,5.03461 16.83796,4.41927 23.10325,-1.90196 6.26529,-6.32123 6.93657,-16.11074 1.90197,-23.10325 z m -25.45274,-25.78838 -32.44525,-32.44525 c 4.81085,-8.83853 7.55191,-19.01963 7.55191,-29.81606 0,-10.79644 -2.74106,-20.9216 -7.55191,-29.81607 l 32.44525,-32.44525 c 12.58652,17.62113 19.91467,39.10212 19.91467,62.31726 0,23.21513 -7.32815,44.69612 -19.85873,62.20537 z M 256.7922,96.330424 224.34695,128.77567 c -8.83853,-4.81084 -19.01962,-7.55191 -29.81606,-7.55191 -10.79643,0 -20.92159,2.74107 -29.81606,7.55191 L 132.26958,96.330424 c 17.62113,-12.530578 39.10212,-19.858729 62.31725,-19.858729 23.21514,0 44.69613,7.328151 62.20537,19.858729 z M 139.48585,213.69272 107.04061,246.13797 C 94.51003,228.57278 87.181879,207.09179 87.181879,183.87666 c 0,-23.21514 7.328151,-44.69613 19.858731,-62.20538 l 32.44524,32.44525 c -4.81084,8.83853 -7.55191,19.01963 -7.55191,29.81607 0,10.79643 2.74107,20.92159 7.55191,29.81606 z m 28.24974,-29.81606 a 26.851239,26.851239 0 1 1 53.70248,0 26.851239,26.851239 0 1 1 -53.70248,0 z" id="path518" style="stroke-width:0.559401" />`;
const door = `<path d="m 106.82002,87.051648 c 0,-16.171563 13.14799,-29.319546 29.31955,-29.319546 h 117.2782 c 16.17156,0 29.31955,13.147983 29.31955,29.319546 V 262.96894 h 29.31955 c 8.10868,0 14.65977,6.55108 14.65977,14.65977 0,8.10869 -6.55109,14.65978 -14.65977,14.65978 H 260.74766 128.80969 77.500479 c -8.10869,0 -14.65978,-6.55109 -14.65978,-14.65978 0,-8.10869 6.55109,-14.65977 14.65978,-14.65977 H 106.82002 Z M 238.75799,189.67007 a 14.659775,14.659775 0 1 0 0,-29.31955 14.659775,14.659775 0 1 0 0,29.31955 z" id="path431" style="stroke-width:0.458118" />`;
const chair = `<path d="M 204.4148,53.312455 V 173.87917 h 27.82309 V 59.514685 c 13.85358,7.999138 23.18591,23.012014 23.18591,40.169589 v 74.194896 h 27.82309 V 99.684274 c 0,-40.981096 -33.21381,-74.194909 -74.19491,-74.194909 h -37.09745 c -40.9811,0 -74.194913,33.213813 -74.194913,74.194909 V 173.87917 H 125.58271 V 99.684274 c 0,-17.157575 9.33233,-32.170451 23.18591,-40.169589 V 173.87917 h 27.82309 V 53.312455 Z M 88.485256,192.4279 c -7.013738,0 -13.447827,3.9416 -16.577925,10.25976 l -9.274363,18.54873 c -2.898239,5.73851 -2.55045,12.57835 0.811507,18.02704 3.361956,5.44869 9.332328,8.81065 15.766417,8.81065 v 55.64618 c 0,10.25976 8.288962,18.54872 18.548725,18.54872 10.259773,0 18.548733,-8.28896 18.548733,-18.54872 v -55.64618 h 148.38981 v 55.64618 c 0,10.25976 8.28896,18.54872 18.54873,18.54872 10.25976,0 18.54873,-8.28896 18.54873,-18.54872 v -55.64618 c 6.43408,0 12.40446,-3.304 15.76641,-8.81065 3.36196,-5.50665 3.70975,-12.28853 0.81151,-18.02704 l -9.27436,-18.54873 c -3.1301,-6.31816 -9.56419,-10.25976 -16.57793,-10.25976 z" id="path564" style="stroke-width:0.579648" />`;

const getIcon = (type, color, size) => {
    if (type.startsWith("device.")) {
        return new Icon({
            opacity: 1,
            src: 'data:image/svg+xml;utf8,' + pin(microchip, color, size),
        });
    }

    if (type.startsWith("feature.")) {
        let icon = gears;

        switch (type) {
            case "feature.presence.lifebuoy": icon = lifering; break;
            case "feature.presence.desk": icon = chair; break;
            case "feature.counter.overflow": icon = burst; break;
            case "feature.counter.door": icon = door; break;
            default:
        }

        return new Icon({
            opacity: 1,
            src: 'data:image/svg+xml;utf8,' + pin(icon, color, size),
        });
    }

    return new Icon({
        opacity: 1,
        src: 'data:image/svg+xml;utf8,' + pin("", color, size),
    });
}

export {
    addMarkers
};