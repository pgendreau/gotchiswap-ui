import "./globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { Layout } from "../components/layout";
import { InjectApollo } from "@/components/apollo";
import { InjectWagmi } from "@/components/wagmi";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InjectApollo>
      <InjectWagmi>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </InjectWagmi>
    </InjectApollo>
  );
}
