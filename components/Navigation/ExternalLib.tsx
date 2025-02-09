import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import packageJson from "../../package.json"; // Adjust the path if needed

const ExternalLibraries = () => {
    const [libraries, setLibraries] = useState<{ name: string; version: string }[]>([]);

    useEffect(() => {
        // Extract dependencies from package.json
        const dependencies = packageJson.dependencies || {};
        const devDependencies = packageJson.devDependencies || {};

        // Combine all dependencies
        const allLibs = Object.entries({ ...dependencies, ...devDependencies }).map(([name, version]) => ({
            name,
            version,
        }));

        setLibraries(allLibs);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📦 External Libraries</Text>
            <FlatList
                data={libraries}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.libName}>{item.name}</Text>
                        <Text style={styles.version}>v{item.version}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
    },
    libName: {
        fontSize: 16,
        fontWeight: "600",
    },
    version: {
        fontSize: 14,
        color: "gray",
    },
});

export default ExternalLibraries;
