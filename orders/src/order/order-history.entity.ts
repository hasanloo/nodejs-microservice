import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 8})
    orderNumber: string;

    @Column()
    status: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createTimestamp: Date;
}
