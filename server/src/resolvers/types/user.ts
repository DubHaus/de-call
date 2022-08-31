import {IsEmail, MinLength} from 'class-validator';
import {User} from 'src/entity/User';
import {Field, InputType, ObjectType} from 'type-graphql';

@InputType({description: 'New user'})
export class CreateUserInput implements Partial<User> {
    @Field()
    @IsEmail()
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
    @IsEmail()
    email: string;

    @Field()
    password: string;
}

@ObjectType()
export class LoginResponse {
    @Field()
    accessToken: string;
}
