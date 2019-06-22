// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
const Telegraf = require('telegraf');
const HttpsProxyAgent = require('https-proxy-agent')
const SocksAgent = require('socks5-https-client/lib/Agent');
const socksAgent = new SocksAgent({
  socksHost: `192.168.13.1`,
  socksPort: `8080`,

});

const app = new Telegraf("670211995:AAEWhFzYIFWavPpF6h5ZJo1wqs3K4T53tFA", {
  // telegram: {
  // agent: new HttpsProxyAgent('http://192.168.13.1:8080')
  // }
});

app.hears('hi', ctx => {
  return ctx.reply('Hey!');
});
const remoteFile = 'http://cabinet.xb.uz:82/uploads/Test.pdf';

app.hears(/^\/start[ =](.+)$/, (ctx) => { console.log(ctx.match[1]); return app.telegram.sendDocument(ctx.message.from.id, remoteFile, [{ disable_notification: true }]); });

app.startPolling();