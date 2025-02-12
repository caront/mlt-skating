import React, { useEffect } from "react";
import mobileAds from 'react-native-google-mobile-ads';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const initAds = async () => {


    const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    if (result === RESULTS.DENIED) {
        // The permission has not been requested, so request it.
        await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    }


    await mobileAds().setRequestConfiguration({
        // An array of test device IDs to allow.
        testDeviceIdentifiers: ['EMULATOR'],
    })
    console.log('Ads configured');

    await mobileAds().initialize();

    console.log('Ads initialized');
}

const AdsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    useEffect(() => {
        initAds();
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default AdsProvider;