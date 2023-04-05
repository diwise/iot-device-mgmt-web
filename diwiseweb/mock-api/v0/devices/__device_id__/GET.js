let devices = require("../../../v0/devices/GET.json");

module.exports = (request, response) => {

    let deviceID = request.params.device_id;

    for (i = 0; i < devices.length; i++) {
        if (devices[i].deviceID == deviceID) {

            let state = getRandomNumber(0, 3);
            let online = getRandomNumber(0, 1);

            devices[i].deviceState.state = state;
            devices[i].deviceState.online = online === 1;
            devices[i].deviceState.observedAt = Date.now();

            response.json(devices[i]);
            return;
        }
    }

    response.json({
        id: request.params.device_id
    });
};

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};