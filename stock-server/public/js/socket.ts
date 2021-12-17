let client = io('localhost:4000', {
    transport:['websocket']
});

function searchStock(code:string) {
    client.emit('search', code);
    
}