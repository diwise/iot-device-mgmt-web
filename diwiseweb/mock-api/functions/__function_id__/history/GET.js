module.exports = (request, response) => {

    let functionID = request.params.function_id;

    for (i = 0; i < history.length; i++) {
        if (functionID === history[i].functionID) {
            response.json(history[i].data);
            return;
        }
    }

    response.json({
        "id": functionID,
        "history": {
            "startTime": "0001-01-01T00:00:00Z",
            "endTime": new Date().toISOString(),
            "values": []
        }
    })
}

const history = [
    {
        functionID: "waterquality-0001",
        data: {
            "id": "waterquality-0001",
            "history": {
                "startTime": "2023-04-17T06:50:56.064135122Z",
                "endTime": "2023-04-17T08:00:55.883682911Z",
                "values": [
                    {
                        "v": 7.5,
                        "ts": "2023-04-17T06:50:56.064135122Z"
                    },
                    {
                        "v": 7.6,
                        "ts": "2023-04-17T07:10:56.005326827Z"
                    },
                    {
                        "v": 7.5,
                        "ts": "2023-04-17T07:25:55.965766605Z"
                    },
                    {
                        "v": 7.6,
                        "ts": "2023-04-17T07:30:55.950763616Z"
                    },
                    {
                        "v": 7.5,
                        "ts": "2023-04-17T07:35:55.926036298Z"
                    },
                    {
                        "v": 7.6,
                        "ts": "2023-04-17T07:40:55.917870643Z"
                    },
                    {
                        "v": 7.5,
                        "ts": "2023-04-17T07:55:55.899224278Z"
                    },
                    {
                        "v": 7.6,
                        "ts": "2023-04-17T08:00:55.883682911Z"
                    }
                ]
            }
        }
    },
    {
        functionID: "waterquality-0002",
        data: {
            "id": "waterquality-0002",
            "history": {
                "startTime": "2023-04-17T06:58:47.376033614Z",
                "endTime": "2023-04-17T08:28:47.192579244Z",
                "values": [
                    {
                        "v": 8,
                        "ts": "2023-04-17T06:58:47.376033614Z"
                    },
                    {
                        "v": 8.1,
                        "ts": "2023-04-17T08:28:47.192579244Z"
                    }
                ]
            }
        }
    }
];