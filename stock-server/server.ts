const koa = require('koa');
// const Router = require('koa-router');
const views = require('koa-views');
const static = require('koa-static');
const path = require('path');

const pug = require('pug');

const app = new koa();
// const router = new Router();
const index = require('./routes');

const sse = require('./sse');
const socket = require('./socket');

app.use(views(path.join(__dirname, 'views'), {extension:'pug'}));
app.use(static(path.join(__dirname, 'public'), {maxage:10}));

app.use(index.routes());
app.use(index.allowedMethods());

// app.use(async (ctx, next) => {
    
// });

const server = app.listen(4000, ()=> {
    console.log("4000번 포트에서 작동 중 ");
});

socket(server);
sse(server);