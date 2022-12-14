import {Field, ID, InputType} from 'type-graphql';

@InputType({description: 'New profile'})
export class CreateProfileInput {
    @Field()
    firstName: string;

    @Field({nullable:true})
    lastName: string;

    @Field()
    bio: string;

    @Field(() => [ID])
    interests: number[];
}
