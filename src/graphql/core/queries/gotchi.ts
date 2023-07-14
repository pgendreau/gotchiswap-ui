import { gql } from "@apollo/client";

export const GET_GOTCHI = gql`
query gotchi($id: ID!){
	aavegotchi(id: $id) {
    id
    owner {
      id
    }
    name
    status
    modifiedRarityScore
    kinship   
  }
}
`
