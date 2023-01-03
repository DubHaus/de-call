import {Field, InputType, ObjectType} from 'type-graphql';
import {BaseEntity, Column, Entity, PrimaryColumn} from 'typeorm';

@ObjectType()
@InputType('CategoryInput')
@Entity('categories')
export class Category extends BaseEntity {
    @Field()
    @PrimaryColumn()
    value: string;

    @Field()
    @Column()
    title: string;
}
