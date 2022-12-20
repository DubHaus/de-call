import Alert from '@components/alert/alert';
import Container from '@components/common/container';
import {ReactNode, useCallback, useContext, useMemo, useState} from 'react';
import {
    TAlert,
    AlertStateContext,
    AlertUpdateContext,
} from 'src/context/alerts';

type Props = {
    children: ReactNode;
};

const AlertsProvider = ({children}: Props) => {
    const [alerts, setAlerts] = useState<TAlert[]>([]);

    const addAlert = useCallback((alert: TAlert) => {
        setAlerts(alerts => [...alerts, alert]);
        return alerts.length; // return elem idx
    }, []);

    const removeAlert = useCallback((idx: number) => {
        setAlerts(alerts => [
            ...alerts.slice(0, idx),
            ...alerts.slice(idx + 1),
        ]);
    }, []);

    return (
        <AlertStateContext.Provider value={alerts}>
            <AlertUpdateContext.Provider value={{addAlert, removeAlert}}>
                <Container className="absolute right-3 top-3">
                    {alerts.map(({text, type}, idx) => (
                        <Alert
                            type={type}
                            key={idx}
                            close={() => removeAlert(idx)}>
                            {text}
                        </Alert>
                    ))}
                </Container>
                {children}
            </AlertUpdateContext.Provider>
        </AlertStateContext.Provider>
    );
};

export default AlertsProvider;
