import { FragmentType, graphql } from '../__generated__';

export const GOTCHI_FIELDS = graphql(`
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

export type aavegotchi = FragmentType<typeof GOTCHI_FIELDS>