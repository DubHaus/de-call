import Container from '../container';
import Icon, {IconType} from '../icon/icon';

type Props = {
    placeholder?: IconType | boolean;
    src?: string;
    className?:string
};

const Image = ({placeholder, src, className}: Props) => {
    if (placeholder === true) {
        placeholder = 'image';
    }
    return (
        <Container className={className} >
            {src ? (
                <img
                    className="object-cover w-full h-full object-center"
                    src={src}
                />
            ) : placeholder ? (
                <Container className="w-full h-full inline-flex justify-center items-center bg-indigo-100">
                    <Icon icon={placeholder} />
                </Container>
            ) : null}
        </Container>
    );
};

export default Image;
