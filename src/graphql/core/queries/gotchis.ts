import { gql } from "@apollo/client";
import { GOTCHI_FIELDS } from "../fragments/fragments";

export const GET_GOTCHIS = gql`
${GOTCHI_FIELDS}
query gotchis($owner: String!){
	aavegotchis(where:{
    originalOwner: $owner
  }) {    
    ...GotchiFields
  }
}
`

export const GET_GOTCHIS_BY_ID = gql`
${GOTCHI_FIELDS}
query gotchisById($ids: [ID!]){
	aavegotchis(where:{
    id_in: $ids
  }) {    
    ...GotchiFields
  }
}
`