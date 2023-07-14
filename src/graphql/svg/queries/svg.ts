import { gql } from "@apollo/client";
import { SVG_FIELDS } from "../fragments/fragments";

export const GET_SVG = gql`
${SVG_FIELDS}
query gotchiSvg($id: ID!){
	aavegotchi(id: $id) {
        ...SvgFields
  }
}
`