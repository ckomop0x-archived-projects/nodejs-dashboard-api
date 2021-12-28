import http from 'http';

const host = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      switch (req.url) {
        case '/hello':
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Hello from NodeJS Pure server');
          break;
        default:
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('NodeJS Pure server');
          break;
      }
      break;
  }
});

// eslint-disable-next-line no-console
server.listen(port, host, () => console.log(`Server started at ${host}:${port}`));
