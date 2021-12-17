var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SSE = require('sse');
const cron = require('node-cron');
const getStock = require('../API/stock');
const StockList = [];
module.exports = (server) => {
    const sse = new SSE(server);
    sse.on('connection', (client) => __awaiter(this, void 0, void 0, function* () {
        // let interval = setInterval(async () => {
        //     let time = new Date();
        //     if(time.getHours() >= 16 || (time.getHours() <= 8 && time.getMinutes() < 30)) {
        //         client.send(JSON.stringify({success:false}));
        //         clearInterval(interval);
        //     } else {
        //         let vo = await getStock('068270');
        //         StockList.push(vo);
        //         client.send(JSON.stringify({success : true, StockList}));
        //     }
        // }, 1000);
        cron.schedule('* * 9-15 * * 1-5', () => __awaiter(this, void 0, void 0, function* () {
            let vo = yield getStock('068270');
            StockList.push(vo);
            client.send(JSON.stringify({ success: true, StockList }));
        }));
    }));
};
