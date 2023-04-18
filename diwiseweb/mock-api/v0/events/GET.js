let devices = require("../../v0/devices/GET.json");
let features = require("../../functions/GET.json");

let clients = [];

module.exports = (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };

    const clientID = Date.now();
    const newClient = { id: clientID, response: res };

    clients.push(newClient);
    /*
        setInterval(() => {
    
            const i = getRandomNumber(0, devices.length - 1);
            let d = devices[i];
    
            let statusUpdated = {
                deviceID: d.deviceID,
                state: d.deviceState.state,
                tenant: d.tenant.name,
                timestamp: Date.now()
            };
    
            let jsonStr = JSON.stringify(statusUpdated);
            let buf = Buffer.from(jsonStr, 'utf8');
            let b64Data = buf.toString('base64');
    
            let data = `event: device.statusUpdated\ndata: ${b64Data}\n\n`;
            clients.forEach(client => client.response.write(data));
    
        }, 3000);
    */

    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });

    res.writeHead(200, headers);
};

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};