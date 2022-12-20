import {TAlertType} from '@components/alert/alert';
import React from 'react';

export type TAlert = {
    text: string;
    type?: TAlertType;
};

export const AlertStateContext = React.createContext<TAlert[]>([]);

export const AlertUpdateContext = React.createContext<{
    addAlert: (alert: TAlert) => number;
    removeAlert: (idx: number) => void;
}>({
    addAlert: (alert: TAlert): number => {
        return 0;
    },
    removeAlert: (idx: number) => {},
});
