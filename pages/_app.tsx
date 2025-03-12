import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Workbox } from "workbox-window";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const wb = new Workbox("/service-worker.js");
      wb.register();
    }
  }, []);

  return <Component {...pageProps} />;
}
