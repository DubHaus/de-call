import {Field, ID, ObjectType} from 'type-graphql';
import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Category} from './catalogs/Category';
import {Language} from './catalogs/Language';
import {Photo} from './Photo';

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

    @Field({nullable:true})
    @Column({length: 300, nullable: true})
    bio?: string;

    @Field(() => [Category])
    @ManyToMany(() => Category)
    @JoinTable()
    interests: Category[];

    @Field(() => [Language], {nullable: true})
    @ManyToMany(() => Language)
    @JoinTable()
    languages?: Language[];

    @Field(() => Photo, {nullable: true})
    @ManyToOne(() => Photo, {nullable: true})
    profilePhoto?: Photo

    @Field(() => [Photo])
    @OneToMany(() => Photo, photo => photo.profile)
    photos: Photo[];
}
