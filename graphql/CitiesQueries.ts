import gql from "graphql-tag";

export const GET_CITIES = gql`
query GetCities {
    citiesCollection {
        edges {
            node {
                id
                name
                longitude
                latitude
                districtsCollection {
                edges {
        		    node {
           		        id
    			        name
    				    code
    				    latitude
    				    longitude
                    }
                }
    		}
        }
  	}
	}
    }
`;