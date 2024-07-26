import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../public/css/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/styles.css" />
      </Head>
      <ToastContainer className="toast-container" position="top-center" // Set the position to center at the top
         />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
