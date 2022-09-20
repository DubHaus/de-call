import {Field, ID, ObjectType, registerEnumType} from 'type-graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    JoinColumn,
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
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Field(() => UserRole)
    @Column({type: 'enum', enum: UserRole, default: UserRole.READER})
    role: UserRole;

    @Field(() => Profile, {nullable: true})
    @OneToOne(() => Profile, {
        nullable: true,
    })
    @JoinColumn()
    profile?: Profile;

    @Field()
    @Column({length: 100})
    firstName: string;

    @Field({nullable: true, defaultValue: ''})
    @Column({nullable: true, default: '', length: 100})
    lastName?: string;

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
