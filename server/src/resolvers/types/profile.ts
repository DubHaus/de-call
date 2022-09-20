// import {ArrayMinSize} from 'class-validator';
import {Field, ID, InputType} from 'type-graphql';
import {Socials} from '../../entity/Socials';

@InputType({description: 'New profile'})
export class CreateProfileInput {
    @Field()
    bio: string;

    @Field(() => [ID])
    // @ArrayMinSize(1)
    categories: number[];

    @Field(() => Socials)
    socials: Socials;
}
