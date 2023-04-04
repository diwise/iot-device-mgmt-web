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
            text: `${d.counter.count}`,
            offsetY: -28
        }));
    }

    return style;
};

const getColor = (d, type) => {
    if (type.startsWith("device.")) {
        switch (d.deviceState.state) {
            case -1: return "#bfbfbf"; // grey
            case 1: return "#00cc00"; //green
            case 2: return "#D68910"; // orange
            case 3: return "#C0392B"; // red
            default: return "#00cc00"; //green
        }
    }
    if (type.startsWith("feature.presence")) {
        if (d.presence.state) {
            return "#e62e00"; // dark red
        }
    }
    return "#808080"; // darker grey
};

const getId = (d) => {
    if (d.deviceID) return d.deviceID;
    if (d.id) return d.id;
    throw new Error("could not get ID for feature");
};

const getType = (d) => {
    if (d.deviceProfile && d.deviceProfile.name) return "device." + d.deviceProfile.name;
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
    <svg enable-background="new 0 0 66 66" version="1.1" viewBox="0 0 215 262" xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    height="${size}px"
    width="${size}px">
    <path d="m107.51 0c-59.266 0-107.51 48.248-107.51 107.55 0 42.842 25.107 81.178 64.14 98.38l36.739 52.712c1.5154 2.1708 4.0138 3.4814 6.6351 3.4814h0.0409c2.6213 0 5.1197-1.3106 6.6351-3.4814l36.698-52.712c39.033-17.202 64.14-55.539 64.14-98.38 5e-5 -59.307-48.207-107.55-107.51-107.55zm0 166.12c-32.357 0-58.569-26.254-58.569-58.569 0-32.357 26.213-58.569 58.569-58.569 32.357 0 58.569 26.213 58.569 58.569 0 32.316-26.213 58.569-58.569 58.569z" stroke-width="4.0958"/>
    <circle cx="108.13" cy="106.5" r="75.564" fill="${color}" stroke="${color}" stroke-linejoin="round" stroke-width="42.346"/>
    <g transform="scale(0.3 0.3) translate(110 100)" >
        ${icon}
    </g>
    </svg>    
    `;
    return encodeURIComponent(svg);
};


const microchip = `<path d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z"/>`;
const gears = `<path d="M481.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-30.9 28.1c-7.7 7.1-11.4 17.5-10.9 27.9c.1 2.9 .2 5.8 .2 8.8s-.1 5.9-.2 8.8c-.5 10.5 3.1 20.9 10.9 27.9l30.9 28.1c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-39.7-12.6c-10-3.2-20.8-1.1-29.7 4.6c-4.9 3.1-9.9 6.1-15.1 8.7c-9.3 4.8-16.5 13.2-18.8 23.4l-8.9 40.7c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-8.9-40.7c-2.2-10.2-9.5-18.6-18.8-23.4c-5.2-2.7-10.2-5.6-15.1-8.7c-8.8-5.7-19.7-7.8-29.7-4.6L69.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l30.9-28.1c7.7-7.1 11.4-17.5 10.9-27.9c-.1-2.9-.2-5.8-.2-8.8s.1-5.9 .2-8.8c.5-10.5-3.1-20.9-10.9-27.9L8.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l39.7 12.6c10 3.2 20.8 1.1 29.7-4.6c4.9-3.1 9.9-6.1 15.1-8.7c9.3-4.8 16.5-13.2 18.8-23.4l8.9-40.7c2-9.1 9-16.3 18.2-17.8C213.3 1.2 227.5 0 242 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l8.9 40.7c2.2 10.2 9.4 18.6 18.8 23.4c5.2 2.7 10.2 5.6 15.1 8.7c8.8 5.7 19.7 7.7 29.7 4.6l39.7-12.6c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM242 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>`;
const chair = `<path d="M248 48V256h48V58.7c23.9 13.8 40 39.7 40 69.3V256h48V128C384 57.3 326.7 0 256 0H192C121.3 0 64 57.3 64 128V256h48V128c0-29.6 16.1-55.5 40-69.3V256h48V48h48zM48 288c-12.1 0-23.2 6.8-28.6 17.7l-16 32c-5 9.9-4.4 21.7 1.4 31.1S20.9 384 32 384l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32V384H352v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384c11.1 0 21.4-5.7 27.2-15.2s6.4-21.2 1.4-31.1l-16-32C423.2 294.8 412.1 288 400 288H48z"/>`;
const burst = `<path d="M37.6 4.2C28-2.3 15.2-1.1 7 7s-9.4 21-2.8 30.5l112 163.3L16.6 233.2C6.7 236.4 0 245.6 0 256s6.7 19.6 16.6 22.8l103.1 33.4L66.8 412.8c-4.9 9.3-3.2 20.7 4.3 28.1s18.8 9.2 28.1 4.3l100.6-52.9 33.4 103.1c3.2 9.9 12.4 16.6 22.8 16.6s19.6-6.7 22.8-16.6l33.4-103.1 100.6 52.9c9.3 4.9 20.7 3.2 28.1-4.3s9.2-18.8 4.3-28.1L392.3 312.2l103.1-33.4c9.9-3.2 16.6-12.4 16.6-22.8s-6.7-19.6-16.6-22.8L388.9 198.7l25.7-70.4c3.2-8.8 1-18.6-5.6-25.2s-16.4-8.8-25.2-5.6l-70.4 25.7L278.8 16.6C275.6 6.7 266.4 0 256 0s-19.6 6.7-22.8 16.6l-32.3 99.6L37.6 4.2z"/>`;
const lifering = `<path d="M367.2 412.5C335.9 434.9 297.5 448 256 448s-79.9-13.1-111.2-35.5l58-58c15.8 8.6 34 13.5 53.3 13.5s37.4-4.9 53.3-13.5l58 58zm90.7 .8c33.8-43.4 54-98 54-157.3s-20.2-113.9-54-157.3c9-12.5 7.9-30.1-3.4-41.3S425.8 45 413.3 54C369.9 20.2 315.3 0 256 0S142.1 20.2 98.7 54c-12.5-9-30.1-7.9-41.3 3.4S45 86.2 54 98.7C20.2 142.1 0 196.7 0 256s20.2 113.9 54 157.3c-9 12.5-7.9 30.1 3.4 41.3S86.2 467 98.7 458c43.4 33.8 98 54 157.3 54s113.9-20.2 157.3-54c12.5 9 30.1 7.9 41.3-3.4s12.4-28.8 3.4-41.3zm-45.5-46.1l-58-58c8.6-15.8 13.5-34 13.5-53.3s-4.9-37.4-13.5-53.3l58-58C434.9 176.1 448 214.5 448 256s-13.1 79.9-35.5 111.2zM367.2 99.5l-58 58c-15.8-8.6-34-13.5-53.3-13.5s-37.4 4.9-53.3 13.5l-58-58C176.1 77.1 214.5 64 256 64s79.9 13.1 111.2 35.5zM157.5 309.3l-58 58C77.1 335.9 64 297.5 64 256s13.1-79.9 35.5-111.2l58 58c-8.6 15.8-13.5 34-13.5 53.3s4.9 37.4 13.5 53.3zM208 256a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"/>`;
const door = `<path d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z"/>`;

const getIcon = (type, color, size) => {
    const newIcon = (icon, color, size) => {
        return new Icon({
            opacity: 1,
            src: 'data:image/svg+xml;utf8,' + pin(icon, color, size),
            anchor: [0.5, 1]
        });
    };

    if (type.startsWith("device.")) {
        return newIcon(microchip, color, size);
    }

    if (type.startsWith("feature.")) {
        switch (type) {
            case "feature.presence.lifebuoy": return newIcon(lifering, color, size);
            case "feature.presence.desk": return newIcon(chair, color, size);
            case "feature.counter.overflow": return newIcon(burst, color, size);
            case "feature.counter.door": return newIcon(door, color, size);
            default: return newIcon(gears, color, size);
        }
    }

    return newIcon("", color, size);
}

export {
    addMarkers
};