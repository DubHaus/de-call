import {Field, ID, ObjectType} from 'type-graphql';
import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Category} from './catalogs/Category';

@ObjectType()
@Entity('profiles')
export class Profile extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Field()
    @Column({length: 100})
    firstName: string;

    @Field({nullable: true})
    @Column({nullable: true, default: '', length: 100})
    lastName?: string;

    @Field()
    @Column({length: 300})
    bio: string;

    @Field(() => [Category])
    @ManyToMany(() => Category)
    @JoinTable()
    interests: Category[];
}
