import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import bcrypt from 'bcryptjs';
import Token from './Token';
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

    @OneToMany(() => Token, () => Token)
        tokens: Token[];

}

export default User;
