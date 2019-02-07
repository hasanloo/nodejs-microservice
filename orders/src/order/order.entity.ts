import {Column, JoinColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum Status {
    CREATED = 'created',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    DELIVERED = 'delivered',
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    name: string;

    @Column('text')
    address: string;

    @Column()
    price: number;

    @Column({length: 8, unique: true})
    nmbr: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.CREATED,
    })
    status: Status;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createTimestamp: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updateTimestamp: Date;
}
