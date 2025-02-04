import gql from "graphql-tag";

export const GET_RINK_GROUPS = gql`
  query GetRinkGroups($first: Int!, $after: String) {
    rink_groupsCollection(first: $first, after: $after) {
      edges {
        node {
          id
          name
          latitude
          description
          services
          longitude
          hours
          districts {
            id
            name
            code
          }
          rink_group_rinkCollection {
            edges {
              node {
                id
                rinks {
                  id
                  name
                  type
                  description
                  latitude
                  longitude
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
                        resurfaced
                        updated_at
                      }
                    }
                  }
                }
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
