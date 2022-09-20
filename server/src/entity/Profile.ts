import {Field, ID, ObjectType} from 'type-graphql';
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Category} from './catalogs/Category';
import {Socials} from './Socials';

@ObjectType()
@Entity('profiles')
export class Profile extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Field()
    @Column({length: 300})
    bio: string;

    @Field(() => [Category])
    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @Field(() => Socials)
    @OneToOne(() => Socials)
    @JoinColumn()
    socials: Socials;
}
