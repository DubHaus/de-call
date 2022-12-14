import LogoIcon from 'public/logo.svg';
import Flex from 'src/components/common/flex';
import Title from 'src/components/common/typography/title';
import styles from './logo.module.scss';

type Props = {
    compact?: boolean;
};

const Logo = ({compact}: Props) => (
    <Flex gap={10}>
        <LogoIcon className={styles.logo} />
        {!compact ? (
            <span className="text-2xl font-bold">TownSquare</span>
        ) : null}
    </Flex>
);

export default Logo;
