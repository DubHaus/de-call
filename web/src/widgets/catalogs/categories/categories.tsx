import Select from '@components/common/select';
import {SelectOption} from '@components/common/select/components/option';
import {useGetCategoriesLazyQuery} from 'src/generated/graphql';
import {DefaultProps} from 'src/types/input';

type Props = {
    value: SelectOption[];
    onChange: (value: SelectOption[]) => void;
} & DefaultProps;

const Categories = ({value, onChange, ...props}: Props) => {
    const [fetch, {data, loading, error}] = useGetCategoriesLazyQuery();
    if (error) {
        console.error(error);
    }

    return (
        <Select
            {...props}
            value={value}
            multiple
            onChange={onChange}
            fetch={fetch}
            options={data?.categories.map(({title, value}) => ({
                title,
                value,
            }))}
            loading={loading}
        />
    );
};

export default Categories;
