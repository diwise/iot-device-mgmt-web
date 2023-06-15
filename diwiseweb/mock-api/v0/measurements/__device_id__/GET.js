
module.exports = (request, response) => {

    let deviceID = request.params.device_id;

    response.json(measurements(deviceID));
};


const measurements = (deviceID) => {
    return [
        {
            "timestamp": "2023-06-15T05:44:38.398122Z",
            "pack": [
                {
                    "bn": "urn:oma:lwm2m:ext:3304",
                    "bt": 1686807877,
                    "n": "0",
                    "vs": deviceID
                },
                {
                    "n": "5700",
                    "u": "%RH",
                    "v": 43
                }
            ]
        },
        {
            "timestamp": "2023-06-15T05:44:38.398122Z",
            "pack": [
                {
                    "bn": "urn:oma:lwm2m:ext:3200",
                    "bt": 1686807877,
                    "n": "0",
                    "vs": deviceID
                },
                {
                    "n": "5500",
                    "vb": false
                },
                {
                    "n": "5501",
                    "v": 90
                }
            ]
        },
        {
            "timestamp": "2023-06-15T05:44:38.398122Z",
            "pack": [
                {
                    "bn": "urn:oma:lwm2m:ext:3303",
                    "bt": 1686807877,
                    "n": "0",
                    "vs": deviceID
                },
                {
                    "n": "5700",
                    "v": 21.3
                }
            ]
        },
        {
            "timestamp": "2023-06-15T05:49:38.358706Z",
            "pack": [
                {
                    "bn": "urn:oma:lwm2m:ext:3303",
                    "bt": 1686808177,
                    "n": "0",
                    "vs": deviceID
                },
                {
                    "n": "5700",
                    "v": 21.2
                }
            ]
        },
        {
            "timestamp": "2023-06-15T05:49:38.358706Z",
            "pack": [
                {
                    "bn": "urn:oma:lwm2m:ext:3200",
                    "bt": 1686808177,
                    "n": "0",
                    "vs": deviceID
                },
                {
                    "n": "5500",
                    "vb": false
                },
                {
                    "n": "5501",
                    "v": 90
                }
            ]
        }
    ];
}
