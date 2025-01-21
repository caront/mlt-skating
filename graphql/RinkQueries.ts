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
          conditionsCollection(
            first: 1
            orderBy: [{ updated_at: DescNullsFirst }]
          ) {
            edges {
              node {
                id
                condition
                open
                watered
                cleared
                resurfaced
                updated_at
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

export const GET_RINKS_BY_ID = gql`
  query GetRinkAndConditionHistory($rinId: Int!) {
    rinksCollection(filter: { id: { eq: $rinkId } }) {
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
          conditionsCollection(
            first: 10
            orderBy: [{ updated_at: DescNullsFirst }]
          ) {
            edges {
              node {
                id
                condition
                open
                watered
                cleared
                resurfaced
                updated_at
              }
            }
          }
        }
      }
    }
  }
`;
