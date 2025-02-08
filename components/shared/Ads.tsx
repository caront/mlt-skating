import React, { useState, useRef } from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';
import { ADMOB_APP_ID_ANDROID, ADMOB_APP_ID_IOS } from '@env';
import { View } from 'react-native';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER :
    Platform.OS === 'ios' ? ADMOB_APP_ID_IOS : ADMOB_APP_ID_ANDROID;

const Ads: React.FC<{ display: boolean, style?: StyleProp<ViewStyle>}> = ({ display, style }) => {
    const bannerRef = useRef<BannerAd>(null);

    // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
    // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load();
    })

    if (!display) return null; // Don't render anything if the display prop is false.


    return (
        <View style={[style, { alignItems: 'center'}]}>
            <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        </View>
    );
}

export default Ads;