const Stock = require('../model/Stock');
const request = require('request');
const iconv = require('iconv-lite');
const dns = require('dns');
const url = require('url');
const queryUrl = url.resolve('https://polling.finance.naver.com', '/api/realtime');
const options = {
    url: queryUrl,
    qs: {
        query: `SERVICE_ITEM:068270`
    },
    encoding: null
};
module.exports = function getStock(code) {
    options.qs.query = `SERVICE_ITEM:${code}`;
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                let result = iconv.decode(body, 'EUC-KR');
                result = JSON.parse(result);
                let vo = new Stock(result.result.areas[0].datas[0].cd, result.result.areas[0].datas[0].nm, result.result.areas[0].datas[0].nv, result.result.time);
                resolve(vo);
            }
            else {
                console.log(err);
                reject(err);
            }
        });
    });
};
