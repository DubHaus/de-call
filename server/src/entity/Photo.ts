import {ObjectType} from 'type-graphql';
import {Entity, ManyToOne} from 'typeorm';
import {Image} from './Image';
import {Profile} from './Profile';

@Entity('photos')
@ObjectType()
export class Photo extends Image {
    @ManyToOne(() => Profile, profile => profile.photos)
    profile?: Profile;
}
