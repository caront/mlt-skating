import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  defaultDataIdFromObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { SUPABASE_KEY, SUPABASE_URL } from "@env";

const cache = new InMemoryCache({
  dataIdFromObject(responseObject) {
    if ("nodeId" in responseObject) {
      return `${responseObject.nodeId}`;
    }

    return defaultDataIdFromObject(responseObject);
  },
});

const httpLink = createHttpLink({
  uri: SUPABASE_URL + "/graphql/v1",
});

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      apikey: SUPABASE_KEY
    },
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default apolloClient;
