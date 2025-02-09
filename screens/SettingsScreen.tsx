import React from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useColors } from '../colors';
import GoBack from '../components/Navigation/GoBack';
import { useTranslation } from 'react-i18next';
import { Button, Switch } from '@rneui/themed';
import { version } from '../package.json'
import ExternalLibraries from '../components/Navigation/ExternalLib';

const useStyles = () => {
    const colors = useColors();

    return StyleSheet.create({
        container: {
            display: 'flex',
            margin: 10,
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '90%'
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        switch: {
            gap: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        version: {
            fontSize: 16,
            color: colors.grey5,
            textAlign: 'center',
        },
        content: {
            display: 'flex',
            gap: 20,
        },
        about: {
            display: 'flex',
            gap: 10,
        },
        aboutTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.grey5,
            marginBottom: 20,
        },
        aboutContent: {
            fontSize: 16,
        }
    });
}


const SettingsScreen = () => {
    const colors = useColors();
    const styles = useStyles();
    const { t, i18n } = useTranslation();

    const isFR = i18n.language === 'fr';

    const handleOnLanguageChange = async () => {
        await i18n.changeLanguage(isFR ? 'en' : 'fr');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <GoBack title={t('settings.title')} />
                <View style={styles.row}>
                    <Text>{t('settings.language')}</Text>
                    <View style={styles.switch}>
                        <Button
                            buttonStyle={{
                                width: 64,
                                borderRadius: 30,
                                backgroundColor: !isFR ? colors.primary : colors.grey2,
                            }}
                            onPress={handleOnLanguageChange}
                        >
                            <Text>EN</Text>
                        </Button>
                        <Button
                            buttonStyle={{
                                width: 64,
                                borderRadius: 30,
                                backgroundColor: isFR ? colors.primary : colors.grey2,
                            }}
                            onPress={handleOnLanguageChange}
                        >
                            <Text>FR</Text>
                        </Button>
                    </View>
                </View>
                <View style={styles.about}>
                    <Text style={styles.aboutTitle}>{t('settings.about')}</Text>
                    <Text style={styles.aboutContent}>{t('settings.about_text')}</Text>
                    <Text style={styles.aboutContent}>{t('settings.disclaimer')}</Text>
                    <Text style={styles.aboutContent}>{t('settings.privacy')}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.version}>{t('settings.version')}</Text>
                <Text style={styles.version}>{version}</Text>
            </View>
        </SafeAreaView>
    );
}

export default SettingsScreen;