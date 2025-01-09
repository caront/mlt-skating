import React from 'react';
import {
    ApolloProvider,
} from '@apollo/client'
import apolloClient from './ApolloClient';

interface GraphqlProviderProps {
    children: React.ReactNode;
}


const GraphqlProvider: React.FC<GraphqlProviderProps> = ({ children }) => {
    return <ApolloProvider client={apolloClient}>
        {children}
    </ApolloProvider>
};

export default GraphqlProvider;