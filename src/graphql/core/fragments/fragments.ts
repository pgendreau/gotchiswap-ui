//import { FragmentType, graphql } from '../__generated__/types';

import { gql } from "@apollo/client";

export const GOTCHI_FIELDS = gql(`
  fragment GotchiFields on Aavegotchi {
    id
    gotchiId
    name
    status
    baseRarityScore
    modifiedRarityScore
    kinship
    locked
    equippedWearables
    numericTraits
    modifiedNumericTraits
    level
    experience
  }
`);

export const PORTAL_FIELDS = gql(`
  fragment PortalFields on Portal {
    id
    hauntId
    openedAt
  }
`);