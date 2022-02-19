import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { createAuth } from '@keystone-next/auth';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost:27017/sick-fits-keystone';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET || 'this secret should only be used in testing',
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: { fields: ['name', 'email', 'password'] },
});

export default withAuth(config({
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
    User,
  }),
  ui: {
    isAccessAllowed: ({ session }) => session?.data,
  },
  session: withItemData(statelessSessions(sessionConfig), { User: `id` }),
}));
