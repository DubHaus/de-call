import {Field, ObjectType, registerEnumType} from 'type-graphql';
import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Category} from './catalogs/Category';
import {Image} from './Image';
import {User} from './User';

export enum EventType {
    public = 'public',
    private = 'private',
    closed = 'closed',
}

registerEnumType(EventType, {
    name: 'EventType', // this one is mandatory
    description: 'Event type', // this one is optional
});

@Entity('events')
@ObjectType()
export class Event extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({length: 300})
    title: string;

    @Field(() => User)
    @ManyToOne(() => User, user => user.createdEvents)
    creator: User;

    @Field()
    @Column({length: 500})
    description: string;

    @Field(() => Date)
    @Column({
        type: 'timestamptz',
    })
    date: Date;

    @Field(() => [Category])
    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @Field(() => Image, {nullable: true})
    @ManyToOne(() => Image, {nullable: true})
    previewImage?: Image;

    @Field(() => [User])
    @ManyToMany(() => User)
    @JoinTable()
    attendees: User[];

    @Field(() => EventType)
    @Column({
        type: 'enum',
        enum: EventType,
        default: EventType.public,
    })
    type: EventType;
}
