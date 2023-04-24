let alarms = require("./alarms.json");

module.exports = (request, response) => {

    let refID = request.query.refID;

    if (refID === undefined || refID === "") {        
        response.json(alarms);
        return
    }

    currentAlarms = [];

    for (i = 0; i < alarms.length; i++) {
        if (alarms[i].refID === refID) {
            currentAlarms = [...currentAlarms, alarms[i]];
        }
    }

    response.json(currentAlarms);
};
