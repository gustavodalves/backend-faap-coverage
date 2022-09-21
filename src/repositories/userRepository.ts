import User from '../app/models/User';
import { AppDataSource } from '../database/data_source';

export default AppDataSource.getRepository(User);
