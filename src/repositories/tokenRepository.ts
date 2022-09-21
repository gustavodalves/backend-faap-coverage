import Token from '../app/models/Token';
import { AppDataSource } from '../database/data_source';

export default AppDataSource.getRepository(Token);
