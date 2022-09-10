import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import Icon from 'src/components/common/icon';
import Input from 'src/components/common/input';
import Layout from 'src/components/layout';
import Card from './components/card';
import Filters from './components/filters';
import styles from './explore.module.scss';

const ExplorePage = () => (
    <>
        <Layout>
            <Container className={styles.search}>
                <Flex>
                    <Input
                        placeholder="Start searching"
                        left={
                            <Icon
                                className={styles.icon}
                                onClick={() => {}}
                                icon="sort"
                            />
                        }
                        right={
                            <Icon
                                className={styles.icon}
                                onClick={() => {}}
                                icon="search"
                            />
                        }
                    />
                    <Filters />
                </Flex>
            </Container>
            <Container>
                <Card className={styles.card} />
                <Card className={styles.card} />
                <Card className={styles.card} />
                <Card className={styles.card} />
            </Container>
        </Layout>
    </>
);

export default ExplorePage;
