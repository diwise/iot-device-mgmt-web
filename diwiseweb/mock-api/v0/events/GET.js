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
        const data = `event: deviceUpdated\ndata: ${JSON.stringify(device)}\n\n`;
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

