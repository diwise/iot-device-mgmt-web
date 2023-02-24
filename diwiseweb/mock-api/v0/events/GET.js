let devices = require("../../v0/devices/GET.json");
let features = require("../../features/GET.json");
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

    setInterval(() => {
        devices.forEach((d) => {
            d.lastObserved = Date.now();
            d.status.statusCode = Math.random(Math.floor(Math.random() * 2))
            let data = `event: deviceUpdated\ndata: ${JSON.stringify(d)}\n\n`;
            clients.forEach(client => client.response.write(data));
        });

        features.forEach((f) => {
            if (f.type === "counter") {
                f.counter.count++;
            }
            if (f.type === "level") {
                f.levels.current++;
            }
            
            let data = `event: feature.updated\ndata: ${JSON.stringify(f)}\n\n`;
            clients.forEach(client => client.response.write(data));
        });

    }, 10 * 1000);

    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });

    res.writeHead(200, headers);
};


