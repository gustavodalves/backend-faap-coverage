import User from '../app/models/User';
import { AppDataSource } from '../database/data_source';

export default AppDataSource.getRepository(User).extend({
    findByEmailAndSelectPassword(email: string) {
        return this.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();
    }
});
