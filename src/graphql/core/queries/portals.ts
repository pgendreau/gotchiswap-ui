import { gql } from "@apollo/client";
import { PORTAL_FIELDS } from "../fragments/fragments";

export const GET_PORTALS = gql`
${PORTAL_FIELDS}
query portals($owner: String!){
	portals(where:{
    buyer: $owner
    openedAt: null
  }) {    
    ...PortalFields
  }
}
`
