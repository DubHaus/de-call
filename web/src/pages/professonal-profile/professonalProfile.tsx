import Image from 'next/image';
import Button from 'src/components/common/button';
import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import ImageInput from 'src/components/common/imageInput';
import Input from 'src/components/common/input';
import Select from 'src/components/common/select';
import TextArea from 'src/components/common/textArea';
import Layout from 'src/components/layout';
import styles from './profile.module.scss';

const ProfessionalProfile = () => {
    return (
        <Layout>
            <Container gap={40}>
                <Flex gap={20}>
                    <ImageInput />
                    <Container className={styles.field} gap={20}>
                        <Input
                            className={styles.field}
                            placeholder="Name"
                            name="name"
                            label="Name"
                        />
                        <TextArea
                            className={styles.field}
                            placeholder="Bio - tell about your professional and life experience"
                            name="bio"
                            label="Bio"
                        />
                    </Container>
                </Flex>
                <Flex wrap align="start" gap={20}>
                    <Select
                        className={styles.field}
                        placeholder="Select theme"
                        value="business-couch"
                        options={[
                            {value: 'business-couch', title: 'Business couch'},
                            {
                                value: 'content-creation',
                                title: 'Content creation',
                            },
                        ]}
                        label="Theme"
                    />
                    <Input
                        className={styles.field}
                        placeholder="Twitter"
                        name="twitter"
                        label="Twitter"
                    />
                    <Input
                        className={styles.field}
                        placeholder="Instagram"
                        name="instagram"
                        label="Instagram"
                    />
                    <Input
                        className={styles.field}
                        placeholder="Github"
                        name="github"
                        label="Github"
                    />
                </Flex>
                <Flex gap={20}>
                    <Button icon="send">Continue</Button>
                    <Button type="negative" icon="reset">
                        Reset
                    </Button>
                </Flex>
            </Container>
        </Layout>
    );
};

export default ProfessionalProfile;
