import "./globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { Layout } from "../components/layout";
import { InjectApollo } from "@/components/hoc/apollo";
import { InjectWagmi } from "@/components/hoc/wagmi";
import { TxModal } from "@/components/specifics/modals/TxModal";
import { TxContextProvider } from "@/contexts/TxContext";
import { ModalContextProvider } from "@/contexts/ModalContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InjectApollo>
      <InjectWagmi>
        <TxContextProvider>
          <ModalContextProvider>
            <Layout>
              <>
                <Component {...pageProps} />
                <TxModal />
              </>
            </Layout>
          </ModalContextProvider>
        </TxContextProvider>
      </InjectWagmi>
    </InjectApollo>
  );
}
