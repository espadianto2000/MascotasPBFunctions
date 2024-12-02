const functions = require('firebase-functions');
import express from 'express';
import { authMiddleware } from './middlewares/auth';
import api1Router from './apis/api1';
import api2Router from './apis/api2';

const app = express();

app.use(express.json());
app.use(authMiddleware);

// Define routes
app.use('/group', api1Router);
app.use('/other', api2Router);

// Start the Express app
const PORT = 5001;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('Server is running on PORT', PORT);
  });
}

exports.app = functions.https.onRequest(app);
