import { gql } from "@apollo/client";
import { SVG_FIELDS } from "../fragments/fragments";

export const GET_SVGS = gql`
${SVG_FIELDS}
query gotchisSvg($ids: [ID!]){
	aavegotchis(where:{
    id_in: $ids
  }) {
    ...SvgFields
  }
}
`