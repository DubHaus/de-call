import {Field, InputType, ObjectType} from 'type-graphql';
import {BaseEntity, Column, Entity, PrimaryColumn} from 'typeorm';

@ObjectType()
@InputType('LanguageInput')
@Entity('languages')
export class Language extends BaseEntity {
    @Field()
    @PrimaryColumn()
    value: string;

    @Field()
    @Column()
    title: string;
}
