import {Field, InputType, ObjectType} from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity('socials')
@InputType('SocialsInput')
@ObjectType()
export class Socials extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Field({nullable: true})
    @Column({length: 100, nullable: true})
    twitter: string;

    @Field({nullable: true})
    @Column({length: 100, nullable: true})
    instagramm: string;

    @Field({nullable: true})
    @Column({length: 100, nullable: true})
    github: string;
}
