/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment GotchiFields on Aavegotchi {\n    id\n    gotchiId\n    name\n    status\n    baseRarityScore\n    modifiedRarityScore\n    kinship\n    locked\n    equippedWearables\n    numericTraits\n    modifiedNumericTraits\n    level\n    experience\n  }\n": types.GotchiFieldsFragmentDoc,
    "\n\nquery gotchi($id: ID!){\n\taavegotchi(id: $id) {\n        ...GotchiFields\n   }\n}\n": types.GotchiDocument,
    "\n\nquery gotchis($owner: String!){\n\taavegotchis(where:{\n    originalOwner: $owner\n  }) {    \n    ...GotchiFields\n  }\n}\n": types.GotchisDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GotchiFields on Aavegotchi {\n    id\n    gotchiId\n    name\n    status\n    baseRarityScore\n    modifiedRarityScore\n    kinship\n    locked\n    equippedWearables\n    numericTraits\n    modifiedNumericTraits\n    level\n    experience\n  }\n"): (typeof documents)["\n  fragment GotchiFields on Aavegotchi {\n    id\n    gotchiId\n    name\n    status\n    baseRarityScore\n    modifiedRarityScore\n    kinship\n    locked\n    equippedWearables\n    numericTraits\n    modifiedNumericTraits\n    level\n    experience\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\nquery gotchi($id: ID!){\n\taavegotchi(id: $id) {\n        ...GotchiFields\n   }\n}\n"): (typeof documents)["\n\nquery gotchi($id: ID!){\n\taavegotchi(id: $id) {\n        ...GotchiFields\n   }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\nquery gotchis($owner: String!){\n\taavegotchis(where:{\n    originalOwner: $owner\n  }) {    \n    ...GotchiFields\n  }\n}\n"): (typeof documents)["\n\nquery gotchis($owner: String!){\n\taavegotchis(where:{\n    originalOwner: $owner\n  }) {    \n    ...GotchiFields\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;