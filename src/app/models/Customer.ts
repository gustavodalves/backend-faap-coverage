import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import bcrypt from 'bcryptjs';
import Token from './Token';
import { IsEmail, Matches } from 'class-validator';
import patterns from '../../utils/patterns';

@Entity('customers')
class User {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column()
        name: string;

    @Column()
    @IsEmail()
        email: string;

    @Column()
        product: string;

    @Column()
        subject: string;

    @Column()
        message: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
        created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
        updated_at: Date;
}

export default User;
