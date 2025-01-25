import React from 'react';
import { logger, consoleTransport } from "react-native-logs";

export let Log = logger.createLogger({
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
    },
    severity: "debug",
    transport: consoleTransport,
    transportOptions: {
        colors: {
            info: "blueBright",
            warn: "yellowBright",
            error: "redBright",
        },
    },
    async: true,
    dateFormat: "time",
    printLevel: true,
    printDate: true,
    fixedExtLvlLength: false,
    enabled: true,
});


const LogProvider : React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [logs, setLogs] = React.useState<string[]>([]);

    const log = (message: string) => {
        setLogs([...logs, message]);
    }

    return (
        <>
            {children}
        </>
    )
}

export default LogProvider;