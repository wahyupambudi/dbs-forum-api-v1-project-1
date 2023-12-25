const ThreadsHandler = require('./handler');
const routes = require('./routes');

const threads = {
  name: 'threads',
  register: async (server, { container }) => {
    const handler = new ThreadsHandler(container);
    server.route(routes(handler));
  },
};

module.exports = threads;
