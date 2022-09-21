import 'express-async-errors';
import express, { Express } from 'express';

import { errorMiddleware } from './app/middlewares/errorMiddleware';
import { port } from './config';
import { AppDataSource } from './database/data_source';
import router from './router';

const app: Express = express();

app.use(express.json());
app.use(router);
app.use(errorMiddleware);

AppDataSource.initialize().then(() => {
    console.log('Database is connected 📦');
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port} 🔥`);
    });
}).catch((error) => console.log(error));
