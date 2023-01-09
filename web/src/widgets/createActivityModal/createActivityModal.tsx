import Button from '@components/common/button';
import Container from '@components/common/container';
import DateInput from '@components/common/dateInput';
import GridLayout from '@components/common/gridLayout';
import Image from '@components/common/image';
import ImageInput from '@components/common/imageInput';
import Input from '@components/common/input';
import Modal from '@components/common/modal';
import Radio from '@components/common/radio';
import {SelectOption} from '@components/common/select/components/option';
import TextArea from '@components/common/textArea';
import Tip from '@components/common/tip';
import {useState} from 'react';
import {
    EventType,
    MyCreatedEventsDocument,
    useCreateEventMutation,
    useUploadImageMutation,
} from 'src/generated/graphql';
import {useHandleErrors} from 'src/hooks/errors';
import Categories from '../catalogs/categories';

type Props = {
    close: () => void;
};

const CreateActivityModal = ({close}: Props) => {
    const [picture, setPicture] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [type, setType] = useState<EventType>(EventType.Public);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState('');
    const [categories, setCategories] = useState<SelectOption[]>([]);
    const [description, setDescription] = useState('');

    const [createActivity, {loading, error}] = useCreateEventMutation({
        refetchQueries: [MyCreatedEventsDocument],
    });
    const [uploadImage, {}] = useUploadImageMutation();
    const errors = useHandleErrors(error);

    const save = async () => {
        let previewImage;
        if (file) {
            const {data} = await uploadImage({
                variables: {input: {description: file.name, file}},
            });
            previewImage = data?.uploadImage;
        }
        const {data} = await createActivity({
            variables: {
                input: {
                    categories,
                    date: `${date} ${time}`,
                    description,
                    previewImage,
                    title,
                    type,
                },
            },
        });
        if (data?.createEvent) close();
    };

    const loadImage = (file: File) => {
        const objectUrl = URL.createObjectURL(file);
        setPicture(objectUrl);
        setFile(file);
    };

    return (
        <Modal
            className="w-[80%] max-w-[1000px]"
            buttons={
                <>
                    <Button onClick={close} className="mr-5" type="secondary">
                        Cancel
                    </Button>
                    <Button onClick={save}>Create event</Button>
                </>
            }
            title="Create new event"
            close={close}>
            <GridLayout className="py-5" local>
                <Container className="col-span-6">
                    <Input
                        onChange={setTitle}
                        value={title}
                        placeholder="Title"
                        label="Title"
                        className="mb-5"
                        error={errors.title}
                    />
                    <Container className="flex mb-5">
                        <DateInput
                            onChange={setDate}
                            value={date}
                            placeholder="Date"
                            className="mr-5 w-[50%]"
                            error={errors.date}
                        />
                        <Input
                            onChange={setTime}
                            value={time}
                            type="time"
                            placeholder="Time"
                            className="w-[50%]"
                            error={errors.date}
                        />
                    </Container>
                    <Categories
                        value={categories}
                        onChange={setCategories}
                        placeholder="Categories (up to 4)"
                        className="mb-5"
                        label="Categories"
                        error={errors.categories}
                    />

                    <Container className="flex items-center">
                        <Tip content="Anyone can see this event and send request to join">
                            <Radio
                                onChange={setType}
                                value={EventType.Public}
                                checked={type === EventType.Public}
                                className="mr-3">
                                Public
                            </Radio>
                        </Tip>
                        <Tip
                            content="Only your friends can see this event
                        and can join">
                            <Radio
                                onChange={setType}
                                value={EventType.Private}
                                checked={type === EventType.Private}
                                className="mr-3">
                                For friends
                            </Radio>
                        </Tip>
                        <Tip
                            content="Only people with invite can connect and see
                        this event">
                            <Radio
                                onChange={setType}
                                value={EventType.Closed}
                                checked={type === EventType.Closed}
                                className="mr-3">
                                Private
                            </Radio>
                        </Tip>
                    </Container>
                </Container>
                <Container className="col-span-6">
                    <Image
                        className="w-full h-44 mb-5"
                        src={picture}
                        placeholder
                    />
                    <ImageInput
                        value={picture}
                        onChange={loadImage}
                        className="mb-5"
                        label="Preview image"
                        error={errors.previewImage}
                    />
                    <TextArea
                        placeholder="Event description"
                        label="Description"
                        onChange={setDescription}
                        value={description}
                        error={errors.description}
                    />
                </Container>
            </GridLayout>
        </Modal>
    );
};

export default CreateActivityModal;
