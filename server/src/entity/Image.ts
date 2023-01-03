import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, BaseEntity, Column, PrimaryColumn} from 'typeorm';

@Entity('images')
@ObjectType()
export class Image extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn()
    readonly id: string;

    @Field()
    @Column({unique: true})
    location: string;

    @Column({unique: true})
    localPath: string;

    @Field({nullable: true})
    @Column({nullable: true, length: 150})
    description?: string;

    @Field()
    @Column()
    filename: string;
}
