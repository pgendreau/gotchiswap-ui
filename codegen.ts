
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    generates: {
        "src/graphql/core/__generated__/types.ts": {
            schema: "https://subgraph.satsuma-prod.com/tWYl5n5y04oz/aavegotchi/aavegotchi-core-matic/api",
            documents: "src/graphql/core/queries/*.ts",
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
            config: {
                withHooks: true,
            }
        },
        "src/graphql/svg/__generated__/types.ts": {
            schema: "https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-svg",
            documents: "src/graphql/svg/queries/*.ts",
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
            config: {
                withHooks: true,
            }
        },
    }
};

export default config;
