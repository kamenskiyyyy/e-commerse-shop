import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { statelessSessions } from '@keystone-next/keystone/session';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost:27017/sick-fits-keystone';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET || 'this secret should only be used in testing',
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL!],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
  },
  lists: createSchema({

  }),
  ui: {
    isAccessAllowed: () => true
  },
  session: statelessSessions(sessionConfig),
});
