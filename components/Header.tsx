import React, { FunctionComponent } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Linking,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type HeaderComponentProps = {
    title: string;
    view?: string;
    children?: React.ReactNode;
};

type ParamList = {
    Detail: {
        openDrawer: void;
    };
};

const Header: FunctionComponent<HeaderComponentProps> = ({ title, children }) => {

    return (
        <SafeAreaProvider>
            <HeaderRNE
                leftComponent={{
                    icon: 'menu',
                    color: '#fff',
                }}
                rightComponent={
                    <View style={styles.headerRight}>

                    </View>
                }
                centerComponent={{ text: title, style: styles.heading }}
            />
            <View>
                {children}
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#397af8',
        marginBottom: 20,
        width: '100%',
        paddingVertical: 15,
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Header;