const Router = require('koa-router');

const router = new Router();

router.get('/', async ctx => {
    await ctx.render('index.pug', {title:'index'});
});

module.exports = router;