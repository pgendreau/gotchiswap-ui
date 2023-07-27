import { gql } from "@apollo/client";

export const SVG_FIELDS = gql(`
  fragment SvgFields on Aavegotchi {
    id
    svg
  }
`);