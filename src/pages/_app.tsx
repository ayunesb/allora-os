import { Toaster } from "sonner";
import { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;