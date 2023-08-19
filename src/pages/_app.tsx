import "./globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { Layout } from "../components/layout";
import { InjectApollo } from "@/components/hoc/apollo";
import { InjectWagmi } from "@/components/hoc/wagmi";
import { TxModal } from "@/components/specifics/modals/TxModal";
import { TxContextProvider } from "@/contexts/TxContext";
import { ModalContextProvider } from "@/contexts/ModalContext";
import { CartContextProvider } from "@/contexts/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InjectApollo>
      <InjectWagmi>
        <CartContextProvider>
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
        </CartContextProvider>
      </InjectWagmi>
    </InjectApollo>
  );
}
