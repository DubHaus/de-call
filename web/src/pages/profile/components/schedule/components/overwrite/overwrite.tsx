import Button from 'src/components/common/button';
import Checkbox from 'src/components/common/checkbox';
import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import Text from 'src/components/common/typography/text';
import styles from './overwrite.module.scss';

const Overwrite = () => (
    <Container className={styles.container}>
        <Flex justify="between">
            <Checkbox value={false} onChange={() => {}} />
            <Text>27Sep - 29Sep </Text>
            <Text>2pm - 8pm</Text>
            <Button type="ghost" icon="delete" />
        </Flex>
    </Container>
);

export default Overwrite;
