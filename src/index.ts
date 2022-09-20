import express, { Express } from 'express';
import { port } from './config';
import { AppDataSource } from './database/data_source';
import router from './router';

const app: Express = express();

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server is running at localhost:${port} 🔥`);
    AppDataSource.initialize().then(() => {
        console.log('Database is connected 📦');
    }).catch(error => console.log(error));
});
