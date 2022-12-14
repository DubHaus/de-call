import {IsEmail, Length} from 'class-validator';
import {Field, InputType, ObjectType} from 'type-graphql';
import {User} from '../../entity/User';

@InputType({description: 'New user'})
export class CreateUserInput implements Partial<User> {
    @Field()
    @IsEmail({}, {message: 'Email is not valid'})
    email: string;

    @Field()
    @Length(5, 32)
    username: string;

    @Field()
    @Length(5, 32)
    password: string;
}

@InputType({description: 'New user'})
export class LoginUserInput implements Partial<User> {
    @Field()
    email: string;

    @Field()
    password: string;
}

@ObjectType()
export class LoginResponse {
    @Field()
    accessToken: string;
}
@ObjectType()
export class SignupResponce {
    @Field()
    accessToken: string;

    @Field()
    created: boolean;
}
