import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import bcrypt from 'bcryptjs';
import Token from './Token';
import { IsEmail, MinLength} from 'class-validator';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column()
    @IsEmail()
        email: string;

    @Column({ select: false })
    @MinLength(8, { message: 'Password must contain at least 8 characters' })
        password: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
        created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
        updated_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    @OneToMany(() => Token, () => Token)
        tokens: Token[];
}

export default User;
