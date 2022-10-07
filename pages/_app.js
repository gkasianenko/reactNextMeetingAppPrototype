import "../styles/globals.css";
import Layout from "../components/layout/Layout";

//Здесь приложение оборачивается в Layout. Это корень
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
