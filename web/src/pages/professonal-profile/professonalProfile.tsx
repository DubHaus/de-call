import Image from 'next/image';
import Container from 'src/components/common/container';
import Flex from 'src/components/common/flex';
import Input from 'src/components/common/input';
import TextArea from 'src/components/common/textArea';
import Layout from 'src/components/layout';

const ProfessionalProfile = () => {
    return (
        <Layout>
            <Container>
                <Flex>
                    <Image src="images/picture-188px.png" />
                    <Container>
                        <Input placeholder="Name" name="name" />
                        <TextArea
                            placeholder="Bio - tell about your professional and life experience"
                            name="bio"
                        />
                    </Container>
                </Flex>
            </Container>
        </Layout>
    );
};

export default ProfessionalProfile;
