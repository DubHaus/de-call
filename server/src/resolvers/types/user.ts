import {IsEmail, MinLength} from 'class-validator';
import {Field, InputType, ObjectType} from 'type-graphql';
import {User} from '../../entity/User';

@InputType({description: 'New user'})
export class CreateUserInput implements Partial<User> {
    @Field()
    @IsEmail({}, {message: 'Email is not valid'})
    email: string;

    @Field()
    firstName: string;

    @Field()
    @MinLength(8)
    password: string;

    @Field({nullable: true})
    lastName?: string;
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
