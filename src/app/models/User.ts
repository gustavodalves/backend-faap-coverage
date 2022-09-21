import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import bcrypt from 'bcryptjs';
import Token from './Token';
import { IsEmail, Matches } from 'class-validator';
import patterns from '../../utils/patterns';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column()
        name: string;

    @Column()
    @IsEmail()
        email: string;

    @Column({ select: false })
    @Matches(patterns.password, { message: 'Password must contain at least 1 capital letter, 1 number and 1 special character' })
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
    @JoinColumn()
        tokens: Token[];
}

export default User;
