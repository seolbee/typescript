const Stock = require('../model/Stock');

const request = require('request');
const iconv = require('iconv-lite');
const dns = require('dns');
const url = require('url');

const queryUrl = url.resolve('https://polling.finance.naver.com', '/api/realtime');

const options = {
    url:queryUrl,
    qs:{
        query:`SERVICE_ITEM:068270`
    },
    encoding:null,
    headers:{
        'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36'
    }
};

module.exports = function getStock(code:String):Promise<any> {
    options.qs.query = `SERVICE_ITEM:${code}`;
    return new Promise((resolve, reject)=>{
        request(options, (err, res, body) => {
            if(!err && res.statusCode === 200) {
                let result = iconv.decode(body, 'EUC-KR');
                result = JSON.parse(result);
                let vo  = new Stock(result.result.areas[0].datas[0].cd, result.result.areas[0].datas[0].nm, result.result.areas[0].datas[0].nv, result.result.time);
                resolve(vo);
            } else {
                console.log(err);
                reject(err);
            }
        });
    });
};

module.exports = async function sendStock(client, code) {
    let vo = await getStock(code);
    StockList.push(vo);
    client.send(JSON.stringify({success : true, StockList}));
}