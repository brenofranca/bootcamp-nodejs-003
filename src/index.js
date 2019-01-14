const server = require('./bootstrap/server.js')

server.set('port', process.env.PORT || 3000)

server.listen(server.get('port'), () =>
  console.log('Express server listening on port ' + server.get('port'))
)
