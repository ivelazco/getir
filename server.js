// importing the dependencies
import { config } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { searchHandler, searchSchema } from './src/search';
import { withYupValidator, withErrorHandler } from './src/middlewares';
config();

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.use(withErrorHandler);

// routes
app.post('/search', withYupValidator(searchSchema), searchHandler);

// starting the server
const portToListen = process.env.PORT || 3001;
app.listen(portToListen, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on port ${portToListen}`);
});
