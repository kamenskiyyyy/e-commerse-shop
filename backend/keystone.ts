import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { createAuth } from '@keystone-next/auth';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';

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
  passwordResetLink: {
    async sendToken({ token, identity }) {
      await sendPasswordResetEmail(token, identity);
    },
  },
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
    async onConnect(keystone) {
      if (process.argv.includes('--seed-data')) {
        await insertSeedData(keystone);
      }
    },
  },
  lists: createSchema({
    User,
    Product,
    ProductImage,
  }),
  ui: {
    isAccessAllowed: ({ session }) => session?.data,
  },
  session: withItemData(statelessSessions(sessionConfig), { User: `id` }),
}));
