import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity('tokens')
class Token {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column()
        type: string;

    @Column()
        token: string;

    @Column()
        is_expire: boolean;

    @Column()
        userId: string;

    @ManyToOne(type => User, token => Token)
        user: User;
}

export default Token;
