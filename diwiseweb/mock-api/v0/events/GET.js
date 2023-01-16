module.exports = (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);

    let facts = {};

    const data = `data: ${JSON.stringify(facts)}\n\n`;

    res.write(data);
};