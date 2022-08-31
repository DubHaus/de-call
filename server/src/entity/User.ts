import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    firstName: string;

    @Field({nullable: true, defaultValue: ''})
    @Column({nullable: true, default: ''})
    lastName?: string;

    @Field()
    @Column()
    email: string;

    @Column()
    password: string;

    @Column('int', {default: 0})
    tokenVersion: number;
}
