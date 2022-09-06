import Button from 'components/common/button';
import Container from 'components/common/container';
import Flex from 'components/common/flex';
import Icon from 'components/common/icon';
import Input from 'components/common/input';
import styles from './filters.module.scss';

const Filters = () => (
    <Container className={styles.container}>
        <Icon onClick={() => {}} className={styles.filterIcon} icon="filter" />
        <Container className={styles.filters} >
            <Input
                className={styles.filter}
                placeholder="Theme of conversation"
            />
            <Input className={styles.filter} placeholder="Rate per hour" />
            <Flex gap={20}>
                <Button icon="check">Apply</Button>
                <Button icon="reset" type="alt">
                    Reset
                </Button>
            </Flex>
        </Container>
    </Container>
);

export default Filters;
