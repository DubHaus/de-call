import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import Icon from 'src/components/common/icon';
import Caption from 'src/components/common/typography/caption';
import Text from 'src/components/common/typography/text';
import Title from 'src/components/common/typography/title';
import styles from './card.module.scss';

type Props = {
    className?: string;
};

const Card = ({className = ''}: Props) => (
    <Container className={`${styles.container} ${className}`}>
        <Flex justify="between" align="stretch" gap={30}>
            <Container className={styles.picture}>
                <Icon icon="profile" />
            </Container>
            <Container>
                <Title className={styles.title} level="h4">
                    Timyr Green
                </Title>
                <Caption className={styles.subtitle}>
                    Startup entrepreneur and ML enginieer
                </Caption>
                <Text className={styles.description}>
                    Can help you with questions about opening startup and ML
                    stuff
                </Text>
            </Container>
            <Container>
                <Flex
                    className={styles.statusContainer}
                    justify="between"
                    direction="column">
                    <Caption className={styles.status}>
                        Last online: 3 hours ago
                    </Caption>
                    <Container className={styles.price}>
                        <span className={styles.priceLarge}>100</span>
                        <span className={styles.priceSmall}>$/h</span>
                    </Container>
                    <Container />
                </Flex>
            </Container>
        </Flex>
    </Container>
);

export default Card;
