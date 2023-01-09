import Image from 'next/image';
import {ReactNode} from 'react';
import Button from '../common/button';
import Container from '../common/container';
import Icon from '../common/icon';
import Text from '../common/typography/text';

type Props = {
    children?: ReactNode;
    actions?: ReactNode;
    previewUrl?: string;
    title: string;
    description: string;
    top?: ReactNode;
};

const Card = ({
    children,
    actions,
    previewUrl,
    description,
    title,
    top,
}: Props) => (
    <Container className="p-4 py-4 bg-indigo-500/10 border-2 border-indigo-500 rounded">
        {top}
        <Container className="flex content-start items-start gap-2">
            <Container className="flex-1">
                <h4 className="text-l font-bold">{title}</h4>
                <Text size="sm" className="mt-2 line-clamp-3">
                    {description}
                </Text>
            </Container>
            {previewUrl ? (
                <Container className="w-6/12 relative">
                    <img src={previewUrl} className="rounded" />
                </Container>
            ) : null}
        </Container>
        {children}
        <Container className="flex mt-4 justify-end gap-2">{actions}</Container>
    </Container>
);

export default Card;
