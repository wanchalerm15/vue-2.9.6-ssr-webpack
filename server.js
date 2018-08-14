const express = require('express');
const app = express();
const fs = require('fs');

const bundle = require('./dist/server.bundle');
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./dist/index.html', 'utf8').replace('<div id=app></div>', '<!--vue-ssr-outlet-->')
});

app.use('/public', express.static(__dirname + '/dist'));

app.get('**', (req, res, next) => {
  bundle.default({ url: req.url }).then(vue => {
    const context = {

    };
    renderer.renderToString(vue, context, (err, html) => {
      if (err) return next(err);
      res.status(200).end(html);
    });
  });
});

app.listen(3000);