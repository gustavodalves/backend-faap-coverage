import Customer from '../app/models/Customer';
import { AppDataSource } from '../database/data_source';

export default AppDataSource.getRepository(Customer);
