import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import "./globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { Layout } from "./layout";

function FallbackComponent() {
  return <div>Une erreur est survenue</div>;
}

export default function App({ Component, pageProps }: AppProps) {
  const coreLink = new HttpLink({
    uri: "https://subgraph.satsuma-prod.com/tWYl5n5y04oz/aavegotchi/aavegotchi-core-matic/api",
  });

  const svgLink = new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-svg",
  });

  const client = new ApolloClient({
    link: ApolloLink.split(
      (operation) => operation.getContext().clientName === "core",
      coreLink,
      svgLink
    ),
    cache: new InMemoryCache(),
  });

  const myFallback = <FallbackComponent />;

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
