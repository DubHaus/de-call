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
import {Language} from './catalogs/Language';
import {Photo} from './Photo';

@ObjectType()
@Entity('draft-profiles')
export class DraftProfile extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Field()
    @Column({length: 100})
    firstName: string;

    @Field()
    @Column({length: 100})
    lastName: string;

    @Field({nullable: true})
    @Column({length: 300, nullable: true})
    bio?: string;

    @Field(() => [Category], {nullable: true})
    @ManyToMany(() => Category)
    @JoinTable()
    interests?: Category[];

    @Field(() => [Language], {nullable: true})
    @ManyToMany(() => Language)
    @JoinTable()
    languages?: Language[];

    @Field(() => Photo, {nullable: true})
    @OneToOne(() => Photo, {nullable: true, onDelete: 'SET NULL'})
    @JoinColumn()
    profilePhoto?: Photo;
}
