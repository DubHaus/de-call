import {ReactElement, ReactNode} from 'react';

export const showAlert = (alert: ReactElement) => {
    let domNode = document.getElementById('alert');
    if (!domNode) {
        domNode = document.createElement('div');
        domNode.id = 'alert';
        document.body.insertBefore(domNode, null);
    }
};
