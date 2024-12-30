import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface CardProps {
    onClick: () => void;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ onClick, children }) => {
    return (
        <TouchableOpacity onPress={onClick} style={styles.card}>
            <View style={styles.cardContent}>
                {children}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 1,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    cardContent: {
        padding: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default Card;