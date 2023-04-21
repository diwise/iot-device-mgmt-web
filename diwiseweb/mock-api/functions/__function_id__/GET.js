let functions = require("../GET.json");

module.exports = (request, response) => {

    let functionID = request.params.function_id;

    for (i = 0; i < functions.length; i++) {
        if (functionID === functions[i].id) {
            response.json(functions[i]);
            return;
        }
    }

    response.status(404);
    response.end();
}