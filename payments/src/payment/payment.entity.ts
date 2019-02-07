import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum Status {
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
}

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    name: string;

    @Column('text')
    address: string;

    @Column()
    price: number;

    @Column({length: 8, unique: true})
    orderNumber: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.CONFIRMED,
    })
    status: Status;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createTimestamp: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updateTimestamp: Date;
}
