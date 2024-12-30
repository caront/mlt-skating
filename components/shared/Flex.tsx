import React from "react";

import { View } from "react-native";
import { ReactNode } from "react";

interface FlexProps {
    children: ReactNode;
    [key: string]: any;
}

export const Flex = ({ children, ...props }: FlexProps) => (
    <View style={[{ flex: 1 }]} {...props}>
        {children}
    </View>
);

export const Row = ({ children, ...props }: FlexProps) => (
    <View style={[{ flexDirection: "row" }]} {...props}>
        {children}
    </View>
);

export const Column = ({ children, ...props }: FlexProps) => (
    <View style={[{ flexDirection: "column" }]} {...props}>
        {children}
    </View>
);