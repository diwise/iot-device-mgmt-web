module.exports = (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };

    clients.push({ clientID: Date.now(), response: res });

    res.writeHead(200, headers);

    let statusCode = -1;

    setInterval(() => {
        statusCode++;
        if (statusCode === 3) {
            statusCode = 0;
        }
        device.status.statusCode = statusCode;
        const data = `data: ${JSON.stringify(device)}\n\n`;
        clients.forEach(client => client.response.write(data));
    }, 5000);

};

let clients = [];

let device = {
    "devEUI": "abcdefghijk",
    "deviceID": "net:serva:iot:abcdefghijk",
    "name": "temp-32",
    "description": "Tranviken",
    "location": {
        "latitude": 62.0,
        "longitude": 17.0,
        "altitude": 0
    },
    "environment": "indoors",
    "types": [
        "urn:oma:lwm2m:ext:3303",
        "urn:oma:lwm2m:ext:3301",
        "urn:oma:lwm2m:ext:3304"
    ],
    "sensorType": {
        "id": 6,
        "name": "elsys_codec",
        "description": "",
        "interval": 3600
    },
    "lastObserved": new Date(Date.now()).toLocaleString(),
    "active": true,
    "tenant": "default",
    "status": {
        "batteryLevel": -1,
        "statusCode": 0,
        "timestamp": new Date(Date.now()).toLocaleString()
    },
    "interval": 0
};


/*
{
    "devEUI": "a81758fffe0764f6",
    "deviceID": "intern-a81758fffe0764f6",
    "name": "Elsys_EMS_7",
    "description": "",
    "location": {
        "latitude": 0,
        "longitude": 0,
        "altitude": 0
    },
    "environment": "indoors",
    "types": [
        "urn:oma:lwm2m:ext:3304",
        "urn:oma:lwm2m:ext:3200",
        "urn:oma:lwm2m:ext:3303"
    ],
    "sensorType": {
        "id": 6,
        "name": "elsys_codec",
        "description": "",
        "interval": 3600
    },
    "lastObserved": "2023-01-17T10:02:13Z",
    "active": true,
    "tenant": "default",
    "status": {
        "batteryLevel": 3611,
        "statusCode": 100,
        "statusMessages": [
            "UPLINK_FCNT_RETRANSMISSION",
            "frame-counter did not increment"
        ],
        "timestamp": "2023-01-17T10:02:13Z"
    },
    "interval": 0
}

{
    "devEUI": "8c83fc0500556cd7",
    "deviceID": "se:servanet:lora:msva:05598423",
    "name": "05598423",
    "description": "",
    "location": {
        "latitude": 0,
        "longitude": 0,
        "altitude": 0
    },
    "environment": "",
    "types": [
        "urn:oma:lwm2m:ext:3424"
    ],
    "sensorType": {
        "id": 1,
        "name": "qalcosonic",
        "description": "",
        "interval": 3600
    },
    "lastObserved": "2023-01-17T11:47:18Z",
    "active": true,
    "tenant": "default",
    "status": {
        "batteryLevel": -1,
        "statusCode": 112,
        "statusMessages": [
            "Temporary error",
            "Backflow"
        ],
        "timestamp": "2023-01-17T11:47:18Z"
    },
    "interval": 0
}
*/