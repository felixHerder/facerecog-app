const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  config = {
    "public": "./build"
  }
  return handler(request, response, config);
})

server.listen(process.env.PORT || 3000, () => {
  console.log('Running at PORT:', process.env.PORT || 3000);
});