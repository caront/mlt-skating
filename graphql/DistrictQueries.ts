import gql from "graphql-tag";

const DISTRICT_RETURN_FIELDS = `
    id
    name
    code
    latitude
    longitude
`;

export const GET_DISTRICTS = gql`
  query GetDistricts {
    districtsCollection {
      edges {
        node {
          ${DISTRICT_RETURN_FIELDS}
        }
      }
    }
  }
`;
