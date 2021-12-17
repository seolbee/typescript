let client = io('localhost:4000', {
    transport: ['websocket']
});
function searchStock(code) {
    client.emit('search', code);
}
