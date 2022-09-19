import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToOne } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
        id: string;
    @Column()
        email: string;

    @Column({ select: false })
        password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}

export default User;
