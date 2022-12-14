import {Field, ObjectType, registerEnumType} from 'type-graphql';
import {
    Entity,
    Column,
    BaseEntity,
    OneToOne,
    JoinColumn,
    PrimaryColumn,
} from 'typeorm';
import {Profile} from './Profile';

export enum UserRole {
    EDITOR = 'editor',
    READER = 'reader',
}

registerEnumType(UserRole, {
    name: 'UserRole', // this one is mandatory
    description: 'User role', // this one is optional
});

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
    @Field()
    @PrimaryColumn({length: 32, unique: true})
    username: string;

    @Field(() => Profile, {nullable: true})
    @OneToOne(() => Profile, {
        nullable: true,
    })
    @JoinColumn()
    profile?: Profile;

    @Field()
    @Column({length: 100, unique: true})
    email: string;

    @Field({defaultValue: false})
    @Column({default: false})
    emailVerified: boolean;

    @Column()
    password: string;

    @Column('int', {default: 0})
    tokenVersion: number;
}
