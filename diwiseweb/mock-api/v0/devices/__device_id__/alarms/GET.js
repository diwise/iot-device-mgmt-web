let alarms = require("../../../alarms/GET.json");

module.exports = (request, response) => {

    let deviceID = request.params.device_id;

    currentAlarms = [];

    for (i = 0; i < alarms.length; i++) {
        if (alarms[i].refID === deviceID) {
            currentAlarms = [...currentAlarms, alarms[i]];
        }
    }

    response.json(currentAlarms);
};
