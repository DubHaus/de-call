import {useState} from 'react';
import Checkbox from 'components/common/checkbox';
import Flex from 'components/common/flex';
import Input from 'components/common/input';
import Caption from 'components/common/typography/caption';
import Link from 'components/common/typography/link';
import Title from 'components/common/typography/title';
import Layout from 'components/layout';
import styles from './signUp.module.scss';
import Container from 'components/common/container';
import Button from 'components/common/button';

const SignUp = () => {
    const [checked, setChecked] = useState(false);
    return (
        <Layout>
            <Title className={styles.title} level="h2">
                Sign up
            </Title>
            <Container>
                <Flex gap={20}>
                    <Input
                        className={`${styles.input} ${styles.name}`}
                        placeholder="Name"
                    />
                    <Input
                        className={`${styles.input} ${styles.userName}`}
                        placeholder="Username"
                    />
                </Flex>
                <Input
                    className={`${styles.input} ${styles.email}`}
                    placeholder="Email"
                />
                <Input
                    className={`${styles.input} ${styles.password}`}
                    placeholder="Password"
                />

                <Checkbox
                    className={`${styles.input} ${styles.checkbox}`}
                    onChange={setChecked}
                    value={checked}>
                    <Caption>
                        Creating an account means you’re okay with our{' '}
                        <Link>Terms of Service </Link>,{' '}
                        <Link>Privacy Policy</Link>, and our default
                        Notification Settings.
                    </Caption>
                </Checkbox>
            </Container>
            <Button type="secondary">Create account</Button>
        </Layout>
    );
};

export default SignUp;
