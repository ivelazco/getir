// importing the dependencies
import { config } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
config();

const errorHandlerMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.use(errorHandlerMiddleware);

app.get('/search', async (req, res) => {
    res.json({ ok: 1 });
});

// starting the server
const portToListen = process.env.PORT || 3001;
app.listen(portToListen, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on port ${portToListen}`);
});
