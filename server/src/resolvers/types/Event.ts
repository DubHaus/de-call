import {MaxLength, MinLength} from 'class-validator';
import {Field, InputType} from 'type-graphql';
import {Category} from '../../entity/catalogs/Category';
import {EventType} from '../../entity/Event';

@InputType({description: 'Event creation input'})
export class CreateEventInput {
    @MinLength(4)
    @MaxLength(300)
    @Field()
    title: string;

    @MinLength(4)
    @MaxLength(500)
    @Field()
    description: string;

    @Field()
    date: Date;

    @Field(() => [Category])
    categories: Category[];

    @Field()
    previewImage?: string;

    @Field(() => EventType)
    type: EventType;
}
