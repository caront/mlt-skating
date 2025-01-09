import gql from "graphql-tag";

export const GET_RINKS = gql`
  query GetRinks($first: Int!, $after: String) {
    rinksCollection(first: $first, after: $after) {
      edges {
        node {
          id
          name
          type
          description
          rink_name
          longitude
          latitude
          districts {
            name
            id
          }
          conditionsCollection {
            edges {
              node {
                open
                condition
                cleared
                watered
                resurfaced
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
