import gql from "graphql-tag";

export const GET_RINK_HISTORY = gql`
  query GetRinkAndConditionHistory($rinId: Int!) {
    rinksCollection(filter: { id: { eq: $rinkId } }) {
      edges {
        node {
          id
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
