import '../styles/globals.css'
import React, { useEffect, useRef } from "react";
//import '../styles/bootstrapmin.css'
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return <Component {...pageProps} />
}

export default MyApp



