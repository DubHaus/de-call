import {Query, Resolver} from 'type-graphql';
import {Category} from '../entity/catalogs/Category';
import {Language} from '../entity/catalogs/Language';

@Resolver()
export class CatalogResolver {
    @Query(() => [Language])
    async languages(): Promise<Language[]> {
        return Language.find();
    }

    @Query(() => [Category])
    async categories(): Promise<Category[]> {
        return Category.find();
    }
}
