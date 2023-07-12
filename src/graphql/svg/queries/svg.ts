import { gql } from "@apollo/client";

export const GET_SVGS = gql`
query gotchisSvg($ids: [ID!]){
	aavegotchis(where:{
    id_in: $ids
  }) {
    id
    svg
  }
}
`