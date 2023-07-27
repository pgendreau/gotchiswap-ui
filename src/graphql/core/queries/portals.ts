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

export const GET_PORTALS_BY_ID = gql`
${PORTAL_FIELDS}
query portalsById($ids: [ID!]){
	portals(where:{
    id_in: $ids
  }) {    
    ...PortalFields
  }
}
`
