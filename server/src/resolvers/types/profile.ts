import {ArrayNotEmpty, MaxLength, MinLength} from 'class-validator';
import {Field, InputType} from 'type-graphql';
import {Category} from '../../entity/catalogs/Category';
import {Language} from '../../entity/catalogs/Language';

@InputType({description: 'Profile draft updating'})
export class DraftProfileInput {
    @MaxLength(32)
    @MinLength(4)
    @Field({nullable: true})
    firstName?: string;

    @MinLength(4)
    @MaxLength(32)
    @Field({nullable: true})
    lastName?: string;

    @MaxLength(300)
    @Field({nullable: true})
    bio?: string;

    @ArrayNotEmpty()
    @Field(() => [Language], {nullable: true})
    languages?: Language[];

    @Field(() => [Category], {nullable: true})
    interests?: Category[];

    @Field({nullable: true})
    photo?: string;
}
