import React from 'react';
import { Platform } from 'react-native';

import { check, checkMultiple, Permission, PERMISSIONS, PermissionStatus } from 'react-native-permissions';

interface UseAskPermissionReturn {
    isAccesible: boolean;
    error: string;
}

interface UseAskPermissionProps {
    permissions: Permission[];
}

const useAskPermission = ({ permissions }: UseAskPermissionProps): UseAskPermissionReturn => {
    const [isAccesible, setIsAccesible] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');

    const isIOS = Platform.OS === 'ios';



    React.useEffect(() => {
        const getPermission = async () => {
            try {
                const status = await Promise.all(permissions.map(async (permission: Permission): Promise<{
                    permission: Permission;
                    status: PermissionStatus;
                }> => {
                    return { permission, status: await check(permission) };
                }));

                console.log(status);

                setIsAccesible(true);
            } catch (error) {
                setError('An error occured while fetching location');
            }
        }
        getPermission();
    }, []);

    return {
        isAccesible,
        error
    };
}

export default useAskPermission;