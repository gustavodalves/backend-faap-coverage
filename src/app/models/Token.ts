import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

}

export default Token;
