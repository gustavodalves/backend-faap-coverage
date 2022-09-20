import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import User from './User';

@Entity('tokens')
class Token {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column()
        type: string;

    @Column()
        token: string;

    @Column({ name: 'is_expire' })
        isExpire: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
        created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
        updated_at: Date;

    @ManyToOne(() => User, () => Token)
    @JoinColumn({ name: 'user_id' })
        user: User;
}

export default Token;
