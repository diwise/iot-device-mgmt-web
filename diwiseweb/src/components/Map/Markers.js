
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { IconSolid, UseSvg } from "./Icons";

const addDeviceMarkers = (devices) => {
    let features = devices.filter((d) => hasLonLat(d)).map((d) => {
        let lonLat = tryParseLonLat(d);
        let feature = new Feature({
            geometry: new Point(fromLonLat(lonLat)),
        });
        feature.setId(d.deviceID);

        if (d.active && d.lastObserved !== "0001-01-01T00:00:00Z") {
            feature.setStyle(getMarkerStyle("microchip", "green"));
        } else if (d.status.statusCode === 1) {
            feature.setStyle(getMarkerStyle("microchip", "orange"));
        } else if (d.status.statusCode === 2) {
            feature.setStyle(getMarkerStyle("microchip", "red"));
        } else {
            feature.setStyle(getMarkerStyle("question", "gray"));
        }

        feature["data"] = d;
        feature["markerType"] = "device";

        return feature;
    });

    return features;
}

const addFeatureMarkers = (diwiseFeatures) => {
    let features = diwiseFeatures.filter((d) => hasLonLat(d)).map((d) => {
        let lonLat = tryParseLonLat(d);
        let feature = new Feature({
            geometry: new Point(fromLonLat(lonLat)),
        });
        feature.setId(d.id);
        feature.setStyle(getMarkerStyle("flag", "blue"));
        feature["data"] = d;
        feature["markerType"] = "feature";
        return feature;
    });

    return features;
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

const getMarkerStyle = (name = "", color = "grey") => {
    var iconStyle = new Style({
        image: getIcon(name, color),
    });

    return iconStyle;
}

const getIcon = (name = "", fill = "grey", size = "24px", scale = 1) => {
    switch (name) {
        case "lifering": return new Icon({
            opacity: 1,
            src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg fill="${fill}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M367.2 412.5C335.9 434.9 297.5 448 256 448s-79.9-13.1-111.2-35.5l58-58c15.8 8.6 34 13.5 53.3 13.5s37.4-4.9 53.3-13.5l58 58zm90.7 .8c33.8-43.4 54-98 54-157.3s-20.2-113.9-54-157.3c9-12.5 7.9-30.1-3.4-41.3S425.8 45 413.3 54C369.9 20.2 315.3 0 256 0S142.1 20.2 98.7 54c-12.5-9-30.1-7.9-41.3 3.4S45 86.2 54 98.7C20.2 142.1 0 196.7 0 256s20.2 113.9 54 157.3c-9 12.5-7.9 30.1 3.4 41.3S86.2 467 98.7 458c43.4 33.8 98 54 157.3 54s113.9-20.2 157.3-54c12.5 9 30.1 7.9 41.3-3.4s12.4-28.8 3.4-41.3zm-45.5-46.1l-58-58c8.6-15.8 13.5-34 13.5-53.3s-4.9-37.4-13.5-53.3l58-58C434.9 176.1 448 214.5 448 256s-13.1 79.9-35.5 111.2zM367.2 99.5l-58 58c-15.8-8.6-34-13.5-53.3-13.5s-37.4 4.9-53.3 13.5l-58-58C176.1 77.1 214.5 64 256 64s79.9 13.1 111.2 35.5zM157.5 309.3l-58 58C77.1 335.9 64 297.5 64 256s13.1-79.9 35.5-111.2l58 58c-8.6 15.8-13.5 34-13.5 53.3s4.9 37.4 13.5 53.3zM208 256a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"/></svg>`),
            scale: scale
        });
        case "microchip": return new Icon({
            opacity: 1,
            src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg fill="${fill}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z"/></svg>`),
            scale: scale
        });
        case "flag": return new Icon({
            opacity: 1,
            src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg fill="${fill}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/></svg>`),
            scale: scale
        });
        case "question": return new Icon({
            opacity: 1,
            src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg fill="${fill}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>`),
            scale: scale
        });
        case "location": return new Icon({
            opacity: 1,
            src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg fill="${fill}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`),
            scale: scale
        });
        default: return new Icon({
            opacity: 1,
            src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg fill="${fill}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`),
            scale: scale
        });
    }
}

export {
    addDeviceMarkers,
    addFeatureMarkers,
    getMarkerStyle,
};