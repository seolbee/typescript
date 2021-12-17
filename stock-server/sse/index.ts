const SSE = require('sse');
const cron= require('node-cron');

const getStock = require('../API/stock');

const StockList = [];

const searchList = [
    {
       id:1,
       code : '068270',
       name:'셀트리온'
    },
    {
       id:2,
       code:'033830',
       name:'티비씨'
    },
    {
       id:3,
       code:'096640',
       name:'멜파스'
    }
];

let currentId = 1;

module.exports = (server) => {
    const sse = new SSE(server);
    sse.on('connection', async (client) => {
        cron.schedule('* * 9-15 * * 1-5', async () => {
            let vo = await getStock('068270');
            StockList.push(vo);
            client.send(JSON.stringify({success : true, StockList:(StockList.filter(f => f.id === currentId ))}));
        });
    });
};