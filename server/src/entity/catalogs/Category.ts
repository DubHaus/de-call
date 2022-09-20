import {Field, ID, InputType, ObjectType} from 'type-graphql';
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@ObjectType()
@InputType('CategoryInput')
@Entity('categories')
export class Category extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    title: string;
}
