import {FileUpload, GraphQLUpload} from 'graphql-upload-ts';
import {Field, InputType} from 'type-graphql';

@InputType({description: 'new photo'})
export class UploadImageInput {
    @Field(() => GraphQLUpload)
    file: FileUpload;

    @Field()
    description?: string;
}
