import { gql } from "@apollo/client";
import { GOTCHI_FIELDS } from "../fragments/fragments";

export const GET_GOTCHI = gql`
${GOTCHI_FIELDS}
query gotchi($id: ID!){
	aavegotchi(id: $id) {
        ...GotchiFields
   }
}
`
