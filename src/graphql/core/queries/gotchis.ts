import { gql } from "@apollo/client";

export const GET_GOTCHIS = gql`
query gotchis($owner: String!){
	aavegotchis(where:{
    owner: $owner
  }) {
    id
    gotchiId
    name
    status
    baseRarityScore
    modifiedRarityScore
    kinship
    locked
    equippedWearables 
  }
}
`
