import Container from '@components/common/container';
import Icon from '@components/common/icon';
import Image from '@components/common/image';
import Span from '@components/common/typography/span';
import Text from '@components/common/typography/text';
import Title from '@components/common/typography/title';
import {Category, Language, Photo} from 'src/generated/graphql';

type Props = {
    firstName?: string;
    lastName?: string;
    username?: string;
    bio?: string | null;
    languages?: Language[] | null;
    interests?: Category[] | null;
    profilePhoto?: ({location: string} & {}) | null;
};

const ProfilePreview = ({
    firstName,
    lastName,
    username,
    bio,
    languages,
    interests,
    profilePhoto,
}: Props) => (
    <Container className="rounded border border-solid  border-indigo-600 p-5 flex">
        <Container className="shrink-0">
            <Image className='w-20 h-20 rounded-full overflow-hidden' src={profilePhoto?.location} placeholder="profile" />
        </Container>
        <Container className="ml-8">
            <Container className="mb-2">
                {firstName ? (
                    <Title>
                        {firstName} {lastName}
                    </Title>
                ) : (
                    <Container className="bg-indigo-600/10 w-full h-5 mb-4" />
                )}
            </Container>
            <Container className="mb-6">
                {username ? (
                    <Text bold className="text-indigo-600">
                        @{username}
                    </Text>
                ) : (
                    <Container className="bg-indigo-600/10 h-3 mb-4" />
                )}
            </Container>
            <Container className="mb-4">
                {bio ? (
                    <Text>{bio}</Text>
                ) : (
                    <Container className="bg-indigo-600/10 h-3" />
                )}
            </Container>
            <Container className="mb-4">
                <Text bold>
                    Languages:{' '}
                    <Span>{languages?.map(el => el.title).join('; ')}</Span>
                </Text>
            </Container>
            <Container>
                <Text bold>
                    Interests:{' '}
                    <Span>{interests?.map(el => el.title).join('; ')}</Span>
                </Text>
            </Container>
        </Container>
    </Container>
);

export default ProfilePreview;
