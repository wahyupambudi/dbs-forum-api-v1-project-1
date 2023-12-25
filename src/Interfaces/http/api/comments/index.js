const CommentsHandler = require('./handler');
const routes = require('./routes');

const comments = {
  name: 'comments',
  register: async (server, { container }) => {
    const handler = new CommentsHandler(container);
    server.route(routes(handler));
  },
};

module.exports = comments;
