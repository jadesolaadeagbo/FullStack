import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connection, closeConnection } from './utils/mongoConnection';
import authentication from './router/authentication';
import googleAuth from './router/googleAuth';
import user from './router/user';
import MongoStore from 'connect-mongo';
import session from 'express-session';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

const allowedOrigins = ['https://fullstack-waxj.onrender.com', 'http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(
  session({
    name: 'sessionId',
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.set('trust proxy', 1);

app.use('/auth', authentication);
app.use('/auth/google', googleAuth);
app.use('/', user);

const server = app.listen(PORT, () => {
  connection();
  console.log('The server is running on port', PORT);
});

process.on('SIGINT', async () => {
  console.log('\nSIGINT received: Closing server gracefully...');
  server.close(async () => {
    console.log('Server closed.');
    try {
      await closeConnection();
      console.log('Connections closed.');
    } catch (error) {
      console.error('Error while closing database connection:', error);
    }
    process.exit(0);
  });
});
